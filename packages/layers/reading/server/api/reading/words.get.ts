import { z } from 'zod';
import { gt, gte } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { childId } = await getValidatedQuery(
    event,
    z.object({ childId: z.coerce.number() }).parse,
  );

  await requireChildOwner(event, childId);
  const db = useDrizzle();

  const masteredCards = await db
    .select({
      id: tables.srsCards.id,
      front: tables.srsCards.front,
      back: tables.srsCards.back,
      cardType: tables.srsCards.cardType,
      stability: tables.srsCards.stability,
      reps: tables.srsCards.reps,
    })
    .from(tables.srsCards)
    .where(
      and(
        eq(tables.srsCards.childId, childId),
        gt(tables.srsCards.stability, 10),
        gte(tables.srsCards.reps, 3),
      ),
    )
    .orderBy(tables.srsCards.front);

  return masteredCards;
});
