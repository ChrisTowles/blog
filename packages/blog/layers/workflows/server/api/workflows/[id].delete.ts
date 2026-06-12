import { eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Delete a workflow', tags: ['workflows'] },
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const workflow = await requireWorkflowOwner(event, id);
  if (workflow.isPublished) {
    throw createError({ statusCode: 403, message: 'Cannot delete a template workflow' });
  }
  const db = useDrizzle();

  // CASCADE deletes nodes, edges, runs, node_executions
  await db.delete(tables.workflows).where(eq(tables.workflows.id, id));

  return { ok: true };
});
