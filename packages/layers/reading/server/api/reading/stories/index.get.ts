import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const { childId } = await getValidatedQuery(
    event,
    z.object({ childId: z.coerce.number() }).parse,
  );

  await requireChildOwner(event, childId);
  const db = useDrizzle();

  const stories = await db.query.stories.findMany({
    where: (s, { eq }) => eq(s.childId, childId),
    orderBy: (s, { desc }) => [desc(s.createdAt)],
    columns: { content: false },
    limit: 50,
  });

  return stories;
});
