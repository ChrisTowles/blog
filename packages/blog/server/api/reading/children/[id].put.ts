import { z } from 'zod';

const bodySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  interests: z.array(z.string()).optional(),
  currentPhase: z.number().int().min(1).max(4).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.coerce.number() }).parse);
  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  // Verify ownership
  const existing = await db.query.childProfiles.findFirst({
    where: (c, { eq, and: a }) => a(eq(c.id, id), eq(c.userId, session.user!.id)),
  });
  if (!existing) {
    throw createError({ statusCode: 404, message: 'Child not found' });
  }

  const [updated] = await db
    .update(tables.childProfiles)
    .set(body)
    .where(eq(tables.childProfiles.id, id))
    .returning();

  return updated;
});
