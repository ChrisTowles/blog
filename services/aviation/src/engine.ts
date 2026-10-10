import { DuckDBInstance, StatementType, type DuckDBConnection } from '@duckdb/node-api';
import type { AviationConfig } from './config.ts';
import {
  findDisallowedUrl,
  findIntrospectionCall,
  resolveVirtualUrls,
  toVirtualUrls,
} from './guard.ts';

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface QueryResult {
  columns: string[];
  rows: Array<Record<string, JsonValue>>;
}

export interface ParseResult {
  statementCount: number;
  tableNames: string[];
}

export interface AviationEngine {
  query(sql: string, timeoutMs: number): Promise<QueryResult>;
  parse(sql: string): Promise<ParseResult>;
}

/** The caller sent SQL this service refuses to run. */
export class RejectedSqlError extends Error {}

export class QueryTimeoutError extends Error {}

export const MAX_RESPONSE_ROWS = 50_000;

function sqlQuote(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

async function bootstrap(conn: DuckDBConnection, config: AviationConfig): Promise<void> {
  await conn.run('SET autoload_known_extensions = false');
  await conn.run('SET autoinstall_known_extensions = false');
  await conn.run('SET allow_community_extensions = false');
  await conn.run('SET allow_unsigned_extensions = false');
  await conn.run('LOAD httpfs');
  await conn.run(
    `CREATE OR REPLACE SECRET aviation_r2 (
      TYPE S3,
      KEY_ID ${sqlQuote(config.keyId)},
      SECRET ${sqlQuote(config.secret)},
      ENDPOINT ${sqlQuote(config.endpoint)},
      REGION 'auto',
      URL_STYLE 'path',
      USE_SSL ${config.useSsl}
    )`,
  );
  await conn.run(`SET allowed_directories = [${sqlQuote(`s3://${config.bucket}/aviation/`)}]`);
  await conn.run('SET enable_external_access = false');
  await conn.run('SET lock_configuration = true');
}

export async function createEngine(config: AviationConfig): Promise<AviationEngine> {
  const base = { memory_limit: config.memoryLimit, threads: String(config.threads) };

  const instance = await DuckDBInstance.create(
    ':memory:',
    config.extensionDir ? { ...base, extension_directory: config.extensionDir } : base,
  );

  const setup = await instance.connect();

  try {
    await bootstrap(setup, config);
  } finally {
    setup.closeSync();
  }

  async function assertSingleSelect(conn: DuckDBConnection, sql: string): Promise<void> {
    const extracted = await conn.extractStatements(sql);

    if (extracted.count !== 1) {
      throw new RejectedSqlError(`expected a single SELECT statement, got ${extracted.count}`);
    }

    const prepared = await extracted.prepare(0);
    const type = prepared.statementType;
    prepared.destroySync();

    if (type !== StatementType.SELECT) {
      throw new RejectedSqlError('only SELECT statements are allowed');
    }
  }

  function normalize(sql: string): string {
    return resolveVirtualUrls(sql.trim().replace(/;\s*$/, ''), config.bucket);
  }

  function prepareSql(sql: string): string {
    const resolved = normalize(sql);
    const disallowed = findDisallowedUrl(resolved, config.bucket);

    if (disallowed) throw new RejectedSqlError(`URL not allowed: ${disallowed}`);

    const introspection = findIntrospectionCall(resolved);

    if (introspection) throw new RejectedSqlError(`function not allowed: ${introspection}()`);

    return resolved;
  }

  return {
    async query(sql, timeoutMs) {
      const resolved = prepareSql(sql);
      const conn = await instance.connect();
      let timedOut = false;

      const timer = setTimeout(() => {
        timedOut = true;
        conn.interrupt();
      }, timeoutMs);

      try {
        await assertSingleSelect(conn, resolved);
        const reader = await conn.runAndReadAll(resolved);
        const rows = reader.getRowObjectsJson();

        if (rows.length > MAX_RESPONSE_ROWS) {
          throw new RejectedSqlError(`result exceeds ${MAX_RESPONSE_ROWS} rows; add a LIMIT`);
        }

        return { columns: reader.columnNames(), rows };
      } catch (error) {
        if (timedOut) throw new QueryTimeoutError(`query exceeded ${timeoutMs}ms timeout`);

        throw error;
      } finally {
        clearTimeout(timer);
        conn.closeSync();
      }
    },

    async parse(sql) {
      const resolved = normalize(sql);
      const conn = await instance.connect();

      try {
        const extracted = await conn.extractStatements(resolved);
        const names = extracted.count === 1 ? conn.getTableNames(resolved, false) : [];

        return {
          statementCount: extracted.count,
          tableNames: names.map((name) => toVirtualUrls(name, config.bucket)),
        };
      } finally {
        conn.closeSync();
      }
    },
  };
}
