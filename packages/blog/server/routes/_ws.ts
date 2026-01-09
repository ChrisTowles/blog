/**
 * WebSocket Handler for Chat
 *
 * Handles real-time bidirectional communication for the chat feature.
 * Routes: ws://host/_ws
 */

import { getTaskManager } from '../utils/ai/task-manager'
import { parseClientMessage, type WSServerMessage } from '../utils/ai/ws-types'

export default defineWebSocketHandler({
    open(peer) {
        console.log('[ws] Connection opened:', peer.id)
    },

    async message(peer, message) {
        const msg = parseClientMessage(message.text())

        if (!msg) {
            peer.send(JSON.stringify({
                type: 'error',
                error: 'Invalid message format'
            } satisfies WSServerMessage))
            return
        }

        const taskManager = getTaskManager()

        switch (msg.type) {
            case 'ping':
                peer.send(JSON.stringify({ type: 'pong' } satisfies WSServerMessage))
                break

            case 'send': {
                const { chatId, content, model } = msg

                // Queue the task
                taskManager.queueTask(chatId, content, model)

                // Start streaming messages to this peer
                // Use a separate async loop to not block message handling
                streamMessagesToClient(peer, chatId)
                break
            }

            case 'stop': {
                const { chatId, taskId } = msg
                if (taskId) {
                    taskManager.stopTask(chatId, taskId)
                } else {
                    taskManager.stopCurrent(chatId)
                }
                break
            }

            case 'status': {
                const { chatId } = msg
                const status = taskManager.getStatus(chatId)
                peer.send(JSON.stringify(status))
                break
            }
        }
    },

    close(peer, details) {
        console.log('[ws] Connection closed:', peer.id, details?.reason || '')
        // Note: We don't cleanup TaskManager here because the user might reconnect
        // Cleanup happens via explicit client request or timeout (future enhancement)
    },

    error(peer, error) {
        console.error('[ws] Error:', peer.id, error)
    }
})

/**
 * Stream messages from TaskManager to WebSocket client
 */
async function streamMessagesToClient(peer: { send: (data: string) => void }, chatId: string): Promise<void> {
    const taskManager = getTaskManager()
    const queue = taskManager.getMessageQueue(chatId)

    try {
        for await (const msg of queue) {
            peer.send(JSON.stringify(msg))
        }
    } catch (err) {
        console.error('[ws] Stream error for chat', chatId, err)
        peer.send(JSON.stringify({
            type: 'error',
            chatId,
            error: err instanceof Error ? err.message : 'Stream error'
        } satisfies WSServerMessage))
    }
}
