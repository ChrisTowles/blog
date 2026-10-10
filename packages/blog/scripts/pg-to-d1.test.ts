// @vitest-environment node
import { is } from 'drizzle-orm';
import { getTableConfig, SQLiteTable } from 'drizzle-orm/sqlite-core';
import { describe, expect, test } from 'vitest';
import * as schema from '../server/database/schema';
import {
  TABLES,
  buildImportSql,
  buildInsertStatements,
  compareSummaries,
  decodeRow,
  keyDigest,
  pgTextTimestampToIso,
  pgTimestampToMs,
  selectTables,
  sqlLiteral,
  type TableSpec,
} from './pg-to-d1';

const tableByName = (name: string): TableSpec => {
  const table = TABLES.find((candidate) => candidate.name === name);

  if (!table) throw new Error(`no spec for ${name}`);

  return table;
};

describe('TABLES', () => {
  const drizzleTables = Object.values(schema)
    .filter((value) => is(value, SQLiteTable))
    .map((table) => getTableConfig(table));

  test('covers exactly the tables of the D1 schema', () => {
    expect(TABLES.map((table) => table.name).toSorted()).toEqual(
      drizzleTables.map((table) => table.name).toSorted(),
    );
    expect(TABLES).toHaveLength(22);
  });

  test.each(drizzleTables.map((table) => [table.name, table] as const))(
    '%s lists every destination column and nothing else',
    (name, config) => {
      expect(Object.keys(tableByName(name).columns).toSorted()).toEqual(
        config.columns.map((column) => column.name).toSorted(),
      );
    },
  );

  test('inserts parents before the tables that reference them', () => {
    const position = new Map(TABLES.map((table, index) => [table.name, index]));

    for (const config of drizzleTables) {
      for (const foreignKey of config.foreignKeys) {
        const parent = getTableConfig(foreignKey.reference().foreignTable).name;
        expect(position.get(parent)).toBeLessThan(position.get(config.name) ?? -1);
      }
    }
  });

  test('primary keys are columns of their table', () => {
    for (const table of TABLES) {
      for (const key of table.primaryKey) expect(table.columns).toHaveProperty(key);
    }
  });
});

describe('value conversion', () => {
  test('timestamps are read as UTC and truncated to milliseconds', () => {
    expect(pgTimestampToMs('2026-01-02 03:04:05.678901')).toBe(Date.UTC(2026, 0, 2, 3, 4, 5, 678));
    expect(pgTimestampToMs('2026-01-02 03:04:05.5')).toBe(Date.UTC(2026, 0, 2, 3, 4, 5, 500));
    expect(pgTimestampToMs('2026-01-02 03:04:05')).toBe(Date.UTC(2026, 0, 2, 3, 4, 5));
  });

  test('rejects timestamps it cannot place on the timeline', () => {
    expect(() => pgTimestampToMs('infinity')).toThrow(/unsupported timestamp/);
  });

  test('rewrites the NOW()::text rendering used by seeded workflows to ISO', () => {
    expect(pgTextTimestampToIso('2026-10-10 20:30:37.705872+00')).toBe('2026-10-10T20:30:37.705Z');
    expect(pgTextTimestampToIso('2026-10-10 20:30:37')).toBe('2026-10-10T20:30:37.000Z');
    expect(pgTextTimestampToIso('2026-10-10T20:30:37.705Z')).toBe('2026-10-10T20:30:37.705Z');
  });

  test('decodes a spelling list into SQLite values', () => {
    const row = decodeRow(tableByName('typing_spelling_lists'), {
      id: 41,
      learnerId: 4,
      weekOf: '2026-09-28',
      words: ['apple', "it's"],
      source: 'paste',
      sourceImageUrl: null,
      createdBy: 'u1',
      createdAt: '2026-01-02 03:04:05',
      updatedAt: '2026-01-02 03:04:05',
    });

    expect(row).toEqual([
      41,
      4,
      '2026-09-28',
      '["apple","it\'s"]',
      'paste',
      null,
      'u1',
      Date.UTC(2026, 0, 2, 3, 4, 5),
      Date.UTC(2026, 0, 2, 3, 4, 5),
    ]);
  });

  test('booleans become 0/1 and JSON text is compacted', () => {
    const progress = decodeRow(tableByName('typing_spelling_progress'), {
      id: 1,
      spellingListId: 2,
      word: 'a',
      consecutiveCorrect: 3,
      mastered: true,
      masteredAt: null,
    });

    expect(progress[4]).toBe(1);

    const attempt = decodeRow(tableByName('typing_attempts'), {
      id: 1,
      learnerId: 1,
      lessonId: null,
      gameSlug: null,
      wpm: 1.5,
      netWpm: 1,
      accuracy: 0.9,
      durationMs: 1,
      errorsByKey: '{"a": 2,  "b": 1}',
      completedAt: '2026-01-01 00:00:00',
    });

    expect(attempt[8]).toBe('{"a":2,"b":1}');
  });

  test('keeps a JSON null distinct from SQL NULL', () => {
    const base = { id: 'm', chatId: 'c', role: 'user', createdAt: '2026-01-01 00:00:00' };
    const table = tableByName('messages');

    expect(decodeRow(table, { ...base, parts: 'null' })[3]).toBe('null');
    expect(decodeRow(table, { ...base, parts: null })[3]).toBeNull();
  });

  test('names the table, column and key when a value cannot be converted', () => {
    expect(() =>
      decodeRow(tableByName('messages'), {
        id: 'm9',
        chatId: 'c',
        role: 'user',
        parts: 'not json',
        createdAt: '2026-01-01 00:00:00',
      }),
    ).toThrow(/messages\.parts \(id=m9\)/);
  });
});

