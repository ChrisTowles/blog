/**
 * DELETE /api/typing/groups/:slug/learners/:learnerId
 *
 * Permanently removes a learner from the group. Caller must be a guardian.
 * The client gates this behind a type-the-name confirm prompt — we still
 * verify guardianship server-side.
 *
 * Cascades to attempts/progress via the FK ON DELETE CASCADE rules on
 * typing_attempts and friends.
 */
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { findGroupBySlug } from '../../../../../utils/typing/groups';
import { requireGuardian } from '../../../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  slug: z.string().min(1).max(96),
  learnerId: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  const { slug, learnerId } = await getValidatedRouterParams(event, paramsSchema.parse);
  const group = await findGroupBySlug(slug);
  if (!group) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }
  await requireGuardian(event, { groupId: group.id });

  const db = useDrizzle();
  const result = await db
    .delete(tables.typingLearners)
    .where(
      and(eq(tables.typingLearners.id, learnerId), eq(tables.typingLearners.groupId, group.id)),
    )
    .returning({ id: tables.typingLearners.id });

  if (result.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Learner not found' });
  }

  return { ok: true, deletedId: result[0]!.id };
});
