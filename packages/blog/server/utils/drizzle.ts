import { getTableColumns } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import type { SQLiteTable } from 'drizzle-orm/sqlite-core';

import * as schema from '../database/schema';

export { sql, eq, and, or, desc } from 'drizzle-orm';

export const tables = schema;

export function useDrizzle() {
  const { env } = useEvent().context.cloudflare;

  return drizzle(env.DB, { schema });
}

// D1 rejects statements with more than 100 bound parameters. Each row binds at most one
// parameter per column (defaults included), so the column count bounds the rows per statement.
const D1_MAX_BOUND_PARAMS = 100;

/** Split a bulk insert into statements small enough for D1, ready to pass to `db.batch`. */
export function insertChunked<T extends SQLiteTable>(
  db: ReturnType<typeof useDrizzle>,
  table: T,
  rows: T['$inferInsert'][],
) {
  const columnCount = Object.keys(getTableColumns(table)).length;
  const chunkSize = Math.max(1, Math.floor(D1_MAX_BOUND_PARAMS / columnCount));
  const statements = [];

  for (let i = 0; i < rows.length; i += chunkSize) {
    statements.push(db.insert(table).values(rows.slice(i, i + chunkSize)));
  }

  return statements;
}

export type dbChat = typeof schema.chats.$inferSelect;

export type dbMessage = typeof schema.messages.$inferSelect;
