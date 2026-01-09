/**
 * TaskManager - Track running/queued agent tasks per chat
 *
 * Manages task lifecycle: queue → run → complete/stop
 * Each chat has at most one running task and a queue of pending tasks.
 */

import { createAgentSession, type AgentSession, type AgentSessionOptions } from './agent-session'
import { createMessageQueue, type MessageQueue } from './message-queue'
import type { WSServerMessage, WSQueueStatusEvent, WSTaskQueuedEvent } from './ws-types'

export interface QueuedTask {
    taskId: string
    chatId: string
    prompt: string
    model?: string
    queuedAt: Date
}

export interface ChatTaskState {
    /** Currently running session, if any */
    running: AgentSession | null
    /** Queued tasks waiting to run */
    queue: QueuedTask[]
    /** Message queue for WebSocket delivery */
    messageQueue: MessageQueue<WSServerMessage>
}

/**
 * Manages agent tasks across all chats.
 * Singleton pattern - one manager for the entire server.
 */
export class TaskManager {
    private chats: Map<string, ChatTaskState> = new Map()

    /**
     * Get or create state for a chat
     */
    private getOrCreateChat(chatId: string): ChatTaskState {
        let state = this.chats.get(chatId)
        if (!state) {
            state = {
                running: null,
                queue: [],
                messageQueue: createMessageQueue()
            }
            this.chats.set(chatId, state)
        }
        return state
    }

    /**
     * Get the message queue for a chat (for WebSocket consumption)
     */
    getMessageQueue(chatId: string): MessageQueue<WSServerMessage> {
        return this.getOrCreateChat(chatId).messageQueue
    }

    /**
     * Queue a new task for a chat.
     * Returns the task ID.
     */
    queueTask(chatId: string, prompt: string, model?: string): string {
        const state = this.getOrCreateChat(chatId)
        const taskId = crypto.randomUUID()

        const task: QueuedTask = {
            taskId,
            chatId,
            prompt,
            model,
            queuedAt: new Date()
        }

        state.queue.push(task)

        // Emit queued event
        const queuedEvent: WSTaskQueuedEvent = {
            type: 'task_queued',
            chatId,
            taskId,
            position: state.queue.length,
            queueLength: state.queue.length + (state.running ? 1 : 0)
        }
        state.messageQueue.pushNoWait(queuedEvent)

        // Try to start processing if nothing running
        this.processNext(chatId)

        return taskId
    }

    /**
     * Process the next queued task if nothing is running
     */
    private async processNext(chatId: string): Promise<void> {
        const state = this.chats.get(chatId)
        if (!state) return

        // Already running something
        if (state.running) return

        // Nothing queued
        const task = state.queue.shift()
        if (!task) return

        // Create and run the session
        const options: AgentSessionOptions = {
            chatId: task.chatId,
            taskId: task.taskId,
            prompt: task.prompt,
            model: task.model
        }

        const session = createAgentSession(options, state.messageQueue)
        state.running = session

        try {
            await session.run()
        } finally {
            // Clear running state
            state.running = null
            // Process next task in queue
            this.processNext(chatId)
        }
    }

    /**
     * Stop the currently running task for a chat
     */
    stopCurrent(chatId: string): boolean {
        const state = this.chats.get(chatId)
        if (!state?.running) return false

        state.running.stop()
        return true
    }

    /**
     * Stop a specific task (running or queued)
     */
    stopTask(chatId: string, taskId: string): boolean {
        const state = this.chats.get(chatId)
        if (!state) return false

        // Check if it's the running task
        if (state.running?.taskId === taskId) {
            state.running.stop()
            return true
        }

        // Check if it's in the queue
        const idx = state.queue.findIndex(t => t.taskId === taskId)
        if (idx >= 0) {
            state.queue.splice(idx, 1)
            // Emit stopped event for queued task
            state.messageQueue.pushNoWait({
                type: 'task_stopped',
                chatId,
                taskId
            })
            return true
        }

        return false
    }

    /**
     * Get current queue status for a chat
     */
    getStatus(chatId: string): WSQueueStatusEvent {
        const state = this.chats.get(chatId)

        return {
            type: 'queue_status',
            chatId,
            runningTaskId: state?.running?.taskId ?? null,
            queuedTaskIds: state?.queue.map(t => t.taskId) ?? []
        }
    }

    /**
     * Check if a chat has a running task
     */
    isRunning(chatId: string): boolean {
        const state = this.chats.get(chatId)
        return state?.running !== null && state?.running !== undefined
    }

    /**
     * Get queue length for a chat
     */
    getQueueLength(chatId: string): number {
        const state = this.chats.get(chatId)
        return state?.queue.length ?? 0
    }

    /**
     * Clean up a chat's state (e.g., on disconnect)
     */
    cleanup(chatId: string): void {
        const state = this.chats.get(chatId)
        if (!state) return

        // Stop any running task
        if (state.running) {
            state.running.stop()
        }

        // Close the message queue
        state.messageQueue.close()

        // Remove from map
        this.chats.delete(chatId)
    }
}

// Singleton instance
let taskManagerInstance: TaskManager | null = null

/**
 * Get the singleton TaskManager instance
 */
export function getTaskManager(): TaskManager {
    if (!taskManagerInstance) {
        taskManagerInstance = new TaskManager()
    }
    return taskManagerInstance
}

/**
 * Create a fresh TaskManager (for testing)
 */
export function createTaskManager(): TaskManager {
    return new TaskManager()
}
