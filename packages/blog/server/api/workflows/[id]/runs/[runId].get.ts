import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Get run details with all node execution results', tags: ['workflows'] },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id, runId } = await getValidatedRouterParams(
    event,
    z.object({ id: z.string(), runId: z.string() }).parse,
  );
  const db = useDrizzle();

  const [workflow] = await db
    .select({ id: tables.workflows.id })
    .from(tables.workflows)
    .where(and(eq(tables.workflows.id, id), eq(tables.workflows.ownerId, session.user.id)));

  if (!workflow) {
    throw createError({ statusCode: 404, message: 'Workflow not found' });
  }

  const [run] = await db
    .select()
    .from(tables.workflowRuns)
    .where(and(eq(tables.workflowRuns.id, runId), eq(tables.workflowRuns.workflowId, id)));

  if (!run) {
    throw createError({ statusCode: 404, message: 'Run not found' });
  }

  const nodeExecs = await db
    .select()
    .from(tables.nodeExecutions)
    .where(eq(tables.nodeExecutions.runId, runId));

  return { run, nodeExecutions: nodeExecs };
});
