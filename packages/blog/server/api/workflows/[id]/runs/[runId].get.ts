import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Get run details with all node execution results', tags: ['workflows'] },
});

export default defineEventHandler(async (event) => {
  const { id, runId } = await getValidatedRouterParams(
    event,
    z.object({ id: z.string(), runId: z.string() }).parse,
  );
  await requireWorkflowOwner(event, id);
  const db = useDrizzle();

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
