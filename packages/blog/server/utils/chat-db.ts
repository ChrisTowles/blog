import type Anthropic from '@anthropic-ai/sdk'
import { eq } from 'drizzle-orm'
import * as schema from '../database/schema'

// Generic database type that accepts any Drizzle database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DbType = any

export interface Chat {
  id: string
  title: string | null
  userId: string
  createdAt: Date
}

export interface ChatWithMessages extends Chat {
  messages: Array<{
    id: string
    chatId: string
    role: string
    content: unknown
    createdAt: Date
  }>
}

/**
 * Find a chat by ID and user ID
 */
export async function findChatByIdAndUser(
  db: DbType,
  chatId: string,
  userId: string
): Promise<ChatWithMessages | undefined> {
  const chat = await db.query.chats.findFirst({
    where: (chat, { eq, and }) => and(
      eq(chat.id, chatId),
      eq(chat.userId, userId)
    ),
    with: {
      messages: true
    }
  })

  return chat as ChatWithMessages | undefined
}

/**
 * Update chat title
 */
export async function updateChatTitle(
  db: DbType,
  chatId: string,
  title: string
): Promise<void> {
  await db
    .update(schema.chats)
    .set({ title })
    .where(eq(schema.chats.id, chatId))
}

/**
 * Save user message to database
 */
export async function saveUserMessage(
  db: DbType,
  chatId: string,
  content: string | Anthropic.ContentBlockParam[]
): Promise<void> {
  await db.insert(schema.messages).values({
    chatId,
    role: 'user',
    content
  })
}

/**
 * Save assistant message to database
 */
export async function saveAssistantMessage(
  db: DbType,
  chatId: string,
  content: Anthropic.ContentBlock[]
): Promise<void> {
  await db.insert(schema.messages).values({
    chatId,
    role: 'assistant',
    content
  })
}

/**
 * Check if chat needs a title
 */
export function chatNeedsTitle(chat: Chat): boolean {
  return !chat.title || chat.title.trim() === ''
}

/**
 * Check if message should be saved
 * Only save user messages that aren't the first message
 */
export function shouldSaveUserMessage(
  messages: Array<{ role: string }>,
  lastMessage: { role: string }
): boolean {
  return lastMessage.role === 'user' && messages.length > 1
}
