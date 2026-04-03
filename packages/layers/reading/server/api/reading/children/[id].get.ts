import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.coerce.number() }).parse);
  const db = useDrizzle();

  const child = await db.query.childProfiles.findFirst({
    where: (c, { eq, and: a }) => a(eq(c.id, id), eq(c.userId, session.user!.id)),
  });

  if (!child) {
    throw createError({ statusCode: 404, message: 'Child not found' });
  }

  return child;
});
