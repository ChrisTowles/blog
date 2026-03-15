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

  const stories = await db.query.stories.findMany({
    where: (s, { eq }) => eq(s.childId, childId),
    orderBy: (s, { desc }) => [desc(s.createdAt)],
  });

  return stories;
});
