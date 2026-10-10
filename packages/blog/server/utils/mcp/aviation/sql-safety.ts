/**
 * SQL safety layer — the security boundary for ask_aviation. It validates on DuckDB's
 * own parser because a JS one (`pg-query-emscripten`) misreads the dialect and would
 * accept unsafe queries or reject safe ones, and it scans banned table functions
 * textually since `getTableNames` reports nothing at all for read_csv.
 */

import {
  getAviationClient,
  AviationQueryError,
  AVIATION_BUCKET_URL_PREFIX,
  type AviationClient,
  type AviationParse,
} from './duckdb';
import { extractErrorMessage } from '../../../../shared/error-util';

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

const BANNED_TABLE_FNS = [
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
  'duckdb_secrets',
  'duckdb_settings',
  'duckdb_functions',
  'duckdb_extensions',
  'duckdb_databases',
  'duckdb_tables',
  'duckdb_columns',
];

const BANNED_KEYWORDS_RE = new RegExp(`\\b(${BANNED_KEYWORDS.join('|')})\\b`, 'i');

const BANNED_TABLE_FNS_RE = new RegExp(`\\b(${BANNED_TABLE_FNS.join('|')})\\s*\\(`, 'i');

export async function validateSql(
  sql: string,
  client: AviationClient = getAviationClient(),
): Promise<SqlValidationResult> {
  if (!sql || !sql.trim()) {
    return { ok: false, error: 'SQL is empty' };
  }

  const trimmed = sql.trim().replace(/;\s*$/, '');

  // Layer 1: raw-text banned-keyword scan. Runs before parsing so we fail fast.
  const kwMatch = BANNED_KEYWORDS_RE.exec(trimmed);

  if (kwMatch) {
    return { ok: false, error: `statement type not allowed (found: ${kwMatch[1]})` };
  }

  // DuckDB's own parser runs in the aviation container.
  let parsed: AviationParse;

  try {
    parsed = await client.parse(trimmed);
  } catch (e) {
    if (e instanceof AviationQueryError && e.status === 422) {
      return { ok: false, error: `SQL failed to parse: ${extractErrorMessage(e)}` };
    }

    throw e;
  }

  if (parsed.statementCount !== 1) {
    return {
      ok: false,
      error: `expected a single SELECT statement, got ${parsed.statementCount}`,
    };
  }

  // DuckDB parses `read_csv('...')` as a table function call but the name
  // doesn't surface via getTableNames (nothing for read_parquet or read_csv in
  // current builds). Scan textually instead.
  const fnMatch = BANNED_TABLE_FNS_RE.exec(trimmed);

  if (fnMatch) {
    return {
      ok: false,
      error: `table function not allowlisted: ${fnMatch[1]}() — only read_parquet against the aviation bucket is permitted`,
    };
  }

  // Every URL-shaped relation must sit under the aviation prefix. Bare identifiers (CTEs, or a
  // missing table) fail at execute time with a clear error.
  for (const name of parsed.tableNames) {
    if (looksLikeUrl(name) && !name.startsWith(AVIATION_BUCKET_URL_PREFIX)) {
      return {
        ok: false,
        error: `external URL not allowed in read_parquet: ${name}. Only ${AVIATION_BUCKET_URL_PREFIX}* is permitted`,
      };
    }
  }

  // The textual read_parquet(...) scan is the check that holds when getTableNames reports nothing.
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

  const { sql: withLimit, limitInjected } = injectLimit(trimmed);

  return { ok: true, sql: withLimit, limitInjected };
}

function looksLikeUrl(name: string): boolean {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(name);
}

interface LimitInjection {
  sql: string;
  limitInjected: boolean;
}

/**
 * If the top-level query has no LIMIT clause, wrap it in one. Uses a simple textual
 * test: if the last non-trailing token is `LIMIT <n>` (optionally with OFFSET), leave
 * it alone; otherwise wrap.
 */
function injectLimit(sql: string): LimitInjection {
  const hasLimit = /\blimit\s+\d+\s*(offset\s+\d+\s*)?$/i.test(sql.trim());

  if (hasLimit) return { sql, limitInjected: false };

  return { sql: `SELECT * FROM (${sql}) LIMIT 10000`, limitInjected: true };
}
