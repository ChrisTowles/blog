/**
 * WebSocket message types for chat communication.
 *
 * Client → Server messages
 */
export interface WSChatMessage {
    type: 'chat'
    chatId: string
    content: string
    newConversation?: boolean
}

export interface WSSubscribeMessage {
    type: 'subscribe'
    chatId: string
}

export interface WSUnsubscribeMessage {
    type: 'unsubscribe'
    chatId: string
}

export interface WSPingMessage {
    type: 'ping'
}

export type WSClientMessage =
    | WSChatMessage
    | WSSubscribeMessage
    | WSUnsubscribeMessage
    | WSPingMessage

/**
 * Server → Client messages
 */
export interface WSTextMessage {
    type: 'text'
    chatId: string
    delta?: string
    content?: string
}

export interface WSReasoningMessage {
    type: 'reasoning'
    chatId: string
    delta?: string
    content?: string
}

export interface WSToolUseMessage {
    type: 'tool_use'
    chatId: string
    toolName: string
    toolId: string
    toolInput: unknown
}

export interface WSToolResultMessage {
    type: 'tool_result'
    chatId: string
    toolId: string
    toolResult: unknown
    isError?: boolean
}

export interface WSDoneMessage {
    type: 'done'
    chatId: string
    messageId: string
    sessionId?: string
    suggestedTitle?: string
}

export interface WSErrorMessage {
    type: 'error'
    chatId: string
    content: string
}

export interface WSTitleMessage {
    type: 'title'
    chatId: string
    suggestedTitle: string
}

export interface WSSessionInitMessage {
    type: 'session_init'
    chatId: string
    sessionId: string
}

export interface WSPongMessage {
    type: 'pong'
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
    | WSPongMessage

/**
 * Connection context stored with each WebSocket peer
 */
export interface WSConnectionContext {
    connectionId: string
    subscribedChats: Set<string>
    /** Maps chatId to the real owner userId (from database) */
    chatOwners: Map<string, string>
    connectedAt: Date
}

/**
 * Session state for a chat
 */
export interface ChatSessionState {
    chatId: string
    userId: string
    sdkSessionId: string | null
    isProcessing: boolean
    lastActivityAt: Date
    subscribers: Set<unknown> // Nitro Peer type
    /** Number of messages in this session (for title generation) */
    messageCount: number
}
