import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Start workflow execution, returns runId', tags: ['workflows'] },
});

const bodySchema = z.object({
  input: z.record(z.string(), z.unknown()).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const { input } = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const [workflow] = await db
    .select({ id: tables.workflows.id })
    .from(tables.workflows)
    .where(and(eq(tables.workflows.id, id), eq(tables.workflows.ownerId, session.user.id)));

  if (!workflow) {
    throw createError({ statusCode: 404, message: 'Workflow not found' });
  }

  const [run] = await db
    .insert(tables.workflowRuns)
    .values({
      workflowId: id,
      status: 'pending',
      inputData: input ? JSON.stringify(input) : null,
    })
    .returning();

  if (!run) {
    throw createError({ statusCode: 500, message: 'Failed to create run' });
  }

  return { runId: run.id };
});
