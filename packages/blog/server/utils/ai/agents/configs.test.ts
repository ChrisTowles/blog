/**
 * Tests for subagent configurations
 * RED-GREEN: Define expected agent configs
 */
import { describe, it, expect } from 'vitest'
import {
    ORCHESTRATOR_CONFIG,
    BLOG_SEARCH_CONFIG,
    GENERAL_CONFIG,
    WEATHER_CONFIG,
    getAgentConfig,
    getAllAgentConfigs
} from './configs'

describe('agents/configs', () => {
    describe('ORCHESTRATOR_CONFIG', () => {
        it('should have correct name', () => {
            expect(ORCHESTRATOR_CONFIG.name).toBe('orchestrator')
        })

        it('should have a system prompt about routing', () => {
            expect(ORCHESTRATOR_CONFIG.systemPrompt).toContain('route')
        })

        it('should use haiku model', () => {
            expect(ORCHESTRATOR_CONFIG.model).toBe('claude-haiku-4-5')
        })

        it('should have extended thinking enabled', () => {
            expect(ORCHESTRATOR_CONFIG.maxThinkingTokens).toBeGreaterThan(0)
        })
    })

    describe('BLOG_SEARCH_CONFIG', () => {
        it('should have correct name', () => {
            expect(BLOG_SEARCH_CONFIG.name).toBe('blog_search')
        })

        it('should have blog-related tools', () => {
            expect(BLOG_SEARCH_CONFIG.tools).toContain('searchBlogContent')
            expect(BLOG_SEARCH_CONFIG.tools).toContain('getBlogTopics')
        })

        it('should have keywords for routing', () => {
            expect(BLOG_SEARCH_CONFIG.keywords).toContain('blog')
            expect(BLOG_SEARCH_CONFIG.keywords).toContain('post')
        })

        it('should have a system prompt about blog content', () => {
            expect(BLOG_SEARCH_CONFIG.systemPrompt.toLowerCase()).toContain('blog')
        })
    })

    describe('GENERAL_CONFIG', () => {
        it('should have correct name', () => {
            expect(GENERAL_CONFIG.name).toBe('general')
        })

        it('should have general tools', () => {
            expect(GENERAL_CONFIG.tools).toContain('getAuthorInfo')
            expect(GENERAL_CONFIG.tools).toContain('getCurrentDateTime')
            expect(GENERAL_CONFIG.tools).toContain('rollDice')
        })

        it('should be the default fallback (no keywords)', () => {
            expect(GENERAL_CONFIG.keywords).toEqual([])
        })
    })

    describe('WEATHER_CONFIG', () => {
        it('should have correct name', () => {
            expect(WEATHER_CONFIG.name).toBe('weather')
        })

        it('should have weather tool', () => {
            expect(WEATHER_CONFIG.tools).toContain('getWeather')
        })

        it('should have weather keywords', () => {
            expect(WEATHER_CONFIG.keywords).toContain('weather')
            expect(WEATHER_CONFIG.keywords).toContain('temperature')
        })
    })

    describe('getAgentConfig', () => {
        it('should return config by name', () => {
            const config = getAgentConfig('blog_search')
            expect(config?.name).toBe('blog_search')
        })

        it('should return undefined for unknown agent', () => {
            const config = getAgentConfig('unknown' as any)
            expect(config).toBeUndefined()
        })
    })

    describe('getAllAgentConfigs', () => {
        it('should return all 4 agent configs', () => {
            const configs = getAllAgentConfigs()
            expect(configs).toHaveLength(4)
        })

        it('should include all agent types', () => {
            const configs = getAllAgentConfigs()
            const names = configs.map(c => c.name)
            expect(names).toContain('orchestrator')
            expect(names).toContain('blog_search')
            expect(names).toContain('general')
            expect(names).toContain('weather')
        })
    })
})
