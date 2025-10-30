import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

const timestamps = {
  createdAt: integer({ mode: 'timestamp' }).$defaultFn(() => new Date()).notNull()
}

export const users = sqliteTable('users', {
  id: text({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text({ length: 255 }).notNull(),
  name: text({ length: 100 }).notNull(),
  avatar: text({ length: 500 }).notNull(),
  username: text({ length: 50 }).notNull(),
  provider: text({ length: 20 }).notNull(), // 'github'
  providerId: text({ length: 50 }).notNull(),
  ...timestamps
}, table => [
  uniqueIndex('users_provider_id_idx').on(table.provider, table.providerId)
])

export const usersRelations = relations(users, ({ many }) => ({
  chats: many(chats)
}))

export const chats = sqliteTable('chats', {
  id: text({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text({ length: 200 }),
  userId: text({ length: 36 }).notNull(),
  ...timestamps
}, table => [
  index('chats_user_id_idx').on(table.userId)
])

export const chatsRelations = relations(chats, ({ one, many }) => ({
  user: one(users, {
    fields: [chats.userId],
    references: [users.id]
  }),
  messages: many(messages)
}))

export const messages = sqliteTable('messages', {
  id: text({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  chatId: text({ length: 36 }).notNull().references(() => chats.id, { onDelete: 'cascade' }),
  role: text({ length: 20 }).notNull(), // 'user' | 'assistant'
  parts: text({ mode: 'json' }),
  ...timestamps
}, table => [
  index('messages_chat_id_idx').on(table.chatId)
])

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id]
  })
}))
