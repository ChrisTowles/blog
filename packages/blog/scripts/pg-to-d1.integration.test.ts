// @vitest-environment node
/**
 * Needs a Postgres with pgvector. Point PG_TO_D1_TEST_URL at its admin database, e.g.
 * `docker compose up -d` then postgres://postgres:postgres@localhost:5439/postgres. A scratch
 * database is created and dropped around the run.
 */
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import * as schema from '../server/database/schema';
import { createTestD1 } from '../server/test-utils/d1';
import {
  buildImportStatements,
  readSource,
  selectTables,
  summarize,
  type ExportedTable,
} from './pg-to-d1';

const adminUrl = process.env.PG_TO_D1_TEST_URL;

const fixture = (name: string) => readFileSync(join(__dirname, '__fixtures__', name), 'utf8');

describe.skipIf(!adminUrl)('pg-to-d1 against a legacy Postgres', () => {
  const scratch = `pg_to_d1_${randomUUID().replaceAll('-', '')}`;
  let exported: ExportedTable[];
  let d1: Awaited<ReturnType<typeof createTestD1>>;

  const withDatabase = async (database: string, run: (client: pg.Client) => Promise<void>) => {
    const url = new URL(adminUrl ?? '');
    url.pathname = `/${database}`;
    const client = new pg.Client({ connectionString: url.toString() });
    await client.connect();

    try {
      await run(client);
    } finally {
      await client.end();
    }
  };

  const scratchUrl = () => {
    const url = new URL(adminUrl ?? '');
    url.pathname = `/${scratch}`;

    return url.toString();
  };

  beforeAll(async () => {
    await withDatabase('postgres', async (admin) => {
      await admin.query(`CREATE DATABASE ${scratch}`);
    });
    await withDatabase(scratch, async (client) => {
      await client.query(fixture('pg-legacy-schema.sql'));
      await client.query('SET search_path TO public');
      await client.query(fixture('pg-legacy-sample.sql'));
    });

    exported = await readSource(scratchUrl(), selectTables([], true));
    d1 = await createTestD1();

    for (const statement of buildImportStatements(exported)) {
      await d1.db.prepare(statement).run();
    }
  });

  afterAll(async () => {
    await d1?.dispose();
    await withDatabase('postgres', async (admin) => {
      await admin.query(`DROP DATABASE IF EXISTS ${scratch} WITH (FORCE)`);
    });
  });

  test('copies every row of the 20 non-RAG tables', () => {
    const counts = Object.fromEntries(
      summarize(exported).map((summary) => [summary.table, summary.keys.length]),
    );

    expect(counts).toMatchObject({
      users: 2,
      messages: 4,
      typing_group_members: 2,
      typing_attempts: 2,
      workflows: 1,
      node_executions: 1,
    });
    expect(Object.keys(counts)).toHaveLength(20);
  });

  test('reads back through Drizzle with the types the app expects', async () => {
    const db = drizzle(d1.db, { schema });

    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, 'u1'));
    expect(user?.createdAt).toEqual(new Date(Date.UTC(2026, 0, 2, 3, 4, 5, 678)));
    expect(user?.name).toBe("Chris O'Neil");

    const messages = await db.select().from(schema.messages).orderBy(schema.messages.id);
    expect(messages.map((message) => message.parts === null)).toEqual([false, true, true, false]);
    expect(messages[0]?.parts).toEqual([{ type: 'text', text: "line1\nline2 'q' \\ back; semi" }]);
    expect(messages[3]?.id).toBe('mbig');
    expect(JSON.stringify(messages[3]?.parts)).toHaveLength(360_027);

    const [list] = await db.select().from(schema.typingSpellingLists);
    expect(list?.words).toEqual(['apple', "it's, ok", 'say "hi"']);
    expect(list?.weekOf).toBe('2026-09-28');

    const progress = await db
      .select()
      .from(schema.typingSpellingProgress)
      .orderBy(schema.typingSpellingProgress.id);

    expect(progress.map((row) => row.mastered)).toEqual([true, false]);
    expect(progress[0]?.masteredAt).toEqual(new Date(Date.UTC(2026, 9, 1, 9)));

    const attempts = await db
      .select()
      .from(schema.typingAttempts)
      .orderBy(schema.typingAttempts.id);

    expect(attempts[0]?.errorsByKey).toEqual({ a: 2, s: 1 });
    expect(attempts[1]?.lessonId).toBeNull();

    const [workflow] = await db.select().from(schema.workflows);
    expect(workflow?.createdAt).toBe('2026-10-10T20:30:37.705Z');
  });

  test('keeps explicit serial ids and cascades still work', async () => {
    const db = drizzle(d1.db, { schema });

    const groups = await db.select().from(schema.typingGroups).orderBy(schema.typingGroups.id);
    expect(groups.map((group) => group.id)).toEqual([7, 9]);

    await db.delete(schema.typingLearners).where(eq(schema.typingLearners.id, 4));
    expect(await db.select().from(schema.typingAttempts)).toEqual([]);
  });
});
