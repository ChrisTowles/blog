export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  // const userId = session.user?.id
  // if (!userId) {
  //   throw createError({
  //     statusCode: 401,
  //     statusMessage: 'Unauthorized'
  //   })
  // }

  const { id } = getRouterParams(event)

  const chat = await useDrizzle().query.chats.findFirst({
    where: (chat, { eq }) => and(eq(chat.id, id as string), eq(chat.userId, session.user?.id || session.id)),
    with: {
      messages: true
    }
  })

  return chat
})
