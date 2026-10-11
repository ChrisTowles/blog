import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { timestampMs, uuidPk } from './columns';

import type { LoanApplicationData } from '../../../shared/loan-types';

const timestamps = {
  createdAt: timestampMs(),
};

export const PROVIDERS = ['github', 'google'] as const;

export const ROLES = ['user', 'assistant'] as const;

export const users = sqliteTable(
  'users',
  {
    id: uuidPk(),
    email: text().notNull(),
    name: text().notNull(),
    avatar: text().notNull(),
    username: text().notNull(),
    provider: text({ enum: PROVIDERS }).notNull(),
    providerId: text().notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex('users_provider_id_idx').on(table.provider, table.providerId)],
);

export const usersRelations = relations(users, ({ many }) => ({
  chats: many(chats),
}));

export const chats = sqliteTable(
  'chats',
  {
    id: uuidPk(),
    title: text(),
    userId: text().notNull(),
    containerId: text(),
    ...timestamps,
  },
  (table) => [index('chats_user_id_idx').on(table.userId)],
);

export const chatsRelations = relations(chats, ({ one, many }) => ({
  user: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messages = sqliteTable(
  'messages',
  {
    id: uuidPk(),
    chatId: text()
      .notNull()
      .references(() => chats.id, { onDelete: 'cascade' }),
    role: text({ enum: ROLES }).notNull(),
    parts: text({ mode: 'json' }),
    ...timestamps,
  },
  (table) => [index('messages_chat_id_idx').on(table.chatId)],
);

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
}));

// RAG Tables for contextual retrieval
export const documents = sqliteTable(
  'documents',
  {
    id: uuidPk(),
    slug: text().notNull().unique(),
    title: text().notNull(),
    path: text().notNull(), // source file path
    url: text().notNull(), // e.g., "/blog/tips-for-claude-code"
    contentHash: text().notNull(), // SHA-256 for change detection
    ...timestamps,
    updatedAt: timestampMs().$onUpdate(() => new Date()),
  },
  (table) => [index('documents_slug_idx').on(table.slug)],
);

export const documentsRelations = relations(documents, ({ many }) => ({
  chunks: many(documentChunks),
}));

export const documentChunks = sqliteTable(
  'document_chunks',
  {
    id: uuidPk(),
    documentId: text()
      .notNull()
      .references(() => documents.id, { onDelete: 'cascade' }),
    chunkIndex: integer().notNull(),
    content: text().notNull(), // original chunk text
    contextualContent: text().notNull(), // Claude-generated situating context
    embeddedAt: integer({ mode: 'timestamp_ms' }), // set once the chunk's vector is upserted to Vectorize
    ...timestamps,
  },
  (table) => [
    index('document_chunks_document_id_idx').on(table.documentId),
    index('document_chunks_chunk_index_idx').on(table.documentId, table.chunkIndex),
  ],
);

export const documentChunksRelations = relations(documentChunks, ({ one }) => ({
  document: one(documents, {
    fields: [documentChunks.documentId],
    references: [documents.id],
  }),
}));

// --- Loan workflow tables ---

export const LOAN_STATUSES = ['intake', 'reviewing', 'approved', 'denied', 'flagged'] as const;

export const REVIEWERS = ['the-bank', 'loan-market', 'background-checks'] as const;

export const REVIEW_DECISIONS = ['approved', 'denied', 'flagged'] as const;

export const loanApplications = sqliteTable(
  'loan_applications',
  {
    id: uuidPk(),
    userId: text().notNull(),
    status: text({ enum: LOAN_STATUSES }).default('intake'),
    applicationData: text({ mode: 'json' }).$type<LoanApplicationData>().default({}),
    ...timestamps,
  },
  (table) => [index('loan_applications_user_id_idx').on(table.userId)],
);

export const loanApplicationsRelations = relations(loanApplications, ({ one, many }) => ({
  user: one(users, {
    fields: [loanApplications.userId],
    references: [users.id],
  }),
  reviews: many(loanReviews),
  messages: many(loanMessages),
}));

export const loanReviews = sqliteTable(
  'loan_reviews',
  {
    id: uuidPk(),
    applicationId: text()
      .notNull()
      .references(() => loanApplications.id, { onDelete: 'cascade' }),
    reviewer: text({ enum: REVIEWERS }),
    decision: text({ enum: REVIEW_DECISIONS }),
    analysis: text(),
    flags: text({ mode: 'json' }).$type<string[]>().default([]),
    ...timestamps,
  },
  (table) => [index('loan_reviews_application_id_idx').on(table.applicationId)],
);

export const loanReviewsRelations = relations(loanReviews, ({ one }) => ({
  application: one(loanApplications, {
    fields: [loanReviews.applicationId],
    references: [loanApplications.id],
  }),
}));

export const loanMessages = sqliteTable(
  'loan_messages',
  {
    id: uuidPk(),
    applicationId: text()
      .notNull()
      .references(() => loanApplications.id, { onDelete: 'cascade' }),
    role: text({ enum: ROLES }),
    parts: text({ mode: 'json' }),
    ...timestamps,
  },
  (table) => [index('loan_messages_application_id_idx').on(table.applicationId)],
);

export const loanMessagesRelations = relations(loanMessages, ({ one }) => ({
  application: one(loanApplications, {
    fields: [loanMessages.applicationId],
    references: [loanApplications.id],
  }),
}));
