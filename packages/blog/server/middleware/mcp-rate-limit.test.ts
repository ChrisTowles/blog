/**
 * Drives `consumeToken()` directly rather than the h3 handler — the middleware is a thin
 * adapter around it, so the token bucket is where the behavior actually lives.
 */

import { describe, expect, it, beforeEach } from 'vitest';
import { consumeToken, __resetRateLimitForTests } from './mcp-rate-limit';

const WINDOW_MS = 5 * 60 * 1000;

describe('mcp rate limit token bucket', () => {
  beforeEach(() => {
    __resetRateLimitForTests();
  });

  it('allows up to the configured burst then rejects with remaining seconds', () => {
    const now = 1_700_000_000_000;
    for (let i = 0; i < 60; i++) {
      const r = consumeToken({ ip: '1.2.3.4', limit: 60, windowMs: WINDOW_MS, now });
      expect(r.allowed).toBe(true);
    }
    const blocked = consumeToken({
      ip: '1.2.3.4',
      limit: 60,
      windowMs: WINDOW_MS,
      now,
    });
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(blocked.retryAfterSeconds).toBeLessThanOrEqual(WINDOW_MS / 1000);
  });

  it('does not leak buckets across IPs — same burst from a second IP still passes', () => {
    const now = 1_700_000_000_000;
    // Exhaust IP-A.
    for (let i = 0; i < 60; i++) {
      consumeToken({ ip: 'a', limit: 60, windowMs: WINDOW_MS, now });
    }
    // IP-B still has a full bucket.
    const other = consumeToken({ ip: 'b', limit: 60, windowMs: WINDOW_MS, now });
    expect(other.allowed).toBe(true);
    expect(other.remaining).toBe(59);
  });

  it('refills after the window elapses', () => {
    const t0 = 1_700_000_000_000;
    for (let i = 0; i < 60; i++) {
      consumeToken({ ip: 'c', limit: 60, windowMs: WINDOW_MS, now: t0 });
    }
    const blocked = consumeToken({ ip: 'c', limit: 60, windowMs: WINDOW_MS, now: t0 });
    expect(blocked.allowed).toBe(false);

    // Fast-forward past the window.
    const t1 = t0 + WINDOW_MS + 1;
    const refilled = consumeToken({ ip: 'c', limit: 60, windowMs: WINDOW_MS, now: t1 });
    expect(refilled.allowed).toBe(true);
    expect(refilled.remaining).toBe(59);
  });

  it('honors a custom limit', () => {
    const now = 1_700_000_000_000;
    const a = consumeToken({ ip: 'd', limit: 2, windowMs: WINDOW_MS, now });
    const b = consumeToken({ ip: 'd', limit: 2, windowMs: WINDOW_MS, now });
    const c = consumeToken({ ip: 'd', limit: 2, windowMs: WINDOW_MS, now });
    expect(a.allowed).toBe(true);
    expect(b.allowed).toBe(true);
    expect(c.allowed).toBe(false);
  });
});
