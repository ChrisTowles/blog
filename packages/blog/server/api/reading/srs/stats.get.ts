import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { childId } = await getValidatedQuery(
    event,
    z.object({ childId: z.coerce.number() }).parse,
  );
  const db = useDrizzle();

  const allCards = await db.query.srsCards.findMany({
    where: (c, { eq }) => eq(c.childId, childId),
  });

  const now = new Date();
  const due = allCards.filter((c) => new Date(c.due) <= now).length;
  const newCards = allCards.filter((c) => c.reps === 0).length;
  // Mastered = 3+ consecutive good ratings approximated by high stability
  const mastered = allCards.filter((c) => c.stability > 10 && c.reps >= 3).length;

  return {
    due,
    newCards,
    mastered,
    total: allCards.length,
  };
});
