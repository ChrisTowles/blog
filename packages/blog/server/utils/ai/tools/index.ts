/**
 * Blog chatbot tools - MCP server exports
 * Individual tools are auto-imported by Nuxt from their respective files
 */
import { createSdkMcpServer } from '@anthropic-ai/claude-agent-sdk'

// Import all tools for MCP server registration
import { searchBlogContent } from './search-blog'
import { getCurrentDateTime } from './get-date-time'
import { getAuthorInfo } from './get-author'
import { getBlogTopics } from './get-topics'
import { getWeather } from './get-weather'
import { rollDice } from './roll-dice'

const MCP_SERVER_NAME = 'blog-tools'

/**
 * All blog tools array
 */
const blogTools = [
    searchBlogContent,
    getCurrentDateTime,
    getAuthorInfo,
    getBlogTopics,
    getWeather,
    rollDice
]

/**
 * MCP server with all blog tools
 */
export const blogToolsServer = createSdkMcpServer({
    name: MCP_SERVER_NAME,
    version: '1.0.0',
    tools: blogTools
})

/**
 * Tool names for allowedTools config
 * Derived from tools array to stay in sync
 */
export const blogToolNames = blogTools.map(t => `mcp__${MCP_SERVER_NAME}__${t.name}`)
