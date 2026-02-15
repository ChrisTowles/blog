/**
 * Shared types for chat functionality
 * Used by both client and server
 */

export type MessageRole = 'user' | 'assistant';

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

export type ArtifactType = 'code' | 'html' | 'svg' | 'markdown' | 'mermaid';

export interface ArtifactPart {
  type: 'artifact';
  artifactId: string;
  artifactType: ArtifactType;
  title: string;
  language?: string;
  content: string;
  state: 'streaming' | 'done';
}

export type MessagePart = TextPart | ReasoningPart | ToolUsePart | ToolResultPart | ArtifactPart;

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

export interface SSEArtifactStartEvent {
  type: 'artifact_start';
  artifactId: string;
  artifactType: ArtifactType;
  title: string;
  language?: string;
}

export interface SSEArtifactDeltaEvent {
  type: 'artifact_delta';
  artifactId: string;
  content: string;
}

export interface SSEArtifactEndEvent {
  type: 'artifact_end';
  artifactId: string;
}

export type SSEEvent =
  | SSETextEvent
  | SSEReasoningEvent
  | SSEDoneEvent
  | SSEErrorEvent
  | SSETitleEvent
  | SSEToolStartEvent
  | SSEToolEndEvent
  | SSEArtifactStartEvent
  | SSEArtifactDeltaEvent
  | SSEArtifactEndEvent;
