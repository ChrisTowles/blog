/**
 * GET /api/typing/groups/:slug
 *
 * Returns the group with its members and learners. Caller must be a guardian.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import type {
  Guardian,
  Learner,
  TypingGroup,
  TypingGroupKind,
} from '../../../../../../shared/typing-types';
import { requireGuardian } from '../../../utils/typing/require-guardian';
import { findGroupBySlug } from '../../../utils/typing/groups';

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

  const db = useDrizzle();
  const memberRows = await db
    .select()
    .from(tables.typingGroupMembers)
    .where(eq(tables.typingGroupMembers.groupId, group.id));
  const learnerRows = await db
    .select()
    .from(tables.typingLearners)
    .where(eq(tables.typingLearners.groupId, group.id));

  const groupOut: TypingGroup = {
    id: group.id,
    slug: group.slug,
    name: group.name,
    kind: group.kind as TypingGroupKind,
    createdAt: group.createdAt.toISOString(),
    updatedAt: group.updatedAt.toISOString(),
  };

  const members: Guardian[] = memberRows.map((m) => ({
    groupId: m.groupId,
    userId: m.userId,
    role: 'guardian',
    invitedBy: m.invitedBy ?? null,
    joinedAt: m.joinedAt.toISOString(),
  }));

  const learners: Learner[] = learnerRows.map((l) => ({
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

  return { group: groupOut, members, learners };
});
