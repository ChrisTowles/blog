/**
 * POST /api/typing/progress/merge
 *
 * One-shot localStorage -> DB merge for the moment a guardian signs in
 * with anonymous progress queued client-side.
 *
 * Body: { learnerId, attempts: LocalAttempt[], keyStats: Record<key, LocalKeyStat> }
 */
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { requireGuardian } from '../../../utils/typing/require-guardian';

const localAttemptSchema = z.object({
  lessonId: z.number().int().nullable(),
  gameSlug: z.string().nullable(),
  wpm: z.number().min(0),
  netWpm: z.number().min(0),
  accuracy: z.number().min(0).max(1),
  durationMs: z.number().int().min(0),
  errorsByKey: z.record(z.string(), z.number()).default({}),
  completedAt: z.string().datetime(),
});

const localKeyStatSchema = z.object({
  attempts: z.number().int().min(0),
  errors: z.number().int().min(0),
  avgMs: z.number().min(0),
});

const bodySchema = z.object({
  learnerId: z.number().int().positive(),
  attempts: z.array(localAttemptSchema).max(500).default([]),
  keyStats: z.record(z.string(), localKeyStatSchema).default({}),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  await requireGuardian(event, { learnerId: body.learnerId });

  const db = useDrizzle();

  let attemptsInserted = 0;
  for (const a of body.attempts) {
    await db.insert(tables.typingAttempts).values({
      learnerId: body.learnerId,
      lessonId: a.lessonId,
      gameSlug: a.gameSlug,
      wpm: a.wpm,
      netWpm: a.netWpm,
      accuracy: a.accuracy,
      durationMs: a.durationMs,
      errorsByKey: a.errorsByKey,
      completedAt: new Date(a.completedAt),
    });
    attemptsInserted++;
  }

  let keysUpdated = 0;
  for (const [key, stat] of Object.entries(body.keyStats)) {
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
    keysUpdated++;
  }

  return { ok: true, attemptsInserted, keysUpdated };
});
