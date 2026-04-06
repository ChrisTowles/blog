import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Start workflow execution, returns runId', tags: ['workflows'] },
});

const bodySchema = z.object({
  input: z.record(z.string(), z.unknown()).optional(),
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const { input } = await readValidatedBody(event, bodySchema.parse);
  await requireWorkflowOrTemplate(event, id);
  const db = useDrizzle();

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
