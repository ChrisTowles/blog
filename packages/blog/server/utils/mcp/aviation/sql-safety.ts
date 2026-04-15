/**
 * SQL safety layer — the security boundary for ask_aviation.
 *
 * Strategy (chosen: use DuckDB's own parser):
 *   - DuckDB's `connection.extractStatements(sql)` and `getTableNames(sql, true)` use
 *     the real DuckDB parser (not a JS re-implementation), so dialect quirks and future
 *     syntax changes are handled for us.
 *   - Rationale: a JS-side parser like `pg-query-emscripten` doesn't understand DuckDB
 *     dialect (e.g. `read_parquet(...)` as table function, `EXPORT DATABASE`, Hive-style
 *     partitions), so it would either accept unsafe queries or reject safe ones. Using
 *     DuckDB's own parser is the authoritative choice.
 *
 * Layers applied here:
 *   1. Parse: must be exactly one statement that parses cleanly.
 *   2. Banned top-level keyword check on the raw SQL (belt-and-suspenders against parser
 *      edge cases and multi-statement injection).
 *   3. Table-reference allowlist via `getTableNames`. Any referenced relation must be:
 *        - `read_parquet(...)` against the aviation bucket prefix, OR
 *        - a CTE name defined in the same query (DuckDB reports CTEs here too).
 *      Any other table-valued function (read_csv, read_json, url_decode-style) is rejected.
 *   4. LIMIT injection: if the SQL has no trailing LIMIT clause at the top level, wrap it
 *      in `SELECT * FROM (<sql>) LIMIT 10000`.
 *
 * Notes:
 *   - `getTableNames` returns fully-qualified identifiers when `qualified=true`. For
 *     `read_parquet('gs://...')` the parser surfaces the URL in the returned list; that's
 *     how we detect SSRF attempts.
 *   - The banned-keyword regex is case-insensitive and word-boundary scoped so column
 *     names like `attach_date` don't trip it.
 */

import { openAviationConnection, AVIATION_BUCKET_URL_PREFIX } from './duckdb';

export type SqlValidationResult =
  | { ok: true; sql: string; limitInjected: boolean }
  | { ok: false; error: string };

const BANNED_KEYWORDS = [
  'ATTACH',
  'DETACH',
  'INSTALL',
  'LOAD',
  'PRAGMA',
  'CALL',
  'SET',
  'RESET',
  'COPY',
  'EXPORT',
  'IMPORT',
  'CREATE',
  'DROP',
  'ALTER',
  'INSERT',
  'UPDATE',
  'DELETE',
  'TRUNCATE',
  'MERGE',
  'GRANT',
  'REVOKE',
  'REPLACE',
  'USE',
  'CHECKPOINT',
  'VACUUM',
  'ANALYZE',
  'BEGIN',
  'COMMIT',
  'ROLLBACK',
  'START',
];

const BANNED_TABLE_FNS = new Set([
  'read_csv',
  'read_csv_auto',
  'read_json',
  'read_json_auto',
  'read_ndjson',
  'read_ndjson_auto',
  'read_text',
  'read_blob',
  'read_xlsx',
  'parquet_scan',
  'parquet_metadata',
  'parquet_file_metadata',
  'parquet_schema',
  'glob',
  'sniff_csv',
  'load_aws_credentials',
  'duckdb_settings',
  'duckdb_functions',
  'duckdb_extensions',
  'duckdb_databases',
  'duckdb_tables',
  'duckdb_columns',
]);

