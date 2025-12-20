CREATE TABLE "chatbots" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"personaSlug" varchar(100) NOT NULL,
	"urlPath" varchar(200) NOT NULL,
	"theme" json NOT NULL,
	"customSystemPrompt" text,
	"skillSlugs" json DEFAULT '[]'::json NOT NULL,
	"isPublic" boolean DEFAULT false NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "chatbots_slug_unique" UNIQUE("slug"),
	CONSTRAINT "chatbots_urlPath_unique" UNIQUE("urlPath")
);
--> statement-breakpoint
ALTER TABLE "chatbots" ADD CONSTRAINT "chatbots_personaSlug_personas_slug_fk" FOREIGN KEY ("personaSlug") REFERENCES "public"."personas"("slug") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "chatbots_slug_idx" ON "chatbots" USING btree ("slug");
--> statement-breakpoint
CREATE INDEX "chatbots_persona_slug_idx" ON "chatbots" USING btree ("personaSlug");
--> statement-breakpoint
CREATE INDEX "chatbots_url_path_idx" ON "chatbots" USING btree ("urlPath");
