import { z } from 'zod';

defineRouteMeta({
  openAPI: {
    description: 'Get loan application state and reviews.',
    tags: ['loan'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const userId = session.user?.id || session.id;

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);

  const db = useDrizzle();

  const application = await db.query.loanApplications.findFirst({
    where: (app, { eq }) => and(eq(app.id, id), eq(app.userId, userId)),
    with: {
      reviews: true,
      messages: true,
    },
  });

  if (!application) {
    throw createError({ statusCode: 404, statusMessage: 'Application not found' });
  }

  return application;
});
