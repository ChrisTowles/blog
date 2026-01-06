/**
 * Timeout utilities for tool execution.
 *
 * The Agent SDK doesn't provide built-in timeout support for tool execution,
 * so we wrap tool operations with Promise.race to enforce time limits.
 */

/** Default timeout for tool execution (30 seconds) */
export const DEFAULT_TOOL_TIMEOUT_MS = 30000

/** Timeout for external API calls (5 seconds) */
export const API_TIMEOUT_MS = 5000

/**
 * Error thrown when a tool operation times out
 */
export class ToolTimeoutError extends Error {
    constructor(toolName: string, timeoutMs: number) {
        super(`${toolName} timed out after ${timeoutMs}ms`)
        this.name = 'ToolTimeoutError'
    }
}

/**
 * Wrap a promise with a timeout.
 *
 * If the promise doesn't resolve within the timeout, rejects with ToolTimeoutError.
 *
 * @param promise The promise to wrap
 * @param timeoutMs Timeout in milliseconds
 * @param toolName Name of the tool (for error messages)
 * @returns The resolved value if successful
 * @throws ToolTimeoutError if timeout is exceeded
 */
export function withTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    toolName: string
): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) => {
            setTimeout(() => {
                reject(new ToolTimeoutError(toolName, timeoutMs))
            }, timeoutMs)
        })
    ])
}

/**
 * Create a fetch with timeout using AbortController.
 *
 * This is more efficient than Promise.race for fetch operations because
 * it actually cancels the underlying network request.
 *
 * @param url URL to fetch
 * @param options Fetch options
 * @param timeoutMs Timeout in milliseconds (default: API_TIMEOUT_MS)
 * @returns Fetch response
 * @throws Error with 'AbortError' name if timeout is exceeded
 */
export function fetchWithTimeout(
    url: string | URL,
    options: RequestInit = {},
    timeoutMs: number = API_TIMEOUT_MS
): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    return fetch(url, {
        ...options,
        signal: controller.signal
    }).finally(() => {
        clearTimeout(timeoutId)
    })
}

/**
 * Check if an error is a timeout error (either from withTimeout or AbortController)
 */
export function isTimeoutError(error: unknown): boolean {
    if (error instanceof ToolTimeoutError) {
        return true
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
        return true
    }
    if (error instanceof Error && error.message.includes('timeout')) {
        return true
    }
    return false
}
