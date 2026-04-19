import { describe, it, expect, beforeEach } from 'vitest';
import {
  getAviationDuckDb,
  openAviationConnection,
  runWithTimeout,
  __resetAviationDuckDbForTests,
} from './duckdb';

describe('aviation duckdb', () => {
  beforeEach(() => {
    __resetAviationDuckDbForTests();
  });

  it('returns a singleton instance across calls', async () => {
    const a = await getAviationDuckDb();
    const b = await getAviationDuckDb();
    expect(a).toBe(b);
  });

  it('opens connections with httpfs loaded (SELECT 1 succeeds)', async () => {
    const conn = await openAviationConnection();
    try {
      const reader = await conn.runAndReadAll(`SELECT 1 AS x`);
      const rows = reader.getRows();
      expect(rows.length).toBe(1);
    } finally {
      conn.closeSync();
    }
  });

  it('rejects local file reads (disabled_filesystems lockdown)', async () => {
    const conn = await openAviationConnection();
    try {
      await expect(conn.run(`SELECT * FROM read_csv_auto('/etc/hosts')`)).rejects.toThrow();
    } finally {
      conn.closeSync();
    }
  });

  it('runWithTimeout rejects after the deadline and interrupts the query', async () => {
    const conn = await openAviationConnection();
    try {
      // A pure-CPU-looping query; range() generates 10B rows.
      const start = Date.now();
      await expect(
        runWithTimeout(
          conn,
          (c) => c.runAndReadAll(`SELECT COUNT(*) FROM range(10000000000) r`),
          250,
        ),
      ).rejects.toThrow(/timeout/);
      const elapsed = Date.now() - start;
      // Should finish within a few hundred ms of the timeout, not run to completion.
      expect(elapsed).toBeLessThan(4_000);
    } finally {
      conn.closeSync();
    }
  });
});
