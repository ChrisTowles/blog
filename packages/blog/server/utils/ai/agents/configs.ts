/**
 * Agent configurations for multi-agent chat system
 * All agents use Haiku 4.5 with extended thinking enabled
 */
import { type AgentConfig, type SubAgentConfig, createAgentConfig } from './types'

/** Orchestrator agent - routes queries to subagents */
export const ORCHESTRATOR_CONFIG: AgentConfig = createAgentConfig({
    name: 'orchestrator',
    systemPrompt: `You are an intelligent router for a multi-agent chat system on Chris Towles's blog.

Your job is to:
1. Analyze incoming user queries
2. Route them to the appropriate specialized agent
3. Handle simple greetings and meta-questions directly

You can route to these agents:
- blog_search: For questions about blog posts, articles, technical content
- weather: For weather-related queries
- general: For everything else (default)

For simple greetings like "Hi" or "Hello", respond directly with a friendly greeting.
Be concise and helpful.`,
    model: 'claude-haiku-4-5',
    tools: [],
    maxThinkingTokens: 4096
})

/** Blog Search agent - searches and synthesizes blog content */
export const BLOG_SEARCH_CONFIG: SubAgentConfig = {
    ...createAgentConfig({
        name: 'blog_search',
        systemPrompt: `You are a specialized agent for searching and answering questions about Chris Towles's blog.

Your capabilities:
- Search blog content using the searchBlogContent tool
- Get available blog topics using getBlogTopics
- Synthesize information from multiple blog posts

When answering:
- ALWAYS use searchBlogContent first to find relevant posts
- Cite posts with markdown links: [Post Title](/blog/post-slug)
- Synthesize information from RAG results, don't just list them
- Be helpful and concise

Never make up information - if it's not in the blog, say so.`,
        model: 'claude-haiku-4-5',
        tools: ['searchBlogContent', 'getBlogTopics'],
        maxThinkingTokens: 4096
    }),
    keywords: ['blog', 'post', 'posts', 'article', 'articles', 'search', 'written', 'wrote', 'content']
}

/** General Assistant agent - handles general queries */
export const GENERAL_CONFIG: SubAgentConfig = {
    ...createAgentConfig({
        name: 'general',
        systemPrompt: `You are a friendly general assistant on Chris Towles's blog.

Your capabilities:
- Get author information using getAuthorInfo
- Get current date/time using getCurrentDateTime
- Roll dice for fun using rollDice

Be helpful, concise, and friendly. Try to be a bit funny but not annoying.
For technical questions not answered by your tools, suggest the user search the blog.`,
        model: 'claude-haiku-4-5',
        tools: ['getAuthorInfo', 'getCurrentDateTime', 'rollDice'],
        maxThinkingTokens: 4096
    }),
    keywords: [] // Default fallback, no specific keywords
}

/** Weather agent - handles weather queries */
export const WEATHER_CONFIG: SubAgentConfig = {
    ...createAgentConfig({
        name: 'weather',
        systemPrompt: `You are a weather information agent.

Use the getWeather tool to fetch current weather for any location.
Present weather information in a clear, readable format.
Include temperature, conditions, and any relevant details.

Be friendly and concise in your responses.`,
        model: 'claude-haiku-4-5',
        tools: ['getWeather'],
        maxThinkingTokens: 4096
    }),
    keywords: ['weather', 'temperature', 'forecast', 'rain', 'sunny', 'cloudy', 'humidity', 'wind']
}

/** All agent configurations */
const AGENT_CONFIGS: (AgentConfig | SubAgentConfig)[] = [
    ORCHESTRATOR_CONFIG,
    BLOG_SEARCH_CONFIG,
    GENERAL_CONFIG,
    WEATHER_CONFIG
]

/**
 * Get agent config by name
 */
export function getAgentConfig(name: string): AgentConfig | SubAgentConfig | undefined {
    return AGENT_CONFIGS.find(c => c.name === name)
}

/**
 * Get all agent configs
 */
export function getAllAgentConfigs(): (AgentConfig | SubAgentConfig)[] {
    return [...AGENT_CONFIGS]
}
