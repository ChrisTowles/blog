/**
 * Admin-only seed endpoint for the typing curriculum.
 *
 * Idempotent: upserts each built-in lesson by `slug`. Re-running has no
 * effect beyond ensuring the curriculum is in sync with the code.
 *
 * Auth: requires `x-admin-token` header to match `ADMIN_SEED_TOKEN` env.
 */
import { and, eq, notInArray } from 'drizzle-orm';
import { getBuiltInLessons } from '../../utils/typing/curriculum';

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

  for (const lesson of lessons) {
    const result = await db
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
      .returning({ id: tables.typingLessons.id, createdAt: tables.typingLessons.createdAt });

    const row = result[0];
    if (row) {
      // crude heuristic: if createdAt is within the last 5 seconds, it's a fresh row.
      const ageMs = Date.now() - new Date(row.createdAt).getTime();
      if (ageMs < 5000) inserted++;
      else updated++;
    }
  }

  // Hard cutover: drop system lessons whose slug no longer exists in the
  // curriculum (e.g. removed stage-1-sentence) so stale rows don't linger.
  const slugs = lessons.map((l) => l.slug);
  const removed = await db
    .delete(tables.typingLessons)
    .where(
      and(
        eq(tables.typingLessons.generatedBy, 'system'),
        notInArray(tables.typingLessons.slug, slugs),
      ),
    )
    .returning({ id: tables.typingLessons.id });

  return { ok: true, total: lessons.length, inserted, updated, removed: removed.length };
});
