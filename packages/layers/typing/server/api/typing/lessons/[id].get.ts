/** No auth — lessons are public content. */
import { z } from 'zod';
import { eq, or } from 'drizzle-orm';
import type { LessonRow } from '../../../../../../blog/shared/typing-types';
import { getBuiltInLessons } from '../../../utils/typing/curriculum';
import { toLessonRow } from '../../../utils/typing/lesson-row';

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
        return { lesson: toLessonRow(row) };
      }
    } catch {
      // fall through
    }
  }

  throw createError({ statusCode: 404, statusMessage: 'Lesson not found' });
});
