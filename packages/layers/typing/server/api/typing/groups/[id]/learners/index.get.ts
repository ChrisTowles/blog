/**
 * GET /api/typing/groups/:id/learners
 *
 * Lists every learner in the group. Caller must be a guardian.
 */
import { z } from 'zod';
import type { Learner } from '../../../../../../../../blog/shared/typing-types';
import { listGroupLearners } from '../../../../../utils/typing/groups';
import { requireGuardian } from '../../../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  const { id: groupId } = await getValidatedRouterParams(event, paramsSchema.parse);
  await requireGuardian(event, { groupId });

  const rows = await listGroupLearners(groupId);
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
