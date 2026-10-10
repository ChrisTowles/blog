/**
 * Per-IP rate limit for `/mcp/*` using the Workers Rate Limiting binding (`MCP_RATE_LIMITER`).
 * The limit and period live in `wrangler.jsonc` (`ratelimits[].simple`); counters are per
 * Cloudflare location, which is plenty for a personal blog.
 */

import {
  createError,
  defineEventHandler,
  getRequestHeader,
  getRequestIP,
  setResponseHeader,
  setResponseStatus,
} from 'h3';

export interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

/** The binding reports no remaining count, so a rejected caller is told to wait a full period. */
export const RETRY_AFTER_SECONDS = 60;

export async function isAllowed(limiter: RateLimitBinding, key: string): Promise<boolean> {
  const { success } = await limiter.limit({ key });

  return success;
}

export default defineEventHandler(async (event) => {
  const path = event.path ?? event.node.req.url ?? '';

  if (!path.startsWith('/mcp/')) return;

  const limiter: RateLimitBinding | undefined = event.context.cloudflare?.env?.MCP_RATE_LIMITER;

  if (!limiter) {
    throw createError({
      statusCode: 500,
      statusMessage: 'MCP_RATE_LIMITER binding is missing from this environment',
    });
  }

  const ip =
    getRequestHeader(event, 'cf-connecting-ip') ??
    getRequestIP(event, { xForwardedFor: true }) ??
    'unknown';

  if (await isAllowed(limiter, ip)) return;

  setResponseStatus(event, 429);
  setResponseHeader(event, 'Retry-After', RETRY_AFTER_SECONDS);
  setResponseHeader(event, 'Content-Type', 'application/json');

  return {
    error: {
      code: 'rate_limited',
      message: `Too many requests. Retry after ${RETRY_AFTER_SECONDS}s.`,
    },
  };
});
