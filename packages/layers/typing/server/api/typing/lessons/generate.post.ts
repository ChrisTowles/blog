/**
 * POST /api/typing/lessons/generate
 *
 * Public AI topic-game endpoint. Rate-limited per IP for anonymous users
 * (10/day) and per session user for authed callers (30/day). The rate
 * counter is best-effort in-memory — Cloud Run instances reset on cold
 * start but the cap holds within an instance, which is sufficient to
 * blunt abuse without a Redis/KV dependency.
 */
import { z } from 'zod';
import {
  MAX_STAGE,
  MIN_TOPIC_STAGE,
  type LessonRow,
} from '../../../../../../blog/shared/typing-types';
import { generateLesson } from '../../../utils/typing/lesson-generator';

const bodySchema = z.object({
  stage: z.number().int().min(MIN_TOPIC_STAGE).max(MAX_STAGE),
  topic: z.string().min(1).max(80),
  kind: z.enum(['sentence', 'paragraph']),
  length: z.enum(['short', 'medium']),
  // Learner's weakest keys (from the client-side heatmap) — woven into the
  // prompt so generated text doubles as targeted practice. Letters only.
  trickyKeys: z
    .array(z.string().regex(/^[a-z]$/))
    .max(3)
    .optional(),
});

type Bucket = { count: number; resetAt: number };
const RATE_LIMITS = { anon: 10, authed: 30 } as const;
const DAY_MS = 24 * 60 * 60 * 1000;
const buckets = new Map<string, Bucket>();

function takeFromBucket(key: string, limit: number): { ok: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + DAY_MS });
    return { ok: true, remaining: limit - 1 };
  }
  if (existing.count >= limit) {
    return { ok: false, remaining: 0 };
  }
  existing.count++;
  return { ok: true, remaining: limit - existing.count };
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const userId = session.user?.id;
  const isAuthed = !!userId;

  // Rate-limit key: prefer userId for authed callers, else best-effort IP.
  const ip =
    getRequestHeader(event, 'cf-connecting-ip') ??
    getRequestHeader(event, 'x-forwarded-for') ??
    'unknown';
  const key = isAuthed ? `user:${userId}` : `ip:${ip}`;
  const limit = isAuthed ? RATE_LIMITS.authed : RATE_LIMITS.anon;
  const taken = takeFromBucket(key, limit);
  if (!taken.ok) {
    throw createError({ statusCode: 429, statusMessage: 'Daily generation limit reached' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await generateLesson(body);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }

  // Persist as `topic` lesson if we have a DB. Even if the DB is unset
  // we still return the generated text for ephemeral runs.
  let savedLesson: LessonRow | null = null;
  if (process.env.DATABASE_URL) {
    try {
      const db = useDrizzle();
      const slug = `topic-${body.stage}-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
      const title = `${body.topic} (stage ${body.stage})`;
      const [row] = await db
        .insert(tables.typingLessons)
        .values({
          slug,
          stage: body.stage,
          kind: 'topic',
          title,
          text: result.text,
          targetWpm: 10,
          targetAccuracy: 0.95,
          topic: body.topic,
          generatedBy: 'ai',
        })
        .returning();
      if (row) {
        savedLesson = {
          id: row.id,
          slug: row.slug,
          stage: row.stage,
          kind: 'topic',
          title: row.title,
          text: row.text,
          targetWpm: row.targetWpm,
          targetAccuracy: row.targetAccuracy,
          topic: row.topic,
          spellingListId: row.spellingListId,
          generatedBy: 'ai',
          createdAt: row.createdAt.toISOString(),
        };
      }
    } catch {
      // fall through to ephemeral lesson below
    }
  }

  if (!savedLesson) {
    savedLesson = {
      id: -Math.floor(Math.random() * 100000) - 1,
      slug: `topic-ephemeral-${Date.now().toString(36)}`,
      stage: body.stage,
      kind: 'topic',
      title: `${body.topic} (stage ${body.stage})`,
      text: result.text,
      targetWpm: 10,
      targetAccuracy: 0.95,
      topic: body.topic,
      spellingListId: null,
      generatedBy: 'ai',
      createdAt: new Date().toISOString(),
    };
  }

  return { lesson: savedLesson, remaining: taken.remaining };
});

// Test-only export: allow Vitest to reset the in-memory buckets between
// test cases.
export function _resetBuckets() {
  buckets.clear();
}
