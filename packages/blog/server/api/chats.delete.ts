export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const db = useDrizzle()

  const userId = session.user?.id
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  return await db.delete(tables.chats)
    .where(eq(tables.chats.userId, userId))
    .returning()
})
