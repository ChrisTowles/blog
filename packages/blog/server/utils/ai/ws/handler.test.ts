/**
 * Tests for WebSocket message handler
 * RED-GREEN: Processes incoming WS messages and returns responses
 */
import { describe, it, expect } from 'vitest'
import {
    createWsHandler,
    type IncomingMessage
} from './handler'

describe('ws/handler', () => {
    describe('createWsHandler', () => {
        it('should create a handler instance', () => {
            const handler = createWsHandler()
            expect(handler).toBeDefined()
            expect(handler.handleMessage).toBeDefined()
        })
    })

    describe('handleMessage', () => {
        it('should parse and route a chat message', async () => {
            const handler = createWsHandler()
            const messages: any[] = []

            const incoming: IncomingMessage = {
                type: 'chat',
                content: 'Hello!',
                chatId: 'chat-123'
            }

            // Handler returns an async generator
            for await (const msg of handler.handleMessage(incoming)) {
                messages.push(msg)
            }

            // Should have at least one response message
            expect(messages.length).toBeGreaterThan(0)
            // Last message should be 'done'
            expect(messages[messages.length - 1].type).toBe('done')
        })

        it('should handle blog queries', async () => {
            const handler = createWsHandler()
            const messages: any[] = []

            const incoming: IncomingMessage = {
                type: 'chat',
                content: 'What blog posts do you have?',
                chatId: 'chat-123'
            }

            for await (const msg of handler.handleMessage(incoming)) {
                messages.push(msg)
            }

            // Should route to blog_search agent
            const doneMsg = messages.find(m => m.type === 'done')
            expect(doneMsg?.agentType).toBe('blog_search')
        })

        it('should handle weather queries', async () => {
            const handler = createWsHandler()
            const messages: any[] = []

            const incoming: IncomingMessage = {
                type: 'chat',
                content: 'What is the weather today?',
                chatId: 'chat-123'
            }

            for await (const msg of handler.handleMessage(incoming)) {
                messages.push(msg)
            }

            const doneMsg = messages.find(m => m.type === 'done')
            expect(doneMsg?.agentType).toBe('weather')
        })

        it('should handle greetings directly', async () => {
            const handler = createWsHandler()
            const messages: any[] = []

            const incoming: IncomingMessage = {
                type: 'chat',
                content: 'Hello!',
                chatId: 'chat-123'
            }

            for await (const msg of handler.handleMessage(incoming)) {
                messages.push(msg)
            }

            // Greeting should produce a chunk and done from orchestrator
            const doneMsg = messages.find(m => m.type === 'done')
            expect(doneMsg?.agentType).toBe('orchestrator')
        })

        it('should handle invalid message type', async () => {
            const handler = createWsHandler()
            const messages: any[] = []

            const incoming = {
                type: 'invalid',
                data: 'test'
            } as any

            for await (const msg of handler.handleMessage(incoming)) {
                messages.push(msg)
            }

            // Should return an error message
            expect(messages[0].type).toBe('error')
        })
    })
})
