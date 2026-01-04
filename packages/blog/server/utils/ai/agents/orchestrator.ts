/**
 * Orchestrator agent for multi-agent chat system
 * Routes queries to appropriate subagents and handles greetings directly
 */
import { type AgentConfig, type SubAgentConfig, type RoutingDecision } from './types'
import { routeQuery } from './routing'
import {
    ORCHESTRATOR_CONFIG,
    GENERAL_CONFIG,
    getAgentConfig
} from './configs'

/** Options for creating an orchestrator */
export interface OrchestratorOptions {
    /** Override model */
    model?: string
    /** Override max thinking tokens */
    maxThinkingTokens?: number
}

/** Result of routing a query */
export interface OrchestratorResult {
    /** Routing decision */
    decision: RoutingDecision
    /** Config for the target agent */
    agentConfig: AgentConfig | SubAgentConfig
    /** Direct response if orchestrator handles it */
    directResponse?: string
}

/** Orchestrator instance */
export interface Orchestrator {
    /** Route a query to the appropriate agent */
    route(query: string): OrchestratorResult
    /** Get orchestrator config */
    getConfig(): AgentConfig
    /** Get a greeting response */
    getGreetingResponse(): string
}

/** Greeting responses the orchestrator can use */
const GREETING_RESPONSES = [
    "Hey there! How can I help you today?",
    "Hello! Feel free to ask me anything about the blog or just chat.",
    "Hi! I'm here to help. What would you like to know?",
    "Greetings! Ask me about blog posts, the weather, or anything else.",
    "Hey! What can I do for you today?"
]

/**
 * Create an orchestrator instance
 */
export function createOrchestrator(options?: OrchestratorOptions): Orchestrator {
    // Build orchestrator config with overrides
    const config: AgentConfig = {
        ...ORCHESTRATOR_CONFIG,
        ...(options?.model && { model: options.model }),
        ...(options?.maxThinkingTokens && { maxThinkingTokens: options.maxThinkingTokens })
    }

    return {
        route(query: string): OrchestratorResult {
            const decision = routeQuery(query)

            // Handle greetings directly
            if (decision.targetAgent === 'orchestrator') {
                return {
                    decision,
                    agentConfig: config,
                    directResponse: getRandomGreeting()
                }
            }

            // Get the config for the target agent
            const targetConfig = getAgentConfig(decision.targetAgent as string)
            if (!targetConfig) {
                // Fallback to general if agent not found
                return {
                    decision: {
                        ...decision,
                        targetAgent: 'general',
                        reason: `Unknown agent ${decision.targetAgent}, falling back to general`
                    },
                    agentConfig: GENERAL_CONFIG
                }
            }

            return {
                decision,
                agentConfig: targetConfig
            }
        },

        getConfig(): AgentConfig {
            return config
        },

        getGreetingResponse(): string {
            return getRandomGreeting()
        }
    }
}

/**
 * Get a random greeting response
 */
function getRandomGreeting(): string {
    const index = Math.floor(Math.random() * GREETING_RESPONSES.length)
    return GREETING_RESPONSES[index]
}
