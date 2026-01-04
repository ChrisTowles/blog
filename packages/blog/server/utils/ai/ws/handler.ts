/**
 * WebSocket message handler
 * Processes incoming messages and routes them through the multi-agent system
 */
import {
    type WsMessage,
    createChunkMessage,
    createDoneMessage,
    createErrorMessage
} from './protocol'
import { createOrchestrator } from '../agents/orchestrator'

/** Incoming message from client */
export interface IncomingMessage {
    type: 'chat' | 'ping'
    content?: string
    chatId?: string
}

/** Handler configuration */
export interface WsHandlerConfig {
    /** Model to use */
    model?: string
    /** Max thinking tokens */
    maxThinkingTokens?: number
}

/** WebSocket handler instance */
export interface WsHandler {
    /** Handle an incoming message, returns async generator of responses */
    handleMessage(message: IncomingMessage): AsyncGenerator<WsMessage>
}

/**
 * Create a WebSocket message handler
 */
export function createWsHandler(config?: WsHandlerConfig): WsHandler {
    const orchestrator = createOrchestrator({
        model: config?.model,
        maxThinkingTokens: config?.maxThinkingTokens
    })

    return {
        async *handleMessage(message: IncomingMessage): AsyncGenerator<WsMessage> {
            // Validate message type
            if (message.type !== 'chat') {
                if (message.type === 'ping') {
                    // Ping messages are handled by WebSocket layer, ignore here
                    return
                }
                yield createErrorMessage(`Unknown message type: ${message.type}`, 'INVALID_TYPE')
                return
            }

            // Validate content
            if (!message.content) {
                yield createErrorMessage('Message content is required', 'MISSING_CONTENT')
                return
            }

            try {
                // Route the query through the orchestrator
                const result = orchestrator.route(message.content)

                // Handle direct responses (like greetings)
                if (result.directResponse) {
                    yield createChunkMessage(result.directResponse)
                    yield createDoneMessage('orchestrator')
                    return
                }

                // For now, we return a placeholder response based on the routed agent
                // TODO: Integrate with actual Agent SDK query() when ready
                const agentType = result.decision.targetAgent

                switch (agentType) {
                    case 'blog_search':
                        yield createChunkMessage(`Searching the blog for relevant content...`)
                        yield createDoneMessage('blog_search')
                        break

                    case 'weather':
                        yield createChunkMessage(`Fetching weather information...`)
                        yield createDoneMessage('weather')
                        break

                    case 'general':
                    default:
                        yield createChunkMessage(`Let me help you with that.`)
                        yield createDoneMessage('general')
                        break
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error'
                yield createErrorMessage(errorMessage, 'HANDLER_ERROR')
            }
        }
    }
}
