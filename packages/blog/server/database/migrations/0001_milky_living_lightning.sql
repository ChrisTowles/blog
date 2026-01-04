ALTER TABLE "messages" ADD COLUMN "agentType" varchar(50);--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "routingDecision" json;