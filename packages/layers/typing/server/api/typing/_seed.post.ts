/** Idempotent: upserts by `slug`, so re-running only re-syncs the curriculum with the code. */
import { getBuiltInLessons } from '../../utils/typing/curriculum';

const UPSERT_BATCH_SIZE = 50;

export default defineEventHandler(async (event) => {
  const expected = process.env.ADMIN_SEED_TOKEN;

  if (!expected) {
    throw createError({ statusCode: 503, statusMessage: 'Seed endpoint disabled' });
  }

  const provided = getHeader(event, 'x-admin-token');

  if (provided !== expected) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const lessons = getBuiltInLessons();
  const db = useDrizzle();

  let inserted = 0;
  let updated = 0;

  // One batch per slice keeps each D1 round trip bounded as the curriculum grows.
  for (let i = 0; i < lessons.length; i += UPSERT_BATCH_SIZE) {
    const slice = lessons.slice(i, i + UPSERT_BATCH_SIZE);

    const [first, ...rest] = slice.map((lesson) =>
      db
        .insert(tables.typingLessons)
        .values({
          slug: lesson.slug,
          stage: lesson.stage,
          kind: lesson.kind,
          title: lesson.title,
          text: lesson.text,
          targetWpm: lesson.targetWpm,
          targetAccuracy: lesson.targetAccuracy,
          generatedBy: 'system',
        })
        .onConflictDoUpdate({
          target: tables.typingLessons.slug,
          set: {
            stage: lesson.stage,
            kind: lesson.kind,
            title: lesson.title,
            text: lesson.text,
            targetWpm: lesson.targetWpm,
            targetAccuracy: lesson.targetAccuracy,
          },
        })
        .returning({ id: tables.typingLessons.id, createdAt: tables.typingLessons.createdAt }),
    );

    if (!first) continue;

    for (const result of await db.batch([first, ...rest])) {
      const row = result[0];

      if (row) {
        // crude heuristic: if createdAt is within the last 5 seconds, it's a fresh row.
        const ageMs = Date.now() - new Date(row.createdAt).getTime();

        if (ageMs < 5000) inserted++;
        else updated++;
      }
    }
  }

  return { ok: true, total: lessons.length, inserted, updated };
});
