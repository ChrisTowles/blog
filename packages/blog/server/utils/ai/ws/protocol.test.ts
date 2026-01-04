/**
 * Tests for WebSocket message protocol
 * RED-GREEN: These tests define the expected behavior
 */
import { describe, it, expect } from 'vitest'
import {
    type WsMessage,
    type WsChunkMessage,
    type WsDoneMessage,
    type WsErrorMessage,
    type WsThinkingMessage,
    type WsToolUseMessage,
    type WsToolResultMessage,
    serializeMessage,
    deserializeMessage,
    createChunkMessage,
    createDoneMessage,
    createErrorMessage,
    createThinkingMessage,
    createToolUseMessage,
    createToolResultMessage
} from './protocol'

describe('ws/protocol', () => {
    describe('message types', () => {
        it('should create a chunk message', () => {
            const msg = createChunkMessage('Hello ')
            expect(msg.type).toBe('chunk')
            expect((msg as WsChunkMessage).content).toBe('Hello ')
        })

        it('should create a done message', () => {
            const msg = createDoneMessage('blog_search')
            expect(msg.type).toBe('done')
            expect((msg as WsDoneMessage).agentType).toBe('blog_search')
        })

        it('should create an error message', () => {
            const msg = createErrorMessage('Something went wrong', 'TOOL_ERROR')
            expect(msg.type).toBe('error')
            expect((msg as WsErrorMessage).message).toBe('Something went wrong')
            expect((msg as WsErrorMessage).code).toBe('TOOL_ERROR')
        })

        it('should create a thinking message', () => {
            const msg = createThinkingMessage('Let me think about this...')
            expect(msg.type).toBe('thinking')
            expect((msg as WsThinkingMessage).content).toBe('Let me think about this...')
        })

        it('should create a tool_use message', () => {
            const msg = createToolUseMessage('tool-123', 'searchBlogContent', { query: 'vue' })
            expect(msg.type).toBe('tool_use')
            expect((msg as WsToolUseMessage).toolId).toBe('tool-123')
            expect((msg as WsToolUseMessage).name).toBe('searchBlogContent')
            expect((msg as WsToolUseMessage).input).toEqual({ query: 'vue' })
        })

        it('should create a tool_result message', () => {
            const msg = createToolResultMessage('tool-123', { results: ['post1', 'post2'] })
            expect(msg.type).toBe('tool_result')
            expect((msg as WsToolResultMessage).toolId).toBe('tool-123')
            expect((msg as WsToolResultMessage).output).toEqual({ results: ['post1', 'post2'] })
        })
    })

    describe('serialization', () => {
        it('should serialize a message to JSON string', () => {
            const msg = createChunkMessage('Hello')
            const serialized = serializeMessage(msg)
            expect(typeof serialized).toBe('string')
            expect(JSON.parse(serialized)).toEqual({ type: 'chunk', content: 'Hello' })
        })

        it('should deserialize a JSON string to message', () => {
            const json = '{"type":"chunk","content":"Hello"}'
            const msg = deserializeMessage(json)
            expect(msg.type).toBe('chunk')
            expect((msg as WsChunkMessage).content).toBe('Hello')
        })

        it('should throw on invalid JSON', () => {
            expect(() => deserializeMessage('not json')).toThrow()
        })

        it('should throw on message without type', () => {
            expect(() => deserializeMessage('{"content":"Hello"}')).toThrow()
        })

        it('should throw on unknown message type', () => {
            expect(() => deserializeMessage('{"type":"unknown","data":"test"}')).toThrow()
        })
    })

    describe('type guards', () => {
        it('should have proper discriminated union types', () => {
            const messages: WsMessage[] = [
                createChunkMessage('Hello'),
                createDoneMessage('general'),
                createErrorMessage('Error'),
                createThinkingMessage('Thinking...'),
                createToolUseMessage('t1', 'searchBlogContent', {}),
                createToolResultMessage('t1', {})
            ]

            // Type narrowing should work
            for (const msg of messages) {
                switch (msg.type) {
                    case 'chunk':
                        expect(msg.content).toBeDefined()
                        break
                    case 'done':
                        expect(msg.agentType).toBeDefined()
                        break
                    case 'error':
                        expect(msg.message).toBeDefined()
                        break
                    case 'thinking':
                        expect(msg.content).toBeDefined()
                        break
                    case 'tool_use':
                        expect(msg.toolId).toBeDefined()
                        expect(msg.name).toBeDefined()
                        break
                    case 'tool_result':
                        expect(msg.toolId).toBeDefined()
                        expect(msg.output).toBeDefined()
                        break
                }
            }
        })
    })
})
