/**
 * POST /api/mini-cog/score-recall
 *
 * Scores the three-word recall. Public + rate-limited per IP / session
 * (best-effort in-memory, same approach as the typing topic generator).
 *
 * Privacy: the transcription is sent to Claude for scoring and is NOT
 * persisted anywhere — no DB write, no logging of the response text.
 */
import { z } from 'zod';
import { scoreRecall } from '../../utils/mini-cog/recall-scorer';

const bodySchema = z.object({
  targetWords: z.array(z.string().min(1).max(40)).length(3),
  spokenText: z.string().max(2000),
});

type Bucket = { count: number; resetAt: number };
const RATE_LIMITS = { anon: 30, authed: 100 } as const;
const DAY_MS = 24 * 60 * 60 * 1000;
const buckets = new Map<string, Bucket>();

function takeFromBucket(key: string, limit: number): { ok: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + DAY_MS });
    return { ok: true, remaining: limit - 1 };
  }
  if (existing.count >= limit) return { ok: false, remaining: 0 };
  existing.count++;
  return { ok: true, remaining: limit - existing.count };
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const userId = session.user?.id;
  const isAuthed = !!userId;
  const ip =
    getRequestHeader(event, 'cf-connecting-ip') ??
    getRequestHeader(event, 'x-forwarded-for') ??
    'unknown';
  const key = isAuthed ? `user:${userId}` : `ip:${ip}`;
  const limit = isAuthed ? RATE_LIMITS.authed : RATE_LIMITS.anon;
  if (!takeFromBucket(key, limit).ok) {
    throw createError({ statusCode: 429, statusMessage: 'Daily limit reached' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await scoreRecall(body);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  return { recall: result.data };
});

export function _resetBuckets() {
  buckets.clear();
}
