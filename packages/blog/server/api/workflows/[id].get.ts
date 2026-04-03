import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: {
    description: 'Load a workflow and reconstruct VueFlow nodes/edges',
    tags: ['workflows'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const db = useDrizzle();

  const [workflow] = await db
    .select()
    .from(tables.workflows)
    .where(and(eq(tables.workflows.id, id), eq(tables.workflows.ownerId, session.user.id)));

  if (!workflow) {
    throw createError({ statusCode: 404, message: 'Workflow not found' });
  }

  const [dbNodes, dbEdges] = await Promise.all([
    db.select().from(tables.workflowNodes).where(eq(tables.workflowNodes.workflowId, id)),
    db.select().from(tables.workflowEdges).where(eq(tables.workflowEdges.workflowId, id)),
  ]);

  const nodes = dbNodes.map((n) => ({
    id: n.nodeId,
    type: n.type,
    position: { x: n.positionX, y: n.positionY },
    data: {
      label: n.label,
      prompt: n.prompt,
      model: n.model,
      temperature: n.temperature,
      maxTokens: n.maxTokens,
      outputSchema: JSON.parse(n.outputSchema),
      inputMapping: JSON.parse(n.inputMapping),
    },
  }));

  const edges = dbEdges.map((e) => ({
    id: e.edgeId,
    source: e.sourceNode,
    target: e.targetNode,
    sourceHandle: e.sourceHandle ?? undefined,
    targetHandle: e.targetHandle ?? undefined,
    label: e.label ?? undefined,
    animated: Boolean(e.animated),
    type: e.edgeType,
  }));

  return {
    id: workflow.id,
    name: workflow.name,
    description: workflow.description,
    viewport: workflow.viewport ? JSON.parse(workflow.viewport) : { x: 0, y: 0, zoom: 1 },
    version: workflow.version,
    nodes,
    edges,
  };
});
