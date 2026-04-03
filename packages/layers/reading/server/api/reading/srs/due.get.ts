import { z } from 'zod';
import { lte } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { childId } = await getValidatedQuery(
    event,
    z.object({ childId: z.coerce.number() }).parse,
  );

  await requireChildOwner(event, childId);
  const db = useDrizzle();

  const cards = await db.query.srsCards.findMany({
    where: (c, { eq, and: a }) => a(eq(c.childId, childId), lte(c.due, new Date())),
    orderBy: (c, { asc }) => [asc(c.due)],
    limit: 20,
  });

  return cards;
});
