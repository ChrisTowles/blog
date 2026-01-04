/**
 * Agent type definitions for multi-agent chat system
 */

/** All agent types in the system */
export const AGENT_TYPES = ['orchestrator', 'blog_search', 'general', 'weather'] as const
export type AgentType = typeof AGENT_TYPES[number]

/** Base configuration for any agent */
export interface AgentConfig {
    /** Agent identifier */
    name: string
    /** System prompt for the agent */
    systemPrompt: string
    /** Model to use (defaults to haiku) */
    model: string
    /** Tools available to this agent */
    tools: string[]
    /** Max tokens for extended thinking */
    maxThinkingTokens: number
}

/** Configuration for subagents with keyword routing */
export interface SubAgentConfig extends AgentConfig {
    /** Keywords that trigger routing to this agent */
    keywords: string[]
}

/** Routing method used to select agent */
export type RoutingMethod = 'keyword' | 'llm' | 'direct'

/** Decision made by orchestrator for routing */
export interface RoutingDecision {
    /** Target agent to handle the query */
    targetAgent: AgentType | string
    /** Reason for the routing decision */
    reason: string
    /** Confidence in the decision (0-1) */
    confidence: number
    /** How the routing was determined */
    routingMethod: RoutingMethod
    /** Keywords matched (if keyword routing) */
    matchedKeywords?: string[]
}

/** Options for creating an agent config */
export interface CreateAgentConfigOptions {
    name: string
    systemPrompt: string
    model?: string
    tools?: string[]
    maxThinkingTokens?: number
}

/** Options for creating a routing decision */
export interface CreateRoutingDecisionOptions {
    targetAgent: AgentType | string
    reason: string
    confidence: number
    routingMethod?: RoutingMethod
    matchedKeywords?: string[]
}

/**
 * Create an agent configuration with defaults
 */
export function createAgentConfig(options: CreateAgentConfigOptions): AgentConfig {
    return {
        name: options.name,
        systemPrompt: options.systemPrompt,
        model: options.model ?? 'claude-haiku-4-5',
        tools: options.tools ?? [],
        maxThinkingTokens: options.maxThinkingTokens ?? 4096
    }
}

/**
 * Create a routing decision
 */
export function createRoutingDecision(options: CreateRoutingDecisionOptions): RoutingDecision {
    return {
        targetAgent: options.targetAgent,
        reason: options.reason,
        confidence: options.confidence,
        routingMethod: options.routingMethod ?? 'keyword',
        matchedKeywords: options.matchedKeywords
    }
}
