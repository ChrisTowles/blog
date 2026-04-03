import { relations } from 'drizzle-orm';
import { integer, pgTable, real, text, varchar } from 'drizzle-orm/pg-core';

export const workflows = pgTable('workflows', {
  id: varchar({ length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  description: text(),
  viewport: text(), // JSON: { x, y, zoom }
  ownerId: text().notNull(), // session.user.id
  isPublished: integer().default(0).notNull(), // 0=false, 1=true
  version: integer().default(1).notNull(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
  updatedAt: text().$defaultFn(() => new Date().toISOString()),
});

export const workflowNodes = pgTable('workflow_nodes', {
  id: varchar({ length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workflowId: text()
    .notNull()
    .references(() => workflows.id, { onDelete: 'cascade' }),
  nodeId: text().notNull(), // VueFlow node ID
  type: text().notNull(), // prompt | transform | classifier | validator
  label: text().notNull(),
  positionX: real().notNull().default(0),
  positionY: real().notNull().default(0),
  prompt: text().notNull().default(''),
  model: text().notNull().default('claude-sonnet-4-20250514'),
  temperature: real().notNull().default(0.7),
  maxTokens: integer().notNull().default(1024),
  outputSchema: text().notNull().default('{"type":"object","properties":{},"required":[]}'),
  inputMapping: text().notNull().default('{}'),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
  updatedAt: text().$defaultFn(() => new Date().toISOString()),
});

export const workflowEdges = pgTable('workflow_edges', {
  id: varchar({ length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workflowId: text()
    .notNull()
    .references(() => workflows.id, { onDelete: 'cascade' }),
  edgeId: text().notNull(), // VueFlow edge ID
  sourceNode: text().notNull(),
  targetNode: text().notNull(),
  sourceHandle: text(),
  targetHandle: text(),
  label: text(),
  animated: integer().default(0).notNull(),
  edgeType: text().notNull().default('smoothstep'),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
});

export const workflowRuns = pgTable('workflow_runs', {
  id: varchar({ length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workflowId: text()
    .notNull()
    .references(() => workflows.id, { onDelete: 'cascade' }),
  status: text().notNull().default('pending'), // pending | running | completed | failed
  inputData: text(), // JSON
  outputData: text(), // JSON
  startedAt: text(),
  completedAt: text(),
  error: text(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
});

export const nodeExecutions = pgTable('node_executions', {
  id: varchar({ length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  runId: text()
    .notNull()
    .references(() => workflowRuns.id, { onDelete: 'cascade' }),
  nodeId: text().notNull(), // VueFlow node ID
  status: text().notNull().default('pending'), // pending | running | completed | failed
  promptSent: text(),
  rawResponse: text(), // Full Anthropic response JSON
  parsedOutput: text(), // Extracted tool_use input JSON
  tokensIn: integer(),
  tokensOut: integer(),
  latencyMs: integer(),
  error: text(),
  startedAt: text(),
  completedAt: text(),
});

export const workflowsRelations = relations(workflows, ({ many }) => ({
  nodes: many(workflowNodes),
  edges: many(workflowEdges),
  runs: many(workflowRuns),
}));

export const workflowNodesRelations = relations(workflowNodes, ({ one }) => ({
  workflow: one(workflows, { fields: [workflowNodes.workflowId], references: [workflows.id] }),
}));

export const workflowEdgesRelations = relations(workflowEdges, ({ one }) => ({
  workflow: one(workflows, { fields: [workflowEdges.workflowId], references: [workflows.id] }),
}));

export const workflowRunsRelations = relations(workflowRuns, ({ one, many }) => ({
  workflow: one(workflows, { fields: [workflowRuns.workflowId], references: [workflows.id] }),
  nodeExecutions: many(nodeExecutions),
}));

export const nodeExecutionsRelations = relations(nodeExecutions, ({ one }) => ({
  run: one(workflowRuns, { fields: [nodeExecutions.runId], references: [workflowRuns.id] }),
}));
