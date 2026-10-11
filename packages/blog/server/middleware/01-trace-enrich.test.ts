import { describe, expect, it } from 'vitest';
import { deriveRequestId } from './01-trace-enrich';

describe('deriveRequestId', () => {
  it('prefers the inbound x-request-id', () => {
    expect(deriveRequestId({ requestId: 'caller-id', cfRay: 'ray' })).toBe('caller-id');
  });

  it('falls back to cf-ray', () => {
    expect(deriveRequestId({ cfRay: '8a1b2c3d4e5f-SJC' })).toBe('8a1b2c3d4e5f-SJC');
  });

  it('generates a uuid when no headers are provided', () => {
    expect(deriveRequestId({})).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  });

  it('skips empty header values', () => {
    expect(deriveRequestId({ requestId: '', cfRay: 'ray' })).toBe('ray');
  });
});
