/**
 * DELETE /api/typing/spelling/:id
 *
 * Cascade-deletes derived lessons + progress via FK constraints.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { requireGuardian } from '../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse);
  const db = useDrizzle();

  const rows = await db
    .select()
    .from(tables.typingSpellingLists)
    .where(eq(tables.typingSpellingLists.id, id))
    .limit(1);
  const list = rows[0];
  if (!list) {
    throw createError({ statusCode: 404, statusMessage: 'List not found' });
  }
  await requireGuardian(event, { learnerId: list.learnerId });

  await db.delete(tables.typingSpellingLists).where(eq(tables.typingSpellingLists.id, id));
  return { ok: true };
});
