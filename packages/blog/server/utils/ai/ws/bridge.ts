/**
 * Agent SDK to WebSocket message bridge
 * Maps Agent SDK events to WebSocket message protocol
 */
import {
    type WsMessage,
    createChunkMessage,
    createDoneMessage,
    createErrorMessage,
    createThinkingMessage,
    createToolUseMessage,
    createToolResultMessage
} from './protocol'

/** Content block types from Agent SDK */
interface TextBlock {
    type: 'text'
    text: string
}

interface ThinkingBlock {
    type: 'thinking'
    thinking: string
}

interface ToolUseBlock {
    type: 'tool_use'
    id: string
    name: string
    input: Record<string, unknown>
}

interface ToolResultBlock {
    type: 'tool_result'
    tool_use_id: string
    content: unknown
}

type ContentBlock = TextBlock | ThinkingBlock | ToolUseBlock | ToolResultBlock

/** Agent SDK event types we handle */
export interface AgentEvent {
    type: 'assistant' | 'tool' | 'result' | 'error' | string
    message?: {
        content: ContentBlock[]
    }
    result?: string
    agentType?: string
    error?: {
        message: string
        code?: string
    }
    [key: string]: unknown
}

/**
 * Map an Agent SDK event to WebSocket messages
 * A single agent event can produce multiple WS messages
 */
export function mapAgentMessageToWs(event: AgentEvent): WsMessage[] {
    const messages: WsMessage[] = []

    switch (event.type) {
        case 'assistant':
            if (event.message?.content) {
                for (const block of event.message.content) {
                    const msg = mapContentBlock(block)
                    if (msg) messages.push(msg)
                }
            }
            break

        case 'tool':
            if (event.message?.content) {
                for (const block of event.message.content) {
                    if (block.type === 'tool_result') {
                        messages.push(createToolResultMessage(
                            block.tool_use_id,
                            block.content
                        ))
                    }
                }
            }
            break

        case 'result':
            messages.push(createDoneMessage(event.agentType))
            break

        case 'error':
            if (event.error) {
                messages.push(createErrorMessage(
                    event.error.message,
                    event.error.code
                ))
            }
            break

        default:
            // Unknown event type, skip
            break
    }

    return messages
}

/**
 * Map a content block to a WebSocket message
 */
function mapContentBlock(block: ContentBlock): WsMessage | null {
    switch (block.type) {
        case 'text':
            return createChunkMessage(block.text)

        case 'thinking':
            return createThinkingMessage(block.thinking)

        case 'tool_use':
            return createToolUseMessage(block.id, block.name, block.input)

        default:
            return null
    }
}
