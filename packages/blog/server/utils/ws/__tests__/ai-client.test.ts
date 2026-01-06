/**
 * Integration tests for WebSocket AIClient
 *
 * Tests actual Agent SDK integration (no mocking)
 */
import { describe, it, expect } from 'vitest'
import { AIClient } from '../ai-client'
import type { WSServerMessage } from '../types'

describe('AIClient', () => {
    describe('queryStream', () => {
        it('streams text responses for simple prompts', async () => {
            const client = new AIClient()
            const messages: WSServerMessage[] = []

            for await (const msg of client.queryStream('chat-1', 'Say hello in exactly 3 words')) {
                messages.push(msg)
            }

            // Should have at least one text message and done
            expect(messages.some(m => m.type === 'text')).toBe(true)
            expect(messages.some(m => m.type === 'done')).toBe(true)
        }, 60000)

        it('captures SDK session ID on init', async () => {
            const client = new AIClient()
            let sessionId: string | undefined

            for await (const msg of client.queryStream('chat-1', 'What is 2 + 2?')) {
                if (msg.type === 'session_init') {
                    sessionId = msg.sessionId
                }
            }

            expect(sessionId).toBeDefined()
            expect(typeof sessionId).toBe('string')
        }, 60000)

        it('uses tool for blog-related queries', async () => {
            const client = new AIClient()
            const toolMessages: WSServerMessage[] = []

            for await (const msg of client.queryStream('chat-1', 'What has the author written about Vue?')) {
                if (msg.type === 'tool_use' || msg.type === 'tool_result') {
                    toolMessages.push(msg)
                }
            }

            // Should have used the searchBlogContent tool
            const hasSearchTool = toolMessages.some(m =>
                m.type === 'tool_use' && m.toolName.includes('search')
            )
            expect(hasSearchTool).toBe(true)
        }, 60000)

        it('streams reasoning when extended thinking is enabled', async () => {
            const client = new AIClient({ maxThinkingTokens: 4096 })
            const hasReasoning = { found: false }

            for await (const msg of client.queryStream('chat-1', 'Think carefully about what 2+2 equals')) {
                if (msg.type === 'reasoning') {
                    hasReasoning.found = true
                    break
                }
            }

            // Extended thinking should produce reasoning messages
            expect(hasReasoning.found).toBe(true)
        }, 60000)

        it('resumes session with existing session ID', async () => {
            const client = new AIClient()
            let firstSessionId: string | undefined

            // First conversation
            for await (const msg of client.queryStream('chat-1', 'Remember the number 42')) {
                if (msg.type === 'session_init') {
                    firstSessionId = msg.sessionId
                }
            }

            expect(firstSessionId).toBeDefined()

            // Resume the session
            const messages: WSServerMessage[] = []
            for await (const msg of client.queryStream('chat-1', 'What number did I ask you to remember?', {
                resumeSessionId: firstSessionId
            })) {
                messages.push(msg)
            }

            // Should have completed without error
            expect(messages.some(m => m.type === 'done')).toBe(true)
        }, 120000)
    })

    describe('error handling', () => {
        it('handles empty prompts gracefully', async () => {
            const client = new AIClient()
            const messages: WSServerMessage[] = []

            for await (const msg of client.queryStream('chat-1', '')) {
                messages.push(msg)
            }

            // Should complete (even if with an error)
            expect(messages.some(m => m.type === 'done' || m.type === 'error')).toBe(true)
        }, 30000)
    })
})
