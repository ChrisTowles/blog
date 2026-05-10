/**
 * GET /api/typing/groups/:id
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
} from '../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  const { id: groupId } = await getValidatedRouterParams(event, paramsSchema.parse);
  await requireGuardian(event, { groupId });

  const db = useDrizzle();

  const groupRows = await db
    .select()
    .from(tables.typingGroups)
    .where(eq(tables.typingGroups.id, groupId))
    .limit(1);
  const group = groupRows[0];
  if (!group) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }

  const memberRows = await db
    .select()
    .from(tables.typingGroupMembers)
    .where(eq(tables.typingGroupMembers.groupId, groupId));
  const learnerRows = await db
    .select()
    .from(tables.typingLearners)
    .where(eq(tables.typingLearners.groupId, groupId));

  const groupOut: TypingGroup = {
    id: group.id,
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
