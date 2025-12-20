CREATE TABLE "capabilities" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"systemPromptSegment" text NOT NULL,
	"toolsConfig" json DEFAULT '[]'::json NOT NULL,
	"isBuiltIn" boolean DEFAULT false NOT NULL,
	"priority" integer DEFAULT 10 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "capabilities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "capability_knowledge_bases" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"capabilityId" varchar(36) NOT NULL,
	"knowledgeBaseId" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "knowledge_bases" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"filterCriteria" json DEFAULT '{}'::json NOT NULL,
	"isBuiltIn" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "knowledge_bases_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "persona_capabilities" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"personaId" varchar(36) NOT NULL,
	"capabilityId" varchar(36) NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "personas" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(100) DEFAULT 'i-lucide-user' NOT NULL,
	"baseSystemPrompt" text NOT NULL,
	"isDefault" boolean DEFAULT false NOT NULL,
	"isBuiltIn" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "personas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "personaId" varchar(36);--> statement-breakpoint
ALTER TABLE "capability_knowledge_bases" ADD CONSTRAINT "capability_knowledge_bases_capabilityId_capabilities_id_fk" FOREIGN KEY ("capabilityId") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "capability_knowledge_bases" ADD CONSTRAINT "capability_knowledge_bases_knowledgeBaseId_knowledge_bases_id_fk" FOREIGN KEY ("knowledgeBaseId") REFERENCES "public"."knowledge_bases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "persona_capabilities" ADD CONSTRAINT "persona_capabilities_personaId_personas_id_fk" FOREIGN KEY ("personaId") REFERENCES "public"."personas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "persona_capabilities" ADD CONSTRAINT "persona_capabilities_capabilityId_capabilities_id_fk" FOREIGN KEY ("capabilityId") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "capabilities_slug_idx" ON "capabilities" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "capability_kb_capability_id_idx" ON "capability_knowledge_bases" USING btree ("capabilityId");--> statement-breakpoint
CREATE INDEX "capability_kb_kb_id_idx" ON "capability_knowledge_bases" USING btree ("knowledgeBaseId");--> statement-breakpoint
CREATE UNIQUE INDEX "capability_kb_unique_idx" ON "capability_knowledge_bases" USING btree ("capabilityId","knowledgeBaseId");--> statement-breakpoint
CREATE INDEX "knowledge_bases_slug_idx" ON "knowledge_bases" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "persona_capabilities_persona_id_idx" ON "persona_capabilities" USING btree ("personaId");--> statement-breakpoint
CREATE INDEX "persona_capabilities_capability_id_idx" ON "persona_capabilities" USING btree ("capabilityId");--> statement-breakpoint
CREATE UNIQUE INDEX "persona_capabilities_unique_idx" ON "persona_capabilities" USING btree ("personaId","capabilityId");--> statement-breakpoint
CREATE INDEX "personas_slug_idx" ON "personas" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_personaId_personas_id_fk" FOREIGN KEY ("personaId") REFERENCES "public"."personas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chats_persona_id_idx" ON "chats" USING btree ("personaId");