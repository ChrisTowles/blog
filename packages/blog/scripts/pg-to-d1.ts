/**
 * One-shot copy of the legacy Cloud SQL (Postgres) data into Cloudflare D1: reads one read-only
 * snapshot, converts values to the SQLite shapes the D1 Drizzle schema expects, and writes batched
 * INSERTs for `wrangler d1 execute --file`. `--verify` compares row counts and key checksums.
 */
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import { defineCommand, runMain } from 'citty';
import { consola } from 'consola';
import type { Client } from 'pg';
import { z } from 'zod';

const execFileAsync = promisify(execFile);

const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** D1 rejects statements over 100,000 bytes; stay well under it. */
const MAX_STATEMENT_BYTES = 80_000;

/** D1's docs suggest ~250 rows per multi-row INSERT. */
const MAX_ROWS_PER_INSERT = 250;

/** A string column literal above this size is moved out of the INSERT when a row is too big. */
const LARGE_LITERAL_BYTES = 8_000;

const CHUNK_LITERAL_BYTES = 40_000;

export type ColumnKind =
  | 'text'
  | 'int'
  | 'real'
  | 'bool'
  | 'timestamp'
  | 'date'
  | 'json'
  | 'textArray'
  | 'pgTextTimestamp';

export interface TableSpec {
  name: string;
  primaryKey: readonly string[];
  columns: Record<string, ColumnKind>;
  /** RAG tables are re-ingested on Cloudflare, so they are skipped unless asked for. */
  rag?: boolean;
}

/**
 * Destination column set per table, in FK-safe insert order. Columns that exist only in the old
 * schema (`document_chunks.embedding`, `document_chunks.searchVector`) are deliberately absent;
 * the unit test pins this list to the Drizzle SQLite schema.
 */
