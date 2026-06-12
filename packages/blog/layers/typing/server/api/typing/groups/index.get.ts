/**
 * GET /api/typing/groups
 *
 * Returns every group the calling user is a guardian of, with the group's
 * learners pre-fetched so the client can render a learner switcher
 * without a second round-trip.
 */
import type { Learner, TypingGroup, TypingGroupKind } from '../../../../../../shared/typing-types';
import { listGroupLearners, listGuardianGroups } from '../../../utils/typing/groups';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const userId = session.user?.id;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Sign in required' });
  }

  const groups = await listGuardianGroups(userId);
  const out: Array<{ group: TypingGroup; learners: Learner[] }> = [];

  for (const g of groups) {
    const learners = await listGroupLearners(g.id);
    out.push({
      group: {
        id: g.id,
        slug: g.slug,
        name: g.name,
        kind: g.kind as TypingGroupKind,
        createdAt: g.createdAt.toISOString(),
        updatedAt: g.updatedAt.toISOString(),
      },
      learners: learners.map((l) => ({
        id: l.id,
        groupId: l.groupId,
        displayName: l.displayName,
        avatarUrl: l.avatarUrl,
        birthYear: l.birthYear,
        currentStage: l.currentStage,
        preferredVoice: l.preferredVoice,
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
      })),
    });
  }

  return { groups: out };
});
