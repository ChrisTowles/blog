import { desc, eq } from 'drizzle-orm';

defineRouteMeta({
  openAPI: { description: 'List workflows owned by the current user', tags: ['workflows'] },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const db = useDrizzle();
  const rows = await db
    .select()
    .from(tables.workflows)
    .where(eq(tables.workflows.ownerId, session.user.id))
    .orderBy(desc(tables.workflows.updatedAt));

  return rows;
});
