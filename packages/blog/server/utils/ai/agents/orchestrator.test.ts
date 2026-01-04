/**
 * Tests for orchestrator agent
 * RED-GREEN: Main entry point for multi-agent system
 */
import { describe, it, expect } from 'vitest'
import {
    createOrchestrator,
} from './orchestrator'

describe('agents/orchestrator', () => {
    describe('createOrchestrator', () => {
        it('should create an orchestrator with default options', () => {
            const orchestrator = createOrchestrator()
            expect(orchestrator).toBeDefined()
            expect(orchestrator.route).toBeDefined()
            expect(orchestrator.getConfig).toBeDefined()
        })

        it('should accept custom options', () => {
            const orchestrator = createOrchestrator({
                model: 'claude-sonnet-4-5',
                maxThinkingTokens: 8192
            })
            const config = orchestrator.getConfig()
            expect(config.model).toBe('claude-sonnet-4-5')
            expect(config.maxThinkingTokens).toBe(8192)
        })
    })

    describe('orchestrator.route', () => {
        it('should route blog queries to blog_search', () => {
            const orchestrator = createOrchestrator()
            const result = orchestrator.route('What blog posts do you have about Vue?')

            expect(result.decision.targetAgent).toBe('blog_search')
            expect(result.agentConfig).toBeDefined()
            expect(result.agentConfig.name).toBe('blog_search')
        })

        it('should route weather queries to weather', () => {
            const orchestrator = createOrchestrator()
            const result = orchestrator.route('What is the weather in NYC?')

            expect(result.decision.targetAgent).toBe('weather')
            expect(result.agentConfig.name).toBe('weather')
        })

        it('should handle greetings directly', () => {
            const orchestrator = createOrchestrator()
            const result = orchestrator.route('Hello!')

            expect(result.decision.targetAgent).toBe('orchestrator')
            expect(result.directResponse).toBeDefined()
        })

        it('should default to general for ambiguous queries', () => {
            const orchestrator = createOrchestrator()
            const result = orchestrator.route('Tell me something interesting')

            expect(result.decision.targetAgent).toBe('general')
            expect(result.agentConfig.name).toBe('general')
        })

        it('should include routing decision with confidence', () => {
            const orchestrator = createOrchestrator()
            const result = orchestrator.route('Search for blog posts about TypeScript')

            expect(result.decision.confidence).toBeGreaterThanOrEqual(0.9)
            expect(result.decision.matchedKeywords).toBeDefined()
        })
    })

    describe('orchestrator.getGreetingResponse', () => {
        it('should generate a friendly greeting response', () => {
            const orchestrator = createOrchestrator()
            const response = orchestrator.getGreetingResponse()

            expect(response).toBeDefined()
            expect(typeof response).toBe('string')
            expect(response.length).toBeGreaterThan(0)
        })
    })
})
