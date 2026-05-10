/**
 * GET /api/typing/progress?learnerId=
 *
 * Returns the learner's attempts and per-key stats. Caller must be a
 * guardian of the learner.
 */
import { z } from 'zod';
import { desc, eq } from 'drizzle-orm';
import type { AttemptRow, KeyStat } from '../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../utils/typing/require-guardian';

const querySchema = z.object({
  learnerId: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  const { learnerId } = await getValidatedQuery(event, querySchema.parse);
  await requireGuardian(event, { learnerId });

  const db = useDrizzle();
  const attemptRows = await db
    .select()
    .from(tables.typingAttempts)
    .where(eq(tables.typingAttempts.learnerId, learnerId))
    .orderBy(desc(tables.typingAttempts.completedAt))
    .limit(200);

  const keyStatRows = await db
    .select()
    .from(tables.typingKeyStats)
    .where(eq(tables.typingKeyStats.learnerId, learnerId));

  const attempts: AttemptRow[] = attemptRows.map((a) => ({
    id: a.id,
    learnerId: a.learnerId,
    lessonId: a.lessonId,
    gameSlug: a.gameSlug,
    wpm: a.wpm,
    netWpm: a.netWpm,
    accuracy: a.accuracy,
    durationMs: a.durationMs,
    errorsByKey: a.errorsByKey,
    completedAt: a.completedAt.toISOString(),
  }));

  const keyStats: KeyStat[] = keyStatRows.map((k) => ({
    key: k.key,
    attempts: k.attempts,
    errors: k.errors,
    avgMs: k.avgMs,
  }));

  return { attempts, keyStats };
});
