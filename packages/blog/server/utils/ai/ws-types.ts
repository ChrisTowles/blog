/**
 * WebSocket Protocol Types for Chat
 *
 * Defines the message protocol between client and server for real-time chat.
 * Supports task queuing, abort, and streaming updates.
 */

// ============================================================================
// Client -> Server Messages
// ============================================================================

/**
 * Send a chat message to be processed
 */
export interface WSSendMessage {
    type: 'send'
    chatId: string
    content: string
    /** Optional model override */
    model?: string
}

/**
 * Stop the currently running task
 */
export interface WSStopMessage {
    type: 'stop'
    chatId: string
    /** Optional specific task ID to stop (stops current if omitted) */
    taskId?: string
}

/**
 * Request current task queue status
 */
export interface WSStatusMessage {
    type: 'status'
    chatId: string
}

/**
 * Ping to keep connection alive
 */
export interface WSPingMessage {
    type: 'ping'
}

/**
 * Union of all client -> server message types
 */
export type WSClientMessage =
    | WSSendMessage
    | WSStopMessage
    | WSStatusMessage
    | WSPingMessage

// ============================================================================
// Server -> Client Messages
// ============================================================================

/**
 * Streaming text content
 */
export interface WSTextEvent {
    type: 'text'
    chatId: string
    taskId: string
    text: string
}

/**
 * Streaming reasoning/thinking content
 */
export interface WSReasoningEvent {
    type: 'reasoning'
    chatId: string
    taskId: string
    text: string
}

/**
 * Tool execution started
 */
export interface WSToolStartEvent {
    type: 'tool_start'
    chatId: string
    taskId: string
    tool: string
    toolCallId: string
    args: Record<string, unknown>
}

/**
 * Tool execution completed
 */
export interface WSToolEndEvent {
    type: 'tool_end'
    chatId: string
    taskId: string
    tool: string
    toolCallId: string
    result: unknown
}

/**
 * Task added to queue
 */
export interface WSTaskQueuedEvent {
    type: 'task_queued'
    chatId: string
    taskId: string
    position: number
    /** Total tasks in queue including this one */
    queueLength: number
}

/**
 * Task started processing
 */
export interface WSTaskStartedEvent {
    type: 'task_started'
    chatId: string
    taskId: string
    /** Session ID for resuming conversations */
    sessionId?: string
}

/**
 * Task completed successfully
 */
export interface WSTaskDoneEvent {
    type: 'task_done'
    chatId: string
    taskId: string
    messageId: string
}

/**
 * Task was stopped by user
 */
export interface WSTaskStoppedEvent {
    type: 'task_stopped'
    chatId: string
    taskId: string
    /** Partial result if any */
    partialResult?: string
}

/**
 * Error occurred
 */
export interface WSErrorEvent {
    type: 'error'
    chatId?: string
    taskId?: string
    error: string
    code?: string
}

/**
 * Chat title generated
 */
export interface WSTitleEvent {
    type: 'title'
    chatId: string
    title: string
}

/**
 * Queue status update
 */
export interface WSQueueStatusEvent {
    type: 'queue_status'
    chatId: string
    /** Currently running task ID, if any */
    runningTaskId: string | null
    /** Queued task IDs in order */
    queuedTaskIds: string[]
}

/**
 * Pong response to ping
 */
export interface WSPongEvent {
    type: 'pong'
}

/**
 * Union of all server -> client message types
 */
export type WSServerMessage =
    | WSTextEvent
    | WSReasoningEvent
    | WSToolStartEvent
    | WSToolEndEvent
    | WSTaskQueuedEvent
    | WSTaskStartedEvent
    | WSTaskDoneEvent
    | WSTaskStoppedEvent
    | WSErrorEvent
    | WSTitleEvent
    | WSQueueStatusEvent
    | WSPongEvent

// ============================================================================
// Helpers
// ============================================================================

/**
 * Type guard for client messages
 */
export function isValidClientMessage(msg: unknown): msg is WSClientMessage {
    if (typeof msg !== 'object' || msg === null) return false
    const m = msg as Record<string, unknown>
    if (typeof m.type !== 'string') return false

    switch (m.type) {
        case 'send':
            return typeof m.chatId === 'string' && typeof m.content === 'string'
        case 'stop':
            return typeof m.chatId === 'string'
        case 'status':
            return typeof m.chatId === 'string'
        case 'ping':
            return true
        default:
            return false
    }
}

/**
 * Parse and validate a client message from JSON
 */
export function parseClientMessage(data: string | Buffer): WSClientMessage | null {
    try {
        const str = typeof data === 'string' ? data : data.toString('utf-8')
        const msg = JSON.parse(str)
        return isValidClientMessage(msg) ? msg : null
    } catch {
        return null
    }
}
