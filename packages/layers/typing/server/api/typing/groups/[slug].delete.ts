/**
 * DELETE /api/typing/groups/:slug
 *
 * Permanently removes a group and all of its learners, members, invites,
 * attempts (via FK ON DELETE CASCADE). Caller must be a guardian.
 *
 * Type-the-name confirm is enforced client-side. Server still verifies
 * guardianship so the delete is safe even if the confirm is bypassed.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { findGroupBySlug } from '../../../utils/typing/groups';
import { requireGuardian } from '../../../utils/typing/require-guardian';

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
  const result = await db
    .delete(tables.typingGroups)
    .where(eq(tables.typingGroups.id, group.id))
    .returning({ id: tables.typingGroups.id });

  if (result.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }

  return { ok: true, deletedId: result[0]!.id };
});
