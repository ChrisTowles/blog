import { desc, eq, or } from 'drizzle-orm';

defineRouteMeta({
  openAPI: {
    description: 'List templates (public) and user-owned workflows (authenticated)',
    tags: ['workflows'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const db = useDrizzle();

  const conditions = [eq(tables.workflows.isPublished, 1)];
  if (session.user) {
    conditions.push(eq(tables.workflows.ownerId, session.user.id));
  }

  const rows = await db
    .select({
      id: tables.workflows.id,
      name: tables.workflows.name,
      description: tables.workflows.description,
      version: tables.workflows.version,
      isTemplate: tables.workflows.isPublished,
      updatedAt: tables.workflows.updatedAt,
    })
    .from(tables.workflows)
    .where(or(...conditions))
    .orderBy(desc(tables.workflows.updatedAt));

  return rows;
});
