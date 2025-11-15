import { pgTable, varchar, timestamp, index, uniqueIndex, jsonb } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

const timestamps = {
  createdAt: timestamp({ mode: 'date' }).$defaultFn(() => new Date()).notNull()
}

export const users = pgTable('users', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 100 }).notNull(),
  avatar: varchar({ length: 500 }).notNull(),
  username: varchar({ length: 50 }).notNull(),
  provider: varchar({ length: 20 }).notNull(), // 'github'
  providerId: varchar({ length: 50 }).notNull(),
  ...timestamps
}, table => [
  uniqueIndex('users_provider_id_idx').on(table.provider, table.providerId)
])

export const usersRelations = relations(users, ({ many }) => ({
  chats: many(chats)
}))

export const chats = pgTable('chats', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar({ length: 200 }),
  userId: varchar({ length: 36 }).notNull(),
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

export const messages = pgTable('messages', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  chatId: varchar({ length: 36 }).notNull().references(() => chats.id, { onDelete: 'cascade' }),
  role: varchar({ length: 20 }).notNull(), // 'user' | 'assistant'
  parts: jsonb(),
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
