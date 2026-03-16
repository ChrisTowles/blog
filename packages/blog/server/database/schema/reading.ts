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
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './blog';
import type { StoryContent, ReadingMiscue } from '~~/shared/reading-types';

// --- Reading App Tables ---

export const childProfiles = pgTable(
  'child_profiles',
  {
    id: serial().primaryKey(),
    userId: varchar({ length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar({ length: 100 }).notNull(),
    avatarUrl: text(),
    birthYear: integer().notNull(),
    currentPhase: integer().notNull().default(1),
    interests: text().array().notNull().default([]),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('child_profiles_user_id_idx').on(table.userId)],
);

export const childProfilesRelations = relations(childProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [childProfiles.userId],
    references: [users.id],
  }),
  phonicsProgress: many(childPhonicsProgress),
  srsCards: many(srsCards),
  stories: many(stories),
  readingSessions: many(readingSessions),
}));

export const phonicsUnits = pgTable('phonics_units', {
  id: serial().primaryKey(),
  phase: integer().notNull(),
  orderIndex: integer().notNull(),
  name: varchar({ length: 100 }).notNull(),
  patterns: text().array().notNull().default([]),
  description: text().notNull().default(''),
});

export const phonicsUnitsRelations = relations(phonicsUnits, ({ many }) => ({
  progress: many(childPhonicsProgress),
}));

export const childPhonicsProgress = pgTable(
  'child_phonics_progress',
  {
    id: serial().primaryKey(),
    childId: integer()
      .notNull()
      .references(() => childProfiles.id, { onDelete: 'cascade' }),
    phonicsUnitId: integer()
      .notNull()
      .references(() => phonicsUnits.id),
    status: varchar({ length: 20 }).notNull().default('locked'),
    masteredAt: timestamp(),
  },
  (table) => [index('child_phonics_progress_child_id_idx').on(table.childId)],
);

export const childPhonicsProgressRelations = relations(childPhonicsProgress, ({ one }) => ({
  child: one(childProfiles, {
    fields: [childPhonicsProgress.childId],
    references: [childProfiles.id],
  }),
  phonicsUnit: one(phonicsUnits, {
    fields: [childPhonicsProgress.phonicsUnitId],
    references: [phonicsUnits.id],
  }),
}));

export const srsCards = pgTable(
  'srs_cards',
  {
    id: serial().primaryKey(),
    childId: integer()
      .notNull()
      .references(() => childProfiles.id, { onDelete: 'cascade' }),
    cardType: varchar({ length: 20 }).notNull(),
    front: text().notNull(),
    back: text().notNull(),
    audioUrl: text(),
    state: integer().notNull().default(0),
    difficulty: real().notNull().default(0),
    stability: real().notNull().default(0),
    due: timestamp().defaultNow().notNull(),
    lastReview: timestamp(),
    reps: integer().notNull().default(0),
    lapses: integer().notNull().default(0),
    relatedPhonicsUnitId: integer().references(() => phonicsUnits.id),
  },
  (table) => [index('srs_cards_child_id_due_idx').on(table.childId, table.due)],
);

export const srsCardsRelations = relations(srsCards, ({ one }) => ({
  child: one(childProfiles, {
    fields: [srsCards.childId],
    references: [childProfiles.id],
  }),
  phonicsUnit: one(phonicsUnits, {
    fields: [srsCards.relatedPhonicsUnitId],
    references: [phonicsUnits.id],
  }),
}));

export const stories = pgTable(
  'stories',
  {
    id: serial().primaryKey(),
    childId: integer().references(() => childProfiles.id, { onDelete: 'set null' }),
    title: varchar({ length: 200 }).notNull(),
    content: jsonb().$type<StoryContent>().notNull(),
    theme: varchar({ length: 100 }).notNull().default(''),
    targetPatterns: text().array().notNull().default([]),
    targetWords: text().array().notNull().default([]),
    decodabilityScore: real().notNull().default(0),
    fleschKincaid: real().notNull().default(0),
    illustrationUrls: text().array().notNull().default([]),
    aiGenerated: boolean().notNull().default(false),
    favorited: boolean().notNull().default(false),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (table) => [index('stories_child_id_idx').on(table.childId)],
);

export const storiesRelations = relations(stories, ({ one, many }) => ({
  child: one(childProfiles, {
    fields: [stories.childId],
    references: [childProfiles.id],
  }),
  sessions: many(readingSessions),
}));

export const readingSessions = pgTable(
  'reading_sessions',
  {
    id: serial().primaryKey(),
    childId: integer()
      .notNull()
      .references(() => childProfiles.id, { onDelete: 'cascade' }),
    storyId: integer()
      .notNull()
      .references(() => stories.id),
    mode: varchar({ length: 20 }).notNull(),
    wcpm: real(),
    accuracy: real(),
    duration: integer().notNull().default(0),
    miscues: jsonb().$type<ReadingMiscue[]>(),
    recordingUrl: text(),
    completedAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    index('reading_sessions_child_id_completed_idx').on(table.childId, table.completedAt),
  ],
);

export const readingSessionsRelations = relations(readingSessions, ({ one }) => ({
  child: one(childProfiles, {
    fields: [readingSessions.childId],
    references: [childProfiles.id],
  }),
  story: one(stories, {
    fields: [readingSessions.storyId],
    references: [stories.id],
  }),
}));
