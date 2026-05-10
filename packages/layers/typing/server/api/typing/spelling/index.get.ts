/**
 * GET /api/typing/spelling?learnerId=&weekOf=
 *
 * Lists this learner's spelling lists, optionally filtered to a single
 * weekOf. Caller must be a guardian.
 */
import { z } from 'zod';
import { and, desc, eq } from 'drizzle-orm';
import type { SpellingList } from '../../../../../../blog/shared/typing-types';
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

  return { lists };
});
