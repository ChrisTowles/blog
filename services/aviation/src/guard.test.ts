import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  findDisallowedUrl,
  findIntrospectionCall,
  resolveVirtualUrls,
  toVirtualUrls,
} from './guard.ts';

describe('url guard', () => {
  it('resolves the virtual prefix to the bucket', () => {
    assert.equal(
      resolveVirtualUrls("SELECT * FROM read_parquet('aviation://dims/a.parquet')", 'b'),
      "SELECT * FROM read_parquet('s3://b/aviation/dims/a.parquet')",
    );
  });

  it('round-trips through toVirtualUrls', () => {
    const sql = "read_parquet('aviation://dims/a.parquet')";

    assert.equal(toVirtualUrls(resolveVirtualUrls(sql, 'b'), 'b'), sql);
  });

  it('allows URLs under the aviation prefix and SQL with no URL', () => {
    assert.equal(findDisallowedUrl("SELECT * FROM 's3://b/aviation/facts/x.parquet'", 'b'), null);
    assert.equal(findDisallowedUrl('SELECT 1', 'b'), null);
  });

  it('flags other schemes, other buckets and path traversal', () => {
    assert.equal(findDisallowedUrl("'https://x.test/a'", 'b'), 'https://x.test/a');
    assert.equal(findDisallowedUrl("'s3://c/aviation/a'", 'b'), 's3://c/aviation/a');
    assert.equal(findDisallowedUrl("'s3://b/aviation/../a'", 'b'), 's3://b/aviation/../a');
    assert.equal(findDisallowedUrl("'s3://b/other/a'", 'b'), 's3://b/other/a');
  });

  it('flags engine introspection calls', () => {
    assert.equal(findIntrospectionCall('SELECT * FROM duckdb_secrets()'), 'duckdb_secrets');
    assert.equal(findIntrospectionCall("SELECT current_setting('x')"), 'current_setting');
    assert.equal(findIntrospectionCall('SELECT count(*) FROM t'), null);
  });
});
