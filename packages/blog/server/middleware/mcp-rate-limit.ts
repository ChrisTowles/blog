/**
 * Per-IP fixed-window rate limit for `/mcp/*`. The bucket map is process-local by
 * design: Cloud Run `min_instances=1` + session affinity keep an IP mostly on one
 * instance, which is enough for a personal blog — Redis is a later decision.
 * `MCP_RATE_LIMIT_RPM` is misnamed for terraform consistency; it is per 5 minutes.
 */

import { defineEventHandler, getRequestIP, setResponseStatus, setResponseHeader } from 'h3';

interface Bucket {
  /** Tokens remaining in the current window. */
  remaining: number;
  /** Epoch ms when the current window started. */
  windowStartedAt: number;
}

const buckets = new Map<string, Bucket>();

export interface ConsumeInput {
  ip: string;
  limit: number;
  windowMs: number;
  now: number;
}

export interface ConsumeResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

// Sweep stale buckets every Nth call so the Map stays bounded under
// long-lived processes seeing many unique IPs.
const SWEEP_EVERY_N_CALLS = 256;
let callsSinceSweep = 0;

function sweepStale(now: number, windowMs: number): void {
  for (const [ip, bucket] of buckets) {
    if (now - bucket.windowStartedAt >= windowMs) buckets.delete(ip);
  }
}

export function consumeToken(input: ConsumeInput): ConsumeResult {
  const { ip, limit, windowMs, now } = input;
  if (++callsSinceSweep >= SWEEP_EVERY_N_CALLS) {
    callsSinceSweep = 0;
    sweepStale(now, windowMs);
  }
  let b = buckets.get(ip);
  if (!b || now - b.windowStartedAt >= windowMs) {
    b = { remaining: limit, windowStartedAt: now };
    buckets.set(ip, b);
  }
  if (b.remaining <= 0) {
    const elapsed = now - b.windowStartedAt;
    const retryAfterMs = Math.max(0, windowMs - elapsed);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }
  b.remaining -= 1;
  return { allowed: true, remaining: b.remaining, retryAfterSeconds: 0 };
}

/** @internal reset module state between tests. */
export function __resetRateLimitForTests(): void {
  buckets.clear();
  callsSinceSweep = 0;
}

/** Reads `MCP_RATE_LIMIT_RPM` with a default of 60/5min. */
function readLimit(): number {
  const raw = process.env.MCP_RATE_LIMIT_RPM;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 60;
}

const WINDOW_MS = 5 * 60 * 1000;

export default defineEventHandler(async (event) => {
  const path = event.path ?? event.node.req.url ?? '';
  if (!path.startsWith('/mcp/')) return;

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown';
  const limit = readLimit();
  const decision = consumeToken({ ip, limit, windowMs: WINDOW_MS, now: Date.now() });
  if (decision.allowed) {
    setResponseHeader(event, 'X-RateLimit-Limit', String(limit));
    setResponseHeader(event, 'X-RateLimit-Remaining', String(decision.remaining));
    return;
  }
  setResponseStatus(event, 429);
  setResponseHeader(event, 'Retry-After', decision.retryAfterSeconds);
  setResponseHeader(event, 'X-RateLimit-Limit', String(limit));
  setResponseHeader(event, 'X-RateLimit-Remaining', '0');
  setResponseHeader(event, 'Content-Type', 'application/json');
  // Short-circuit the request — return JSON body and let h3 flush.
  return {
    error: {
      code: 'rate_limited',
      message: `Too many requests. Retry after ${decision.retryAfterSeconds}s.`,
    },
  };
});
