/**
 * Tests for Agent SDK to WebSocket message bridge
 * RED-GREEN: Maps agent events to WS message types
 */
import { describe, it, expect } from 'vitest'
import {
    mapAgentMessageToWs,
    type AgentEvent
} from './bridge'

describe('ws/bridge', () => {
    describe('mapAgentMessageToWs', () => {
        it('should map text content to chunk message', () => {
            const event: AgentEvent = {
                type: 'assistant',
                message: {
                    content: [
                        { type: 'text', text: 'Hello world' }
                    ]
                }
            }

            const messages = mapAgentMessageToWs(event)
            expect(messages).toHaveLength(1)
            expect(messages[0].type).toBe('chunk')
            expect((messages[0] as any).content).toBe('Hello world')
        })

        it('should map thinking content to thinking message', () => {
            const event: AgentEvent = {
                type: 'assistant',
                message: {
                    content: [
                        { type: 'thinking', thinking: 'Let me analyze this...' }
                    ]
                }
            }

            const messages = mapAgentMessageToWs(event)
            expect(messages).toHaveLength(1)
            expect(messages[0].type).toBe('thinking')
            expect((messages[0] as any).content).toBe('Let me analyze this...')
        })

        it('should map tool_use to tool_use message', () => {
            const event: AgentEvent = {
                type: 'assistant',
                message: {
                    content: [
                        {
                            type: 'tool_use',
                            id: 'tool-123',
                            name: 'searchBlogContent',
                            input: { query: 'vue' }
                        }
                    ]
                }
            }

            const messages = mapAgentMessageToWs(event)
            expect(messages).toHaveLength(1)
            expect(messages[0].type).toBe('tool_use')
            expect((messages[0] as any).toolId).toBe('tool-123')
            expect((messages[0] as any).name).toBe('searchBlogContent')
        })

        it('should map tool_result to tool_result message', () => {
            const event: AgentEvent = {
                type: 'tool',
                message: {
                    content: [
                        {
                            type: 'tool_result',
                            tool_use_id: 'tool-123',
                            content: 'Found 5 posts about Vue'
                        }
                    ]
                }
            }

            const messages = mapAgentMessageToWs(event)
            expect(messages).toHaveLength(1)
            expect(messages[0].type).toBe('tool_result')
            expect((messages[0] as any).toolId).toBe('tool-123')
        })

        it('should map result event to done message', () => {
            const event: AgentEvent = {
                type: 'result',
                result: 'Final response text',
                agentType: 'blog_search'
            }

            const messages = mapAgentMessageToWs(event)
            expect(messages).toHaveLength(1)
            expect(messages[0].type).toBe('done')
            expect((messages[0] as any).agentType).toBe('blog_search')
        })

        it('should handle multiple content blocks', () => {
            const event: AgentEvent = {
                type: 'assistant',
                message: {
                    content: [
                        { type: 'thinking', thinking: 'Thinking first...' },
                        { type: 'text', text: 'Then responding' }
                    ]
                }
            }

            const messages = mapAgentMessageToWs(event)
            expect(messages).toHaveLength(2)
            expect(messages[0].type).toBe('thinking')
            expect(messages[1].type).toBe('chunk')
        })

        it('should return empty array for unknown event types', () => {
            const event: AgentEvent = {
                type: 'unknown' as any,
                data: 'something'
            }

            const messages = mapAgentMessageToWs(event)
            expect(messages).toEqual([])
        })

        it('should map error events to error messages', () => {
            const event: AgentEvent = {
                type: 'error',
                error: {
                    message: 'API rate limit exceeded',
                    code: 'RATE_LIMIT'
                }
            }

            const messages = mapAgentMessageToWs(event)
            expect(messages).toHaveLength(1)
            expect(messages[0].type).toBe('error')
            expect((messages[0] as any).message).toBe('API rate limit exceeded')
        })
    })
})