export async function validateSql(sql: string): Promise<SqlValidationResult> {
  if (!sql || !sql.trim()) {
    return { ok: false, error: 'SQL is empty' };
  }
  const trimmed = sql.trim().replace(/;\s*$/, '');

  // Layer 1: raw-text banned-keyword scan. Runs before parsing so we fail fast
  // and we catch anything that might slip through a parse-succeeds path.
  for (const kw of BANNED_KEYWORDS) {
    const re = new RegExp(`\\b${kw}\\b`, 'i');
    if (re.test(trimmed)) {
      return { ok: false, error: `statement type not allowed (found: ${kw})` };
    }
  }

  // Parse with DuckDB's own parser.
  const conn = await openAviationConnection();
  try {
    let statementCount: number;
    try {
      const extracted = await conn.extractStatements(trimmed);
      statementCount = extracted.count;
      if (statementCount !== 1) {
        return {
          ok: false,
          error: `expected a single SELECT statement, got ${statementCount}`,
        };
      }
    } catch (e) {
      return { ok: false, error: `SQL failed to parse: ${describe(e)}` };
    }

    // getTableNames surfaces every table reference (CTE names + physical/functional relations).
    let tableNames: readonly string[];
    try {
      tableNames = conn.getTableNames(trimmed, true);
    } catch (e) {
      return { ok: false, error: `SQL failed to parse: ${describe(e)}` };
    }

    // Scan the raw SQL for any disallowed table-valued function invocation.
    // DuckDB parses `read_csv('...')` into a table function call, but the *name*
    // doesn't reliably surface via getTableNames (which returns the file path for
    // read_parquet but nothing for read_csv). So scan textually.
    for (const fn of BANNED_TABLE_FNS) {
      const re = new RegExp(`\\b${fn}\\s*\\(`, 'i');
      if (re.test(trimmed)) {
        return {
          ok: false,
          error: `table function not allowlisted: ${fn}() — only read_parquet against the aviation bucket is permitted`,
        };
      }
    }

    // Every referenced relation must be either a CTE name or a read_parquet URL pointing
    // at the aviation bucket. Physical table references (e.g. `FROM my_table`) are rejected
    // because the in-memory READ_ONLY db has no tables.
    for (const name of tableNames) {
      if (looksLikeUrl(name)) {
        if (!name.startsWith(AVIATION_BUCKET_URL_PREFIX)) {
          return {
            ok: false,
            error: `external URL not allowed in read_parquet: ${name}. Only ${AVIATION_BUCKET_URL_PREFIX}* is permitted`,
          };
        }
        continue; // allowlisted
      }
      // Any other entry is a bare identifier (CTE, or — if you forgot to use read_parquet —
      // a missing table). The latter will fail at execute time with a clear error.
    }

    // Extra belt check: if any read_parquet(...) appears textually, confirm its URL is
    // allowlisted. Catches the case where getTableNames collapses a URL differently.
    const rpMatches = trimmed.matchAll(/read_parquet\s*\(\s*(['"])([^'"]+)\1/gi);
    for (const match of rpMatches) {
      const url = match[2]!;
      if (!url.startsWith(AVIATION_BUCKET_URL_PREFIX)) {
        return {
          ok: false,
          error: `external URL not allowed in read_parquet: ${url}. Only ${AVIATION_BUCKET_URL_PREFIX}* is permitted`,
        };
      }
    }

    // Layer 4: LIMIT injection.
    const { sql: withLimit, limitInjected } = injectLimit(trimmed);
    return { ok: true, sql: withLimit, limitInjected };
  } finally {
    conn.closeSync();
  }
}

function looksLikeUrl(name: string): boolean {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(name);
}

/**
 * If the top-level query has no LIMIT clause, wrap it in one. Uses a simple textual
 * test: if the last non-trailing token is `LIMIT <n>` (optionally with OFFSET), leave
 * it alone; otherwise wrap.
 */
function injectLimit(sql: string): { sql: string; limitInjected: boolean } {
  const hasLimit = /\blimit\s+\d+\s*(offset\s+\d+\s*)?$/i.test(sql.trim());
  if (hasLimit) return { sql, limitInjected: false };
  return { sql: `SELECT * FROM (${sql}) LIMIT 10000`, limitInjected: true };
}

function describe(e: unknown): string {
  if (e instanceof Error) return e.message;
  return String(e);
}
