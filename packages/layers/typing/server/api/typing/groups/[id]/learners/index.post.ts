/**
 * POST /api/typing/groups/:id/learners
 *
 * Creates a new learner in the group. Caller must be a guardian.
 */
import { z } from 'zod';
import type { Learner } from '../../../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const bodySchema = z.object({
  displayName: z.string().min(1).max(80),
  birthYear: z.number().int().min(1900).max(2100).optional(),
  avatarUrl: z.string().url().optional(),
});

export default defineEventHandler(async (event) => {
  const { id: groupId } = await getValidatedRouterParams(event, paramsSchema.parse);
  await requireGuardian(event, { groupId });

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();
  const [created] = await db
    .insert(tables.typingLearners)
    .values({
      groupId,
      displayName: body.displayName,
      birthYear: body.birthYear ?? null,
      avatarUrl: body.avatarUrl ?? null,
    })
    .returning();
  if (!created) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create learner' });
  }
  const learner: Learner = {
    id: created.id,
    groupId: created.groupId,
    displayName: created.displayName,
    avatarUrl: created.avatarUrl,
    birthYear: created.birthYear,
    currentStage: created.currentStage,
    preferredVoice: created.preferredVoice,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  };
  return { learner };
});
