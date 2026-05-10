/**
 * POST /api/typing/progress
 *
 * Records an attempt for a learner and updates the key-stat heatmap. Caller
 * must be a guardian of the learner.
 */
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import type { AttemptRow } from '../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../utils/typing/require-guardian';

const bodySchema = z.object({
  learnerId: z.number().int().positive(),
  lessonId: z.number().int().nullable().optional(),
  gameSlug: z.string().max(40).nullable().optional(),
  wpm: z.number().min(0),
  netWpm: z.number().min(0),
  accuracy: z.number().min(0).max(1),
  durationMs: z.number().int().min(0),
  errorsByKey: z.record(z.string(), z.number()).default({}),
  perKeyStats: z
    .record(
      z.string(),
      z.object({
        attempts: z.number().int().min(0),
        errors: z.number().int().min(0),
        avgMs: z.number().min(0),
      }),
    )
    .default({}),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  await requireGuardian(event, { learnerId: body.learnerId });

  const db = useDrizzle();

  const [attempt] = await db
    .insert(tables.typingAttempts)
    .values({
      learnerId: body.learnerId,
      lessonId: body.lessonId ?? null,
      gameSlug: body.gameSlug ?? null,
      wpm: body.wpm,
      netWpm: body.netWpm,
      accuracy: body.accuracy,
      durationMs: body.durationMs,
      errorsByKey: body.errorsByKey,
    })
    .returning();
  if (!attempt) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to record attempt' });
  }

  // Update key stats — one row per (learner, key). Running mean for avgMs.
  for (const [key, stat] of Object.entries(body.perKeyStats)) {
    if (stat.attempts === 0) continue;
    const existing = await db
      .select()
      .from(tables.typingKeyStats)
      .where(
        and(
          eq(tables.typingKeyStats.learnerId, body.learnerId),
          eq(tables.typingKeyStats.key, key),
        ),
      )
      .limit(1);
    const prev = existing[0];
    if (prev) {
      const totalAttempts = prev.attempts + stat.attempts;
      const totalErrors = prev.errors + stat.errors;
      const weightedAvg =
        totalAttempts > 0
          ? (prev.avgMs * prev.attempts + stat.avgMs * stat.attempts) / totalAttempts
          : 0;
      await db
        .update(tables.typingKeyStats)
        .set({ attempts: totalAttempts, errors: totalErrors, avgMs: weightedAvg })
        .where(eq(tables.typingKeyStats.id, prev.id));
    } else {
      await db.insert(tables.typingKeyStats).values({
        learnerId: body.learnerId,
        key,
        attempts: stat.attempts,
        errors: stat.errors,
        avgMs: stat.avgMs,
      });
    }
  }

  const out: AttemptRow = {
    id: attempt.id,
    learnerId: attempt.learnerId,
    lessonId: attempt.lessonId,
    gameSlug: attempt.gameSlug,
    wpm: attempt.wpm,
    netWpm: attempt.netWpm,
    accuracy: attempt.accuracy,
    durationMs: attempt.durationMs,
    errorsByKey: attempt.errorsByKey,
    completedAt: attempt.completedAt.toISOString(),
  };
  return { attempt: out };
});
