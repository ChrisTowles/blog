import { z } from 'zod';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({ id: z.coerce.number() }).parse);
  const db = useDrizzle();

  const story = await db.query.stories.findFirst({
    where: (s, { eq: e }) => e(s.id, id),
  });

  if (!story) {
    throw createError({ statusCode: 404, message: 'Story not found' });
  }

  if (!story.childId) {
    throw createError({ statusCode: 400, message: 'Story has no associated child' });
  }

  await requireChildOwner(event, story.childId);

  const [updated] = await db
    .update(tables.stories)
    .set({ favorited: !story.favorited })
    .where(eq(tables.stories.id, id))
    .returning({ id: tables.stories.id, favorited: tables.stories.favorited });

  return updated;
});
