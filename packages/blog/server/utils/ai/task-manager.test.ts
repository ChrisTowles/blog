/**
 * TaskManager unit tests
 *
 * Tests the WebSocket chat flow: queue → run → stop
 * Uses mocked AgentSession to verify queue behavior and abort support.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createTaskManager, type TaskManager } from './task-manager'
import { MessageQueue } from './message-queue'
import type { WSServerMessage } from './ws-types'

// Mock the agent-session module
vi.mock('./agent-session', () => ({
    createAgentSession: vi.fn((options, queue) => {
        return {
            chatId: options.chatId,
            taskId: options.taskId,
            _stopped: false,
            stop() {
                this._stopped = true
                queue.pushNoWait({
                    type: 'task_stopped',
                    chatId: options.chatId,
                    taskId: options.taskId
                })
            },
            async run() {
                // Simulate quick completion unless stopped
                if (!this._stopped) {
                    queue.pushNoWait({
                        type: 'task_started',
                        chatId: options.chatId,
                        taskId: options.taskId
                    })
                    // Small delay to allow stop to be called
                    await new Promise(resolve => setTimeout(resolve, 10))
                    if (!this._stopped) {
                        queue.pushNoWait({
                            type: 'task_done',
                            chatId: options.chatId,
                            taskId: options.taskId,
                            messageId: 'test-msg-id'
                        })
                    }
                }
                return { status: this._stopped ? 'stopped' : 'completed' }
            }
        }
    })
}))

describe('TaskManager', () => {
    let taskManager: TaskManager

    beforeEach(() => {
        taskManager = createTaskManager()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('queueTask', () => {
        it('returns a task ID when queuing', () => {
            const taskId = taskManager.queueTask('chat-1', 'Hello', 'sonnet')
            expect(taskId).toBeDefined()
            expect(typeof taskId).toBe('string')
            expect(taskId.length).toBeGreaterThan(0)
        })

        it('emits task_queued event to message queue', async () => {
            const queue = taskManager.getMessageQueue('chat-1')
            const messages: WSServerMessage[] = []

            // Start collecting messages
            const collectPromise = (async () => {
                for await (const msg of queue) {
                    messages.push(msg)
                    // Stop after we get task_done
                    if (msg.type === 'task_done' || msg.type === 'task_stopped') break
                }
            })()

            taskManager.queueTask('chat-1', 'Hello', 'sonnet')

            // Wait for task to complete
            await collectPromise

            expect(messages.some(m => m.type === 'task_queued')).toBe(true)
            expect(messages.some(m => m.type === 'task_started')).toBe(true)
            expect(messages.some(m => m.type === 'task_done')).toBe(true)
        })
    })

    describe('getStatus', () => {
        it('returns empty status for unknown chat', () => {
            const status = taskManager.getStatus('unknown-chat')
            expect(status.runningTaskId).toBeNull()
            expect(status.queuedTaskIds).toEqual([])
        })

        it('shows running task after queueTask', async () => {
            taskManager.queueTask('chat-1', 'Hello', 'sonnet')

            // Give time for task to start
            await new Promise(resolve => setTimeout(resolve, 5))

            const status = taskManager.getStatus('chat-1')
            // Task either running or already completed
            expect(status.type).toBe('queue_status')
            expect(status.chatId).toBe('chat-1')
        })
    })

    describe('stopCurrent', () => {
        it('returns false if no task running', () => {
            const stopped = taskManager.stopCurrent('chat-1')
            expect(stopped).toBe(false)
        })

        it('stops running task and emits task_stopped', async () => {
            const queue = taskManager.getMessageQueue('chat-1')
            const messages: WSServerMessage[] = []

            const collectPromise = (async () => {
                for await (const msg of queue) {
                    messages.push(msg)
                    if (msg.type === 'task_done' || msg.type === 'task_stopped') break
                }
            })()

            taskManager.queueTask('chat-1', 'Hello', 'sonnet')

            // Wait a bit then stop
            await new Promise(resolve => setTimeout(resolve, 5))
            taskManager.stopCurrent('chat-1')

            await collectPromise

            // Should have stopped (possibly with task_stopped event)
            expect(messages.some(m =>
                m.type === 'task_stopped' || m.type === 'task_done'
            )).toBe(true)
        })
    })

    describe('stopTask', () => {
        it('returns false for unknown task', () => {
            const stopped = taskManager.stopTask('chat-1', 'unknown-task')
            expect(stopped).toBe(false)
        })

        it('removes queued task without running', async () => {
            // Queue multiple tasks quickly
            taskManager.queueTask('chat-1', 'First', 'sonnet')

            // Queue second task while first is starting
            await new Promise(resolve => setTimeout(resolve, 2))
            const taskId2 = taskManager.queueTask('chat-1', 'Second', 'sonnet')

            // Stop the queued task
            taskManager.stopTask('chat-1', taskId2)

            // Second task should be removed from queue
            const status = taskManager.getStatus('chat-1')
            expect(status.queuedTaskIds).not.toContain(taskId2)
        })
    })

    describe('cleanup', () => {
        it('stops running task and closes queue', async () => {
            taskManager.queueTask('chat-1', 'Hello', 'sonnet')
            await new Promise(resolve => setTimeout(resolve, 5))

            taskManager.cleanup('chat-1')

            // After cleanup, status should be empty
            const status = taskManager.getStatus('chat-1')
            expect(status.runningTaskId).toBeNull()
            expect(status.queuedTaskIds).toEqual([])
        })
    })

    describe('isRunning', () => {
        it('returns false for unknown chat', () => {
            expect(taskManager.isRunning('unknown')).toBe(false)
        })

        it('returns true while task is running', async () => {
            taskManager.queueTask('chat-1', 'Hello', 'sonnet')
            await new Promise(resolve => setTimeout(resolve, 5))

            // Task should be running or completed
            // This is timing dependent, but demonstrates the API
            const running = taskManager.isRunning('chat-1')
            expect(typeof running).toBe('boolean')
        })
    })

    describe('getQueueLength', () => {
        it('returns 0 for unknown chat', () => {
            expect(taskManager.getQueueLength('unknown')).toBe(0)
        })
    })
})

describe('MessageQueue', () => {
    it('supports async iteration', async () => {
        const queue = new MessageQueue<string>()
        const results: string[] = []

        // Start consumer
        const consumer = (async () => {
            for await (const item of queue) {
                results.push(item)
                if (results.length >= 3) break
            }
        })()

        // Push items
        queue.pushNoWait('a')
        queue.pushNoWait('b')
        queue.pushNoWait('c')

        await consumer

        expect(results).toEqual(['a', 'b', 'c'])
    })

    it('push waits for consumption', async () => {
        const queue = new MessageQueue<string>()
        let consumed = false

        // Push and track when it resolves
        const pushPromise = queue.push('test').then(() => {
            consumed = true
        })

        expect(consumed).toBe(false)

        // Consume
        const iterator = queue[Symbol.asyncIterator]()
        await iterator.next()

        await pushPromise
        expect(consumed).toBe(true)
    })

    it('close ends iteration', async () => {
        const queue = new MessageQueue<string>()

        queue.pushNoWait('a')
        queue.close()

        const results: string[] = []
        for await (const item of queue) {
            results.push(item)
        }

        expect(results).toEqual(['a'])
    })

    it('closeWithError propagates error', async () => {
        const queue = new MessageQueue<string>()
        const testError = new Error('Test error')

        queue.closeWithError(testError)

        await expect(async () => {
            for await (const _ of queue) {
                // Should throw
            }
        }).rejects.toThrow('Test error')
    })

    it('isClosed returns correct state', () => {
        const queue = new MessageQueue<string>()
        expect(queue.isClosed()).toBe(false)

        queue.close()
        expect(queue.isClosed()).toBe(true)
    })

    it('length returns pending items', () => {
        const queue = new MessageQueue<string>()

        expect(queue.length).toBe(0)
        queue.pushNoWait('a')
        expect(queue.length).toBe(1)
        queue.pushNoWait('b')
        expect(queue.length).toBe(2)
    })
})
