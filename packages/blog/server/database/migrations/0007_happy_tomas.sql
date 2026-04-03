CREATE TABLE "node_executions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"runId" text NOT NULL,
	"nodeId" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"promptSent" text,
	"rawResponse" text,
	"parsedOutput" text,
	"tokensIn" integer,
	"tokensOut" integer,
	"latencyMs" integer,
	"error" text,
	"startedAt" text,
	"completedAt" text
);
--> statement-breakpoint
CREATE TABLE "workflow_edges" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"workflowId" text NOT NULL,
	"edgeId" text NOT NULL,
	"sourceNode" text NOT NULL,
	"targetNode" text NOT NULL,
	"sourceHandle" text,
	"targetHandle" text,
	"label" text,
	"animated" integer DEFAULT 0 NOT NULL,
	"edgeType" text DEFAULT 'smoothstep' NOT NULL,
	"createdAt" text
);
--> statement-breakpoint
CREATE TABLE "workflow_nodes" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"workflowId" text NOT NULL,
	"nodeId" text NOT NULL,
	"type" text NOT NULL,
	"label" text NOT NULL,
	"positionX" real DEFAULT 0 NOT NULL,
	"positionY" real DEFAULT 0 NOT NULL,
	"prompt" text DEFAULT '' NOT NULL,
	"model" text DEFAULT 'claude-sonnet-4-20250514' NOT NULL,
	"temperature" real DEFAULT 0.7 NOT NULL,
	"maxTokens" integer DEFAULT 1024 NOT NULL,
	"outputSchema" text DEFAULT '{"type":"object","properties":{},"required":[]}' NOT NULL,
	"inputMapping" text DEFAULT '{}' NOT NULL,
	"createdAt" text,
	"updatedAt" text
);
--> statement-breakpoint
CREATE TABLE "workflow_runs" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"workflowId" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"inputData" text,
	"outputData" text,
	"startedAt" text,
	"completedAt" text,
	"error" text,
	"createdAt" text
);
--> statement-breakpoint
CREATE TABLE "workflows" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"viewport" text,
	"ownerId" text NOT NULL,
	"isPublished" integer DEFAULT 0 NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"createdAt" text,
	"updatedAt" text
);
--> statement-breakpoint
ALTER TABLE "node_executions" ADD CONSTRAINT "node_executions_runId_workflow_runs_id_fk" FOREIGN KEY ("runId") REFERENCES "public"."workflow_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_edges" ADD CONSTRAINT "workflow_edges_workflowId_workflows_id_fk" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_nodes" ADD CONSTRAINT "workflow_nodes_workflowId_workflows_id_fk" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_runs" ADD CONSTRAINT "workflow_runs_workflowId_workflows_id_fk" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE cascade ON UPDATE no action;