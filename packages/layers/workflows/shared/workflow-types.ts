/**
 * Shared types for the workflow builder feature.
 * Used by both client (VueFlow canvas, node editor, SchemaEditor)
 * and server (SSE stream endpoint, node executor, topo-sort engine).
 */

// Node type identifiers
export type WorkflowNodeType = 'prompt' | 'transform' | 'classifier' | 'validator';

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type JsonObject = Record<string, JsonValue>;

// JSON-schema subset the output schema editor reads and writes
export interface OutputSchemaProperty {
  type: string;
  description?: string;
  enum?: string[];
}

export type OutputSchema = {
  type: 'object';
  properties: Record<string, OutputSchemaProperty>;
  required?: string[];
};

// A single field in the output schema editor
export interface SchemaField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  enumValues?: string[]; // for type === 'string' with fixed options
}

// Live status for a single node during a run
export interface NodeRunStatus {
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: JsonObject;
  tokensIn?: number;
  tokensOut?: number;
  latencyMs?: number;
  error?: string;
}

// SSE event shapes emitted by the stream endpoint
export type WorkflowSSEEvent =
  | { event: 'node:start'; data: { nodeId: string; label: string } }
  | {
      event: 'node:complete';
      data: {
        nodeId: string;
        output: JsonObject;
        tokensIn: number;
        tokensOut: number;
        latencyMs: number;
      };
    }
  | { event: 'node:error'; data: { nodeId: string; error: string } }
  | { event: 'run:complete'; data: { output: Record<string, JsonObject> } }
  | { event: 'run:error'; data: { error: string } };

export type AccentColor = 'blue' | 'violet' | 'amber' | 'green';

// Default configs per node type
export const NODE_TYPE_DEFAULTS: Record<
  WorkflowNodeType,
  { temperature: number; maxTokens: number; icon: string; accentColor: AccentColor }
> = {
  prompt: { temperature: 0.7, maxTokens: 1024, icon: '⚡', accentColor: 'blue' },
  transform: { temperature: 0.3, maxTokens: 512, icon: '🔄', accentColor: 'violet' },
  classifier: { temperature: 0.2, maxTokens: 256, icon: '🏷️', accentColor: 'amber' },
  validator: { temperature: 0.1, maxTokens: 256, icon: '✅', accentColor: 'green' },
};

export function isWorkflowNodeType(value: string): value is WorkflowNodeType {
  return Object.hasOwn(NODE_TYPE_DEFAULTS, value);
}
