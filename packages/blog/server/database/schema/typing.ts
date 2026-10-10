import {
  index,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestampMs } from './columns';
import { users } from './blog';
import type { ErrorsByKeyMap } from '../../../shared/typing-types';

// --- Typing App Tables ---

export const typingGroups = sqliteTable('typing_groups', {
  id: integer().primaryKey({ autoIncrement: true }),
  // Public URL handle: <first-6-of-creator-userId>-<slugified-name>.
  // Integer id is kept for foreign keys; slug is what shows up in URLs.
  slug: text().notNull().unique(),
  name: text().notNull(),
  // 'family' | 'classroom'
  kind: text().notNull().default('family'),
  createdAt: timestampMs(),
  updatedAt: timestampMs().$onUpdate(() => new Date()),
});

export const typingGroupsRelations = relations(typingGroups, ({ many }) => ({
  members: many(typingGroupMembers),
  invites: many(typingGroupInvites),
  learners: many(typingLearners),
}));

export const typingGroupMembers = sqliteTable(
  'typing_group_members',
  {
    groupId: integer()
      .notNull()
      .references(() => typingGroups.id, { onDelete: 'cascade' }),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // 'guardian' is the only role for MVP
    role: text().notNull().default('guardian'),
    invitedBy: text().references(() => users.id),
    joinedAt: timestampMs(),
  },
  (table) => [
    primaryKey({ columns: [table.groupId, table.userId] }),
    index('typing_group_members_user_id_idx').on(table.userId),
  ],
);

export const typingGroupMembersRelations = relations(typingGroupMembers, ({ one }) => ({
  group: one(typingGroups, {
    fields: [typingGroupMembers.groupId],
    references: [typingGroups.id],
  }),
  user: one(users, {
    fields: [typingGroupMembers.userId],
    references: [users.id],
  }),
}));

export const typingGroupInvites = sqliteTable(
  'typing_group_invites',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    groupId: integer()
      .notNull()
      .references(() => typingGroups.id, { onDelete: 'cascade' }),
    token: text().notNull(),
    email: text(),
    expiresAt: integer({ mode: 'timestamp_ms' }).notNull(),
    acceptedBy: text().references(() => users.id),
    acceptedAt: integer({ mode: 'timestamp_ms' }),
    createdAt: timestampMs(),
  },
  (table) => [
    uniqueIndex('typing_group_invites_token_idx').on(table.token),
    index('typing_group_invites_group_id_idx').on(table.groupId),
  ],
);

export const typingGroupInvitesRelations = relations(typingGroupInvites, ({ one }) => ({
  group: one(typingGroups, {
    fields: [typingGroupInvites.groupId],
    references: [typingGroups.id],
  }),
}));

export const typingLearners = sqliteTable(
  'typing_learners',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    groupId: integer()
      .notNull()
      .references(() => typingGroups.id, { onDelete: 'cascade' }),
    displayName: text().notNull(),
    avatarUrl: text(),
    birthYear: integer(),
    currentStage: integer().notNull().default(1),
    preferredVoice: text().notNull().default('chirp3-en-us-Aoede'),
    createdAt: timestampMs(),
    updatedAt: timestampMs().$onUpdate(() => new Date()),
  },
  (table) => [index('typing_learners_group_id_idx').on(table.groupId)],
);

export const typingLearnersRelations = relations(typingLearners, ({ one, many }) => ({
  group: one(typingGroups, {
    fields: [typingLearners.groupId],
    references: [typingGroups.id],
  }),
  attempts: many(typingAttempts),
  keyStats: many(typingKeyStats),
  spellingLists: many(typingSpellingLists),
}));

export const typingLessons = sqliteTable(
  'typing_lessons',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    slug: text().notNull(),
    stage: integer().notNull(),
    // 'drill' | 'bigram' | 'word' | 'sentence' | 'paragraph' | 'topic' | 'spelling-drill' | 'spelling-sentence'
    kind: text().notNull(),
    title: text().notNull(),
    text: text().notNull(),
    targetWpm: integer().notNull().default(10),
    targetAccuracy: real().notNull().default(0.95),
    topic: text(),
    spellingListId: integer(),
    // 'system' | 'ai'
    generatedBy: text().notNull().default('system'),
    createdAt: timestampMs(),
  },
  (table) => [
    uniqueIndex('typing_lessons_slug_idx').on(table.slug),
    index('typing_lessons_stage_idx').on(table.stage),
    index('typing_lessons_spelling_list_id_idx').on(table.spellingListId),
  ],
);

