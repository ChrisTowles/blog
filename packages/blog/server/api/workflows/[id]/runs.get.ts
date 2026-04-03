import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'List execution runs for a workflow', tags: ['workflows'] },
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  await requireWorkflowOwner(event, id);
  const db = useDrizzle();

  const runs = await db
    .select()
    .from(tables.workflowRuns)
    .where(eq(tables.workflowRuns.workflowId, id))
    .orderBy(desc(tables.workflowRuns.createdAt))
    .limit(50);

  return runs;
});
