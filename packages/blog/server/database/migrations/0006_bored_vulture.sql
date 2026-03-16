CREATE TABLE "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"childId" integer NOT NULL,
	"type" varchar(50) NOT NULL,
	"earnedAt" timestamp DEFAULT now() NOT NULL,
	"meta" jsonb
);
--> statement-breakpoint
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_childId_child_profiles_id_fk" FOREIGN KEY ("childId") REFERENCES "public"."child_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "achievements_child_id_idx" ON "achievements" USING btree ("childId");