describe('sqlLiteral', () => {
  test('escapes quotes and leaves other characters alone', () => {
    expect(sqlLiteral("O'Neil; -- /* \\ \n 🚀")).toBe("'O''Neil; -- /* \\ \n 🚀'");
    expect(sqlLiteral(null)).toBe('NULL');
    expect(sqlLiteral(0.95)).toBe('0.95');
  });
});

describe('buildInsertStatements', () => {
  const users = tableByName('users');
  const user = (id: string, name = 'n') => [id, `${id}@x.dev`, name, 'a', id, 'github', id, 1];

  test('batches rows and stays under the statement limit', () => {
    const rows = Array.from({ length: 600 }, (_, index) => user(`u${index}`));
    const statements = buildInsertStatements(users, rows);

    expect(statements).toHaveLength(3);

    for (const statement of statements) {
      expect(Buffer.byteLength(statement)).toBeLessThan(100_000);
      expect(statement.startsWith('INSERT INTO "users" ("id"')).toBe(true);
    }
  });

  test('splits batches by size before by row count', () => {
    const rows = Array.from({ length: 40 }, (_, index) => user(`u${index}`, 'x'.repeat(5_000)));

    expect(buildInsertStatements(users, rows).length).toBeGreaterThan(2);
  });

  test('a row over the statement limit is inserted empty and rebuilt with UPDATEs', () => {
    const big = "é'".repeat(150_000);
    const statements = buildInsertStatements(users, [user('u1', big)]);

    expect(statements.length).toBeGreaterThan(3);

    for (const statement of statements) {
      expect(Buffer.byteLength(statement)).toBeLessThan(100_000);
    }

    expect(statements[0]).toContain("'u1@x.dev', '', 'a'");
    expect(statements[1]).toMatch(
      /^UPDATE "users" SET "name" = "name" \|\| '.*' WHERE "id" = 'u1';$/s,
    );

    const rebuilt = statements
      .slice(1)
      .map((statement) => /\|\| '(.*)' WHERE/s.exec(statement)?.[1] ?? '')
      .join('')
      .replaceAll("''", "'");

    expect(rebuilt).toBe(big);
  });

  test('import file defers foreign keys and has no transaction statements', () => {
    const sql = buildImportSql([{ table: users, rows: [user('u1')] }]);

    expect(sql.startsWith('PRAGMA defer_foreign_keys = true;\n')).toBe(true);
    expect(sql).not.toMatch(/BEGIN|COMMIT/);
  });
});

describe('selectTables', () => {
  test('skips the RAG tables by default', () => {
    const names = selectTables([], true).map((table) => table.name);

    expect(names).not.toContain('documents');
    expect(names).not.toContain('document_chunks');
    expect(names).toHaveLength(20);
  });

  test('--no-skip-rag brings them back, in order', () => {
    const names = selectTables([], false).map((table) => table.name);

    expect(names.indexOf('documents')).toBeLessThan(names.indexOf('document_chunks'));
    expect(names).toHaveLength(22);
  });

  test('rejects unknown tables and RAG tables requested while skipping', () => {
    expect(() => selectTables(['nope'], true)).toThrow(/Unknown table/);
    expect(() => selectTables(['documents'], true)).toThrow(/--no-skip-rag/);
  });
});

describe('verify comparison', () => {
  test('digest ignores order but not content', () => {
    expect(keyDigest(['b', 'a'])).toBe(keyDigest(['a', 'b']));
    expect(keyDigest(['a', 'b'])).not.toBe(keyDigest(['a', 'c']));
  });

  test('reports missing and extra keys', () => {
    const [same, drift] = compareSummaries(
      [
        { table: 'users', keys: ['1', '2'] },
        { table: 'chats', keys: ['1', '2'] },
      ],
      [
        { table: 'users', keys: ['2', '1'] },
        { table: 'chats', keys: ['1', '3'] },
      ],
    );

    expect(same?.ok).toBe(true);
    expect(drift?.ok).toBe(false);
    expect(drift?.detail).toContain('missing in D1: 2');
    expect(drift?.detail).toContain('extra in D1: 3');
  });
});
