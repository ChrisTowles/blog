/**
 * Aviation-tool DuckDB singleton.
 *
 * One process-wide DuckDBInstance (`:memory:`). New connections per request are cheap and
 * safe. Module-level instance is fine — per Issue #8, only request-scoped mutable state is
 * forbidden; a process-lifetime DB is not.
 *
 * Note on READ_ONLY: DuckDB rejects `access_mode=READ_ONLY` on an in-memory database
 * ("Cannot launch in-memory database in read-only mode"), because read-only can only
 * attach to an existing file. The aviation demo never creates tables in the in-memory DB —
 * all data is read from Parquet via httpfs — so the effective read-only posture is enforced
 * by the AST allowlist in `sql-safety.ts`, not by the connection mode. The plan's
 * "read-only connection" language is honored in spirit: the banned-keyword layer rejects
 * INSERT/UPDATE/DELETE/DDL/COPY/ATTACH/etc., and the in-memory DB has no pre-existing
 * tables for a SELECT to mutate.
 *
 * Startup lockdown (see plan Key Decisions — "layered SQL safety"):
 *   - autoload_known_extensions=false
 *   - autoinstall_known_extensions=false
 *   - allow_community_extensions=false
 *   - allow_unsigned_extensions=false
 *   - disabled_filesystems='LocalFileSystem'
 *   - INSTALL httpfs; LOAD httpfs; (required for gs:// reads)
 *   - CREATE SECRET (TYPE GCS, KEY_ID, SECRET) from GCS_HMAC_KEY_ID / GCS_HMAC_SECRET
 *     env vars. The bucket is private; DuckDB httpfs talks to GCS via its S3-compat
 *     interoperability API which only accepts HMAC creds (not ADC / OAuth). Without
 *     an explicit GCS secret, DuckDB falls back to AWS_* env vars (set for Bedrock)
 *     and signs requests with those — fails with SignatureDoesNotMatch.
 *
 * Deliberately NOT set:
 *   - enable_external_access=false  (would kill httpfs)
 *
 * Memory/threads: 768MB / 4 threads. Chosen for the 2Gi Cloud Run target
 * (min_instances=1). Leaves headroom for Nuxt + Node runtime. Tune via
 * AVIATION_DUCKDB_MEMORY_LIMIT / AVIATION_DUCKDB_THREADS env vars if needed.
 */

import { DuckDBInstance, type DuckDBConnection } from '@duckdb/node-api';
import { log } from 'evlog';

let _instancePromise: Promise<DuckDBInstance> | null = null;
let _prewarmed = false;
let _prewarmMs = 0;

/**
 * GCS bucket hosting MCP datasets. Reads `MCP_DATA_BUCKET` at module import
 * time — Cloud Run injects this from terraform (see
 * `infra/terraform/modules/cloud-run/main.tf`). Falls back to the staging
 * bucket so local/test runs work without explicit env wiring. Aviation data
 * lives under the `aviation/` prefix inside this bucket.
 */
export const MCP_DATA_BUCKET = process.env.MCP_DATA_BUCKET || 'blog-mcp-data-staging';
export const AVIATION_BUCKET_URL_PREFIX = `gs://${MCP_DATA_BUCKET}/aviation/`;
export const PREWARM_PARQUET_URL = `${AVIATION_BUCKET_URL_PREFIX}pre-warm.parquet`;

export const DEFAULT_QUERY_TIMEOUT_MS = 30_000;

/**
 * Validate that HMAC credentials for the private aviation bucket are present.
 * Throws with a clear, actionable message if either env var is missing. Call at
 * startup (from the nitro warmup plugin) so the process crashes loudly instead
 * of limping along and failing on the first MCP request with an opaque 403.
 */
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
  // Order matters: we cannot set most options while in READ_ONLY mode, but the
  // SET commands below target the per-connection client context, which is writable.
  // Some of these options must be applied before INSTALL/LOAD — so we set lockdown
  // BEFORE the first INSTALL httpfs call.
  await conn.run(`SET autoload_known_extensions = false`);
  await conn.run(`SET autoinstall_known_extensions = false`);
  await conn.run(`SET allow_community_extensions = false`);
  await conn.run(`SET allow_unsigned_extensions = false`);
  // httpfs is a *core signed extension* — it can still be loaded explicitly.
  await conn.run(`INSTALL httpfs`);
  await conn.run(`LOAD httpfs`);
  // Authenticate to the private aviation bucket. MUST come after LOAD httpfs
  // and BEFORE the first gs:// read. Without this, DuckDB falls back to AWS_*
  // env vars as S3-style HMAC and fails with SignatureDoesNotMatch.
  const { keyId, secret } = requireAviationGcsCredentials();
  await conn.run(
    `CREATE OR REPLACE SECRET aviation_gcs (TYPE GCS, KEY_ID ${sqlQuote(keyId)}, SECRET ${sqlQuote(secret)})`,
  );
  // After httpfs is loaded, block local filesystem access.
  await conn.run(`SET disabled_filesystems = 'LocalFileSystem'`);
}

/**
 * Get the process-wide aviation DuckDB instance. Creates it on first call and
 * pre-warms httpfs via a single read against the prewarm Parquet.
 */
export async function getAviationDuckDb(): Promise<DuckDBInstance> {
  if (!_instancePromise) {
    _instancePromise = (async () => {
      const start = Date.now();
      const instance = await createInstance();
      // Bootstrap: apply lockdown on a throwaway connection, which also installs
      // httpfs into the in-memory db so subsequent connections see it.
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

/**
 * Pre-warm by reading the 1-row prewarm Parquet. Should be called from the Nitro
 * startup plugin so the first real request doesn't pay the 2-5s httpfs cold cost.
 *
 * Idempotent: subsequent calls are no-ops.
 */
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

/** Open a fresh connection ready for a query. httpfs + lockdown are applied
 * once at instance bootstrap and inherited by every subsequent connection. */
export async function openAviationConnection(): Promise<DuckDBConnection> {
  const instance = await getAviationDuckDb();
  return instance.connect();
}

/**
 * Run a query with a hard timeout. On timeout the connection is interrupted and the
 * promise rejects with a timeout error. The caller must close the connection.
 */
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

// ---------- Test-only helpers ----------

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
