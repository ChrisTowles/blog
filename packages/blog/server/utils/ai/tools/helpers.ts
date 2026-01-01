/**
 * Helper utilities for Agent SDK tools
 */

/**
 * Standard tool result format
 * Wraps data in the expected Agent SDK content structure
 */
export function toolResult(data: unknown) {
    return {
        content: [{
            type: 'text' as const,
            text: JSON.stringify(data, null, 2)
        }]
    }
}

/**
 * Error result format for tools
 */
export function toolError(message: string) {
    return {
        content: [{
            type: 'text' as const,
            text: JSON.stringify({ error: message })
        }],
        isError: true
    }
}
