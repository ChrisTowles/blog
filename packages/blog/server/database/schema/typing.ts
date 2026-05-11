import {
  pgTable,
  varchar,
  text,
  integer,
  serial,
  timestamp,
  real,
  boolean,
  jsonb,
  date,
  index,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './blog';
import type { ErrorsByKeyMap } from '../../../shared/typing-types';

// --- Typing App Tables ---

export const typingGroups = pgTable('typing_groups', {
  id: serial().primaryKey(),
  // Public URL handle: <first-6-of-creator-userId>-<slugified-name>.
  // Integer id is kept for foreign keys; slug is what shows up in URLs.
  slug: varchar({ length: 96 }).notNull().unique(),
  name: varchar({ length: 120 }).notNull(),
  // 'family' | 'classroom'
  kind: varchar({ length: 16 }).notNull().default('family'),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const typingGroupsRelations = relations(typingGroups, ({ many }) => ({
  members: many(typingGroupMembers),
  invites: many(typingGroupInvites),
  learners: many(typingLearners),
}));

export const typingGroupMembers = pgTable(
  'typing_group_members',
  {
    groupId: integer()
      .notNull()
      .references(() => typingGroups.id, { onDelete: 'cascade' }),
    userId: varchar({ length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // 'guardian' is the only role for MVP
    role: varchar({ length: 16 }).notNull().default('guardian'),
    invitedBy: varchar({ length: 36 }).references(() => users.id),
    joinedAt: timestamp().defaultNow().notNull(),
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

export const typingGroupInvites = pgTable(
  'typing_group_invites',
  {
    id: serial().primaryKey(),
    groupId: integer()
      .notNull()
      .references(() => typingGroups.id, { onDelete: 'cascade' }),
    token: varchar({ length: 64 }).notNull(),
    email: varchar({ length: 255 }),
    expiresAt: timestamp().notNull(),
    acceptedBy: varchar({ length: 36 }).references(() => users.id),
    acceptedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
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

export const typingLearners = pgTable(
  'typing_learners',
  {
    id: serial().primaryKey(),
    groupId: integer()
      .notNull()
      .references(() => typingGroups.id, { onDelete: 'cascade' }),
    displayName: varchar({ length: 80 }).notNull(),
    avatarUrl: text(),
    birthYear: integer(),
    currentStage: integer().notNull().default(1),
    preferredVoice: varchar({ length: 64 }).notNull().default('chirp3-en-us-Aoede'),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
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

export const typingLessons = pgTable(
  'typing_lessons',
  {
    id: serial().primaryKey(),
    slug: varchar({ length: 120 }).notNull(),
    stage: integer().notNull(),
    // 'drill' | 'bigram' | 'word' | 'sentence' | 'paragraph' | 'topic' | 'spelling-drill' | 'spelling-sentence'
    kind: varchar({ length: 32 }).notNull(),
    title: varchar({ length: 160 }).notNull(),
    text: text().notNull(),
    targetWpm: integer().notNull().default(10),
    targetAccuracy: real().notNull().default(0.95),
    topic: varchar({ length: 120 }),
    spellingListId: integer(),
    // 'system' | 'ai'
    generatedBy: varchar({ length: 16 }).notNull().default('system'),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('typing_lessons_slug_idx').on(table.slug),
    index('typing_lessons_stage_idx').on(table.stage),
    index('typing_lessons_spelling_list_id_idx').on(table.spellingListId),
  ],
);

export const typingAttempts = pgTable(
  'typing_attempts',
  {
    id: serial().primaryKey(),
    learnerId: integer()
      .notNull()
      .references(() => typingLearners.id, { onDelete: 'cascade' }),
    lessonId: integer().references(() => typingLessons.id, { onDelete: 'set null' }),
    gameSlug: varchar({ length: 40 }),
    wpm: real().notNull(),
    netWpm: real().notNull().default(0),
    accuracy: real().notNull(),
    durationMs: integer().notNull(),
    errorsByKey: jsonb().$type<ErrorsByKeyMap>().notNull().default({}),
    completedAt: timestamp().defaultNow().notNull(),
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

export const typingKeyStats = pgTable(
  'typing_key_stats',
  {
    id: serial().primaryKey(),
    learnerId: integer()
      .notNull()
      .references(() => typingLearners.id, { onDelete: 'cascade' }),
    key: varchar({ length: 8 }).notNull(),
    attempts: integer().notNull().default(0),
    errors: integer().notNull().default(0),
    avgMs: real().notNull().default(0),
    updatedAt: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex('typing_key_stats_learner_id_key_idx').on(table.learnerId, table.key)],
);

export const typingKeyStatsRelations = relations(typingKeyStats, ({ one }) => ({
  learner: one(typingLearners, {
    fields: [typingKeyStats.learnerId],
    references: [typingLearners.id],
  }),
}));

export const typingSpellingLists = pgTable(
  'typing_spelling_lists',
  {
    id: serial().primaryKey(),
    learnerId: integer()
      .notNull()
      .references(() => typingLearners.id, { onDelete: 'cascade' }),
    weekOf: date().notNull(),
    words: text().array().notNull().default([]),
    // 'paste' | 'type' | 'image'
    source: varchar({ length: 16 }).notNull().default('type'),
    sourceImageUrl: text(),
    createdBy: varchar({ length: 36 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
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

export const typingSpellingProgress = pgTable(
  'typing_spelling_progress',
  {
    id: serial().primaryKey(),
    spellingListId: integer()
      .notNull()
      .references(() => typingSpellingLists.id, { onDelete: 'cascade' }),
    word: varchar({ length: 64 }).notNull(),
    consecutiveCorrect: integer().notNull().default(0),
    mastered: boolean().notNull().default(false),
    masteredAt: timestamp(),
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
