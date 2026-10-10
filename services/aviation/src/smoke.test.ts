/**
 * Runs against a live container: `AVIATION_SMOKE_URL=http://localhost:8080 npm test`, with the
 * ETL fixtures loaded into the bucket the container reads (see docs/mcp-aviation-ops.md).
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

const base = process.env.AVIATION_SMOKE_URL;

async function post(path: string, body: { sql: string; timeoutMs?: number }) {
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  return { status: res.status, body: await res.json() };
}

const AIRCRAFT = "read_parquet('aviation://dims/aircraft.parquet')";

describe('aviation container', { skip: !base }, () => {
  it('reports healthy', async () => {
    const res = await fetch(`${base}/health`);

    assert.equal(res.status, 200);
  });

  it('answers a SELECT over R2 Parquet with columns and rows', async () => {
    const { status, body } = await post('/query', {
      sql: `SELECT COUNT(*) AS n, MIN(n_number) AS first FROM ${AIRCRAFT}`,
    });

    assert.equal(status, 200);
    assert.deepEqual(body.columns, ['n', 'first']);
    assert.equal(body.rows[0].first, 'N101AA');
  });

  it('serializes BIGINT as a string', async () => {
    const { body } = await post('/query', { sql: 'SELECT 9007199254740993::BIGINT AS big' });

    assert.equal(body.rows[0].big, '9007199254740993');
  });

  it('refuses anything that is not a single SELECT', async () => {
    for (const sql of ['CREATE TABLE x AS SELECT 1', 'SELECT 1; SELECT 2', 'SET threads = 1']) {
      const { status } = await post('/query', { sql });

      assert.equal(status, 403, sql);
    }
  });

  it('refuses URLs outside the aviation prefix', async () => {
    for (const url of [
      'https://evil.example/x.parquet',
      'aviation://../x.parquet',
      's3://other-bucket/aviation/x.parquet',
    ]) {
      const { status } = await post('/query', { sql: `SELECT * FROM read_parquet('${url}')` });

      assert.equal(status, 403, url);
    }
  });

  it('blocks local files and computed paths outside the prefix', async () => {
    for (const sql of [
      "SELECT * FROM read_csv('/etc/passwd')",
      'SELECT * FROM duckdb_secrets()',
      "SELECT * FROM read_text(concat('s3', '://aviation-test-other/x.txt'))",
      "SELECT * FROM read_parquet(concat('/etc/pas', 'swd'))",
      "SELECT * FROM read_parquet(concat('s3://', current_setting('s3_endpoint')))",
    ]) {
      const { status } = await post('/query', { sql });

      assert.notEqual(status, 200, sql);
    }
  });

  it('interrupts a query that outlives its timeout', async () => {
    const { status } = await post('/query', {
      sql: 'SELECT COUNT(*) FROM range(10000000000)',
      timeoutMs: 300,
    });

    assert.equal(status, 504);
  });

  it('parses table names back to the virtual prefix', async () => {
    const { status, body } = await post('/parse', {
      sql: "SELECT * FROM 'aviation://dims/aircraft.parquet'",
    });

    assert.equal(status, 200);
    assert.equal(body.statementCount, 1);
    assert.deepEqual(body.tableNames, ['aviation://dims/aircraft.parquet']);
  });
});
