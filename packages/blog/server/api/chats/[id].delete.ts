export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const userId = session.user?.id
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const { id } = getRouterParams(event)

  const db = useDrizzle()

  return await db.delete(tables.chats)
    .where(and(eq(tables.chats.id, id as string), eq(tables.chats.userId, userId)))
    .returning()
})
