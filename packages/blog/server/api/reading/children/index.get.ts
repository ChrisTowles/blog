export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const db = useDrizzle();
  const children = await db.query.childProfiles.findMany({
    where: (c, { eq }) => eq(c.userId, session.user!.id),
  });

  return children;
});