export const TABLES: readonly TableSpec[] = [
  {
    name: 'users',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      email: 'text',
      name: 'text',
      avatar: 'text',
      username: 'text',
      provider: 'text',
      providerId: 'text',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'chats',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      title: 'text',
      userId: 'text',
      containerId: 'text',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'messages',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      chatId: 'text',
      role: 'text',
      parts: 'json',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'documents',
    primaryKey: ['id'],
    rag: true,
    columns: {
      id: 'text',
      slug: 'text',
      title: 'text',
      path: 'text',
      url: 'text',
      contentHash: 'text',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    },
  },
  {
    name: 'document_chunks',
    primaryKey: ['id'],
    rag: true,
    columns: {
      id: 'text',
      documentId: 'text',
      chunkIndex: 'int',
      content: 'text',
      contextualContent: 'text',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'loan_applications',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      userId: 'text',
      status: 'text',
      applicationData: 'json',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'loan_reviews',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      applicationId: 'text',
      reviewer: 'text',
      decision: 'text',
      analysis: 'text',
      flags: 'json',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'loan_messages',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      applicationId: 'text',
      role: 'text',
      parts: 'json',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'typing_groups',
    primaryKey: ['id'],
    columns: {
      id: 'int',
      slug: 'text',
      name: 'text',
      kind: 'text',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    },
  },
  {
    name: 'typing_group_members',
    primaryKey: ['groupId', 'userId'],
    columns: {
      groupId: 'int',
      userId: 'text',
      role: 'text',
      invitedBy: 'text',
      joinedAt: 'timestamp',
    },
  },
  {
    name: 'typing_group_invites',
    primaryKey: ['id'],
    columns: {
      id: 'int',
      groupId: 'int',
      token: 'text',
      email: 'text',
      expiresAt: 'timestamp',
      acceptedBy: 'text',
      acceptedAt: 'timestamp',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'typing_learners',
    primaryKey: ['id'],
    columns: {
      id: 'int',
      groupId: 'int',
      displayName: 'text',
      avatarUrl: 'text',
      birthYear: 'int',
      currentStage: 'int',
      preferredVoice: 'text',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    },
  },
  {
    name: 'typing_lessons',
    primaryKey: ['id'],
    columns: {
      id: 'int',
      slug: 'text',
      stage: 'int',
      kind: 'text',
      title: 'text',
      text: 'text',
      targetWpm: 'int',
      targetAccuracy: 'real',
      topic: 'text',
      spellingListId: 'int',
      generatedBy: 'text',
      createdAt: 'timestamp',
    },
  },
  {
    name: 'typing_attempts',
    primaryKey: ['id'],
    columns: {
      id: 'int',
      learnerId: 'int',
      lessonId: 'int',
      gameSlug: 'text',
      wpm: 'real',
      netWpm: 'real',
      accuracy: 'real',
      durationMs: 'int',
      errorsByKey: 'json',
      completedAt: 'timestamp',
    },
  },
  {
    name: 'typing_key_stats',
    primaryKey: ['id'],
    columns: {
      id: 'int',
      learnerId: 'int',
      key: 'text',
      attempts: 'int',
      errors: 'int',
      avgMs: 'real',
      updatedAt: 'timestamp',
    },
  },
  {
    name: 'typing_spelling_lists',
    primaryKey: ['id'],
    columns: {
      id: 'int',
      learnerId: 'int',
      weekOf: 'date',
      words: 'textArray',
      source: 'text',
      sourceImageUrl: 'text',
      createdBy: 'text',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    },
  },
  {
    name: 'typing_spelling_progress',
    primaryKey: ['id'],
    columns: {
      id: 'int',
      spellingListId: 'int',
      word: 'text',
      consecutiveCorrect: 'int',
      mastered: 'bool',
      masteredAt: 'timestamp',
    },
  },
  {
    name: 'workflows',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      name: 'text',
      description: 'text',
      viewport: 'text',
      ownerId: 'text',
      isPublished: 'int',
      version: 'int',
      createdAt: 'pgTextTimestamp',
      updatedAt: 'pgTextTimestamp',
    },
  },
  {
    name: 'workflow_nodes',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      workflowId: 'text',
      nodeId: 'text',
      type: 'text',
      label: 'text',
      positionX: 'real',
      positionY: 'real',
      prompt: 'text',
      model: 'text',
      temperature: 'real',
      maxTokens: 'int',
      outputSchema: 'text',
      inputMapping: 'text',
      createdAt: 'pgTextTimestamp',
      updatedAt: 'pgTextTimestamp',
    },
  },
  {
    name: 'workflow_edges',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      workflowId: 'text',
      edgeId: 'text',
      sourceNode: 'text',
      targetNode: 'text',
      sourceHandle: 'text',
      targetHandle: 'text',
      label: 'text',
      animated: 'int',
      edgeType: 'text',
      createdAt: 'pgTextTimestamp',
    },
  },
  {
    name: 'workflow_runs',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      workflowId: 'text',
      status: 'text',
      inputData: 'text',
      outputData: 'text',
      startedAt: 'text',
      completedAt: 'text',
      error: 'text',
      createdAt: 'pgTextTimestamp',
    },
  },
  {
    name: 'node_executions',
    primaryKey: ['id'],
    columns: {
      id: 'text',
      runId: 'text',
      nodeId: 'text',
      status: 'text',
      promptSent: 'text',
      rawResponse: 'text',
      parsedOutput: 'text',
      tokensIn: 'int',
      tokensOut: 'int',
      latencyMs: 'int',
      error: 'text',
      startedAt: 'text',
      completedAt: 'text',
    },
  },
];

/** Old-schema columns the D1 schema no longer has; anything else unmapped is reported. */
const DROPPED_COLUMNS: ReadonlySet<string> = new Set([
  'document_chunks.embedding',
  'document_chunks.searchVector',
]);

export type SqlValue = string | number | null;

const sourceValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.string()),
]);

const sourceRowSchema = z.record(z.string(), sourceValueSchema);

