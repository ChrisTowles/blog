import { pgTable, varchar, pgEnum, timestamp, index, uniqueIndex, json, text, integer, boolean } from 'drizzle-orm/pg-core'
import { vector } from 'drizzle-orm/pg-core/columns/vector_extension/vector'
import { relations } from 'drizzle-orm'

const timestamps = {
  createdAt: timestamp().defaultNow().notNull()
}

export const providerEnum = pgEnum('provider', ['github'])
export const roleEnum = pgEnum('role', ['user', 'assistant'])

// ============================================
// Capabilities & Personas Schema
// ============================================

export const capabilities = pgTable('capabilities', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 100 }).notNull(),
  description: text().notNull(),
  systemPromptSegment: text().notNull(), // procedural knowledge for this capability
  toolsConfig: json().$type<string[]>().notNull().default([]), // enabled tool names
  isBuiltIn: boolean().notNull().default(false),
  priority: integer().notNull().default(10), // ordering for system prompt composition
  ...timestamps,
  updatedAt: timestamp().defaultNow().notNull()
}, table => [
  index('capabilities_slug_idx').on(table.slug)
])

// Theme configuration for chatbot UI
export interface PersonaTheme {
  primaryColor: string // Nuxt UI color: 'blue', 'purple', 'pink', 'green', etc.
  accentColor?: string // Optional accent color
  icon: string // Lucide icon name
}

export const personas = pgTable('personas', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 100 }).notNull(),
  description: text().notNull(),
  icon: varchar({ length: 100 }).notNull().default('i-lucide-user'), // Lucide icon name
  baseSystemPrompt: text().notNull(), // persona-specific intro
  theme: json().$type<PersonaTheme>(), // UI theme configuration
  isDefault: boolean().notNull().default(false),
  isBuiltIn: boolean().notNull().default(false),
  ...timestamps,
  updatedAt: timestamp().defaultNow().notNull()
}, table => [
  index('personas_slug_idx').on(table.slug)
])

// Junction table for persona -> capabilities (many-to-many)
export const personaCapabilities = pgTable('persona_capabilities', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  personaId: varchar({ length: 36 }).notNull().references(() => personas.id, { onDelete: 'cascade' }),
  capabilityId: varchar({ length: 36 }).notNull().references(() => capabilities.id, { onDelete: 'cascade' }),
  priority: integer().notNull().default(0) // ordering within persona
}, table => [
  index('persona_capabilities_persona_id_idx').on(table.personaId),
  index('persona_capabilities_capability_id_idx').on(table.capabilityId),
  uniqueIndex('persona_capabilities_unique_idx').on(table.personaId, table.capabilityId)
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

// Junction table for capability -> knowledge bases (many-to-many)
export const capabilityKnowledgeBases = pgTable('capability_knowledge_bases', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  capabilityId: varchar({ length: 36 }).notNull().references(() => capabilities.id, { onDelete: 'cascade' }),
  knowledgeBaseId: varchar({ length: 36 }).notNull().references(() => knowledgeBases.id, { onDelete: 'cascade' })
}, table => [
  index('capability_kb_capability_id_idx').on(table.capabilityId),
  index('capability_kb_kb_id_idx').on(table.knowledgeBaseId),
  uniqueIndex('capability_kb_unique_idx').on(table.capabilityId, table.knowledgeBaseId)
])

// Type for knowledge base filter criteria
export interface KnowledgeBaseFilter {
  slugPatterns?: string[] // e.g., ['ai-*', 'claude-*']
  titlePatterns?: string[]
  excludePatterns?: string[]
}

// Relations for capabilities system
export const capabilitiesRelations = relations(capabilities, ({ many }) => ({
  personaCapabilities: many(personaCapabilities),
  capabilityKnowledgeBases: many(capabilityKnowledgeBases)
}))

export const personasRelations = relations(personas, ({ many }) => ({
  personaCapabilities: many(personaCapabilities)
}))

export const personaCapabilitiesRelations = relations(personaCapabilities, ({ one }) => ({
  persona: one(personas, {
    fields: [personaCapabilities.personaId],
    references: [personas.id]
  }),
  capability: one(capabilities, {
    fields: [personaCapabilities.capabilityId],
    references: [capabilities.id]
  })
}))

export const knowledgeBasesRelations = relations(knowledgeBases, ({ many }) => ({
  capabilityKnowledgeBases: many(capabilityKnowledgeBases)
}))

export const capabilityKnowledgeBasesRelations = relations(capabilityKnowledgeBases, ({ one }) => ({
  capability: one(capabilities, {
    fields: [capabilityKnowledgeBases.capabilityId],
    references: [capabilities.id]
  }),
  knowledgeBase: one(knowledgeBases, {
    fields: [capabilityKnowledgeBases.knowledgeBaseId],
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
