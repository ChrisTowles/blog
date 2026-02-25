import { z } from 'zod';
import { LOAN_STATUSES } from '~~/shared/loan-types';

defineRouteMeta({
  openAPI: {
    description: 'Manually update loan application status (approve, deny, flag).',
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
  const { status } = await readValidatedBody(
    event,
    z.object({ status: z.enum(LOAN_STATUSES) }).parse,
  );

  const db = useDrizzle();

  const application = await db.query.loanApplications.findFirst({
    where: (app, { eq: e }) => and(e(app.id, id), e(app.userId, userId)),
  });

  if (!application) {
    throw createError({ statusCode: 404, statusMessage: 'Application not found' });
  }

  await db
    .update(tables.loanApplications)
    .set({ status })
    .where(eq(tables.loanApplications.id, id));

  return { success: true, status };
});