/** Postgres types handed to us as the raw wire string so no timezone or JSON re-encoding happens. */
const RAW_TYPE_OIDS: ReadonlySet<number> = new Set([
  1082, // date
  1114, // timestamp
  1184, // timestamptz
  114, // json
  3802, // jsonb
]);

const PG_TIMESTAMP = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,6}))?$/;

/**
 * Drizzle reads `timestamp` (no tz) columns as UTC, and Cloud SQL runs in UTC, so the wall-clock
 * value Postgres stores is a UTC instant. Fractional microseconds are truncated to milliseconds.
 */
export function pgTimestampToMs(raw: string): number {
  const match = PG_TIMESTAMP.exec(raw);

  if (!match) throw new Error(`unsupported timestamp ${JSON.stringify(raw)}`);

  const [, year, month, day, hour, minute, second, fraction = ''] = match;
  const millis = Number(fraction.padEnd(3, '0').slice(0, 3));

  return Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
    millis,
  );
}

const PG_TEXT_TIMESTAMP = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})(?:\.(\d+))?(?:\+00(?::00)?)?$/;

/**
 * The seeded workflow templates stamp `NOW()::text` into text columns. The app writes ISO
 * strings there, so rewrite that Postgres rendering and leave anything else untouched.
 */
export function pgTextTimestampToIso(raw: string): string {
  const match = PG_TEXT_TIMESTAMP.exec(raw);

  if (!match) return raw;

  const [, date, time, fraction = ''] = match;

  return `${date}T${time}.${fraction.padEnd(3, '0').slice(0, 3)}Z`;
}

function canonicalJson(raw: string): string {
  return JSON.stringify(JSON.parse(raw));
}

const nullable = z.null();

const decoders: Record<ColumnKind, z.ZodType<SqlValue>> = {
  text: z.union([z.string(), nullable]),
  int: z.union([z.number().int(), nullable]),
  real: z.union([z.number().finite(), nullable]),
  bool: z.union([z.boolean().transform((value) => (value ? 1 : 0)), nullable]),
  timestamp: z.union([z.string().transform(pgTimestampToMs), nullable]),
  date: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), nullable]),
  json: z.union([z.string().transform(canonicalJson), nullable]),
  textArray: z.union([z.array(z.string()).transform((words) => JSON.stringify(words)), nullable]),
  pgTextTimestamp: z.union([z.string().transform(pgTextTimestampToIso), nullable]),
};

/** Converts one Postgres row to SQLite values, in the column order of `table`. */
export function decodeRow(table: TableSpec, source: z.infer<typeof sourceRowSchema>): SqlValue[] {
  return Object.entries(table.columns).map(([column, kind]) => {
    try {
      return decoders[kind].parse(source[column]);
    } catch (error) {
      const keys = table.primaryKey.map((key) => `${key}=${String(source[key])}`).join(' ');
      const reason = error instanceof Error ? error.message : 'unknown error';

      throw new Error(
        `${table.name}.${column} (${keys}): cannot convert ${kind} value: ${reason}`,
        {
          cause: error,
        },
      );
    }
  });
}

const textSchema = z.string();

function isText(value: SqlValue): value is string {
  return textSchema.safeParse(value).success;
}

export function sqlLiteral(value: SqlValue): string {
  if (value === null) return 'NULL';

  if (!isText(value)) return String(value);

  return `'${value.replaceAll("'", "''")}'`;
}

const quoteIdent = (name: string) => `"${name}"`;

const literalBytes = (literal: string) => Buffer.byteLength(literal, 'utf8');

function insertHeader(table: TableSpec): string {
  return `INSERT INTO ${quoteIdent(table.name)} (${Object.keys(table.columns).map(quoteIdent).join(', ')}) VALUES `;
}

function primaryKeyWhere(table: TableSpec, row: readonly SqlValue[]): string {
  const names = Object.keys(table.columns);

  return table.primaryKey
    .map((key) => `${quoteIdent(key)} = ${sqlLiteral(row[names.indexOf(key)] ?? null)}`)
    .join(' AND ');
}

