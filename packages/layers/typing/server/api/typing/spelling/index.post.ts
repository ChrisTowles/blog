/**
 * POST /api/typing/spelling
 *
 * Creates a spelling list and auto-generates its drill + sentence
 * lessons. Caller must be a guardian of the learner.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import type { SpellingList } from '../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../utils/typing/require-guardian';
import { autoGenerateSpellingLessons } from '../../../utils/typing/spelling-lessons';

const wordSchema = z
  .string()
  .min(2)
  .max(15)
  .regex(/^[a-z']+$/, 'Lowercase letters or apostrophes only');

const bodySchema = z.object({
  learnerId: z.number().int().positive(),
  weekOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD'),
  words: z.array(wordSchema).min(1).max(30),
  source: z.enum(['paste', 'type', 'image']).default('type'),
  sourceImageUrl: z.string().url().nullable().optional(),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const { userId } = await requireGuardian(event, { learnerId: body.learnerId });

  const db = useDrizzle();

  // Find the learner's stage to constrain the auto-generated sentence.
  const learnerRows = await db
    .select()
    .from(tables.typingLearners)
    .where(eq(tables.typingLearners.id, body.learnerId))
    .limit(1);
  const learnerStage = learnerRows[0]?.currentStage ?? 5;

  // Upsert the list (unique on (learnerId, weekOf)).
  const existing = await db
    .select()
    .from(tables.typingSpellingLists)
    .where(eq(tables.typingSpellingLists.learnerId, body.learnerId))
    .limit(50);
  const same = existing.find((row) => {
    const date =
      typeof row.weekOf === 'string' ? row.weekOf : new Date(row.weekOf).toISOString().slice(0, 10);
    return date === body.weekOf;
  });

  let listRow;
  if (same) {
    const [updated] = await db
      .update(tables.typingSpellingLists)
      .set({
        words: body.words,
        source: body.source,
        sourceImageUrl: body.sourceImageUrl ?? null,
      })
      .where(eq(tables.typingSpellingLists.id, same.id))
      .returning();
    listRow = updated!;
  } else {
    const [created] = await db
      .insert(tables.typingSpellingLists)
      .values({
        learnerId: body.learnerId,
        weekOf: body.weekOf,
        words: body.words,
        source: body.source,
        sourceImageUrl: body.sourceImageUrl ?? null,
        createdBy: userId,
      })
      .returning();
    listRow = created!;
  }

  // Seed per-word progress rows (idempotent — onConflictDoNothing).
  for (const word of body.words) {
    await db
      .insert(tables.typingSpellingProgress)
      .values({ spellingListId: listRow.id, word })
      .onConflictDoNothing();
  }

  // Generate / regenerate lessons.
  let lessons: { drillLessonId: number; sentenceLessonId: number } | null = null;
  try {
    lessons = await autoGenerateSpellingLessons(listRow.id, body.words, learnerStage);
  } catch {
    // Lesson generation can fail (no API key, network); the list itself
    // still saves. Lake Leap pulls words directly from the list anyway.
    lessons = null;
  }

  const out: SpellingList = {
    id: listRow.id,
    learnerId: listRow.learnerId,
    weekOf:
      typeof listRow.weekOf === 'string'
        ? listRow.weekOf
        : new Date(listRow.weekOf).toISOString().slice(0, 10),
    words: listRow.words,
    source: listRow.source as 'paste' | 'type' | 'image',
    sourceImageUrl: listRow.sourceImageUrl,
    createdBy: listRow.createdBy,
    createdAt: listRow.createdAt.toISOString(),
    updatedAt: listRow.updatedAt.toISOString(),
  };
  return { list: out, lessons };
});
