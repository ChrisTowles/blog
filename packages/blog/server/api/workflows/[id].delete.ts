import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Delete a workflow', tags: ['workflows'] },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const db = useDrizzle();

  const [workflow] = await db
    .select({ id: tables.workflows.id })
    .from(tables.workflows)
    .where(and(eq(tables.workflows.id, id), eq(tables.workflows.ownerId, session.user.id)));

  if (!workflow) {
    throw createError({ statusCode: 404, message: 'Workflow not found' });
  }

  // CASCADE deletes nodes, edges, runs, node_executions
  await db.delete(tables.workflows).where(eq(tables.workflows.id, id));

  return { ok: true };
});
