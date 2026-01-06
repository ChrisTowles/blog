/**
 * AIClient wraps the Claude Agent SDK for WebSocket streaming.
 *
 * Converts Agent SDK messages to WebSocket server messages.
 * Includes Braintrust logging for observability.
 */
import { query } from '@anthropic-ai/claude-agent-sdk'
import { blogToolsServer, blogToolNames } from '../ai/tools/index'
import { getSkillSources, getProjectRoot, defaultSkillConfig } from '../ai/skill-config'
import { getBraintrustLogger } from '../ai/anthropic'
import type { AgentMessage } from '../ai/stream-adapter'
import type { WSServerMessage } from './types'

/**
 * System prompt for the blog chatbot
 */
const SYSTEM_PROMPT = `You are a knowledgeable and helpful AI assistant on Chris Towles's Blog. Try to be funny but helpful.
Your goal is to provide clear, accurate, and well-structured responses.

**CRITICAL: USE THE SEARCH TOOL**
- ALWAYS use the searchBlogContent tool FIRST when users ask about:
  * AI, Claude, LLMs, context engineering, prompts
  * Vue, Nuxt, TypeScript, JavaScript
  * DevOps, Terraform, GCP, AWS, Docker
  * Best practices, testing, code review
  * Any technical topic that might be covered in the blog
- Do NOT answer from memory alone - search the blog first!
- When citing results, use markdown links: [Post Title](/blog/post-slug)

**FORMATTING RULES (CRITICAL):**
- ABSOLUTELY NO MARKDOWN HEADINGS: Never use #, ##, ###, ####, #####, or ######
- NO underline-style headings with === or ---
- Use **bold text** for emphasis and section labels instead
- Start all responses with content, never with a heading

**RESPONSE QUALITY:**
- Be concise yet comprehensive
- Use examples when helpful
- Break down complex topics into digestible parts
- Maintain a friendly, professional tone

**SKILLS:**
- You have access to skills that provide specialized knowledge
- When a query matches a skill's domain, use it for better responses`

/**
 * Options for AIClient
 */
export interface AIClientOptions {
    /** Model to use (defaults to haiku) */
    model?: string
    /** Maximum turns for tool use loop */
    maxTurns?: number
    /** Maximum thinking tokens for extended thinking */
    maxThinkingTokens?: number
    /** Enable project skills */
    projectSkills?: boolean
}

/**
 * Options for a single query
 */
export interface QueryOptions {
    /** Session ID to resume */
    resumeSessionId?: string
}

/**
 * Internal state for tracking stream processing
 */
interface StreamState {
    currentToolId: string | null
    currentToolName: string | null
    toolInputJson: string
    sessionId: string | null
}

/**
 * AIClient wraps the Agent SDK for WebSocket streaming
 */
export class AIClient {
    private options: AIClientOptions

    constructor(options?: AIClientOptions) {
        this.options = {
            model: options?.model ?? 'haiku',
            maxTurns: options?.maxTurns ?? 10,
            maxThinkingTokens: options?.maxThinkingTokens ?? 4096,
            projectSkills: options?.projectSkills ?? true
        }
    }

    /**
     * Stream a query and yield WebSocket messages
     * Wraps execution with Braintrust logging for observability.
     */
    async *queryStream(
        chatId: string,
        prompt: string,
        options?: QueryOptions
    ): AsyncGenerator<WSServerMessage> {
        const state: StreamState = {
            currentToolId: null,
            currentToolName: null,
            toolInputJson: '',
            sessionId: null
        }

        // Track for Braintrust logging
        let accumulatedOutput = ''
        const toolCalls: { name: string, input: unknown, result?: unknown }[] = []
        const startTime = Date.now()

        try {
            const agentStream = this.createAgentStream(prompt, options)

            for await (const message of agentStream) {
                const wsMessages = this.processMessage(chatId, message, state)
                for (const wsMsg of wsMessages) {
                    // Track output for logging
                    if (wsMsg.type === 'text') {
                        accumulatedOutput += wsMsg.delta ?? wsMsg.content ?? ''
                    }
                    if (wsMsg.type === 'tool_use') {
                        toolCalls.push({ name: wsMsg.toolName, input: wsMsg.toolInput })
                    }
                    if (wsMsg.type === 'tool_result') {
                        const call = toolCalls.find(c => !c.result)
                        if (call) call.result = wsMsg.toolResult
                    }

                    yield wsMsg
                }
            }

            // Log to Braintrust
            this.logToBraintrust({
                chatId,
                prompt,
                output: accumulatedOutput,
                toolCalls,
                sessionId: state.sessionId,
                resumeSessionId: options?.resumeSessionId,
                durationMs: Date.now() - startTime,
                success: true
            })

            // Final done message
            yield {
                type: 'done',
                chatId,
                messageId: crypto.randomUUID(),
                sessionId: state.sessionId ?? undefined
            }
        }
        catch (error) {
            console.error('[AIClient] Error:', error)

            // Log error to Braintrust
            this.logToBraintrust({
                chatId,
                prompt,
                output: accumulatedOutput,
                toolCalls,
                sessionId: state.sessionId,
                resumeSessionId: options?.resumeSessionId,
                durationMs: Date.now() - startTime,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            })

            yield {
                type: 'error',
                chatId,
                content: error instanceof Error ? error.message : 'Unknown error'
            }
            yield {
                type: 'done',
                chatId,
                messageId: crypto.randomUUID()
            }
        }
    }

