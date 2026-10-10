import { describe, it, expect } from 'vitest';
import { validateSql as validateWith, type SqlValidationResult } from './sql-safety';
import {
  AVIATION_BUCKET_URL_PREFIX,
  AviationQueryError,
  type AviationClient,
  type AviationParse,
} from './duckdb';

// Statement count and syntax errors come from DuckDB's parser inside the container; this
// stand-in covers only the cases below, and services/aviation/src/smoke.test.ts covers the real one.
const fakeParser: AviationClient = {
  async parse(sql): Promise<AviationParse> {
    if (/SELECT\s+FROM/i.test(sql)) throw new AviationQueryError('Parser Error', 422);

    return {
      statementCount: sql.split(';').filter((part) => part.trim()).length,
      tableNames: [...sql.matchAll(/FROM\s+'([^']+)'/gi)].map((match) => match[1]!),
    };
  },
  async query() {
    throw new Error('not used by validation');
  },
  async health() {},
};

function validateSql(sql: string): Promise<SqlValidationResult> {
  return validateWith(sql, fakeParser);
}

describe('sql-safety validateSql', () => {
  describe('happy path', () => {
    it('accepts a plain SELECT', async () => {
      const result = await validateSql(`SELECT 1`);
      expectOk(result);
    });

    it('accepts a SELECT against an allowlisted Parquet URL', async () => {
      const result = await validateSql(
        `SELECT * FROM read_parquet('${AVIATION_BUCKET_URL_PREFIX}dims/aircraft.parquet') LIMIT 10`,
      );

      expectOk(result);
    });

    it('accepts a WITH clause (CTE) against allowlisted data', async () => {
      const result = await validateSql(`WITH a AS (SELECT 1 AS x) SELECT * FROM a`);
      expectOk(result);
    });

    it('injects a LIMIT when none is present', async () => {
      const result = await validateSql(`SELECT * FROM (VALUES (1), (2)) AS t(x)`);
      expectOk(result);
      expect(result.sql.toUpperCase()).toContain('LIMIT 10000');
    });

    it('does not inject a LIMIT when one is already present', async () => {
      const result = await validateSql(`SELECT 1 LIMIT 5`);
      expectOk(result);
      // Only the user-supplied LIMIT should remain
      expect(result.sql.match(/LIMIT/gi)?.length).toBe(1);
    });
  });

  describe('AST allowlist — banned statements', () => {
    const banned: Array<[string, string]> = [
      ['ATTACH', `ATTACH 'x.db' AS other`],
      ['INSTALL', `INSTALL httpfs`],
      ['LOAD', `LOAD httpfs`],
      ['PRAGMA', `PRAGMA table_info('t')`],
      ['CALL', `CALL pragma_database_size()`],
      ['SET', `SET memory_limit = '1GB'`],
      ['COPY', `COPY (SELECT 1) TO '/tmp/x.csv'`],
      ['EXPORT', `EXPORT DATABASE '/tmp/d'`],
      ['IMPORT', `IMPORT DATABASE '/tmp/d'`],
      ['CREATE TABLE (DDL)', `CREATE TABLE t(x INT)`],
      ['DROP TABLE (DDL)', `DROP TABLE t`],
      ['ALTER TABLE (DDL)', `ALTER TABLE t ADD COLUMN y INT`],
      ['INSERT (DML)', `INSERT INTO t VALUES (1)`],
      ['UPDATE (DML)', `UPDATE t SET x = 1`],
      ['DELETE (DML)', `DELETE FROM t`],
      ['multiple statements', `SELECT 1; SELECT 2`],
    ];

    for (const [label, sql] of banned) {
      it(`rejects ${label}`, async () => {
        const result = await validateSql(sql);
        expectErr(result);
      });
    }
  });

  describe('SSRF / table-valued-function guard', () => {
    it('rejects read_parquet of an attacker URL', async () => {
      const result = await validateSql(
        `SELECT * FROM read_parquet('https://attacker.example.com/p.parquet')`,
      );

      expectErr(result);
      expect(result.error).toMatch(/not allowed|not allowlisted/i);
    });

    it('rejects read_csv_auto of an external file', async () => {
      const result = await validateSql(
        `SELECT * FROM read_csv_auto('https://attacker.example.com/p.csv')`,
      );

      expectErr(result);
    });

    it('accepts read_parquet against the aviation bucket prefix', async () => {
      const result = await validateSql(
        `SELECT COUNT(*) FROM read_parquet('${AVIATION_BUCKET_URL_PREFIX}facts/bts_t100_202501.parquet')`,
      );

      expectOk(result);
    });
  });

  describe('container failures', () => {
    it('rethrows when the container itself is unavailable', async () => {
      const down: AviationClient = {
        ...fakeParser,
        async parse() {
          throw new AviationQueryError('container unavailable', 503);
        },
      };

      await expect(validateWith('SELECT 1', down)).rejects.toThrow('container unavailable');
    });

    it('rejects duckdb_secrets()', async () => {
      expectErr(await validateSql(`SELECT * FROM duckdb_secrets()`));
    });
  });

  describe('input sanity', () => {
    it('rejects empty SQL', async () => {
      const result = await validateSql('');
      expectErr(result);
    });

    it('rejects SQL that fails to parse', async () => {
      const result = await validateSql(`SELECT FROM WHERE`);
      expectErr(result);
    });
  });
});

function expectOk(r: SqlValidationResult): asserts r is Extract<SqlValidationResult, { ok: true }> {
  if (!r.ok) {
    throw new Error(`Expected ok, got error: ${r.error}`);
  }

  expect(r.ok).toBe(true);
}

function expectErr(
  r: SqlValidationResult,
): asserts r is Extract<SqlValidationResult, { ok: false }> {
  if (r.ok) {
    throw new Error(`Expected error, got ok with sql: ${r.sql}`);
  }

  expect(r.ok).toBe(false);
  expect(r.error).toBeTruthy();
}
