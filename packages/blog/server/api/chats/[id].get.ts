export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  const { id } = getRouterParams(event);

  const chat = await useDrizzle().query.chats.findFirst({
    where: (c, { eq }) => and(eq(c.id, id as string), eq(c.userId, session.user?.id || session.id)),
    with: {
      messages: true,
    },
  });

  return chat;
});
