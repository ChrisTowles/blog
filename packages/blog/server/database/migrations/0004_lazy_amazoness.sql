CREATE TABLE "child_phonics_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"childId" integer NOT NULL,
	"phonicsUnitId" integer NOT NULL,
	"status" varchar(20) DEFAULT 'locked' NOT NULL,
	"masteredAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "child_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(36) NOT NULL,
	"name" varchar(100) NOT NULL,
	"avatarUrl" text,
	"birthYear" integer NOT NULL,
	"currentPhase" integer DEFAULT 1 NOT NULL,
	"interests" text[] DEFAULT '{}' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "phonics_units" (
	"id" serial PRIMARY KEY NOT NULL,
	"phase" integer NOT NULL,
	"orderIndex" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"patterns" text[] DEFAULT '{}' NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reading_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"childId" integer NOT NULL,
	"storyId" integer NOT NULL,
	"mode" varchar(20) NOT NULL,
	"wcpm" real,
	"accuracy" real,
	"duration" integer DEFAULT 0 NOT NULL,
	"miscues" jsonb,
	"recordingUrl" text,
	"completedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "srs_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"childId" integer NOT NULL,
	"cardType" varchar(20) NOT NULL,
	"front" text NOT NULL,
	"back" text NOT NULL,
	"audioUrl" text,
	"state" integer DEFAULT 0 NOT NULL,
	"difficulty" real DEFAULT 0 NOT NULL,
	"stability" real DEFAULT 0 NOT NULL,
	"due" timestamp DEFAULT now() NOT NULL,
	"lastReview" timestamp,
	"reps" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"relatedPhonicsUnitId" integer
);
--> statement-breakpoint
CREATE TABLE "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"childId" integer,
	"title" varchar(200) NOT NULL,
	"content" jsonb NOT NULL,
	"theme" varchar(100) DEFAULT '' NOT NULL,
	"targetPatterns" text[] DEFAULT '{}' NOT NULL,
	"targetWords" text[] DEFAULT '{}' NOT NULL,
	"decodabilityScore" real DEFAULT 0 NOT NULL,
	"fleschKincaid" real DEFAULT 0 NOT NULL,
	"illustrationUrls" text[] DEFAULT '{}' NOT NULL,
	"aiGenerated" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "child_phonics_progress" ADD CONSTRAINT "child_phonics_progress_childId_child_profiles_id_fk" FOREIGN KEY ("childId") REFERENCES "public"."child_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "child_phonics_progress" ADD CONSTRAINT "child_phonics_progress_phonicsUnitId_phonics_units_id_fk" FOREIGN KEY ("phonicsUnitId") REFERENCES "public"."phonics_units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "child_profiles" ADD CONSTRAINT "child_profiles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_sessions" ADD CONSTRAINT "reading_sessions_childId_child_profiles_id_fk" FOREIGN KEY ("childId") REFERENCES "public"."child_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_sessions" ADD CONSTRAINT "reading_sessions_storyId_stories_id_fk" FOREIGN KEY ("storyId") REFERENCES "public"."stories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "srs_cards" ADD CONSTRAINT "srs_cards_childId_child_profiles_id_fk" FOREIGN KEY ("childId") REFERENCES "public"."child_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "srs_cards" ADD CONSTRAINT "srs_cards_relatedPhonicsUnitId_phonics_units_id_fk" FOREIGN KEY ("relatedPhonicsUnitId") REFERENCES "public"."phonics_units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stories" ADD CONSTRAINT "stories_childId_child_profiles_id_fk" FOREIGN KEY ("childId") REFERENCES "public"."child_profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "child_phonics_progress_child_id_idx" ON "child_phonics_progress" USING btree ("childId");--> statement-breakpoint
CREATE INDEX "child_profiles_user_id_idx" ON "child_profiles" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "reading_sessions_child_id_completed_idx" ON "reading_sessions" USING btree ("childId","completedAt");--> statement-breakpoint
CREATE INDEX "srs_cards_child_id_due_idx" ON "srs_cards" USING btree ("childId","due");--> statement-breakpoint
CREATE INDEX "stories_child_id_idx" ON "stories" USING btree ("childId");