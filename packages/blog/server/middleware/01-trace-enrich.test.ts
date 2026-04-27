/**
 * Unit tests for `deriveRequestId`. The middleware itself is a thin h3
 * adapter — we drive the pure resolver directly (mirrors mcp-rate-limit.test).
 */

import { describe, expect, it } from 'vitest';
import { deriveRequestId } from './01-trace-enrich';

describe('deriveRequestId', () => {
  it('extracts the trace ID portion from x-cloud-trace-context', () => {
    const id = deriveRequestId({
      cloudTrace: '105445aa7843bc8bf206b12000100000/1;o=1',
    });
    expect(id).toBe('105445aa7843bc8bf206b12000100000');
  });

  it('falls back to inbound x-request-id when cloud-trace is absent', () => {
    const id = deriveRequestId({ requestId: 'caller-supplied-id' });
    expect(id).toBe('caller-supplied-id');
  });

  it('prefers cloud-trace over inbound x-request-id', () => {
    const id = deriveRequestId({
      cloudTrace: 'aaaa1111bbbb2222/9;o=1',
      requestId: 'should-be-ignored',
    });
    expect(id).toBe('aaaa1111bbbb2222');
  });

  it('generates a uuid when no headers are provided', () => {
    const id = deriveRequestId({});
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('skips empty cloud-trace string', () => {
    const id = deriveRequestId({ cloudTrace: '', requestId: 'fallback' });
    expect(id).toBe('fallback');
  });

  it('handles cloud-trace with no slash by using the whole header value', () => {
    // The header should always have a /SPAN portion, but be defensive.
    const id = deriveRequestId({ cloudTrace: 'noslashtraceid' });
    expect(id).toBe('noslashtraceid');
  });
});
