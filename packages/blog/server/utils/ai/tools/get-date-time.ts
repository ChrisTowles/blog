import { tool } from '@anthropic-ai/claude-agent-sdk'
import { toolResult } from './helpers'

/**
 * Get current date and time
 */
export const getCurrentDateTime = tool(
    'getCurrentDateTime',
    'Get the current date and time. Use when user asks about today, current time, or needs temporal context.',
    {},
    async () => {
        const now = new Date()
        return toolResult({
            date: now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: now.toLocaleTimeString('en-US'),
            iso: now.toISOString(),
            timestamp: now.getTime()
        })
    }
)
