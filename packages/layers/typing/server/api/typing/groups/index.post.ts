/**
 * POST /api/typing/groups
 *
 * Creates a new group with the caller as its sole guardian. Optionally
 * seeds an initial learner so the user lands on a usable home immediately.
 */
import { z } from 'zod';
import type {
  TypingGroup,
  TypingGroupKind,
  Learner,
} from '../../../../../../blog/shared/typing-types';

const bodySchema = z.object({
  name: z.string().min(1).max(120),
  kind: z.enum(['family', 'classroom']).default('family'),
  initialLearnerName: z.string().min(1).max(80).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const userId = session.user?.id;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Sign in required' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const [group] = await db
    .insert(tables.typingGroups)
    .values({ name: body.name, kind: body.kind })
    .returning();
  if (!group) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create group' });
  }

  await db.insert(tables.typingGroupMembers).values({
    groupId: group.id,
    userId,
    role: 'guardian',
  });

  let learner: Learner | null = null;
  if (body.initialLearnerName) {
    const [created] = await db
      .insert(tables.typingLearners)
      .values({ groupId: group.id, displayName: body.initialLearnerName })
      .returning();
    if (created) {
      learner = {
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
    }
  }

  const out: TypingGroup = {
    id: group.id,
    name: group.name,
    kind: group.kind as TypingGroupKind,
    createdAt: group.createdAt.toISOString(),
    updatedAt: group.updatedAt.toISOString(),
  };
  return { group: out, learner };
});
