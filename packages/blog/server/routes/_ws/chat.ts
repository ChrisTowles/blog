/**
 * WebSocket handler for chat communication.
 *
 * Handles:
 * - Cookie-based auth on upgrade
 * - Subscribe/unsubscribe to chat sessions
 * - Chat messages → Agent SDK
 * - Streaming responses back to clients
 * - Database persistence (messages, session IDs, connection status, titles)
 */
import { SessionManager } from '../../utils/ws/session-manager'
import { AIClient } from '../../utils/ws/ai-client'
import type { WSClientMessage, WSServerMessage, WSConnectionContext } from '../../utils/ws/types'
import type { MessagePart } from '~~/shared/chat-types'
import {
    saveUserMessage,
    saveAssistantMessage,
    updateSdkSessionId,
    updateConnectionStatus,
    generateAndSaveTitle,
    verifyChatOwnership,
    getSdkSessionId
} from '../../utils/ws/chat-persistence'

// Peer type from crossws (available via Nitro's WebSocket support)
type WSPeer = {
    send: (data: string) => void
    context: Record<string, unknown>
}

// Global session manager singleton
let sessionManager: SessionManager | null = null

function getSessionManager(): SessionManager {
    if (!sessionManager) {
        sessionManager = new SessionManager()
    }
    return sessionManager
}

// Global AI client singleton
let aiClient: AIClient | null = null

function getAIClient(): AIClient {
    if (!aiClient) {
        aiClient = new AIClient({
            model: 'haiku',
            maxTurns: 10,
            maxThinkingTokens: 4096,
            projectSkills: true
        })
    }
    return aiClient
}

/**
 * Broadcast a message to all subscribers of a chat
 */
function broadcastToChat(manager: SessionManager, chatId: string, message: WSServerMessage) {
    const session = manager.getSession(chatId)
    if (!session) return

    const json = JSON.stringify(message)
    for (const peer of session.subscribers) {
        try {
            (peer as WSPeer).send(json)
        }
        catch (e) {
            console.warn('[WS] Failed to send to peer:', e)
        }
    }
}

// Store connection context per peer
const peerContexts = new WeakMap<object, WSConnectionContext>()