    /**
     * Log interaction to Braintrust for observability
     */
    private logToBraintrust(data: {
        chatId: string
        prompt: string
        output: string
        toolCalls: { name: string, input: unknown, result?: unknown }[]
        sessionId: string | null
        resumeSessionId?: string
        durationMs: number
        success: boolean
        error?: string
    }): void {
        try {
            const logger = getBraintrustLogger()

            logger.log({
                input: {
                    prompt: data.prompt,
                    model: this.options.model,
                    maxTurns: this.options.maxTurns,
                    maxThinkingTokens: this.options.maxThinkingTokens,
                    resumeSessionId: data.resumeSessionId
                },
                output: data.output,
                metadata: {
                    chatId: data.chatId,
                    sessionId: data.sessionId,
                    toolCalls: data.toolCalls,
                    durationMs: data.durationMs,
                    success: data.success,
                    error: data.error,
                    source: 'websocket-chat'
                }
            })
        }
        catch (err) {
            // Don't fail the request if logging fails
            console.error('[AIClient] Failed to log to Braintrust:', err)
        }
    }

    /**
     * Create the Agent SDK stream
     */
    private createAgentStream(prompt: string, options?: QueryOptions): AsyncIterable<AgentMessage> {
        // Determine skill sources
        const skillSources = getSkillSources({
            ...defaultSkillConfig,
            enabled: {
                project: this.options.projectSkills ?? true,
                global: false // WebSocket chat doesn't use global skills
            }
        })

        // Build allowed tools list
        const allowedTools = [
            ...blogToolNames,
            'Skill' // Enable skill invocation
        ]

        return query({
            prompt,
            options: {
                // Working directory for skill discovery
                cwd: getProjectRoot(),

                // Model selection (Haiku 4.5 for speed)
                model: this.options.model ?? 'haiku',

                // System prompt with custom append
                systemPrompt: {
                    type: 'preset',
                    preset: 'claude_code',
                    append: SYSTEM_PROMPT
                },

                // Skill sources for progressive loading
                settingSources: skillSources,

                // Custom tools via MCP server
                mcpServers: {
                    'blog-tools': blogToolsServer
                },

                // Allowed tools
                allowedTools,

                // Extended thinking
                maxThinkingTokens: this.options.maxThinkingTokens,

                // Execution limits
                maxTurns: this.options.maxTurns,

                // Permission mode - allow tool execution
                permissionMode: 'bypassPermissions',

                // Resume session for multi-turn conversations
                ...(options?.resumeSessionId && { resume: options.resumeSessionId })
            }
        }) as AsyncIterable<AgentMessage>
    }

    /**
     * Process an Agent SDK message into WebSocket messages
     */
    private processMessage(
        chatId: string,
        message: AgentMessage,
        state: StreamState
    ): WSServerMessage[] {
        const messages: WSServerMessage[] = []

        switch (message.type) {
            case 'system':
                // Capture session ID
                if (message.subtype === 'init') {
                    state.sessionId = message.session_id
                    messages.push({
                        type: 'session_init',
                        chatId,
                        sessionId: message.session_id
                    })
                }
                break

            case 'assistant':
                // Process assistant response content blocks
                for (const block of message.message.content) {
                    if (block.type === 'text' && block.text) {
                        messages.push({
                            type: 'text',
                            chatId,
                            content: block.text
                        })
                    }
                    else if (block.type === 'thinking' && block.thinking) {
                        messages.push({
                            type: 'reasoning',
                            chatId,
                            content: block.thinking
                        })
                    }
                    else if (block.type === 'tool_use' && block.id && block.name) {
                        messages.push({
                            type: 'tool_use',
                            chatId,
                            toolName: block.name,
                            toolId: block.id,
                            toolInput: block.input
                        })
                    }
                }
                break

            case 'user':
                // User messages with tool results
                if (Array.isArray(message.message.content)) {
                    for (const part of message.message.content) {
                        const partObj = part as unknown as Record<string, unknown>
                        if (partObj.type === 'tool_result' && typeof partObj.tool_use_id === 'string') {
                            messages.push({
                                type: 'tool_result',
                                chatId,
                                toolId: partObj.tool_use_id,
                                toolResult: partObj.content,
                                isError: partObj.is_error === true
                            })
                        }
                    }
                }
                break

            case 'stream_event':
                // Handle streaming events for incremental updates
                if (message.event.type === 'content_block_start') {
                    const block = message.event.content_block
                    if (block?.type === 'tool_use') {
                        state.currentToolId = block.id || null
                        state.currentToolName = block.name || null
                        state.toolInputJson = ''
                    }
                }
                else if (message.event.type === 'content_block_delta') {
                    const delta = message.event.delta
                    if (delta?.type === 'text_delta' && delta.text) {
                        messages.push({
                            type: 'text',
                            chatId,
                            delta: delta.text
                        })
                    }
                    else if (delta?.type === 'thinking_delta' && delta.thinking) {
                        messages.push({
                            type: 'reasoning',
                            chatId,
                            delta: delta.thinking
                        })
                    }
                    else if (delta?.type === 'input_json_delta' && delta.partial_json) {
                        state.toolInputJson += delta.partial_json
                    }
                }
                else if (message.event.type === 'content_block_stop') {
                    if (state.currentToolId && state.currentToolName) {
                        // Parse accumulated tool input
                        let toolInput: unknown = {}
                        try {
                            if (state.toolInputJson) {
                                toolInput = JSON.parse(state.toolInputJson)
                            }
                        }
                        catch {
                            // Invalid JSON, use empty object
                        }
                        messages.push({
                            type: 'tool_use',
                            chatId,
                            toolName: state.currentToolName,
                            toolId: state.currentToolId,
                            toolInput
                        })
                        state.currentToolId = null
                        state.currentToolName = null
                        state.toolInputJson = ''
                    }
                }
                break

            case 'result':
                // Result message - check for errors
                if (message.is_error) {
                    messages.push({
                        type: 'error',
                        chatId,
                        content: message.result
                    })
                }
                break
        }

        return messages
    }
}
