import { z } from 'zod';

const bodySchema = z.object({
  childId: z.number(),
  storyId: z.number(),
  mode: z.enum(['listen', 'guided', 'independent']),
  wcpm: z.number().optional(),
  accuracy: z.number().min(0).max(1).optional(),
  duration: z.number().int(),
  miscues: z.array(z.any()).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const [readingSession] = await db
    .insert(tables.readingSessions)
    .values({
      childId: body.childId,
      storyId: body.storyId,
      mode: body.mode,
      wcpm: body.wcpm,
      accuracy: body.accuracy,
      duration: body.duration,
      miscues: body.miscues,
    })
    .returning();

  return readingSession;
});
