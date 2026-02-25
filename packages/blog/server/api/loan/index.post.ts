defineRouteMeta({
  openAPI: {
    description: 'Create a new loan application.',
    tags: ['loan'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Login required' });
  }
  const userId = session.user.id;

  const db = useDrizzle();

  const application = await db
    .insert(tables.loanApplications)
    .values({
      userId,
      status: 'intake',
      applicationData: {},
    })
    .returning();

  return { id: application[0]!.id };
});
