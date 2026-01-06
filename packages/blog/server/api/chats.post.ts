/**
 * Create a new chat record.
 *
 * POST /api/chats
 * Body: { input?: string } - optional, for future use
 *
 * Creates the chat in database, then client navigates to /chat/[id]
 * where WebSocket takes over for actual AI conversation.
 */
export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    const db = useDrizzle()

    // Get user ID (authenticated or anonymous session)
    const userId = session.user?.id || session.id
    if (!userId) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    // Create chat record (no initial message - that's sent via WebSocket)
    const [chat] = await db.insert(tables.chats).values({
        userId
    }).returning({ id: tables.chats.id })

    if (!chat) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to create chat' })
    }

    return { id: chat.id }
})
