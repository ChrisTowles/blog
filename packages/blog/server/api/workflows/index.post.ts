import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Create a new empty workflow', tags: ['workflows'] },
});

const createSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { name, description } = await readValidatedBody(event, createSchema.parse);
  const db = useDrizzle();

  const [workflow] = await db
    .insert(tables.workflows)
    .values({ name, description, ownerId: session.user.id })
    .returning();

  if (!workflow) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create workflow' });
  }

  return { id: workflow.id };
});
