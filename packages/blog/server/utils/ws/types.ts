/**
 * WebSocket message protocol types for chat communication.
 * Used by both the WebSocket handler and (future) client composable.
 */

// --- Peer interface (subset of crossws Peer, avoids direct dependency) ---

export interface WSPeer {
  readonly id: string;
  readonly request: { url: string; headers: Headers } | undefined;
  send(data: unknown, options?: { compress?: boolean }): number | void | undefined;
  close(code?: number, reason?: string): void;
}

// --- Client -> Server ---

export interface WSChatMessage {
  type: 'chat';
  chatId: string;
  content: string;
  newConversation?: boolean;
}

export interface WSSubscribeMessage {
  type: 'subscribe';
  chatId: string;
}

export interface WSUnsubscribeMessage {
  type: 'unsubscribe';
  chatId: string;
}

export interface WSPingMessage {
  type: 'ping';
}

export type WSClientMessage =
  | WSChatMessage
  | WSSubscribeMessage
  | WSUnsubscribeMessage
  | WSPingMessage;

// --- Server -> Client ---

export interface WSTextMessage {
  type: 'text';
  chatId: string;
  delta: string;
}

export interface WSReasoningMessage {
  type: 'reasoning';
  chatId: string;
  delta: string;
}

export interface WSToolUseMessage {
  type: 'tool_use';
  chatId: string;
  toolName: string;
  toolId: string;
  toolInput: unknown;
}

export interface WSToolResultMessage {
  type: 'tool_result';
  chatId: string;
  toolId: string;
  toolResult: unknown;
  isError?: boolean;
}

export interface WSDoneMessage {
  type: 'done';
  chatId: string;
  sessionId?: string;
  suggestedTitle?: string;
}

export interface WSErrorMessage {
  type: 'error';
  chatId: string;
  content: string;
}

export interface WSTitleMessage {
  type: 'title';
  chatId: string;
  suggestedTitle: string;
}

export interface WSSessionInitMessage {
  type: 'session_init';
  chatId: string;
  sessionId: string;
}

export interface WSPongMessage {
  type: 'pong';
}

export type WSServerMessage =
  | WSTextMessage
  | WSReasoningMessage
  | WSToolUseMessage
  | WSToolResultMessage
  | WSDoneMessage
  | WSErrorMessage
  | WSTitleMessage
  | WSSessionInitMessage
  | WSPongMessage;

// --- Session types ---

export interface SessionInfo {
  userId: string;
  chatId: string;
  sdkSessionId?: string;
  connectedAt: Date;
  lastActivityAt: Date;
}
