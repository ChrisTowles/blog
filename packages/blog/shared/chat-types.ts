/**
 * Shared types for chat functionality
 * Used by both client and server
 */

export type MessageRole = 'user' | 'assistant'

export interface TextPart {
  type: 'text'
  text: string
}

export interface ReasoningPart {
  type: 'reasoning'
  text: string
  state: 'streaming' | 'done'
}

export interface ToolUsePart {
  type: 'tool-use'
  toolName: string
  toolCallId: string
  args: Record<string, unknown>
}

export interface ToolResultPart {
  type: 'tool-result'
  toolCallId: string
  result: unknown
}

export type MessagePart = TextPart | ReasoningPart | ToolUsePart | ToolResultPart

export interface ChatMessage {
  id: string
  role: MessageRole
  parts: MessagePart[]
  createdAt?: Date
}

export interface Chat {
  id: string
  title: string | null
  userId: string
  createdAt: Date
  messages: ChatMessage[]
}

export type ChatStatus = 'idle' | 'streaming' | 'error'

// SSE event types
export interface SSETextEvent {
  type: 'text'
  text: string
}

export interface SSEReasoningEvent {
  type: 'reasoning'
  text: string
}

export interface SSEDoneEvent {
  type: 'done'
  messageId: string
}

export interface SSEErrorEvent {
  type: 'error'
  error: string
}

export interface SSETitleEvent {
  type: 'title'
  title: string
}

export type SSEEvent = SSETextEvent | SSEReasoningEvent | SSEDoneEvent | SSEErrorEvent | SSETitleEvent