/** Splits `text` into pieces whose SQL literals stay under `CHUNK_LITERAL_BYTES`. */
function chunkText(text: string): string[] {
  const chunks: string[] = [];
  let current = '';
  let currentBytes = 0;

  for (const char of text) {
    const bytes = char === "'" ? 2 : Buffer.byteLength(char, 'utf8');

    if (currentBytes + bytes > CHUNK_LITERAL_BYTES) {
      chunks.push(current);
      current = '';
      currentBytes = 0;
    }

    current += char;
    currentBytes += bytes;
  }

  if (current) chunks.push(current);

  return chunks;
}

/**
 * A row too big for one statement (D1 caps statements at 100 KB but strings at 2 MB): insert it
 * with its large strings emptied, then append them back in pieces.
 */
function oversizedRowStatements(table: TableSpec, row: readonly SqlValue[]): string[] {
  const names = Object.keys(table.columns);
  const deferred = new Map<string, string>();

  const slim = row.map((value, index) => {
    const name = names[index] ?? '';

    if (value !== null && isText(value) && literalBytes(sqlLiteral(value)) > LARGE_LITERAL_BYTES) {
      deferred.set(name, value);

      return '';
    }

    return value;
  });

  const statements = [`${insertHeader(table)}(${slim.map(sqlLiteral).join(', ')});`];
  const where = primaryKeyWhere(table, row);

  for (const [name, value] of deferred) {
    for (const chunk of chunkText(value)) {
      statements.push(
        `UPDATE ${quoteIdent(table.name)} SET ${quoteIdent(name)} = ${quoteIdent(name)} || ${sqlLiteral(chunk)} WHERE ${where};`,
      );
    }
  }

  return statements;
}

/** Batches rows into multi-row INSERT statements that stay under D1's statement-size limit. */
export function buildInsertStatements(
  table: TableSpec,
  rows: readonly (readonly SqlValue[])[],
): string[] {
  const header = insertHeader(table);
  const statements: string[] = [];
  let tuples: string[] = [];
  let bytes = 0;

  const flush = () => {
    if (tuples.length > 0) statements.push(`${header}${tuples.join(', ')};`);
    tuples = [];
    bytes = 0;
  };

  for (const row of rows) {
    const tuple = `(${row.map(sqlLiteral).join(', ')})`;
    const tupleBytes = literalBytes(tuple) + 2;

    if (literalBytes(header) + tupleBytes > MAX_STATEMENT_BYTES) {
      flush();
      statements.push(...oversizedRowStatements(table, row));
      continue;
    }

    if (bytes + tupleBytes + literalBytes(header) > MAX_STATEMENT_BYTES) flush();

    if (tuples.length >= MAX_ROWS_PER_INSERT) flush();

    tuples.push(tuple);
    bytes += tupleBytes;
  }

  flush();

  return statements;
}

/** Stable identity of a row, shared by the Postgres and D1 sides of `--verify`. */
export function rowKey(values: readonly (string | number)[]): string {
  return values.join(':');
}

