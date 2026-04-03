import { eq } from 'drizzle-orm';
import { z } from 'zod';

defineRouteMeta({
  openAPI: { description: 'Clone a workflow (creates an editable copy)', tags: ['workflows'] },
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const source = await requireWorkflowOwner(event, id);
  const db = useDrizzle();

  // Load source nodes and edges
  const [sourceNodes, sourceEdges] = await Promise.all([
    db.select().from(tables.workflowNodes).where(eq(tables.workflowNodes.workflowId, id)),
    db.select().from(tables.workflowEdges).where(eq(tables.workflowEdges.workflowId, id)),
  ]);

  // Create new workflow (not a template)
  const [clone] = await db
    .insert(tables.workflows)
    .values({
      name: `${source.name} (copy)`,
      description: source.description,
      ownerId: source.ownerId,
      isPublished: 0,
      viewport: source.viewport,
    })
    .returning();

  if (!clone) {
    throw createError({ statusCode: 500, message: 'Failed to clone workflow' });
  }

  // Copy nodes
  if (sourceNodes.length > 0) {
    await db.insert(tables.workflowNodes).values(
      sourceNodes.map((n) => ({
        workflowId: clone.id,
        nodeId: n.nodeId,
        type: n.type,
        label: n.label,
        positionX: n.positionX,
        positionY: n.positionY,
        prompt: n.prompt,
        model: n.model,
        temperature: n.temperature,
        maxTokens: n.maxTokens,
        outputSchema: n.outputSchema,
        inputMapping: n.inputMapping,
      })),
    );
  }

  // Copy edges
  if (sourceEdges.length > 0) {
    await db.insert(tables.workflowEdges).values(
      sourceEdges.map((e) => ({
        workflowId: clone.id,
        edgeId: e.edgeId,
        sourceNode: e.sourceNode,
        targetNode: e.targetNode,
        sourceHandle: e.sourceHandle,
        targetHandle: e.targetHandle,
        label: e.label,
        animated: e.animated,
        edgeType: e.edgeType,
      })),
    );
  }

  return { id: clone.id };
});
