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
    const node = nodeById.get(id);
    if (node) sorted.push(node);

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
