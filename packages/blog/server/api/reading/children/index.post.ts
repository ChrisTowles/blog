import { z } from 'zod';

const bodySchema = z.object({
  name: z.string().min(1).max(100),
  birthYear: z.number().int().min(2010).max(2025),
  interests: z.array(z.string()).default([]),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const [child] = await db
    .insert(tables.childProfiles)
    .values({
      userId: session.user.id,
      name: body.name,
      birthYear: body.birthYear,
      interests: body.interests,
    })
    .returning();

  return child;
});
