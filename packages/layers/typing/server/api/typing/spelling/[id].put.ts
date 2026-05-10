/**
 * PUT /api/typing/spelling/:id
 *
 * Update the words in a spelling list. Caller must be a guardian of the
 * learner. Re-generates the auto-derived lessons.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { requireGuardian } from '../../../utils/typing/require-guardian';
import { autoGenerateSpellingLessons } from '../../../utils/typing/spelling-lessons';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const wordSchema = z
  .string()
  .min(2)
  .max(15)
  .regex(/^[a-z']+$/);

const bodySchema = z.object({
  words: z.array(wordSchema).min(1).max(30),
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse);
  const body = await readValidatedBody(event, bodySchema.parse);
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

  const [updated] = await db
    .update(tables.typingSpellingLists)
    .set({ words: body.words })
    .where(eq(tables.typingSpellingLists.id, id))
    .returning();

  // Refresh per-word progress rows: insert new ones, leave old in place
  // (the mastery cards filter by current word list anyway).
  for (const word of body.words) {
    await db
      .insert(tables.typingSpellingProgress)
      .values({ spellingListId: id, word })
      .onConflictDoNothing();
  }

  // Regenerate lessons.
  const learnerRows = await db
    .select()
    .from(tables.typingLearners)
    .where(eq(tables.typingLearners.id, list.learnerId))
    .limit(1);
  const learnerStage = learnerRows[0]?.currentStage ?? 5;
  try {
    await autoGenerateSpellingLessons(id, body.words, learnerStage);
  } catch {
    // ignore; see index.post.ts
  }

  return { ok: true, list: updated };
});
