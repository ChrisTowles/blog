import { z } from 'zod';

defineRouteMeta({
  openAPI: {
    description:
      'Reset a loan application for re-review. Deletes existing reviews and resets status to intake.',
    tags: ['loan'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Login required' });
  }
  const userId = session.user.id;

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);

  const db = useDrizzle();

  const application = await db.query.loanApplications.findFirst({
    where: (app, { eq: e }) => and(e(app.id, id), e(app.userId, userId)),
  });

  if (!application) {
    throw createError({ statusCode: 404, statusMessage: 'Application not found' });
  }

  // Delete existing reviews
  await db.delete(tables.loanReviews).where(eq(tables.loanReviews.applicationId, id));

  // Reset status to intake
  await db
    .update(tables.loanApplications)
    .set({ status: 'intake' })
    .where(eq(tables.loanApplications.id, id));

  return { success: true };
});