export const typingAttempts = sqliteTable(
  'typing_attempts',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    learnerId: integer()
      .notNull()
      .references(() => typingLearners.id, { onDelete: 'cascade' }),
    lessonId: integer().references(() => typingLessons.id, { onDelete: 'set null' }),
    gameSlug: text(),
    wpm: real().notNull(),
    netWpm: real().notNull().default(0),
    accuracy: real().notNull(),
    durationMs: integer().notNull(),
    errorsByKey: text({ mode: 'json' }).$type<ErrorsByKeyMap>().notNull().default({}),
    completedAt: timestampMs(),
  },
  (table) => [
    index('typing_attempts_learner_id_completed_at_idx').on(table.learnerId, table.completedAt),
    index('typing_attempts_lesson_id_idx').on(table.lessonId),
    index('typing_attempts_game_slug_idx').on(table.gameSlug),
  ],
);

export const typingAttemptsRelations = relations(typingAttempts, ({ one }) => ({
  learner: one(typingLearners, {
    fields: [typingAttempts.learnerId],
    references: [typingLearners.id],
  }),
  lesson: one(typingLessons, {
    fields: [typingAttempts.lessonId],
    references: [typingLessons.id],
  }),
}));

export const typingKeyStats = sqliteTable(
  'typing_key_stats',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    learnerId: integer()
      .notNull()
      .references(() => typingLearners.id, { onDelete: 'cascade' }),
    key: text().notNull(),
    attempts: integer().notNull().default(0),
    errors: integer().notNull().default(0),
    avgMs: real().notNull().default(0),
    updatedAt: timestampMs().$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex('typing_key_stats_learner_id_key_idx').on(table.learnerId, table.key)],
);

export const typingKeyStatsRelations = relations(typingKeyStats, ({ one }) => ({
  learner: one(typingLearners, {
    fields: [typingKeyStats.learnerId],
    references: [typingLearners.id],
  }),
}));

export const typingSpellingLists = sqliteTable(
  'typing_spelling_lists',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    learnerId: integer()
      .notNull()
      .references(() => typingLearners.id, { onDelete: 'cascade' }),
    weekOf: text().notNull(),
    words: text({ mode: 'json' }).$type<string[]>().notNull().default([]),
    // 'paste' | 'type' | 'image'
    source: text().notNull().default('type'),
    sourceImageUrl: text(),
    createdBy: text()
      .notNull()
      .references(() => users.id),
    createdAt: timestampMs(),
    updatedAt: timestampMs().$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('typing_spelling_lists_learner_id_week_of_idx').on(table.learnerId, table.weekOf),
  ],
);

export const typingSpellingListsRelations = relations(typingSpellingLists, ({ one, many }) => ({
  learner: one(typingLearners, {
    fields: [typingSpellingLists.learnerId],
    references: [typingLearners.id],
  }),
  progress: many(typingSpellingProgress),
}));

export const typingSpellingProgress = sqliteTable(
  'typing_spelling_progress',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    spellingListId: integer()
      .notNull()
      .references(() => typingSpellingLists.id, { onDelete: 'cascade' }),
    word: text().notNull(),
    consecutiveCorrect: integer().notNull().default(0),
    mastered: integer({ mode: 'boolean' }).notNull().default(false),
    masteredAt: integer({ mode: 'timestamp_ms' }),
  },
  (table) => [
    uniqueIndex('typing_spelling_progress_list_word_idx').on(table.spellingListId, table.word),
  ],
);

export const typingSpellingProgressRelations = relations(typingSpellingProgress, ({ one }) => ({
  spellingList: one(typingSpellingLists, {
    fields: [typingSpellingProgress.spellingListId],
    references: [typingSpellingLists.id],
  }),
}));
