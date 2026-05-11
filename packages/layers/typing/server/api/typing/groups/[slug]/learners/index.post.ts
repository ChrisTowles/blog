/**
 * POST /api/typing/groups/:slug/learners
 *
 * Creates a new learner in the group. Caller must be a guardian.
 */
import { z } from 'zod';
import type { Learner } from '../../../../../../../../blog/shared/typing-types';
import { findGroupBySlug } from '../../../../../utils/typing/groups';
import { requireGuardian } from '../../../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  slug: z.string().min(1).max(96),
});

const bodySchema = z.object({
  displayName: z.string().min(1).max(80),
  birthYear: z.number().int().min(1900).max(2100).optional(),
  avatarUrl: z.string().url().optional(),
});

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, paramsSchema.parse);
  const group = await findGroupBySlug(slug);
  if (!group) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }
  await requireGuardian(event, { groupId: group.id });

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();
  const [created] = await db
    .insert(tables.typingLearners)
    .values({
      groupId: group.id,
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
