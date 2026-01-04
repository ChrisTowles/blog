/**
 * Tests for agent type definitions
 * RED-GREEN: These tests define the expected agent structure
 */
import { describe, it, expect } from 'vitest'
import {
    type AgentConfig,
    type SubAgentConfig,
    AGENT_TYPES,
    createAgentConfig,
    createRoutingDecision
} from './types'

describe('agents/types', () => {
    describe('AGENT_TYPES', () => {
        it('should define all expected agent types', () => {
            expect(AGENT_TYPES).toContain('orchestrator')
            expect(AGENT_TYPES).toContain('blog_search')
            expect(AGENT_TYPES).toContain('general')
            expect(AGENT_TYPES).toContain('weather')
        })
    })

    describe('createAgentConfig', () => {
        it('should create a valid agent config', () => {
            const config = createAgentConfig({
                name: 'blog_search',
                systemPrompt: 'You are a blog search agent',
                model: 'claude-haiku-4-5',
                tools: ['searchBlogContent', 'getBlogTopics']
            })

            expect(config.name).toBe('blog_search')
            expect(config.systemPrompt).toBe('You are a blog search agent')
            expect(config.model).toBe('claude-haiku-4-5')
            expect(config.tools).toEqual(['searchBlogContent', 'getBlogTopics'])
        })

        it('should have default values for optional fields', () => {
            const config = createAgentConfig({
                name: 'general',
                systemPrompt: 'General assistant'
            })

            expect(config.model).toBe('claude-haiku-4-5')
            expect(config.tools).toEqual([])
            expect(config.maxThinkingTokens).toBe(4096)
        })

        it('should allow overriding defaults', () => {
            const config = createAgentConfig({
                name: 'weather',
                systemPrompt: 'Weather agent',
                maxThinkingTokens: 8192
            })

            expect(config.maxThinkingTokens).toBe(8192)
        })
    })

    describe('createRoutingDecision', () => {
        it('should create a routing decision with keyword match', () => {
            const decision = createRoutingDecision({
                targetAgent: 'blog_search',
                reason: 'User asked about blog content',
                confidence: 0.95,
                matchedKeywords: ['blog', 'posts']
            })

            expect(decision.targetAgent).toBe('blog_search')
            expect(decision.reason).toBe('User asked about blog content')
            expect(decision.confidence).toBe(0.95)
            expect(decision.matchedKeywords).toEqual(['blog', 'posts'])
            expect(decision.routingMethod).toBe('keyword')
        })

        it('should create a routing decision with LLM fallback', () => {
            const decision = createRoutingDecision({
                targetAgent: 'general',
                reason: 'Ambiguous query, defaulting to general',
                confidence: 0.6,
                routingMethod: 'llm'
            })

            expect(decision.routingMethod).toBe('llm')
            expect(decision.matchedKeywords).toBeUndefined()
        })

        it('should default to keyword routing method', () => {
            const decision = createRoutingDecision({
                targetAgent: 'weather',
                reason: 'Weather keyword detected',
                confidence: 1.0
            })

            expect(decision.routingMethod).toBe('keyword')
        })
    })

    describe('type structure', () => {
        it('AgentConfig should have required fields', () => {
            const config: AgentConfig = {
                name: 'test',
                systemPrompt: 'Test prompt',
                model: 'claude-haiku-4-5',
                tools: [],
                maxThinkingTokens: 4096
            }
            expect(config).toBeDefined()
        })

        it('SubAgentConfig should extend AgentConfig with keywords', () => {
            const config: SubAgentConfig = {
                name: 'blog_search',
                systemPrompt: 'Search the blog',
                model: 'claude-haiku-4-5',
                tools: ['searchBlogContent'],
                maxThinkingTokens: 4096,
                keywords: ['blog', 'post', 'article']
            }
            expect(config.keywords).toEqual(['blog', 'post', 'article'])
        })
    })
})
