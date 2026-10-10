/**
 * Callers write `aviation://dims/aircraft.parquet`, so the same prompt and allowlist work in
 * every environment. The container swaps in the real bucket here, after which every URL left
 * in the SQL has to sit under that bucket's `aviation/` prefix.
 */
export const VIRTUAL_PREFIX = 'aviation://';

const INTROSPECTION_CALL = /\b(duckdb_\w+|current_setting|getenv|which_secret)\s*\(/i;

const URL_IN_SQL = /[a-z][a-z0-9+.-]*:\/\/[^\s'"]*/gi;

export function resolveVirtualUrls(sql: string, bucket: string): string {
  return sql.replaceAll(VIRTUAL_PREFIX, `s3://${bucket}/aviation/`);
}

export function findDisallowedUrl(sql: string, bucket: string): string | null {
  const allowed = `s3://${bucket}/aviation/`;

  for (const match of sql.matchAll(URL_IN_SQL)) {
    const url = match[0];

    if (!url.startsWith(allowed) || url.includes('..')) return url;
  }

  return null;
}

export function toVirtualUrls(text: string, bucket: string): string {
  return text.replaceAll(`s3://${bucket}/aviation/`, VIRTUAL_PREFIX);
}

export function findIntrospectionCall(sql: string): string | null {
  return INTROSPECTION_CALL.exec(sql)?.[1] ?? null;
}
