import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string().min(1) }).parse);

  const chat = await useDrizzle().query.chats.findFirst({
    where: (c, { eq }) => and(eq(c.id, id), eq(c.userId, session.user?.id || session.id)),
    with: {
      messages: true,
    },
  });

  return chat;
});
