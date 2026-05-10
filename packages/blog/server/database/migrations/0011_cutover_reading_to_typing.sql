-- Hard cutover from reading app to typing app.
-- Drops legacy reading-app tables; creates typing-app tables.

-- Drop reading tables (data was demo-only). Order matters for FK constraints.
DROP TABLE IF EXISTS "achievements" CASCADE;
DROP TABLE IF EXISTS "reading_sessions" CASCADE;
DROP TABLE IF EXISTS "srs_cards" CASCADE;
DROP TABLE IF EXISTS "child_phonics_progress" CASCADE;
DROP TABLE IF EXISTS "stories" CASCADE;
DROP TABLE IF EXISTS "child_profiles" CASCADE;
DROP TABLE IF EXISTS "phonics_units" CASCADE;
--> statement-breakpoint

-- Typing groups (a household or classroom).
CREATE TABLE IF NOT EXISTS "typing_groups" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar(120) NOT NULL,
  "kind" varchar(16) DEFAULT 'family' NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint

-- Group members: any user with a role on a group. 'guardian' is the only role for MVP.
CREATE TABLE IF NOT EXISTS "typing_group_members" (
  "groupId" integer NOT NULL,
  "userId" varchar(36) NOT NULL,
  "role" varchar(16) DEFAULT 'guardian' NOT NULL,
  "invitedBy" varchar(36),
  "joinedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "typing_group_members_groupId_userId_pk" PRIMARY KEY ("groupId", "userId"),
  CONSTRAINT "typing_group_members_groupId_typing_groups_id_fk"
    FOREIGN KEY ("groupId") REFERENCES "typing_groups"("id") ON DELETE cascade,
  CONSTRAINT "typing_group_members_userId_users_id_fk"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade,
  CONSTRAINT "typing_group_members_invitedBy_users_id_fk"
    FOREIGN KEY ("invitedBy") REFERENCES "users"("id") ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typing_group_members_user_id_idx" ON "typing_group_members" ("userId");
--> statement-breakpoint

-- Group invites: single-use tokens with TTL.
CREATE TABLE IF NOT EXISTS "typing_group_invites" (
  "id" serial PRIMARY KEY NOT NULL,
  "groupId" integer NOT NULL,
  "token" varchar(64) NOT NULL,
  "email" varchar(255),
  "expiresAt" timestamp NOT NULL,
  "acceptedBy" varchar(36),
  "acceptedAt" timestamp,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "typing_group_invites_groupId_typing_groups_id_fk"
    FOREIGN KEY ("groupId") REFERENCES "typing_groups"("id") ON DELETE cascade,
  CONSTRAINT "typing_group_invites_acceptedBy_users_id_fk"
    FOREIGN KEY ("acceptedBy") REFERENCES "users"("id") ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "typing_group_invites_token_idx"
  ON "typing_group_invites" ("token");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typing_group_invites_group_id_idx"
  ON "typing_group_invites" ("groupId");
--> statement-breakpoint

-- Learners: a kid/student profile in a group. Does NOT have its own login.
CREATE TABLE IF NOT EXISTS "typing_learners" (
  "id" serial PRIMARY KEY NOT NULL,
  "groupId" integer NOT NULL,
  "displayName" varchar(80) NOT NULL,
  "avatarUrl" text,
  "birthYear" integer,
  "currentStage" integer DEFAULT 1 NOT NULL,
  "preferredVoice" varchar(64) DEFAULT 'chirp3-en-us-Aoede' NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "typing_learners_groupId_typing_groups_id_fk"
    FOREIGN KEY ("groupId") REFERENCES "typing_groups"("id") ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typing_learners_group_id_idx" ON "typing_learners" ("groupId");
--> statement-breakpoint

-- Lessons: built-in curriculum + AI-generated topic + spelling-derived rows.
CREATE TABLE IF NOT EXISTS "typing_lessons" (
  "id" serial PRIMARY KEY NOT NULL,
  "slug" varchar(120) NOT NULL,
  "stage" integer NOT NULL,
  "kind" varchar(32) NOT NULL,
  "title" varchar(160) NOT NULL,
  "text" text NOT NULL,
  "targetWpm" integer DEFAULT 10 NOT NULL,
  "targetAccuracy" real DEFAULT 0.95 NOT NULL,
  "topic" varchar(120),
  "spellingListId" integer,
  "generatedBy" varchar(16) DEFAULT 'system' NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "typing_lessons_slug_idx" ON "typing_lessons" ("slug");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typing_lessons_stage_idx" ON "typing_lessons" ("stage");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typing_lessons_spelling_list_id_idx"
  ON "typing_lessons" ("spellingListId");
--> statement-breakpoint

-- Attempts: keyed by learnerId. One row per completed lesson or game round.
CREATE TABLE IF NOT EXISTS "typing_attempts" (
  "id" serial PRIMARY KEY NOT NULL,
  "learnerId" integer NOT NULL,
  "lessonId" integer,
  "gameSlug" varchar(40),
  "wpm" real NOT NULL,
  "netWpm" real DEFAULT 0 NOT NULL,
  "accuracy" real NOT NULL,
  "durationMs" integer NOT NULL,
  "errorsByKey" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "completedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "typing_attempts_learnerId_typing_learners_id_fk"
    FOREIGN KEY ("learnerId") REFERENCES "typing_learners"("id") ON DELETE cascade,
  CONSTRAINT "typing_attempts_lessonId_typing_lessons_id_fk"
    FOREIGN KEY ("lessonId") REFERENCES "typing_lessons"("id") ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typing_attempts_learner_id_completed_at_idx"
  ON "typing_attempts" ("learnerId", "completedAt");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typing_attempts_lesson_id_idx" ON "typing_attempts" ("lessonId");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typing_attempts_game_slug_idx" ON "typing_attempts" ("gameSlug");
--> statement-breakpoint

-- Per-key statistics (used to render the heatmap).
CREATE TABLE IF NOT EXISTS "typing_key_stats" (
  "id" serial PRIMARY KEY NOT NULL,
  "learnerId" integer NOT NULL,
  "key" varchar(8) NOT NULL,
  "attempts" integer DEFAULT 0 NOT NULL,
  "errors" integer DEFAULT 0 NOT NULL,
  "avgMs" real DEFAULT 0 NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "typing_key_stats_learnerId_typing_learners_id_fk"
    FOREIGN KEY ("learnerId") REFERENCES "typing_learners"("id") ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "typing_key_stats_learner_id_key_idx"
  ON "typing_key_stats" ("learnerId", "key");
--> statement-breakpoint

-- Spelling lists: weekly word import (paste / type / image extract).
CREATE TABLE IF NOT EXISTS "typing_spelling_lists" (
  "id" serial PRIMARY KEY NOT NULL,
  "learnerId" integer NOT NULL,
  "weekOf" date NOT NULL,
  "words" text[] DEFAULT '{}'::text[] NOT NULL,
  "source" varchar(16) DEFAULT 'type' NOT NULL,
  "sourceImageUrl" text,
  "createdBy" varchar(36) NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "typing_spelling_lists_learnerId_typing_learners_id_fk"
    FOREIGN KEY ("learnerId") REFERENCES "typing_learners"("id") ON DELETE cascade,
  CONSTRAINT "typing_spelling_lists_createdBy_users_id_fk"
    FOREIGN KEY ("createdBy") REFERENCES "users"("id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "typing_spelling_lists_learner_id_week_of_idx"
  ON "typing_spelling_lists" ("learnerId", "weekOf");
--> statement-breakpoint

-- Spelling progress: per-word mastery counter.
CREATE TABLE IF NOT EXISTS "typing_spelling_progress" (
  "id" serial PRIMARY KEY NOT NULL,
  "spellingListId" integer NOT NULL,
  "word" varchar(64) NOT NULL,
  "consecutiveCorrect" integer DEFAULT 0 NOT NULL,
  "mastered" boolean DEFAULT false NOT NULL,
  "masteredAt" timestamp,
  CONSTRAINT "typing_spelling_progress_spellingListId_typing_spelling_lists_id_fk"
    FOREIGN KEY ("spellingListId") REFERENCES "typing_spelling_lists"("id") ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "typing_spelling_progress_list_word_idx"
  ON "typing_spelling_progress" ("spellingListId", "word");
--> statement-breakpoint

-- Wire spelling list <-> lesson FK now that both tables exist.
ALTER TABLE "typing_lessons"
  ADD CONSTRAINT "typing_lessons_spellingListId_typing_spelling_lists_id_fk"
    FOREIGN KEY ("spellingListId")
    REFERENCES "typing_spelling_lists"("id")
    ON DELETE set null;
