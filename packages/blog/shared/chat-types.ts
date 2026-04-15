/**
 * Shared types for chat functionality
 * Used by both client and server
 */

import type { AviationToolResult } from './mcp-aviation-types';

export type MessageRole = 'user' | 'assistant';

/**
 * CSP shape mirrored from SEP-1865 (`@modelcontextprotocol/ext-apps`'s
 * `McpUiResourceCsp`). Re-declared shallowly here so the chat wire type does
 * not depend on the ext-apps package at the shared layer.
 */
export interface McpUiResourceCsp {
  connectDomains?: string[];
  resourceDomains?: string[];
  frameDomains?: string[];
}

/**
 * Permissions shape mirrored from SEP-1865.
 */
export interface McpUiResourcePermissions {
  [key: string]: unknown;
}

/**
 * Local extension to MCP UI HostContext: signals to the iframe whether a new
 * tool call is in-flight so it can disable follow-up chips.
 *
 * FROZEN IN UNIT 6. Values:
 *   - 'streaming': a tool call is in-flight; iframes should disable chips.
 *   - 'idle':      no tool call in-flight; iframes should enable chips.
 *   - undefined:   host has not declared a status; iframe treats as idle.
 *
 * Iframe code ignores any other value (see
 * `packages/blog/mcp-ui/aviation-answer/aviation-answer.ts` around the
 * `ctx.status === 'streaming'` check).
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
 * A persisted iframe-rendered MCP UI resource (e.g. the aviation-answer
 * iframe). Stored alongside regular chat parts; replay is inert — the iframe
 * re-renders from `structuredContent` without re-firing the tool call.
 *
 * IMPORTANT: the HTML bundle is NOT stored here. The iframe fetches the
 * `ui://` bundle from the MCP server (HTTP-cached) on every render.
 */
export interface UiResourcePart {
  type: 'ui-resource';
  /** Correlation id with the original tool call (for potential retries / refreshes). */
  toolCallId: string;
  /** `ui://`-scheme URI of the resource on the MCP server. */
  uiResourceUri: string;
  /**
   * The structured payload the iframe renders. For aviation, this matches
   * `AviationToolResult`. Typed as `Record<string, unknown>` at the wire
   * boundary so tolerating additional `ui-resource` surfaces later (e.g. a
   * future non-aviation tool) does not require a breaking change.
   */
  structuredContent: AviationToolResult | Record<string, unknown>;
  /** Optional CSP metadata mirroring SEP-1865's `_meta.ui.csp`. */
  csp?: McpUiResourceCsp;
  /** Optional permissions metadata mirroring SEP-1865's `_meta.ui.permissions`. */
  permissions?: McpUiResourcePermissions;
  /** True if the MCP tool returned `isError`. */
  error?: boolean;
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
  | SSEContainerEvent;
