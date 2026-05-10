/**
 * PUT /api/typing/groups/:id/learners/:learnerId
 *
 * Updates a learner's display name, avatar, birth year, current stage, or
 * preferred voice. Caller must be a guardian of the group.
 */
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import type { Learner } from '../../../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
  learnerId: z.coerce.number().int().positive(),
});

const bodySchema = z.object({
  displayName: z.string().min(1).max(80).optional(),
  birthYear: z.number().int().min(1900).max(2100).nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
  currentStage: z.number().int().min(1).max(20).optional(),
  preferredVoice: z.string().min(1).max(64).optional(),
});

export default defineEventHandler(async (event) => {
  const { id: groupId, learnerId } = await getValidatedRouterParams(event, paramsSchema.parse);
  await requireGuardian(event, { groupId });

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const set: Partial<typeof tables.typingLearners.$inferInsert> = {};
  if (body.displayName !== undefined) set.displayName = body.displayName;
  if (body.birthYear !== undefined) set.birthYear = body.birthYear;
  if (body.avatarUrl !== undefined) set.avatarUrl = body.avatarUrl;
  if (body.currentStage !== undefined) set.currentStage = body.currentStage;
  if (body.preferredVoice !== undefined) set.preferredVoice = body.preferredVoice;

  if (Object.keys(set).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Nothing to update' });
  }

  const [updated] = await db
    .update(tables.typingLearners)
    .set(set)
    .where(and(eq(tables.typingLearners.id, learnerId), eq(tables.typingLearners.groupId, groupId)))
    .returning();
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Learner not found' });
  }

  const learner: Learner = {
    id: updated.id,
    groupId: updated.groupId,
    displayName: updated.displayName,
    avatarUrl: updated.avatarUrl,
    birthYear: updated.birthYear,
    currentStage: updated.currentStage,
    preferredVoice: updated.preferredVoice,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
  return { learner };
});
