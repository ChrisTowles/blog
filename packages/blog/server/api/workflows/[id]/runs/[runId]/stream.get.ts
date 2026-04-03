import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import type { WorkflowSSEEvent } from '~~/shared/workflow-types';

defineRouteMeta({
  openAPI: { description: 'SSE stream for live workflow execution status', tags: ['workflows'] },
});

const encoder = new TextEncoder();

function sendEvent(controller: ReadableStreamDefaultController, event: WorkflowSSEEvent) {
  const payload = `event: ${event.event}\ndata: ${JSON.stringify(event.data)}\n\n`;
  controller.enqueue(encoder.encode(payload));
}

export default defineEventHandler(async (event) => {
  const { id, runId } = await getValidatedRouterParams(
    event,
    z.object({ id: z.string(), runId: z.string() }).parse,
  );
  await requireWorkflowOwner(event, id);
  const db = useDrizzle();

  const [run] = await db
    .select()
    .from(tables.workflowRuns)
    .where(and(eq(tables.workflowRuns.id, runId), eq(tables.workflowRuns.workflowId, id)));

  if (!run) {
    throw createError({ statusCode: 404, message: 'Run not found' });
  }

  setHeader(event, 'Content-Type', 'text/event-stream');
  setHeader(event, 'Cache-Control', 'no-cache');
  setHeader(event, 'Connection', 'keep-alive');

  const stream = new ReadableStream({
    async start(controller) {
      // Keep-alive every 15s
      const keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(': keep-alive\n\n'));
      }, 15_000);

      try {
        // Load graph state
        const [dbNodes, dbEdges] = await Promise.all([
          db.select().from(tables.workflowNodes).where(eq(tables.workflowNodes.workflowId, id)),
          db.select().from(tables.workflowEdges).where(eq(tables.workflowEdges.workflowId, id)),
        ]);

        const engineNodes = dbNodes.map(dbNodeToEngineNode);

        const engineEdges = dbEdges.map((e) => ({
          source: e.sourceNode,
          target: e.targetNode,
        }));

        // Mark run as running
        await db
          .update(tables.workflowRuns)
          .set({ status: 'running', startedAt: new Date().toISOString() })
          .where(eq(tables.workflowRuns.id, runId));

        const sortedNodes = topologicalSort(engineNodes, engineEdges);
        const nodeOutputs = new Map<string, Record<string, unknown>>();
        const workflowInput: Record<string, unknown> = run.inputData
          ? JSON.parse(run.inputData)
          : {};

        let runFailed = false;
        for (const node of sortedNodes) {
          sendEvent(controller, {
            event: 'node:start',
            data: { nodeId: node.id, label: node.label },
          });

          try {
            const result = await executeNode(node, runId, nodeOutputs, workflowInput);
            nodeOutputs.set(node.id, result.parsedOutput);

            sendEvent(controller, {
              event: 'node:complete',
              data: {
                nodeId: node.id,
                output: result.parsedOutput,
                tokensIn: result.tokensIn,
                tokensOut: result.tokensOut,
                latencyMs: result.latencyMs,
              },
            });
          } catch (err) {
            const error = err instanceof Error ? err.message : 'Unknown error';
            sendEvent(controller, { event: 'node:error', data: { nodeId: node.id, error } });

            await db
              .update(tables.workflowRuns)
              .set({ status: 'failed', error, completedAt: new Date().toISOString() })
              .where(eq(tables.workflowRuns.id, runId));

            sendEvent(controller, { event: 'run:error', data: { error } });
            runFailed = true;
            break;
          }
        }

        if (!runFailed) {
          // Aggregate terminal node outputs
          const terminalNodes = findTerminalNodes(engineNodes, engineEdges);
          const finalOutput: Record<string, Record<string, unknown>> = {};
          for (const node of terminalNodes) {
            finalOutput[node.id] = nodeOutputs.get(node.id) ?? {};
          }

          await db
            .update(tables.workflowRuns)
            .set({
              status: 'completed',
              outputData: JSON.stringify(finalOutput),
              completedAt: new Date().toISOString(),
            })
            .where(eq(tables.workflowRuns.id, runId));

          sendEvent(controller, { event: 'run:complete', data: { output: finalOutput } });
        }
      } catch (err) {
        const error = err instanceof Error ? err.message : 'Unknown error';
        await db
          .update(tables.workflowRuns)
          .set({ status: 'failed', error, completedAt: new Date().toISOString() })
          .where(eq(tables.workflowRuns.id, runId));
        sendEvent(controller, { event: 'run:error', data: { error } });
      } finally {
        clearInterval(keepAlive);
        controller.close();
      }
    },
  });

  return stream;
});