export function keyDigest(keys: readonly string[]): string {
  const sorted = keys.toSorted((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  return createHash('sha256').update(sorted.join('\n')).digest('hex').slice(0, 16);
}

export interface TableSummary {
  table: string;
  keys: string[];
}

function sourceRowKey(table: TableSpec, row: readonly SqlValue[]): string {
  const names = Object.keys(table.columns);

  return rowKey(
    table.primaryKey.map((key) => {
      const value = row[names.indexOf(key)];

      if (value === null || value === undefined) throw new Error(`${table.name}.${key} is null`);

      return value;
    }),
  );
}

export function selectTables(requested: readonly string[], skipRag: boolean): TableSpec[] {
  const known = new Set(TABLES.map((table) => table.name));
  const unknown = requested.filter((name) => !known.has(name));

  if (unknown.length > 0) {
    throw new Error(`Unknown table(s): ${unknown.join(', ')}. Known: ${[...known].join(', ')}`);
  }

  const wanted = requested.length > 0 ? new Set(requested) : known;
  const chosen = TABLES.filter((table) => wanted.has(table.name));
  const ragRequested = chosen.filter((table) => table.rag && requested.includes(table.name));

  if (skipRag && ragRequested.length > 0) {
    throw new Error(
      `--tables names RAG table(s) ${ragRequested.map((table) => table.name).join(', ')}; pass --no-skip-rag to copy them`,
    );
  }

  return chosen.filter((table) => !(skipRag && table.rag));
}

async function assertSourceColumns(client: Client, tables: readonly TableSpec[]) {
  const result = await client.query<{ table_name: string; column_name: string }>(
    `SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public'`,
  );

  const present = new Map<string, Set<string>>();

  for (const row of result.rows) {
    present.set(row.table_name, (present.get(row.table_name) ?? new Set()).add(row.column_name));
  }

  for (const table of tables) {
    const columns = present.get(table.name);

    if (!columns) throw new Error(`Source has no table "${table.name}"`);

    const missing = Object.keys(table.columns).filter((name) => !columns.has(name));

    if (missing.length > 0) {
      throw new Error(`Source table "${table.name}" lacks column(s): ${missing.join(', ')}`);
    }

    const extra = [...columns].filter(
      (name) => !(name in table.columns) && !DROPPED_COLUMNS.has(`${table.name}.${name}`),
    );

    if (extra.length > 0) {
      consola.warn(`Source table "${table.name}" has column(s) not copied: ${extra.join(', ')}`);
    }
  }
}

export interface ExportedTable {
  table: TableSpec;
  rows: SqlValue[][];
}

/** Reads and converts the selected tables inside one read-only snapshot. */
export async function readSource(
  sourceUrl: string,
  tables: readonly TableSpec[],
): Promise<ExportedTable[]> {
  // Imported lazily: pg's CommonJS entry cannot load under the Nuxt vitest project.
  const { default: pg } = await import('pg');

  const rawTypes = {
    getTypeParser(oid: number, format?: 'text' | 'binary') {
      if (RAW_TYPE_OIDS.has(oid)) return (value: string) => value;

      return pg.types.getTypeParser(oid, format ?? 'text');
    },
  };

  const client = new pg.Client({ connectionString: sourceUrl, types: rawTypes });
  await client.connect();

  try {
    await client.query('BEGIN READ ONLY ISOLATION LEVEL REPEATABLE READ');
    await assertSourceColumns(client, tables);

    const exported: ExportedTable[] = [];

    for (const table of tables) {
      const select = `SELECT ${Object.keys(table.columns).map(quoteIdent).join(', ')} FROM ${quoteIdent(table.name)} ORDER BY ${table.primaryKey.map(quoteIdent).join(', ')}`;
      const result = await client.query(select);
      const rows = result.rows.map((row) => decodeRow(table, sourceRowSchema.parse(row)));
      exported.push({ table, rows });
    }

    await client.query('COMMIT');

    return exported;
  } finally {
    await client.end();
  }
}

export function summarize(exported: readonly ExportedTable[]): TableSummary[] {
  return exported.map(({ table, rows }) => ({
    table: table.name,
    keys: rows.map((row) => sourceRowKey(table, row)),
  }));
}

/** Deferred FK checks, then every table's INSERTs in dependency order. */
export function buildImportStatements(exported: readonly ExportedTable[]): string[] {
  const statements = ['PRAGMA defer_foreign_keys = true;'];

  for (const { table, rows } of exported) {
    statements.push(...buildInsertStatements(table, rows));
  }

  return statements;
}

export function buildImportSql(exported: readonly ExportedTable[]): string {
  return `${buildImportStatements(exported).join('\n')}\n`;
}

export interface D1Target {
  database: string;
  remote: boolean;
  env?: string;
  persistTo?: string;
}

const d1ResultSchema = z.array(
  z.object({
    results: z.array(z.record(z.string(), z.union([z.string(), z.number()]))),
  }),
);

async function queryD1(target: D1Target, sql: string) {
  const args = ['exec', 'wrangler', 'd1', 'execute', target.database];
  args.push(target.remote ? '--remote' : '--local');

  if (target.env) args.push('--env', target.env);

  if (target.persistTo) args.push('--persist-to', target.persistTo);
  args.push('--json', '--command', sql);

  const { stdout } = await execFileAsync('pnpm', args, {
    cwd: PACKAGE_ROOT,
    maxBuffer: 512 * 1024 * 1024,
  });

  return d1ResultSchema.parse(JSON.parse(stdout.slice(stdout.indexOf('['))));
}

/** Reads every selected table's primary keys out of D1 with one read-only wrangler call. */
export async function readD1Keys(
  target: D1Target,
  tables: readonly TableSpec[],
): Promise<TableSummary[]> {
  const sql = tables
    .map(
      (table) =>
        `SELECT ${table.primaryKey.map(quoteIdent).join(', ')} FROM ${quoteIdent(table.name)};`,
    )
    .join(' ');

  const response = await queryD1(target, sql);

  if (response.length !== tables.length) {
    throw new Error(`D1 returned ${response.length} result sets for ${tables.length} tables`);
  }

  return tables.map((table, index) => ({
    table: table.name,
    keys: (response[index]?.results ?? []).map((row) =>
      rowKey(
        table.primaryKey.map((key) => {
          const value = row[key];

          if (value === undefined) throw new Error(`D1 row for ${table.name} lacks ${key}`);

          return value;
        }),
      ),
    ),
  }));
}

export interface Comparison {
  table: string;
  ok: boolean;
  sourceCount: number;
  d1Count: number;
  detail: string;
}

export function compareSummaries(
  source: readonly TableSummary[],
  d1: readonly TableSummary[],
): Comparison[] {
  const d1ByTable = new Map(d1.map((summary) => [summary.table, summary.keys]));

  return source.map(({ table, keys }) => {
    const d1Keys = d1ByTable.get(table) ?? [];
    const sourceDigest = keyDigest(keys);
    const d1Digest = keyDigest(d1Keys);
    const ok = keys.length === d1Keys.length && sourceDigest === d1Digest;
    const d1Set = new Set(d1Keys);
    const sourceSet = new Set(keys);
    const missing = keys.filter((key) => !d1Set.has(key)).slice(0, 5);
    const extra = d1Keys.filter((key) => !sourceSet.has(key)).slice(0, 5);
    let detail = ok ? sourceDigest : `digest ${sourceDigest} vs ${d1Digest}`;

    if (missing.length > 0) detail += `; missing in D1: ${missing.join(', ')}`;

    if (extra.length > 0) detail += `; extra in D1: ${extra.join(', ')}`;

    return { table, ok, sourceCount: keys.length, d1Count: d1Keys.length, detail };
  });
}

function describeSource(sourceUrl: string): string {
  const url = new URL(sourceUrl);

  return `${url.host}${url.pathname}`;
}

function parseTableList(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
}

function printSummary(summaries: readonly TableSummary[], skipped: readonly TableSpec[]) {
  const width = Math.max(...TABLES.map((table) => table.name.length));
  const byTable = new Map(summaries.map((summary) => [summary.table, summary.keys]));

  const lines = TABLES.map((table) => {
    const keys = byTable.get(table.name);

    const body = keys
      ? `${String(keys.length).padStart(7)}  ${keyDigest(keys)}`
      : `${'skipped'.padStart(7)}`;

    return `${table.name.padEnd(width)}  ${body}`;
  });

  consola.log(`${'table'.padEnd(width)}     rows  sha256(sorted keys)\n${lines.join('\n')}`);

  if (skipped.length > 0) {
    consola.info(`Skipped: ${skipped.map((table) => table.name).join(', ')}`);
  }
}

const command = defineCommand({
  meta: {
    name: 'pg-to-d1',
    description: [
      'Copy the legacy Postgres data into Cloudflare D1.',
      '',
      'Export:  pnpm tsx scripts/pg-to-d1.ts --source "$SOURCE_DATABASE_URL" --out data.sql',
      '         pnpm exec wrangler d1 execute towles-blog --remote --file data.sql',
      'Verify:  pnpm tsx scripts/pg-to-d1.ts --verify --d1-remote towles-blog',
      'Preview: add --dry-run to read, convert and count without writing a file.',
      '',
      'The D1 database must have the baseline migration applied and be empty. If the import',
      'fails it rolls back, so wiping is only needed after a successful one.',
    ].join('\n'),
  },
  args: {
    source: {
      type: 'string',
      description: 'Postgres connection URL (default: $SOURCE_DATABASE_URL)',
      default: process.env.SOURCE_DATABASE_URL,
    },
    out: { type: 'string', description: 'Path of the .sql file to write' },
    tables: { type: 'string', description: 'Comma-separated subset of tables (default: all)' },
    'dry-run': {
      type: 'boolean',
      description: 'Read and convert everything, print counts and checksums, write nothing',
      default: false,
    },
    'skip-rag': {
      type: 'boolean',
      description:
        'Skip documents and document_chunks (default). Their vectors and FTS index live in Vectorize/D1 FTS5 and are rebuilt by re-ingesting; use --no-skip-rag to copy the text rows anyway',
      default: true,
    },
    verify: {
      type: 'boolean',
      description: 'Compare Postgres row counts and key checksums with a D1 database',
      default: false,
    },
    'd1-local': { type: 'string', description: 'With --verify: local D1 database name or binding' },
    'd1-remote': { type: 'string', description: 'With --verify: remote D1 database name' },
    env: { type: 'string', description: 'With --verify: wrangler environment (e.g. dev)' },
    'persist-to': {
      type: 'string',
      description: 'With --verify --d1-local: wrangler --persist-to directory',
    },
  },
  async run({ args }) {
    if (!args.source) {
      throw new Error('Set --source or SOURCE_DATABASE_URL to the Postgres connection URL');
    }

    const tables = selectTables(parseTableList(args.tables), args['skip-rag']);
    const skipped = TABLES.filter((table) => !tables.includes(table));

    let target: D1Target | undefined;

    if (args.verify) {
      const database = args['d1-remote'] ?? args['d1-local'];

      if (!database || (args['d1-remote'] && args['d1-local'])) {
        throw new Error('--verify needs exactly one of --d1-local <db> or --d1-remote <db>');
      }

      target = {
        database,
        remote: Boolean(args['d1-remote']),
        env: args.env,
        persistTo: args['persist-to'],
      };
    } else if (!args['dry-run'] && !args.out) {
      throw new Error('Pass --out <file.sql>, or --dry-run to only count');
    }

    consola.start(`Reading ${tables.length} table(s) from ${describeSource(args.source)}`);
    const exported = await readSource(args.source, tables);
    const summaries = summarize(exported);
    printSummary(summaries, skipped);

    if (target) {
      consola.start(
        `Reading keys from D1 ${target.remote ? 'remote' : 'local'} ${target.database}`,
      );
      const comparisons = compareSummaries(summaries, await readD1Keys(target, tables));

      for (const result of comparisons) {
        const line = `${result.table}: postgres ${result.sourceCount}, d1 ${result.d1Count} (${result.detail})`;

        if (result.ok) consola.success(line);
        else consola.error(line);
      }

      if (comparisons.some((result) => !result.ok)) throw new Error('D1 does not match Postgres');
      consola.success('D1 matches Postgres');

      return;
    }

    if (args['dry-run']) {
      consola.success('Dry run complete; nothing written');

      return;
    }

    const sql = buildImportSql(exported);
    await writeFile(args.out ?? '', sql);
    consola.success(`Wrote ${args.out} (${(Buffer.byteLength(sql) / 1024).toFixed(1)} KiB)`);
  },
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runMain(command);
}
