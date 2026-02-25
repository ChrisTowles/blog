defineRouteMeta({
  openAPI: {
    description: 'List all loan applications with reviews and user info',
    tags: ['admin', 'loan'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const db = useDrizzle();

  const applications = await db.query.loanApplications.findMany({
    with: {
      reviews: true,
      user: {
        columns: { id: true, name: true, email: true },
      },
    },
    orderBy: (app, { desc }) => [desc(app.createdAt)],
  });

  return { applications };
});
