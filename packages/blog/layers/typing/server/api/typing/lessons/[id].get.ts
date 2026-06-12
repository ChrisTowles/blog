/**
 * Public single-lesson endpoint.
 *
 * Accepts either a numeric id (DB row) or a string slug. Built-in lessons
 * are matched by slug; AI lessons match by id or slug.
 */
import { z } from 'zod';
import { eq, or } from 'drizzle-orm';
import type { LessonRow } from '../../../../../../shared/typing-types';
import { getBuiltInLessons } from '../../../utils/typing/curriculum';

const paramsSchema = z.object({
  id: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse);

  const numericId = /^-?\d+$/.test(id) ? Number(id) : null;
  const slug = id;

  // Try built-in first.
  const builtIn = getBuiltInLessons().find((l) => l.slug === slug);
  if (builtIn) {
    const lesson: LessonRow = {
      id: -1,
      slug: builtIn.slug,
      stage: builtIn.stage,
      kind: builtIn.kind,
      title: builtIn.title,
      text: builtIn.text,
      targetWpm: builtIn.targetWpm,
      targetAccuracy: builtIn.targetAccuracy,
      topic: null,
      spellingListId: null,
      generatedBy: 'system',
      createdAt: new Date(0).toISOString(),
    };
    return { lesson };
  }

  if (process.env.DATABASE_URL) {
    try {
      const db = useDrizzle();
      const conditions =
        numericId !== null
          ? or(eq(tables.typingLessons.id, numericId), eq(tables.typingLessons.slug, slug))
          : eq(tables.typingLessons.slug, slug);
      const rows = await db.select().from(tables.typingLessons).where(conditions).limit(1);
      const row = rows[0];
      if (row) {
        const lesson: LessonRow = {
          id: row.id,
          slug: row.slug,
          stage: row.stage,
          kind: row.kind as LessonRow['kind'],
          title: row.title,
          text: row.text,
          targetWpm: row.targetWpm,
          targetAccuracy: row.targetAccuracy,
          topic: row.topic,
          spellingListId: row.spellingListId,
          generatedBy: row.generatedBy as 'system' | 'ai',
          createdAt: row.createdAt.toISOString(),
        };
        return { lesson };
      }
    } catch {
      // fall through
    }
  }

  throw createError({ statusCode: 404, statusMessage: 'Lesson not found' });
});
