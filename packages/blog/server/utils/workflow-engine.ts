import { eq } from 'drizzle-orm';

export interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  prompt: string;
  model: string;
  temperature: number;
  maxTokens: number;
  outputSchema: Record<string, unknown>;
  inputMapping: Record<string, string>;
}

export interface WorkflowEdge {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}

/**
 * Kahn's algorithm topological sort.
 * Throws if the graph contains a cycle.
 */
export function topologicalSort<T extends { id: string }>(
  nodes: T[],
  edges: Array<{ source: string; target: string }>,
): T[] {
  const inDegree = new Map<string, number>();
  const adjacency = new Map<string, string[]>();

  for (const node of nodes) {
    inDegree.set(node.id, 0);
    adjacency.set(node.id, []);
  }

  for (const edge of edges) {
    adjacency.get(edge.source)?.push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
  }

  const queue: string[] = [];
  for (const [id, degree] of inDegree) {
    if (degree === 0) queue.push(id);
  }

  const sorted: T[] = [];
  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  while (queue.length > 0) {
    const id = queue.shift()!;
    sorted.push(nodeById.get(id)!);

    for (const neighbor of adjacency.get(id) ?? []) {
      const newDegree = (inDegree.get(neighbor) ?? 0) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    }
  }

  if (sorted.length !== nodes.length) {
    throw new Error('Cycle detected in workflow graph');
  }

  return sorted;
}

/**
 * Replace {{nodeId.field}} and {{input.field}} references in a prompt template.
 * Unknown references are left intact.
 */
export function resolveTemplate(
  prompt: string,
  nodeOutputs: Map<string, Record<string, unknown>>,
  workflowInput: Record<string, unknown>,
): string {
  return prompt.replace(/\{\{(\w+)\.(\w+)\}\}/g, (match, nodeId, field) => {
    const source = nodeId === 'input' ? workflowInput : nodeOutputs.get(nodeId);
    if (!source) return match;

    const value = source[field];
    if (value === undefined) return match;
    if (typeof value === 'object' && value !== null) return JSON.stringify(value);
    return String(value);
  });
}

/**
 * Find nodes with no outgoing edges (terminal nodes).
 */
export function findTerminalNodes(nodes: WorkflowNode[], edges: WorkflowEdge[]): WorkflowNode[] {
  const sourcesWithOutgoing = new Set(edges.map((e) => e.source));
  return nodes.filter((n) => !sourcesWithOutgoing.has(n.id));
}

export interface NodeExecutionResult {
  parsedOutput: Record<string, unknown>;
  tokensIn: number;
  tokensOut: number;
  latencyMs: number;
  rawResponse: string;
}

/**
 * Execute a single node: resolve template → call Anthropic with tool_use → extract output.
 * Writes the node_executions row.
 */
export async function executeNode(
  node: WorkflowNode,
  runId: string,
  nodeOutputs: Map<string, Record<string, unknown>>,
  workflowInput: Record<string, unknown>,
): Promise<NodeExecutionResult> {
  const client = getAnthropicClient();
  const db = useDrizzle();

  const resolvedPrompt = resolveTemplate(node.prompt, nodeOutputs, workflowInput);
  const startedAt = new Date().toISOString();

  // Write pending row — if this throws, there's nothing to update
  const [execRow] = await db
    .insert(tables.nodeExecutions)
    .values({
      runId,
      nodeId: node.id,
      status: 'running',
      promptSent: resolvedPrompt,
      startedAt,
    })
    .returning();

  if (!execRow) throw new Error('Failed to insert node execution row');

  const t0 = Date.now();
  try {
    const response = await client.messages.create({
      model: node.model,
      max_tokens: node.maxTokens,
      temperature: node.temperature,
      tools: [
        {
          name: 'structured_output',
          description: 'Return the structured response for this prompt.',
          input_schema: node.outputSchema as {
            type: 'object';
            properties: Record<string, unknown>;
          },
        },
      ],
      tool_choice: { type: 'tool', name: 'structured_output' },
      messages: [{ role: 'user', content: resolvedPrompt }],
    });

    const latencyMs = Date.now() - t0;
    const toolBlock = response.content.find(
      (c) => c.type === 'tool_use' && c.name === 'structured_output',
    );

    if (!toolBlock || toolBlock.type !== 'tool_use') {
      throw new Error('No structured_output tool_use block in response');
    }

    const parsedOutput = toolBlock.input as Record<string, unknown>;
    const rawResponse = JSON.stringify(response);

    // Update row with results
    await db
      .update(tables.nodeExecutions)
      .set({
        status: 'completed',
        rawResponse,
        parsedOutput: JSON.stringify(parsedOutput),
        tokensIn: response.usage.input_tokens,
        tokensOut: response.usage.output_tokens,
        latencyMs,
        completedAt: new Date().toISOString(),
      })
      .where(eq(tables.nodeExecutions.id, execRow.id));

    return {
      parsedOutput,
      tokensIn: response.usage.input_tokens,
      tokensOut: response.usage.output_tokens,
      latencyMs,
      rawResponse,
    };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error';
    await db
      .update(tables.nodeExecutions)
      .set({ status: 'failed', error, completedAt: new Date().toISOString() })
      .where(eq(tables.nodeExecutions.id, execRow.id));
    throw err;
  }
}
