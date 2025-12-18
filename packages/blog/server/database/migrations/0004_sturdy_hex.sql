CREATE TABLE "reading_profiles" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"avatar" varchar(20),
	"lastActiveAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reading_progress" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"profileId" varchar(36) NOT NULL,
	"wordId" varchar(50) NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"successes" integer DEFAULT 0 NOT NULL,
	"lastPracticedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reading_sessions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"profileId" varchar(36) NOT NULL,
	"wordsCompleted" integer DEFAULT 0 NOT NULL,
	"duration" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reading_progress" ADD CONSTRAINT "reading_progress_profileId_reading_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."reading_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_sessions" ADD CONSTRAINT "reading_sessions_profileId_reading_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."reading_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "reading_progress_profile_idx" ON "reading_progress" USING btree ("profileId");--> statement-breakpoint
CREATE UNIQUE INDEX "reading_progress_profile_word_idx" ON "reading_progress" USING btree ("profileId","wordId");--> statement-breakpoint
CREATE INDEX "reading_sessions_profile_idx" ON "reading_sessions" USING btree ("profileId");