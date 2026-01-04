/**
 * Agent routing logic
 * Hybrid approach: keyword detection first, LLM fallback for ambiguous
 */
import { type RoutingDecision, createRoutingDecision, type AgentType } from './types'

/** Keywords that trigger blog_search agent */
export const BLOG_KEYWORDS = [
    'blog', 'post', 'posts', 'article', 'articles', 'search',
    'written', 'wrote', 'content', 'topic', 'topics'
] as const

/** Keywords that trigger weather agent */
export const WEATHER_KEYWORDS = [
    'weather', 'temperature', 'forecast', 'rain', 'sunny',
    'cloudy', 'humidity', 'wind', 'climate'
] as const

/** Greeting patterns - match common greetings with optional simple follow-up */
const GREETING_PATTERNS = [
    /^(hi|hello|hey|howdy|greetings?)(\s+(there|everyone|folks))?[\s!.,?]*$/i,
    /^good\s+(morning|afternoon|evening|day)[\s!.,?]*$/i
]

/** Result of keyword detection */
interface KeywordMatch {
    agentType: AgentType
    keywords: string[]
}

/**
 * Detect keywords in a query to determine routing
 * Returns null if no clear keyword match
 */
export function detectKeywords(query: string): KeywordMatch | null {
    const lowerQuery = query.toLowerCase()
    const words = lowerQuery.split(/\s+/)

    // Check blog keywords
    const blogMatches = BLOG_KEYWORDS.filter(kw => words.includes(kw) || lowerQuery.includes(kw))
    if (blogMatches.length > 0) {
        return {
            agentType: 'blog_search',
            keywords: [...blogMatches]
        }
    }

    // Check weather keywords
    const weatherMatches = WEATHER_KEYWORDS.filter(kw => words.includes(kw) || lowerQuery.includes(kw))
    if (weatherMatches.length > 0) {
        return {
            agentType: 'weather',
            keywords: [...weatherMatches]
        }
    }

    return null
}

/**
 * Check if query is a simple greeting
 * Greetings followed by questions are not pure greetings
 */
export function isGreeting(query: string): boolean {
    const trimmed = query.trim()

    // If contains a question mark after first few words, not a pure greeting
    if (trimmed.includes('?') && trimmed.indexOf('?') > 10) {
        return false
    }

    // Check against greeting patterns
    return GREETING_PATTERNS.some(pattern => pattern.test(trimmed))
}

/**
 * Route a query to the appropriate agent
 * Uses keyword matching first, falls back to general for ambiguous
 */
export function routeQuery(query: string): RoutingDecision {
    // Check for greetings first - orchestrator handles directly
    if (isGreeting(query)) {
        return createRoutingDecision({
            targetAgent: 'orchestrator',
            reason: 'Simple greeting detected',
            confidence: 1.0,
            routingMethod: 'direct'
        })
    }

    // Try keyword matching
    const keywordMatch = detectKeywords(query)
    if (keywordMatch) {
        return createRoutingDecision({
            targetAgent: keywordMatch.agentType,
            reason: `Matched keywords: ${keywordMatch.keywords.join(', ')}`,
            confidence: 0.9 + (keywordMatch.keywords.length * 0.02),
            routingMethod: 'keyword',
            matchedKeywords: keywordMatch.keywords
        })
    }

    // Default to general assistant for ambiguous queries
    return createRoutingDecision({
        targetAgent: 'general',
        reason: 'No specific keywords matched, defaulting to general',
        confidence: 0.5,
        routingMethod: 'keyword' // Still keyword-based, just no match
    })
}
