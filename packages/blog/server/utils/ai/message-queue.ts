/**
 * MessageQueue - Async iterator pattern for WebSocket message streaming
 *
 * Allows consumers to `for await` over messages as they arrive.
 * Used to bridge between the agent's streaming output and WebSocket delivery.
 */

import type { WSServerMessage } from './ws-types'

interface QueuedItem<T> {
    value: T
    resolve: () => void
}

/**
 * A queue that implements AsyncIterable for streaming messages.
 * Push messages from producer side, consume via `for await` on consumer side.
 */
export class MessageQueue<T = WSServerMessage> implements AsyncIterable<T> {
    private queue: QueuedItem<T>[] = []
    private waitingConsumers: Array<(item: IteratorResult<T>) => void> = []
    private closed = false
    private error: Error | null = null

    /**
     * Push a message to the queue.
     * Returns a promise that resolves when the message is consumed.
     */
    push(value: T): Promise<void> {
        if (this.closed) {
            return Promise.reject(new Error('Queue is closed'))
        }

        // If someone is waiting, give it directly
        const waiting = this.waitingConsumers.shift()
        if (waiting) {
            waiting({ value, done: false })
            return Promise.resolve()
        }

        // Otherwise queue it
        return new Promise((resolve) => {
            this.queue.push({ value, resolve })
        })
    }

    /**
     * Push without waiting for consumption (fire-and-forget).
     */
    pushNoWait(value: T): void {
        if (this.closed) return

        const waiting = this.waitingConsumers.shift()
        if (waiting) {
            waiting({ value, done: false })
        } else {
            this.queue.push({ value, resolve: () => {} })
        }
    }

    /**
     * Close the queue normally. Consumers will complete iteration.
     */
    close(): void {
        this.closed = true
        // Notify all waiting consumers that iteration is done
        for (const waiting of this.waitingConsumers) {
            waiting({ value: undefined as T, done: true })
        }
        this.waitingConsumers = []
    }

    /**
     * Close with error. Consumers will receive the error.
     */
    closeWithError(err: Error): void {
        this.error = err
        this.closed = true
        // Reject all waiting consumers
        for (const waiting of this.waitingConsumers) {
            waiting({ value: undefined as T, done: true })
        }
        this.waitingConsumers = []
    }

    /**
     * Check if queue is closed
     */
    isClosed(): boolean {
        return this.closed
    }

    /**
     * Get current queue length (unconsumed messages)
     */
    get length(): number {
        return this.queue.length
    }

    /**
     * Async iterator implementation
     */
    [Symbol.asyncIterator](): AsyncIterator<T> {
        return {
            next: async (): Promise<IteratorResult<T>> => {
                // Check for error
                if (this.error) {
                    throw this.error
                }

                // If there's something in the queue, return it
                const item = this.queue.shift()
                if (item) {
                    item.resolve()
                    return { value: item.value, done: false }
                }

                // If closed and nothing queued, we're done
                if (this.closed) {
                    return { value: undefined as T, done: true }
                }

                // Wait for next item
                return new Promise((resolve) => {
                    this.waitingConsumers.push(resolve)
                })
            },
        }
    }
}

/**
 * Create a message queue with typed server messages
 */
export function createMessageQueue(): MessageQueue<WSServerMessage> {
    return new MessageQueue<WSServerMessage>()
}
