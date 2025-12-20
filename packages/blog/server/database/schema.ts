import { pgTable, varchar, pgEnum, timestamp, index, uniqueIndex, json, text, integer, boolean } from 'drizzle-orm/pg-core'
import { vector } from 'drizzle-orm/pg-core/columns/vector_extension/vector'
import { relations } from 'drizzle-orm'

const timestamps = {
  createdAt: timestamp().defaultNow().notNull()
}

export const providerEnum = pgEnum('provider', ['github'])
export const roleEnum = pgEnum('role', ['user', 'assistant'])

// ============================================
// Skills & Personas Schema
// ============================================

export const skills = pgTable('skills', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 100 }).notNull(),
  description: text().notNull(),
  systemPromptSegment: text().notNull(), // procedural knowledge for this skill
  toolsConfig: json().$type<string[]>().notNull().default([]), // enabled tool names
  isBuiltIn: boolean().notNull().default(false),
  priority: integer().notNull().default(10), // ordering for system prompt composition
  ...timestamps,
  updatedAt: timestamp().defaultNow().notNull()
}, table => [
  index('skills_slug_idx').on(table.slug)
])

export const personas = pgTable('personas', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 100 }).notNull(),
  description: text().notNull(),
  icon: varchar({ length: 100 }).notNull().default('i-lucide-user'), // Lucide icon name
  baseSystemPrompt: text().notNull(), // persona-specific intro
  isDefault: boolean().notNull().default(false),
  isBuiltIn: boolean().notNull().default(false),
  ...timestamps,
  updatedAt: timestamp().defaultNow().notNull()
}, table => [
  index('personas_slug_idx').on(table.slug)
])

// Junction table for persona -> skills (many-to-many)
export const personaSkills = pgTable('persona_skills', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  personaId: varchar({ length: 36 }).notNull().references(() => personas.id, { onDelete: 'cascade' }),
  skillId: varchar({ length: 36 }).notNull().references(() => skills.id, { onDelete: 'cascade' }),
  priority: integer().notNull().default(0) // ordering within persona
}, table => [
  index('persona_skills_persona_id_idx').on(table.personaId),
  index('persona_skills_skill_id_idx').on(table.skillId),
  uniqueIndex('persona_skills_unique_idx').on(table.personaId, table.skillId)
])

export const knowledgeBases = pgTable('knowledge_bases', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 100 }).notNull(),
  description: text().notNull(),
  filterCriteria: json().$type<KnowledgeBaseFilter>().notNull().default({}), // document filtering rules
  isBuiltIn: boolean().notNull().default(false),
  ...timestamps,
  updatedAt: timestamp().defaultNow().notNull()
}, table => [
  index('knowledge_bases_slug_idx').on(table.slug)
])

// Junction table for skill -> knowledge bases (many-to-many)
export const skillKnowledgeBases = pgTable('skill_knowledge_bases', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  skillId: varchar({ length: 36 }).notNull().references(() => skills.id, { onDelete: 'cascade' }),
  knowledgeBaseId: varchar({ length: 36 }).notNull().references(() => knowledgeBases.id, { onDelete: 'cascade' })
}, table => [
  index('skill_kb_skill_id_idx').on(table.skillId),
  index('skill_kb_kb_id_idx').on(table.knowledgeBaseId),
  uniqueIndex('skill_kb_unique_idx').on(table.skillId, table.knowledgeBaseId)
])

// Type for knowledge base filter criteria
export interface KnowledgeBaseFilter {
  slugPatterns?: string[] // e.g., ['ai-*', 'claude-*']
  titlePatterns?: string[]
  excludePatterns?: string[]
}

// Relations for skills system
export const skillsRelations = relations(skills, ({ many }) => ({
  personaSkills: many(personaSkills),
  skillKnowledgeBases: many(skillKnowledgeBases)
}))

export const personasRelations = relations(personas, ({ many }) => ({
  personaSkills: many(personaSkills)
}))

export const personaSkillsRelations = relations(personaSkills, ({ one }) => ({
  persona: one(personas, {
    fields: [personaSkills.personaId],
    references: [personas.id]
  }),
  skill: one(skills, {
    fields: [personaSkills.skillId],
    references: [skills.id]
  })
}))

export const knowledgeBasesRelations = relations(knowledgeBases, ({ many }) => ({
  skillKnowledgeBases: many(skillKnowledgeBases)
}))

export const skillKnowledgeBasesRelations = relations(skillKnowledgeBases, ({ one }) => ({
  skill: one(skills, {
    fields: [skillKnowledgeBases.skillId],
    references: [skills.id]
  }),
  knowledgeBase: one(knowledgeBases, {
    fields: [skillKnowledgeBases.knowledgeBaseId],
    references: [knowledgeBases.id]
  })
}))

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
  personaId: varchar({ length: 36 }).references(() => personas.id), // optional persona for this chat
  ...timestamps
}, table => [
  index('chats_user_id_idx').on(table.userId),
  index('chats_persona_id_idx').on(table.personaId)
])

export const chatsRelations = relations(chats, ({ one, many }) => ({
  user: one(users, {
    fields: [chats.userId],
    references: [users.id]
  }),
  persona: one(personas, {
    fields: [chats.personaId],
    references: [personas.id]
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
