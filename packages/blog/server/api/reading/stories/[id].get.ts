import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.coerce.number() }).parse);
  const db = useDrizzle();

  const story = await db.query.stories.findFirst({
    where: (s, { eq }) => eq(s.id, id),
  });

  if (!story) {
    throw createError({ statusCode: 404, message: 'Story not found' });
  }

  return story;
});
