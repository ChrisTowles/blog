/**
 * GET /api/typing/groups/:slug/learners
 *
 * Lists every learner in the group. Caller must be a guardian.
 */
import { z } from 'zod';
import type { Learner } from '../../../../../../../../shared/typing-types';
import { findGroupBySlug, listGroupLearners } from '../../../../../utils/typing/groups';
import { requireGuardian } from '../../../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  slug: z.string().min(1).max(96),
});

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, paramsSchema.parse);
  const group = await findGroupBySlug(slug);
  if (!group) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }
  await requireGuardian(event, { groupId: group.id });

  const rows = await listGroupLearners(group.id);
  const learners: Learner[] = rows.map((l) => ({
    id: l.id,
    groupId: l.groupId,
    displayName: l.displayName,
    avatarUrl: l.avatarUrl,
    birthYear: l.birthYear,
    currentStage: l.currentStage,
    preferredVoice: l.preferredVoice,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }));
  return { learners };
});
