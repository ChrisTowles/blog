/**
 * WebSocket message protocol for multi-agent chat
 * Defines message types for streaming agent responses
 */

/** Agent types in the multi-agent system */
export type AgentType = 'orchestrator' | 'blog_search' | 'general' | 'weather'

/** Chunk message - streaming text content */
export interface WsChunkMessage {
    type: 'chunk'
    content: string
}

/** Done message - agent completed response */
export interface WsDoneMessage {
    type: 'done'
    agentType?: AgentType | string
}

/** Error message - something went wrong */
export interface WsErrorMessage {
    type: 'error'
    message: string
    code?: string
}

/** Thinking message - extended thinking content */
export interface WsThinkingMessage {
    type: 'thinking'
    content: string
}

/** Tool use message - agent is calling a tool */
export interface WsToolUseMessage {
    type: 'tool_use'
    toolId: string
    name: string
    input: Record<string, unknown>
}

/** Tool result message - tool returned a result */
export interface WsToolResultMessage {
    type: 'tool_result'
    toolId: string
    output: unknown
}

/** Union of all WebSocket message types */
export type WsMessage =
    | WsChunkMessage
    | WsDoneMessage
    | WsErrorMessage
    | WsThinkingMessage
    | WsToolUseMessage
    | WsToolResultMessage

/** Valid message type strings */
const VALID_MESSAGE_TYPES = ['chunk', 'done', 'error', 'thinking', 'tool_use', 'tool_result'] as const

// Factory functions

export function createChunkMessage(content: string): WsChunkMessage {
    return { type: 'chunk', content }
}

export function createDoneMessage(agentType?: AgentType | string): WsDoneMessage {
    return { type: 'done', agentType }
}

export function createErrorMessage(message: string, code?: string): WsErrorMessage {
    return { type: 'error', message, code }
}

export function createThinkingMessage(content: string): WsThinkingMessage {
    return { type: 'thinking', content }
}

export function createToolUseMessage(
    toolId: string,
    name: string,
    input: Record<string, unknown>
): WsToolUseMessage {
    return { type: 'tool_use', toolId, name, input }
}

export function createToolResultMessage(
    toolId: string,
    output: unknown
): WsToolResultMessage {
    return { type: 'tool_result', toolId, output }
}

// Serialization

export function serializeMessage(msg: WsMessage): string {
    return JSON.stringify(msg)
}

export function deserializeMessage(json: string): WsMessage {
    let parsed: unknown
    try {
        parsed = JSON.parse(json)
    } catch {
        throw new Error(`Invalid JSON: ${json}`)
    }

    if (!parsed || typeof parsed !== 'object') {
        throw new Error('Message must be an object')
    }

    const obj = parsed as Record<string, unknown>

    if (!('type' in obj) || typeof obj.type !== 'string') {
        throw new Error('Message must have a type field')
    }

    if (!VALID_MESSAGE_TYPES.includes(obj.type as typeof VALID_MESSAGE_TYPES[number])) {
        throw new Error(`Unknown message type: ${obj.type}`)
    }

    return parsed as WsMessage
}
