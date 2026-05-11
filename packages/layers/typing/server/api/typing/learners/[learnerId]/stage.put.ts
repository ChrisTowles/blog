/**
 * PUT /api/typing/learners/:learnerId/stage
 *
 * Pushes the kid's currentStage back to typingLearners so progress is
 * durable across devices. Caller must be a guardian of the learner.
 *
 * Direct path (vs PUT /api/typing/groups/:slug/learners/:learnerId) so the
 * client doesn't need to know the group's slug — useTypingProgress only
 * has the learnerId in hand.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { MAX_STAGE } from '../../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  learnerId: z.coerce.number().int().positive(),
});

const bodySchema = z.object({
  currentStage: z.number().int().min(1).max(MAX_STAGE),
});

export default defineEventHandler(async (event) => {
  const { learnerId } = await getValidatedRouterParams(event, paramsSchema.parse);
  await requireGuardian(event, { learnerId });

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  // Don't demote — only push forward. A device may briefly lag behind
  // the server's record; we never want a stale local value to undo a
  // stage already unlocked on another device.
  const existing = await db
    .select({ currentStage: tables.typingLearners.currentStage })
    .from(tables.typingLearners)
    .where(eq(tables.typingLearners.id, learnerId))
    .limit(1);
  const prev = existing[0];
  if (!prev) {
    throw createError({ statusCode: 404, statusMessage: 'Learner not found' });
  }
  if (body.currentStage <= prev.currentStage) {
    return { currentStage: prev.currentStage, changed: false };
  }

  const [updated] = await db
    .update(tables.typingLearners)
    .set({ currentStage: body.currentStage })
    .where(eq(tables.typingLearners.id, learnerId))
    .returning({ currentStage: tables.typingLearners.currentStage });

  return { currentStage: updated?.currentStage ?? body.currentStage, changed: true };
});
