/**
 * Aviation-tool DuckDB singleton — one process-wide `:memory:` instance with a fresh
 * connection per request. DuckDB rejects `access_mode=READ_ONLY` on an in-memory database,
 * so the read-only posture is enforced by the allowlist in `sql-safety.ts` instead; the DB
 * holds no tables of its own anyway. `enable_external_access=false` stays unset — it would
 * kill httpfs. Memory and threads are sized to leave headroom on the 2Gi Cloud Run target.
 */

import { DuckDBInstance, type DuckDBConnection } from '@duckdb/node-api';
import { log } from 'evlog';

let _instancePromise: Promise<DuckDBInstance> | null = null;
let _prewarmed = false;
let _prewarmMs = 0;

/** Cloud Run injects this from terraform; staging keeps local runs working unwired. */
export const MCP_DATA_BUCKET = process.env.MCP_DATA_BUCKET || 'blog-mcp-data-staging';
export const AVIATION_BUCKET_URL_PREFIX = `gs://${MCP_DATA_BUCKET}/aviation/`;
export const PREWARM_PARQUET_URL = `${AVIATION_BUCKET_URL_PREFIX}pre-warm.parquet`;

export const DEFAULT_QUERY_TIMEOUT_MS = 30_000;

/** Called at startup so missing creds crash loudly rather than surfacing as a 403. */
export function requireAviationGcsCredentials(): { keyId: string; secret: string } {
  const keyId = process.env.GCS_HMAC_KEY_ID;
  const secret = process.env.GCS_HMAC_SECRET;
  if (!keyId || !secret) {
    const missing = [!keyId && 'GCS_HMAC_KEY_ID', !secret && 'GCS_HMAC_SECRET']
      .filter(Boolean)
      .join(', ');
    throw new Error(
      `aviation MCP: missing ${missing}. The MCP data bucket is private; ` +
        `DuckDB httpfs needs HMAC creds to read it. See .env.example and ` +
        `docs/mcp-aviation-ops.md "Local dev setup" for how to create an HMAC key ` +
        `for your own dev GCP project.`,
    );
  }
  return { keyId, secret };
}

async function createInstance(): Promise<DuckDBInstance> {
  const memory = process.env.AVIATION_DUCKDB_MEMORY_LIMIT || '768MB';
  const threads = process.env.AVIATION_DUCKDB_THREADS || '4';
  return DuckDBInstance.create(':memory:', {
    memory_limit: memory,
    threads,
  });
}

/** Escape a single-quoted SQL string literal by doubling embedded quotes. */
function sqlQuote(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

async function applyLockdownAndLoadHttpfs(conn: DuckDBConnection): Promise<void> {
  // Lockdown has to land before the first INSTALL for DuckDB to honor it.
  await conn.run(`SET autoload_known_extensions = false`);
  await conn.run(`SET autoinstall_known_extensions = false`);
  await conn.run(`SET allow_community_extensions = false`);
  await conn.run(`SET allow_unsigned_extensions = false`);
  // httpfs is a *core signed extension*, so it survives the lockdown above.
  await conn.run(`INSTALL httpfs`);
  await conn.run(`LOAD httpfs`);
  // Must precede the first gs:// read, or DuckDB signs with the AWS_* env vars
  // (set for Bedrock) and the private bucket answers SignatureDoesNotMatch.
  const { keyId, secret } = requireAviationGcsCredentials();
  await conn.run(
    `CREATE OR REPLACE SECRET aviation_gcs (TYPE GCS, KEY_ID ${sqlQuote(keyId)}, SECRET ${sqlQuote(secret)})`,
  );
  await conn.run(`SET disabled_filesystems = 'LocalFileSystem'`);
}

/** The process-wide aviation DuckDB instance, created and locked down on first call. */
export async function getAviationDuckDb(): Promise<DuckDBInstance> {
  if (!_instancePromise) {
    _instancePromise = (async () => {
      const start = Date.now();
      const instance = await createInstance();
      // A throwaway connection is enough: INSTALL lands in the in-memory db itself,
      // so every later connection inherits httpfs and the lockdown.
      const bootstrap = await instance.connect();
      try {
        await applyLockdownAndLoadHttpfs(bootstrap);
      } finally {
        bootstrap.closeSync();
      }
      const ms = Date.now() - start;
      log.info({ tag: 'mcp-aviation', message: `duckdb instance ready in ${ms}ms` });
      return instance;
    })();
  }
  return _instancePromise;
}

/** Idempotent; reads the 1-row Parquet so no request pays the 2-5s httpfs cold start. */
export async function prewarmAviationDuckDb(): Promise<{ ms: number; skipped: boolean }> {
  if (_prewarmed) return { ms: _prewarmMs, skipped: true };
  const start = Date.now();
  const instance = await getAviationDuckDb();
  const conn = await instance.connect();
  try {
    const reader = await conn.runAndReadAll(
      `SELECT COUNT(*) AS n FROM read_parquet('${PREWARM_PARQUET_URL}')`,
    );
    reader.getRows(); // materialize
    _prewarmMs = Date.now() - start;
    _prewarmed = true;
    log.info({ tag: 'mcp-aviation', message: `duckdb prewarm finished in ${_prewarmMs}ms` });
    return { ms: _prewarmMs, skipped: false };
  } finally {
    conn.closeSync();
  }
}

export async function openAviationConnection(): Promise<DuckDBConnection> {
  const instance = await getAviationDuckDb();
  return instance.connect();
}

/** Interrupts the connection on timeout, but never closes it — that stays the caller's. */
export async function runWithTimeout<T>(
  conn: DuckDBConnection,
  run: (conn: DuckDBConnection) => Promise<T>,
  timeoutMs: number = DEFAULT_QUERY_TIMEOUT_MS,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      try {
        conn.interrupt();
      } catch {
        // interrupt is best-effort
      }
      reject(new Error(`query exceeded ${timeoutMs}ms timeout`));
    }, timeoutMs);
  });
  try {
    return await Promise.race([run(conn), timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** @internal Reset the singleton for tests. */
export function __resetAviationDuckDbForTests(): void {
  _instancePromise = null;
  _prewarmed = false;
  _prewarmMs = 0;
}

/** @internal Whether prewarm has completed. */
export function __isPrewarmed(): boolean {
  return _prewarmed;
}
