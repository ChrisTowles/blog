/**
 * Zod schemas for validating workflow data at system boundaries:
 * - API responses parsed on the client
 * - SSE event payloads from the workflow run stream
 * - URL query params on the editor page
 *
 * These schemas validate external data flowing into the client.
 * Internal state (VueFlow refs, composable returns) is not validated here.
 */

import { z } from 'zod';

// ── URL query params for the workflow editor page ──

export const workflowEditorQuerySchema = z.object({
  node: z.string().optional(),
  tab: z.enum(['edit', 'run']).optional(),
});

export type WorkflowEditorQuery = z.infer<typeof workflowEditorQuerySchema>;

// ── Viewport ──

export const viewportSchema = z.object({
  x: z.number(),
  y: z.number(),
  zoom: z.number(),
});

// ── Node data shape (matches what the GET /api/workflows/:id endpoint returns) ──

export const workflowNodeDataSchema = z.object({
  label: z.string(),
  prompt: z.string(),
  model: z.string(),
  temperature: z.number(),
  maxTokens: z.number(),
  outputSchema: z.record(z.string(), z.unknown()),
  inputMapping: z.record(z.string(), z.string()).optional(),
});

export const workflowNodeSchema = z.object({
  id: z.string(),
  type: z.enum(['prompt', 'transform', 'classifier', 'validator']),
  position: z.object({ x: z.number(), y: z.number() }),
  data: workflowNodeDataSchema,
});

export const workflowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().optional(),
  targetHandle: z.string().optional(),
  label: z.string().optional(),
  animated: z.boolean().optional(),
  type: z.string().optional(),
});

// ── GET /api/workflows/:id response ──

export const workflowDetailResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  viewport: viewportSchema,
  version: z.number(),
  nodes: z.array(workflowNodeSchema),
  edges: z.array(workflowEdgeSchema),
});

export type WorkflowDetailResponse = z.infer<typeof workflowDetailResponseSchema>;

// ── GET /api/workflows (list) response ──

export const workflowListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  version: z.number(),
  isTemplate: z.number(),
  updatedAt: z.string().nullable(),
});

export const workflowListResponseSchema = z.array(workflowListItemSchema);

export type WorkflowListItem = z.infer<typeof workflowListItemSchema>;

// ── POST /api/workflows/:id/run response ──

export const startRunResponseSchema = z.object({
  runId: z.string(),
});

// ── SSE event payloads from the workflow run stream ──

export const sseNodeStartSchema = z.object({
  nodeId: z.string(),
  label: z.string().optional(),
});

export const sseNodeCompleteSchema = z.object({
  nodeId: z.string(),
  output: z.record(z.string(), z.unknown()),
  tokensIn: z.number(),
  tokensOut: z.number(),
  latencyMs: z.number(),
});

export const sseNodeErrorSchema = z.object({
  nodeId: z.string(),
  error: z.string(),
});

export const sseRunCompleteSchema = z.object({
  output: z.record(z.string(), z.record(z.string(), z.unknown())),
});

export const sseRunErrorSchema = z.object({
  error: z.string(),
});
