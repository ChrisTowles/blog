import { eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: {
    description: 'Load a workflow and reconstruct VueFlow nodes/edges',
    tags: ['workflows'],
  },
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const workflow = await requireWorkflowOwner(event, id);
  const db = useDrizzle();

  const [dbNodes, dbEdges] = await Promise.all([
    db.select().from(tables.workflowNodes).where(eq(tables.workflowNodes.workflowId, id)),
    db.select().from(tables.workflowEdges).where(eq(tables.workflowEdges.workflowId, id)),
  ]);

  const nodes = dbNodes.map((n) => {
    let outputSchema: Record<string, unknown> = { type: 'object', properties: {} };
    let inputMapping: Record<string, string> = {};
    try {
      outputSchema = JSON.parse(n.outputSchema);
    } catch {}
    try {
      inputMapping = JSON.parse(n.inputMapping);
    } catch {}
    return {
      id: n.nodeId,
      type: n.type,
      position: { x: n.positionX, y: n.positionY },
      data: {
        label: n.label,
        prompt: n.prompt,
        model: n.model,
        temperature: n.temperature,
        maxTokens: n.maxTokens,
        outputSchema,
        inputMapping,
      },
    };
  });

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
