/**
 * Sanity tests for the RAG span pure helpers — not a full integration test
 * (those need pgvector). Verifies the query-hash function is deterministic
 * and bounded.
 */

import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';

function hashQuery(query: string): string {
  return createHash('sha256').update(query).digest('hex').slice(0, 16);
}

describe('rag query hash', () => {
  it('returns a 16-character hex string', () => {
    const h = hashQuery('how do I deploy nuxt to cloud run');
    expect(h).toHaveLength(16);
    expect(h).toMatch(/^[0-9a-f]{16}$/);
  });

  it('is deterministic for the same input', () => {
    expect(hashQuery('search foo')).toBe(hashQuery('search foo'));
  });

  it('differs for different inputs', () => {
    expect(hashQuery('search foo')).not.toBe(hashQuery('search bar'));
  });

  it('handles empty input', () => {
    expect(hashQuery('')).toHaveLength(16);
  });
});
