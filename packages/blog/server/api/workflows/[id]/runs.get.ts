import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'List execution runs for a workflow', tags: ['workflows'] },
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

  const runs = await db
    .select()
    .from(tables.workflowRuns)
    .where(eq(tables.workflowRuns.workflowId, id))
    .orderBy(desc(tables.workflowRuns.createdAt))
    .limit(50);

  return runs;
});
