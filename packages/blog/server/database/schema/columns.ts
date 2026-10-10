import { integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

const nowMs = sql`(unixepoch('subsec') * 1000)`;

/** Millisecond epoch stored as INTEGER. The SQL default covers raw inserts that bypass drizzle. */
export const timestampMs = () =>
  integer({ mode: 'timestamp_ms' })
    .notNull()
    .default(nowMs)
    .$defaultFn(() => new Date());

export const uuidPk = () =>
  text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());
