/**
 * GET /api/typing/spelling?learnerId=&weekOf=
 *
 * Lists this learner's spelling lists, optionally filtered to a single
 * weekOf. The response also includes per-word mastery progress keyed by
 * list id so the UI can render mastery counts in one round-trip. Caller
 * must be a guardian.
 */
import { z } from 'zod';
import { and, desc, eq, inArray } from 'drizzle-orm';
import type { SpellingList, SpellingProgress } from '../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../utils/typing/require-guardian';

const querySchema = z.object({
  learnerId: z.coerce.number().int().positive(),
  weekOf: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const { learnerId, weekOf } = await getValidatedQuery(event, querySchema.parse);
  await requireGuardian(event, { learnerId });

  const db = useDrizzle();
  const baseWhere = eq(tables.typingSpellingLists.learnerId, learnerId);
  const where = weekOf ? and(baseWhere, eq(tables.typingSpellingLists.weekOf, weekOf)) : baseWhere;
  const rows = await db
    .select()
    .from(tables.typingSpellingLists)
    .where(where)
    .orderBy(desc(tables.typingSpellingLists.weekOf));

  const lists: SpellingList[] = rows.map((r) => ({
    id: r.id,
    learnerId: r.learnerId,
    weekOf: typeof r.weekOf === 'string' ? r.weekOf : new Date(r.weekOf).toISOString().slice(0, 10),
    words: r.words,
    source: r.source as 'paste' | 'type' | 'image',
    sourceImageUrl: r.sourceImageUrl,
    createdBy: r.createdBy,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  // Fetch progress rows for all returned lists in a single query so the
  // UI can render mastery counts without an N+1 fetch.
  const ids = lists.map((l) => l.id);
  const progressByList: Record<number, SpellingProgress[]> = {};
  if (ids.length > 0) {
    const progressRows = await db
      .select()
      .from(tables.typingSpellingProgress)
      .where(inArray(tables.typingSpellingProgress.spellingListId, ids));
    for (const p of progressRows) {
      const bucket = (progressByList[p.spellingListId] ??= []);
      bucket.push({
        word: p.word,
        consecutiveCorrect: p.consecutiveCorrect,
        mastered: p.mastered,
        masteredAt: p.masteredAt ? p.masteredAt.toISOString() : null,
      });
    }
  }

  return { lists, progressByList };
});
