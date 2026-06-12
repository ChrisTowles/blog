/**
 * Public lesson list endpoint.
 *
 * Returns the union of built-in curriculum lessons and any AI-generated
 * lessons stored in the database. Optional `?stage=` filter narrows to a
 * single stage. No auth required — lessons are public content.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import type { LessonRow } from '../../../../../../shared/typing-types';
import { getBuiltInLessons } from '../../../utils/typing/curriculum';

const querySchema = z.object({
  stage: z.coerce.number().int().min(1).max(20).optional(),
});

export default defineEventHandler(async (event) => {
  const { stage } = await getValidatedQuery(event, querySchema.parse);

  const builtIn = getBuiltInLessons();
  const filteredBuiltIn = stage ? builtIn.filter((l) => l.stage === stage) : builtIn;

  // Built-in lessons live in code; AI-generated lessons live in the DB.
  // For anonymous reads we still try the DB but fall back gracefully if
  // DATABASE_URL is unset (e.g. local-only static dev). Errors are silent —
  // the curriculum is the source of truth and ships with the build.
  let dbLessons: Array<{
    id: number;
    slug: string;
    stage: number;
    kind: string;
    title: string;
    text: string;
    targetWpm: number;
    targetAccuracy: number;
    topic: string | null;
    spellingListId: number | null;
    generatedBy: string;
    createdAt: Date;
  }> = [];
  if (process.env.DATABASE_URL) {
    try {
      const db = useDrizzle();
      const rows = stage
        ? await db.select().from(tables.typingLessons).where(eq(tables.typingLessons.stage, stage))
        : await db.select().from(tables.typingLessons);
      dbLessons = rows;
    } catch {
      dbLessons = [];
    }
  }

  // Built-in lessons get synthetic ids derived from slug ordering. AI lessons
  // use their real DB id.
  const lessonsBuiltIn: LessonRow[] = filteredBuiltIn.map((l, i) => ({
    id: -1 - i,
    slug: l.slug,
    stage: l.stage,
    kind: l.kind,
    title: l.title,
    text: l.text,
    targetWpm: l.targetWpm,
    targetAccuracy: l.targetAccuracy,
    topic: null,
    spellingListId: null,
    generatedBy: 'system',
    createdAt: new Date(0).toISOString(),
  }));

  const lessonsAi: LessonRow[] = dbLessons
    .filter((l) => l.generatedBy === 'ai')
    .map((l) => ({
      id: l.id,
      slug: l.slug,
      stage: l.stage,
      kind: l.kind as LessonRow['kind'],
      title: l.title,
      text: l.text,
      targetWpm: l.targetWpm,
      targetAccuracy: l.targetAccuracy,
      topic: l.topic,
      spellingListId: l.spellingListId,
      generatedBy: 'ai',
      createdAt: l.createdAt.toISOString(),
    }));

  return { lessons: [...lessonsBuiltIn, ...lessonsAi] };
});
