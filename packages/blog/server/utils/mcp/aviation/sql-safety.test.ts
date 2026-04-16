import { describe, it, expect, beforeAll } from 'vitest';
import { validateSql, type SqlValidationResult } from './sql-safety';
import { getAviationDuckDb, AVIATION_BUCKET_URL_PREFIX } from './duckdb';

describe('sql-safety validateSql', () => {
  // DuckDB's own parser is used via a singleton read-only instance for AST parsing.
  beforeAll(async () => {
    // Warm the instance so the first test doesn't pay httpfs load cost.
    await getAviationDuckDb();
  });

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
