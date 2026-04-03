import { eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Delete a workflow', tags: ['workflows'] },
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  await requireWorkflowOwner(event, id);
  const db = useDrizzle();

  // CASCADE deletes nodes, edges, runs, node_executions
  await db.delete(tables.workflows).where(eq(tables.workflows.id, id));

  return { ok: true };
});