export default defineWebSocketHandler({
    // Handle WebSocket upgrade
    // Note: We can't use getUserSession here - event.context isn't initialized
    // during WS upgrade. Auth is deferred to subscribe message via verifyChatOwnership.
    async upgrade(_req) {
        // Auth happens on subscribe via verifyChatOwnership - we can't access cookies here
    },

    open(peer) {
        // Generate temporary connection ID - real auth happens on subscribe via verifyChatOwnership
        const connectionId = crypto.randomUUID()

        // Initialize peer context with temporary ID
        peerContexts.set(peer, {
            connectionId,
            subscribedChats: new Set(),
            chatOwners: new Map(),
            connectedAt: new Date()
        })

        console.log(`[WS] Client connected: ${connectionId}`)

        // Send pong to confirm connection
        peer.send(JSON.stringify({ type: 'pong' } as WSServerMessage))
    },

    async message(peer, message) {
        const context = peerContexts.get(peer)
        if (!context) {
            console.warn('[WS] Message from unknown peer')
            return
        }

        let parsed: WSClientMessage
        try {
            parsed = JSON.parse(message.text())
        }
        catch {
            console.warn('[WS] Invalid message format')
            peer.send(JSON.stringify({
                type: 'error',
                chatId: '',
                content: 'Invalid message format'
            } as WSServerMessage))
            return
        }

        const manager = getSessionManager()

        switch (parsed.type) {
            case 'ping':
                peer.send(JSON.stringify({ type: 'pong' } as WSServerMessage))
                break

            case 'subscribe': {
                const { chatId } = parsed

                // Verify chat exists (ownership check deferred - WS can't access cookies)
                const chatCheck = await verifyChatOwnership(chatId)
                if (!chatCheck.exists) {
                    peer.send(JSON.stringify({
                        type: 'error',
                        chatId,
                        content: 'Chat not found or unauthorized'
                    } as WSServerMessage))
                    return
                }

                // Store real owner ID for persistence operations
                const ownerId = chatCheck.ownerId!
                context.chatOwners.set(chatId, ownerId)

                // Create or get session
                const session = manager.getOrCreateSession(chatId, ownerId)

                // Try to load SDK session ID from database if not in memory
                if (!session.sdkSessionId) {
                    const dbSessionId = await getSdkSessionId(chatId)
                    if (dbSessionId) {
                        manager.setSdkSessionId(chatId, dbSessionId)
                        session.sdkSessionId = dbSessionId
                    }
                }

                // Add peer as subscriber
                manager.subscribe(chatId, peer)
                context.subscribedChats.add(chatId)

                // Update connection status in database
                await updateConnectionStatus(chatId, 'connected')

                console.log(`[WS] ${context.connectionId} subscribed to ${chatId}`)

                // Send session init if we have an SDK session ID
                if (session.sdkSessionId) {
                    peer.send(JSON.stringify({
                        type: 'session_init',
                        chatId,
                        sessionId: session.sdkSessionId
                    } as WSServerMessage))
                }
                break
            }

            case 'unsubscribe': {
                const { chatId } = parsed

                manager.unsubscribe(chatId, peer)
                context.subscribedChats.delete(chatId)

                // Update connection status if no more subscribers
                const session = manager.getSession(chatId)
                if (!session || session.subscribers.size === 0) {
                    await updateConnectionStatus(chatId, 'disconnected')
                }

                console.log(`[WS] ${context.connectionId} unsubscribed from ${chatId}`)
                break
            }

            case 'chat': {
                const { chatId, content, newConversation } = parsed

                // Ensure subscribed
                if (!context.subscribedChats.has(chatId)) {
                    peer.send(JSON.stringify({
                        type: 'error',
                        chatId,
                        content: 'Not subscribed to this chat'
                    } as WSServerMessage))
                    return
                }

                const session = manager.getSession(chatId)
                if (!session) {
                    peer.send(JSON.stringify({
                        type: 'error',
                        chatId,
                        content: 'Session not found'
                    } as WSServerMessage))
                    return
                }

                // Check if already processing
                if (session.isProcessing) {
                    peer.send(JSON.stringify({
                        type: 'error',
                        chatId,
                        content: 'Already processing a message'
                    } as WSServerMessage))
                    return
                }

                // Clear SDK session if starting new conversation
                if (newConversation) {
                    manager.setSdkSessionId(chatId, '')
                    await updateSdkSessionId(chatId, '')
                }

                // Process message with AIClient
                manager.setProcessing(chatId, true)

                // Track if this is the first message (for title generation)
                const isFirstMessage = session.messageCount === 0
                session.messageCount = (session.messageCount || 0) + 1

                // Accumulate assistant response for persistence
                let accumulatedText = ''
                let accumulatedReasoning = ''
                let newSdkSessionId: string | null = null

                try {
                    const userId = context.chatOwners.get(chatId)!

                    // Save user message to database
                    await saveUserMessage({
                        chatId,
                        userId,
                        content
                    })

                    // Generate title if this is the first message
                    if (isFirstMessage) {
                        // Run title generation in background (don't block streaming)
                        generateAndSaveTitle({
                            chatId,
                            userId,
                            firstUserMessage: content
                        }).then((title) => {
                            if (title) {
                                broadcastToChat(manager, chatId, {
                                    type: 'title',
                                    chatId,
                                    suggestedTitle: title
                                })
                            }
                        }).catch((err) => {
                            console.error('[WS] Error generating title:', err)
                        })
                    }

                    const client = getAIClient()

                    // Stream responses to all subscribers
                    for await (const wsMessage of client.queryStream(chatId, content, {
                        resumeSessionId: session.sdkSessionId ?? undefined
                    })) {
                        // Capture SDK session ID
                        if (wsMessage.type === 'session_init') {
                            newSdkSessionId = wsMessage.sessionId
                            manager.setSdkSessionId(chatId, wsMessage.sessionId)
                        }

                        // Accumulate text and reasoning for persistence
                        if (wsMessage.type === 'text') {
                            if (wsMessage.delta) {
                                accumulatedText += wsMessage.delta
                            } else if (wsMessage.content) {
                                accumulatedText = wsMessage.content
                            }
                        }
                        if (wsMessage.type === 'reasoning') {
                            if (wsMessage.delta) {
                                accumulatedReasoning += wsMessage.delta
                            } else if (wsMessage.content) {
                                accumulatedReasoning = wsMessage.content
                            }
                        }

                        // Broadcast to all subscribers
                        broadcastToChat(manager, chatId, wsMessage)
                    }

                    // Save assistant message to database
                    const assistantParts: MessagePart[] = []
                    if (accumulatedReasoning) {
                        assistantParts.push({
                            type: 'reasoning',
                            text: accumulatedReasoning,
                            state: 'done'
                        })
                    }
                    if (accumulatedText) {
                        assistantParts.push({
                            type: 'text',
                            text: accumulatedText
                        })
                    }

                    if (assistantParts.length > 0) {
                        await saveAssistantMessage({
                            chatId,
                            parts: assistantParts
                        })
                    }

                    // Persist SDK session ID to database for resume across server restarts
                    if (newSdkSessionId) {
                        await updateSdkSessionId(chatId, newSdkSessionId)
                    }
                }
                catch (error) {
                    console.error('[WS] Error processing chat:', error)
                    broadcastToChat(manager, chatId, {
                        type: 'error',
                        chatId,
                        content: error instanceof Error ? error.message : 'Unknown error'
                    })
                    broadcastToChat(manager, chatId, {
                        type: 'done',
                        chatId,
                        messageId: crypto.randomUUID()
                    })
                }
                finally {
                    manager.setProcessing(chatId, false)
                }
                break
            }
        }
    },

    async close(peer) {
        const context = peerContexts.get(peer)
        if (!context) {
            return
        }

        const manager = getSessionManager()

        // Unsubscribe from all chats and update connection status
        for (const chatId of context.subscribedChats) {
            manager.unsubscribe(chatId, peer)

            // Update connection status if no more subscribers
            const session = manager.getSession(chatId)
            if (!session || session.subscribers.size === 0) {
                try {
                    await updateConnectionStatus(chatId, 'disconnected')
                }
                catch (err) {
                    console.error(`[WS] Error updating connection status for ${chatId}:`, err)
                }
            }
        }

        peerContexts.delete(peer)
        console.log(`[WS] Client disconnected: ${context.connectionId}`)
    },

    error(peer, error) {
        console.error('[WS] Error:', error)
        const context = peerContexts.get(peer)
        if (context) {
            console.error(`[WS] Error for connection ${context.connectionId}:`, error)
        }
    }
})
