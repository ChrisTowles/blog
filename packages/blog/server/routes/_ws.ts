/**
 * WebSocket handler for multi-agent chat
 * Handles real-time communication between frontend and agent system
 */
import { createWsHandler, serializeMessage, type IncomingMessage } from '../utils/ai/ws'

export default defineWebSocketHandler({
    open(peer) {
        console.log(`[WS] Client connected: ${peer.id}`)
    },

    async message(peer, message) {
        try {
            // Parse incoming message
            const data = JSON.parse(message.text()) as IncomingMessage

            // Create handler and process message
            const handler = createWsHandler()

            // Stream responses back to client
            for await (const wsMessage of handler.handleMessage(data)) {
                peer.send(serializeMessage(wsMessage))
            }
        } catch (error) {
            console.error('[WS] Error processing message:', error)
            peer.send(JSON.stringify({
                type: 'error',
                message: error instanceof Error ? error.message : 'Unknown error',
                code: 'PROCESSING_ERROR'
            }))
        }
    },

    close(peer, details) {
        console.log(`[WS] Client disconnected: ${peer.id}`, details)
    },

    error(peer, error) {
        console.error(`[WS] Error for client ${peer.id}:`, error)
    }
})
