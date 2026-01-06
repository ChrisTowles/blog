/**
 * Chat persistence for WebSocket handler
 *
 * Handles all database operations for WebSocket-based chat:
 * - Saving user and assistant messages
 * - Updating SDK session ID
 * - Updating connection status
 * - Generating and saving chat titles
 */
import { eq, and } from 'drizzle-orm'
import type { MessagePart } from '~~/shared/chat-types'

/**
 * Options for saving a user message
 */
export interface SaveUserMessageOptions {
    chatId: string
    userId: string
    content: string
}

/**
 * Options for saving an assistant message
 */
export interface SaveAssistantMessageOptions {
    chatId: string
    parts: MessagePart[]
}

/**
 * Options for generating a chat title
 */
export interface GenerateTitleOptions {
    chatId: string
    userId: string
    firstUserMessage: string
}

/**
 * Save a user message to the database
 */
export async function saveUserMessage(options: SaveUserMessageOptions): Promise<string> {
    const db = useDrizzle()

    // Verify chat belongs to user
    const chat = await db.query.chats.findFirst({
        where: (chat, { eq: e }) => and(e(chat.id, options.chatId), e(chat.userId, options.userId))
    })

    if (!chat) {
        throw new Error('Chat not found or unauthorized')
    }

    const messageId = crypto.randomUUID()

    await db.insert(tables.messages).values({
        id: messageId,
        chatId: options.chatId,
        role: 'user',
        parts: [{ type: 'text', text: options.content }]
    })

    // Update last activity
    await db.update(tables.chats)
        .set({ lastActivityAt: new Date() })
        .where(eq(tables.chats.id, options.chatId))

    return messageId
}

/**
 * Save an assistant message to the database
 */
export async function saveAssistantMessage(options: SaveAssistantMessageOptions): Promise<string> {
    const db = useDrizzle()

    const messageId = crypto.randomUUID()

    await db.insert(tables.messages).values({
        id: messageId,
        chatId: options.chatId,
        role: 'assistant',
        parts: options.parts
    })

    // Update last activity
    await db.update(tables.chats)
        .set({ lastActivityAt: new Date() })
        .where(eq(tables.chats.id, options.chatId))

    return messageId
}

/**
 * Update SDK session ID for a chat
 */
export async function updateSdkSessionId(chatId: string, sdkSessionId: string): Promise<void> {
    const db = useDrizzle()

    await db.update(tables.chats)
        .set({
            sdkSessionId,
            lastActivityAt: new Date()
        })
        .where(eq(tables.chats.id, chatId))
}

/**
 * Update connection status for a chat
 */
export async function updateConnectionStatus(
    chatId: string,
    status: 'connected' | 'disconnected' | null
): Promise<void> {
    const db = useDrizzle()

    await db.update(tables.chats)
        .set({
            connectionStatus: status,
            lastActivityAt: new Date()
        })
        .where(eq(tables.chats.id, chatId))
}

/**
 * Generate and save a chat title based on the first user message
 * Returns null if the chat already has a title
 */
export async function generateAndSaveTitle(options: GenerateTitleOptions): Promise<string | null> {
    const db = useDrizzle()
    const config = useRuntimeConfig()

    // Check if chat exists and needs a title
    const chat = await db.query.chats.findFirst({
        where: (chat, { eq: e }) => and(e(chat.id, options.chatId), e(chat.userId, options.userId))
    })

    if (!chat) {
        throw new Error('Chat not found or unauthorized')
    }

    // Skip if already has a title
    if (chat.title) {
        return null
    }

    // Generate title using fast model
    const client = getAnthropicClient()
    const titleResponse = await client.messages.create({
        model: config.public.model_fast as string,
        max_tokens: 50,
        system: `You are a title generator for a chat:
- Generate a short title based on the first user's message
- The title should be less than 30 characters long
- The title should be a summary of the user's message
- Do not use quotes (' or ") or colons (:) or any other punctuation
- Do not use markdown, just plain text`,
        messages: [{ role: 'user', content: options.firstUserMessage }]
    })

    const titleContent = titleResponse.content[0]
    if (titleContent?.type !== 'text') {
        return null
    }

    const title = titleContent.text.slice(0, 30)

    // Save title to database
    await db.update(tables.chats)
        .set({ title })
        .where(eq(tables.chats.id, options.chatId))

    return title
}

/**
 * Get SDK session ID for a chat (for resume)
 */
export async function getSdkSessionId(chatId: string): Promise<string | null> {
    const db = useDrizzle()

    const chat = await db.query.chats.findFirst({
        where: (chat, { eq: e }) => e(chat.id, chatId),
        columns: { sdkSessionId: true }
    })

    return chat?.sdkSessionId ?? null
}

/**
 * Check if chat exists and optionally verify ownership.
 *
 * Note: In WebSocket context we can't reliably get the user session,
 * so we use "knowledge of chat ID = access" security model (like "anyone with link").
 * For stricter security, set verifyOwnership=true and provide the real userId.
 */
export async function verifyChatOwnership(
    chatId: string,
    userId?: string,
    verifyOwnership = false
): Promise<{ exists: boolean; ownerId?: string }> {
    const db = useDrizzle()

    const chat = await db.query.chats.findFirst({
        where: (chat, { eq: e }) => e(chat.id, chatId),
        columns: { id: true, userId: true }
    })

    if (!chat) {
        return { exists: false }
    }

    // If ownership verification requested, check userId matches
    if (verifyOwnership && userId && chat.userId !== userId) {
        return { exists: false }
    }

    return { exists: true, ownerId: chat.userId }
}
