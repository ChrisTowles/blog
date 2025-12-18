import { pgTable, varchar, pgEnum, timestamp, index, uniqueIndex, json, text, integer } from 'drizzle-orm/pg-core'
import { vector } from 'drizzle-orm/pg-core/columns/vector_extension/vector'
import { relations } from 'drizzle-orm'

const timestamps = {
  createdAt: timestamp().defaultNow().notNull()
}

export const providerEnum = pgEnum('provider', ['github'])
export const roleEnum = pgEnum('role', ['user', 'assistant'])

export const users = pgTable('users', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 100 }).notNull(),
  avatar: varchar({ length: 500 }).notNull(),
  username: varchar({ length: 50 }).notNull(),
  provider: providerEnum().notNull(),
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
  role: roleEnum().notNull(),
  parts: json(),
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

// RAG Tables for contextual retrieval
export const documents = pgTable('documents', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar({ length: 200 }).notNull().unique(),
  title: varchar({ length: 500 }).notNull(),
  path: varchar({ length: 500 }).notNull(), // source file path
  url: varchar({ length: 500 }).notNull(), // e.g., "/blog/tips-for-claude-code"
  contentHash: varchar({ length: 64 }).notNull(), // SHA-256 for change detection
  ...timestamps,
  updatedAt: timestamp().defaultNow().notNull()
}, table => [
  index('documents_slug_idx').on(table.slug)
])

export const documentsRelations = relations(documents, ({ many }) => ({
  chunks: many(documentChunks)
}))

// Titan Text v2 produces 1024-dimensional embeddings
const EMBEDDING_DIMENSIONS = 1024

export const documentChunks = pgTable('document_chunks', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  documentId: varchar({ length: 36 }).notNull().references(() => documents.id, { onDelete: 'cascade' }),
  chunkIndex: integer().notNull(),
  content: text().notNull(), // original chunk text
  contextualContent: text().notNull(), // Claude-generated situating context
  embedding: vector({ dimensions: EMBEDDING_DIMENSIONS }), // pgvector for semantic search
  // tsvector generated column for BM25 full-text search
  searchVector: text().$type<string>(), // We'll use raw SQL for tsvector
  ...timestamps
}, table => [
  index('document_chunks_document_id_idx').on(table.documentId),
  index('document_chunks_chunk_index_idx').on(table.documentId, table.chunkIndex)
  // HNSW and GIN indexes will be created in migration SQL
])

export const documentChunksRelations = relations(documentChunks, ({ one }) => ({
  document: one(documents, {
    fields: [documentChunks.documentId],
    references: [documents.id]
  })
}))

// Reading App Tables
export const readingProfiles = pgTable('reading_profiles', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 100 }).notNull(),
  avatar: varchar({ length: 20 }), // emoji or avatar ID
  lastActiveAt: timestamp().defaultNow().notNull(),
  ...timestamps
})

export const readingProfilesRelations = relations(readingProfiles, ({ many }) => ({
  progress: many(readingProgress),
  sessions: many(readingSessions)
}))

export const readingProgress = pgTable('reading_progress', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  profileId: varchar({ length: 36 }).notNull().references(() => readingProfiles.id, { onDelete: 'cascade' }),
  wordId: varchar({ length: 50 }).notNull(), // references static word data
  attempts: integer().default(0).notNull(),
  successes: integer().default(0).notNull(),
  lastPracticedAt: timestamp().defaultNow().notNull(),
  ...timestamps
}, table => [
  index('reading_progress_profile_idx').on(table.profileId),
  uniqueIndex('reading_progress_profile_word_idx').on(table.profileId, table.wordId)
])

export const readingProgressRelations = relations(readingProgress, ({ one }) => ({
  profile: one(readingProfiles, {
    fields: [readingProgress.profileId],
    references: [readingProfiles.id]
  })
}))

export const readingSessions = pgTable('reading_sessions', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  profileId: varchar({ length: 36 }).notNull().references(() => readingProfiles.id, { onDelete: 'cascade' }),
  wordsCompleted: integer().default(0).notNull(),
  duration: integer(), // seconds
  ...timestamps
}, table => [
  index('reading_sessions_profile_idx').on(table.profileId)
])

export const readingSessionsRelations = relations(readingSessions, ({ one }) => ({
  profile: one(readingProfiles, {
    fields: [readingSessions.profileId],
    references: [readingProfiles.id]
  })
}))
