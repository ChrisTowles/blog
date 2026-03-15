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

  const sessions = await db.query.readingSessions.findMany({
    where: (s, { eq }) => eq(s.childId, childId),
    orderBy: (s, { desc }) => [desc(s.completedAt)],
    limit: 50,
  });

  return sessions;
});
