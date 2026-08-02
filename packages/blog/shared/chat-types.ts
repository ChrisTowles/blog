import type { AviationToolResult } from './mcp-aviation-types';

export type MessageRole = 'user' | 'assistant';

/**
 * Mirrored shallowly from SEP-1865 so the chat wire types don't pull the ext-apps
 * package into the shared layer.
 */
export interface McpUiResourceCsp {
  connectDomains?: string[];
  resourceDomains?: string[];
  frameDomains?: string[];
}

export interface McpUiResourcePermissions {
  [key: string]: unknown;
}

/**
 * Local extension to MCP UI HostContext: tells the iframe whether a tool call is
 * in-flight so it can disable follow-up chips. Frozen — iframe code treats both
 * `undefined` and any unrecognized value as idle.
 */
export type HostContextStatus = 'streaming' | 'idle' | undefined;

export interface TextPart {
  type: 'text';
  text: string;
}

export interface ReasoningPart {
  type: 'reasoning';
  text: string;
  state: 'streaming' | 'done';
}

export interface ToolUsePart {
  type: 'tool-use';
  toolName: string;
  toolCallId: string;
  args: Record<string, unknown>;
}

export interface ToolResultPart {
  type: 'tool-result';
  toolCallId: string;
  result: unknown;
}

export interface CodeExecutionPart {
  type: 'code-execution';
  code: string;
  language: string;
  stdout: string;
  stderr: string;
  exitCode: number;
  state: 'running' | 'done';
}

export interface FilePart {
  type: 'file';
  fileId: string;
  fileName: string;
  mediaType: string;
  url: string;
}

/**
 * A persisted MCP UI resource, stored beside regular chat parts. Replay is inert: the
 * iframe re-renders from `structuredContent` without re-firing the tool call. The HTML
 * bundle is deliberately not stored — the iframe refetches `ui://` on every render.
 */
export interface UiResourcePart {
  type: 'ui-resource';
  toolCallId: string;
  uiResourceUri: string;
  /** Loosely typed at the wire boundary so a future non-aviation surface isn't breaking. */
  structuredContent: AviationToolResult | Record<string, unknown>;
  csp?: McpUiResourceCsp;
  permissions?: McpUiResourcePermissions;
  /** True if the MCP tool returned `isError`. */
  error?: boolean;
}

/** `html` is the inline bundle, saving the client a `/mcp/<server>/resource` fetch. */
export interface SSEUiResourceEvent {
  type: 'ui_resource';
  part: UiResourcePart;
  html: string;
}

export type MessagePart =
  | TextPart
  | ReasoningPart
  | ToolUsePart
  | ToolResultPart
  | CodeExecutionPart
  | FilePart
  | UiResourcePart;

export interface ChatMessage {
  id: string;
  role: MessageRole;
  parts: MessagePart[];
  createdAt?: Date;
}

export interface Chat {
  id: string;
  title: string | null;
  userId: string;
  createdAt: Date;
  messages: ChatMessage[];
}

export type ChatStatus = 'ready' | 'streaming' | 'error';

// SSE event types
export interface SSETextEvent {
  type: 'text';
  text: string;
}

export interface SSEReasoningEvent {
  type: 'reasoning';
  text: string;
}

export interface SSEDoneEvent {
  type: 'done';
  messageId: string;
}

export interface SSEErrorEvent {
  type: 'error';
  error: string;
}

export interface SSETitleEvent {
  type: 'title';
  title: string;
}

export interface SSEToolStartEvent {
  type: 'tool_start';
  tool: string;
  toolCallId: string;
  args: Record<string, unknown>;
}

export interface SSEToolEndEvent {
  type: 'tool_end';
  tool: string;
  toolCallId: string;
  result: unknown;
}

export interface SSECodeStartEvent {
  type: 'code_start';
  code: string;
  language: string;
}

export interface SSECodeResultEvent {
  type: 'code_result';
  stdout: string;
  stderr: string;
  exitCode: number;
  files: FilePart[];
}

export interface SSEContainerEvent {
  type: 'container';
  containerId: string;
}

export type SSEEvent =
  | SSETextEvent
  | SSEReasoningEvent
  | SSEDoneEvent
  | SSEErrorEvent
  | SSETitleEvent
  | SSEToolStartEvent
  | SSEToolEndEvent
  | SSECodeStartEvent
  | SSECodeResultEvent
  | SSEContainerEvent
  | SSEUiResourceEvent;
