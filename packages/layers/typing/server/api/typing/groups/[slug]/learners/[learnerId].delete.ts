/**
 * Type-the-name confirm is enforced client-side only, so guardianship is re-verified here.
 * Attempts and progress go with the learner via FK ON DELETE CASCADE.
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
