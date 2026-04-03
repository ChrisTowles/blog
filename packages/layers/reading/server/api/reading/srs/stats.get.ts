import { z } from 'zod';
import { count, lte, gt, gte } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { childId } = await getValidatedQuery(
    event,
    z.object({ childId: z.coerce.number() }).parse,
  );

  await requireChildOwner(event, childId);
  const db = useDrizzle();

  const now = new Date();
  const childFilter = eq(tables.srsCards.childId, childId);

  const [dueResult, newResult, masteredResult, totalResult] = await Promise.all([
    db
      .select({ value: count() })
      .from(tables.srsCards)
      .where(and(childFilter, lte(tables.srsCards.due, now))),
    db
      .select({ value: count() })
      .from(tables.srsCards)
      .where(and(childFilter, eq(tables.srsCards.reps, 0))),
    db
      .select({ value: count() })
      .from(tables.srsCards)
      .where(and(childFilter, gt(tables.srsCards.stability, 10), gte(tables.srsCards.reps, 3))),
    db.select({ value: count() }).from(tables.srsCards).where(childFilter),
  ]);

  return {
    due: dueResult[0]?.value ?? 0,
    newCards: newResult[0]?.value ?? 0,
    mastered: masteredResult[0]?.value ?? 0,
    total: totalResult[0]?.value ?? 0,
  };
});
