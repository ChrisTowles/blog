import { and, eq, sql } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Save full graph state for a workflow', tags: ['workflows'] },
});

const nodeDataSchema = z.object({
  label: z.string().min(1),
  prompt: z.string(),
  model: z.string(),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().int().min(1).max(8192),
  outputSchema: z.object({
    type: z.literal('object'),
    properties: z.record(z.string(), z.unknown()),
  }),
  inputMapping: z.record(z.string(), z.string()).optional(),
});

const vueFlowNodeSchema = z.object({
  id: z.string(),
  type: z.enum(['prompt', 'transform', 'classifier', 'validator']),
  position: z.object({ x: z.number(), y: z.number() }),
  data: nodeDataSchema,
});

const vueFlowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().optional().nullable(),
  targetHandle: z.string().optional().nullable(),
  label: z.string().optional().nullable(),
  animated: z.boolean().optional(),
  type: z.string().optional(),
});

const saveSchema = z.object({
  nodes: z.array(vueFlowNodeSchema),
  edges: z.array(vueFlowEdgeSchema),
  viewport: z.object({ x: z.number(), y: z.number(), zoom: z.number() }).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const { nodes, edges, viewport } = await readValidatedBody(event, saveSchema.parse);
  const db = useDrizzle();

  const [workflow] = await db
    .select({ id: tables.workflows.id })
    .from(tables.workflows)
    .where(and(eq(tables.workflows.id, id), eq(tables.workflows.ownerId, session.user.id)));

  if (!workflow) {
    throw createError({ statusCode: 404, message: 'Workflow not found' });
  }

  await db.transaction(async (tx) => {
    // 1. Update viewport, updatedAt, and bump version atomically
    await tx
      .update(tables.workflows)
      .set({
        viewport: viewport ? JSON.stringify(viewport) : null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(tables.workflows.id, id));

    await tx.execute(sql`UPDATE workflows SET version = version + 1 WHERE id = ${id}`);

    // 2. Delete existing nodes and edges
    await tx.delete(tables.workflowNodes).where(eq(tables.workflowNodes.workflowId, id));
    await tx.delete(tables.workflowEdges).where(eq(tables.workflowEdges.workflowId, id));

    // 3. Insert new nodes
    if (nodes.length > 0) {
      await tx.insert(tables.workflowNodes).values(
        nodes.map((n) => ({
          workflowId: id,
          nodeId: n.id,
          type: n.type,
          label: n.data.label,
          positionX: n.position.x,
          positionY: n.position.y,
          prompt: n.data.prompt,
          model: n.data.model,
          temperature: n.data.temperature,
          maxTokens: n.data.maxTokens,
          outputSchema: JSON.stringify(n.data.outputSchema),
          inputMapping: JSON.stringify(n.data.inputMapping ?? {}),
        })),
      );
    }

    // 4. Insert new edges
    if (edges.length > 0) {
      await tx.insert(tables.workflowEdges).values(
        edges.map((e) => ({
          workflowId: id,
          edgeId: e.id,
          sourceNode: e.source,
          targetNode: e.target,
          sourceHandle: e.sourceHandle ?? null,
          targetHandle: e.targetHandle ?? null,
          label: e.label ?? null,
          animated: e.animated ? 1 : 0,
          edgeType: e.type ?? 'smoothstep',
        })),
      );
    }
  });

  return { ok: true };
});
