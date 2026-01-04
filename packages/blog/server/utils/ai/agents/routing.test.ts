/**
 * Tests for agent routing logic
 * RED-GREEN: Keyword-first routing with LLM fallback
 */
import { describe, it, expect } from 'vitest'
import {
    routeQuery,
    detectKeywords,
    isGreeting,
    BLOG_KEYWORDS,
    WEATHER_KEYWORDS
} from './routing'

describe('agents/routing', () => {
    describe('detectKeywords', () => {
        it('should detect blog keywords', () => {
            const result = detectKeywords('What posts do you have about Vue?')
            expect(result).not.toBeNull()
            expect(result!.agentType).toBe('blog_search')
            expect(result!.keywords).toContain('posts')
        })

        it('should detect weather keywords', () => {
            const result = detectKeywords('What is the weather in London?')
            expect(result).not.toBeNull()
            expect(result!.agentType).toBe('weather')
            expect(result!.keywords).toContain('weather')
        })

        it('should return null for no keyword match', () => {
            const result = detectKeywords('Tell me a joke')
            expect(result).toBeNull()
        })

        it('should be case insensitive', () => {
            const result = detectKeywords('BLOG POSTS about TypeScript')
            expect(result?.agentType).toBe('blog_search')
        })

        it('should match multiple keywords', () => {
            const result = detectKeywords('Search blog articles about AI')
            expect(result?.keywords.length).toBeGreaterThan(1)
        })
    })

    describe('isGreeting', () => {
        it('should detect greetings', () => {
            expect(isGreeting('Hello!')).toBe(true)
            expect(isGreeting('Hi there')).toBe(true)
            expect(isGreeting('Hey')).toBe(true)
            expect(isGreeting('Good morning')).toBe(true)
        })

        it('should not match non-greetings', () => {
            expect(isGreeting('What is Vue?')).toBe(false)
            expect(isGreeting('Search for posts')).toBe(false)
        })

        it('should handle greeting followed by question', () => {
            // "Hi, what's the weather?" should not be just a greeting
            expect(isGreeting('Hi, what is the weather?')).toBe(false)
        })
    })

    describe('routeQuery', () => {
        it('should route blog queries to blog_search', () => {
            const decision = routeQuery('What articles do you have about Nuxt?')
            expect(decision.targetAgent).toBe('blog_search')
            expect(decision.routingMethod).toBe('keyword')
            expect(decision.confidence).toBeGreaterThanOrEqual(0.9)
        })

        it('should route weather queries to weather', () => {
            const decision = routeQuery('What is the weather in Tokyo?')
            expect(decision.targetAgent).toBe('weather')
            expect(decision.routingMethod).toBe('keyword')
        })

        it('should handle greetings with orchestrator', () => {
            const decision = routeQuery('Hello!')
            expect(decision.targetAgent).toBe('orchestrator')
            expect(decision.reason).toContain('greeting')
        })

        it('should default to general for ambiguous queries', () => {
            const decision = routeQuery('Tell me something interesting')
            expect(decision.targetAgent).toBe('general')
            expect(decision.confidence).toBeLessThan(0.9)
        })

        it('should include matched keywords in decision', () => {
            const decision = routeQuery('Search the blog for posts about testing')
            expect(decision.matchedKeywords).toBeDefined()
            expect(decision.matchedKeywords?.length).toBeGreaterThan(0)
        })
    })

    describe('keyword lists', () => {
        it('should have blog keywords', () => {
            expect(BLOG_KEYWORDS).toContain('blog')
            expect(BLOG_KEYWORDS).toContain('post')
            expect(BLOG_KEYWORDS).toContain('article')
            expect(BLOG_KEYWORDS).toContain('search')
        })

        it('should have weather keywords', () => {
            expect(WEATHER_KEYWORDS).toContain('weather')
            expect(WEATHER_KEYWORDS).toContain('temperature')
            expect(WEATHER_KEYWORDS).toContain('forecast')
        })
    })
})
