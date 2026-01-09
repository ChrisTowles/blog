/**
 * AgentSession - Wraps Agent SDK query() with AbortController support
 *
 * Provides cancellable agent execution that bridges to MessageQueue for WebSocket delivery.
 * Each session represents one agent task that can be stopped mid-execution.
 */

import { query } from '@anthropic-ai/claude-agent-sdk'
import type { MessageQueue } from './message-queue'
import type { WSServerMessage } from './ws-types'
import type { AgentMessage } from './stream-adapter'
import { blogToolsServer, blogToolNames } from './tools/index'
import { getSkillSources, getProjectRoot, defaultSkillConfig } from './skill-config'

/**
 * State for tracking tool calls during streaming
 */
interface StreamState {
    currentToolId: string | null
    currentToolName: string | null
    toolInputJson: string
    reasoningText: string
    fullText: string
}

export type AgentSessionStatus = 'pending' | 'running' | 'completed' | 'stopped' | 'error'

export interface AgentSessionOptions {
    chatId: string
    taskId: string
    prompt: string
    model?: string
    maxTurns?: number
    maxThinkingTokens?: number
    resumeSessionId?: string
    skillConfig?: {
        project?: boolean
        global?: boolean
    }
}

/**
 * Result returned when session completes or is stopped
 */
export interface AgentSessionResult {
    status: AgentSessionStatus
    sessionId?: string
    result?: string
    error?: string
    partialText?: string
}

/**
 * Wraps a single agent execution with abort support.
 * Streams events to a MessageQueue for WebSocket delivery.
 */
export class AgentSession {
    readonly chatId: string
    readonly taskId: string

    private status: AgentSessionStatus = 'pending'
    private abortController: AbortController
    private sessionId?: string
    private partialText = ''
    private partialReasoning = ''
    private error?: string

    // Stream state for tracking tool calls
    private streamState: StreamState = {
        currentToolId: null,
        currentToolName: null,
        toolInputJson: '',
        reasoningText: '',
        fullText: ''
    }

    constructor(
        private readonly options: AgentSessionOptions,
        private readonly queue: MessageQueue<WSServerMessage>
    ) {
        this.chatId = options.chatId
        this.taskId = options.taskId
        this.abortController = new AbortController()
    }

    /**
     * Get current session status
     */
    getStatus(): AgentSessionStatus {
        return this.status
    }

    /**
     * Get the Agent SDK session ID (for resuming conversations)
     */
    getSessionId(): string | undefined {
        return this.sessionId
    }

    /**
     * Get partial text accumulated so far (useful when stopped)
     */
    getPartialText(): string {
        return this.partialText
    }

    /**
     * Stop the session. The agent will abort at the next opportunity.
     */
    stop(): void {
        if (this.status === 'running') {
            this.status = 'stopped'
            this.abortController.abort()
        }
    }

    /**
     * Run the agent session. Returns when complete, stopped, or errored.
     */
    async run(): Promise<AgentSessionResult> {
        if (this.status !== 'pending') {
            return {
                status: this.status,
                error: 'Session already started'
            }
        }

        this.status = 'running'

        // Notify task started
        this.queue.pushNoWait({
            type: 'task_started',
            chatId: this.chatId,
            taskId: this.taskId
        })

        try {
            const config = useRuntimeConfig()

            // Build skill sources
            const skillSources = getSkillSources({
                ...defaultSkillConfig,
                enabled: {
                    project: this.options.skillConfig?.project ?? true,
                    global: this.options.skillConfig?.global ?? true
                }
            })

            // Create agent stream
            const agentStream = query({
                prompt: this.options.prompt,
                options: {
                    cwd: getProjectRoot(),
                    model: this.options.model || config.public.model as string || 'sonnet',
                    systemPrompt: {
                        type: 'preset',
                        preset: 'claude_code',
                        append: this.getSystemPrompt()
                    },
                    settingSources: skillSources,
                    mcpServers: {
                        'blog-tools': blogToolsServer
                    },
                    allowedTools: [...blogToolNames, 'Skill'],
                    maxThinkingTokens: this.options.maxThinkingTokens ?? 4096,
                    maxTurns: this.options.maxTurns ?? 5,
                    permissionMode: 'bypassPermissions',
                    ...(this.options.resumeSessionId && { resume: this.options.resumeSessionId }),
                    abortController: this.abortController
                }
            }) as AsyncIterable<AgentMessage>

            // Process stream
            for await (const message of agentStream) {
                // Check for abort between messages
                if (this.abortController.signal.aborted) {
                    break
                }

                await this.processMessage(message)
            }

            // Determine final status
            // Note: status may have been changed to 'stopped' by stop() method called from another context
            if ((this.status as AgentSessionStatus) === 'stopped') {
                this.queue.pushNoWait({
                    type: 'task_stopped',
                    chatId: this.chatId,
                    taskId: this.taskId,
                    partialResult: this.partialText || undefined
                })
            } else {
                this.status = 'completed'
                this.queue.pushNoWait({
                    type: 'task_done',
                    chatId: this.chatId,
                    taskId: this.taskId,
                    messageId: crypto.randomUUID()
                })
            }
        } catch (err) {
            // Handle abort as stop, not error
            if (err instanceof Error && err.name === 'AbortError') {
                this.status = 'stopped'
                this.queue.pushNoWait({
                    type: 'task_stopped',
                    chatId: this.chatId,
                    taskId: this.taskId,
                    partialResult: this.partialText || undefined
                })
            } else {
                this.status = 'error'
                this.error = err instanceof Error ? err.message : String(err)
                this.queue.pushNoWait({
                    type: 'error',
                    chatId: this.chatId,
                    taskId: this.taskId,
                    error: this.error
                })
            }
        }

        return {
            status: this.status,
            sessionId: this.sessionId,
            result: this.status === 'completed' ? this.partialText : undefined,
            error: this.error,
            partialText: this.partialText
        }
    }

    /**
     * Process a single Agent SDK message and emit to queue
     */
    private async processMessage(message: AgentMessage): Promise<void> {
        // Capture session ID from any message that has it
        if ('session_id' in message && message.session_id && !this.sessionId) {
            this.sessionId = message.session_id
            // Update task_started with session ID
            this.queue.pushNoWait({
                type: 'task_started',
                chatId: this.chatId,
                taskId: this.taskId,
                sessionId: this.sessionId
            })
        }

        switch (message.type) {
            case 'assistant':
                for (const block of message.message.content) {
                    if (block.type === 'text' && block.text) {
                        this.partialText += block.text
                        this.queue.pushNoWait({
                            type: 'text',
                            chatId: this.chatId,
                            taskId: this.taskId,
                            text: block.text
                        })
                    } else if (block.type === 'thinking' && block.thinking) {
                        this.partialReasoning += block.thinking
                        this.queue.pushNoWait({
                            type: 'reasoning',
                            chatId: this.chatId,
                            taskId: this.taskId,
                            text: block.thinking
                        })
                    } else if (block.type === 'tool_use' && block.id && block.name) {
                        this.queue.pushNoWait({
                            type: 'tool_start',
                            chatId: this.chatId,
                            taskId: this.taskId,
                            tool: block.name,
                            toolCallId: block.id,
                            args: block.input as Record<string, unknown>
                        })
                    }
                }
                break

            case 'user':
                // User messages contain tool results
                if (Array.isArray(message.message.content)) {
                    for (const part of message.message.content) {
                        const partObj = part as unknown as Record<string, unknown>
                        if (partObj.type === 'tool_result' && typeof partObj.tool_use_id === 'string') {
                            const content = typeof partObj.content === 'string'
                                ? partObj.content
                                : JSON.stringify(partObj.content)
                            let result: unknown
                            try {
                                result = JSON.parse(content)
                            } catch {
                                result = content
                            }
                            this.queue.pushNoWait({
                                type: 'tool_end',
                                chatId: this.chatId,
                                taskId: this.taskId,
                                tool: this.streamState.currentToolName || 'unknown',
                                toolCallId: partObj.tool_use_id,
                                result
                            })
                        }
                    }
                }
                break

            case 'stream_event':
                this.processStreamEvent(message)
                break

            case 'result':
                if (message.is_error) {
                    this.error = message.result
                    this.queue.pushNoWait({
                        type: 'error',
                        chatId: this.chatId,
                        taskId: this.taskId,
                        error: message.result
                    })
                }
                break
        }
    }

    /**
     * Process streaming events for incremental updates
     */
    private processStreamEvent(message: { event: Record<string, unknown> }): void {
        const event = message.event

        if (event.type === 'content_block_start') {
            const block = event.content_block as Record<string, unknown> | undefined
            if (block?.type === 'tool_use') {
                this.streamState.currentToolId = (block.id as string) || null
                this.streamState.currentToolName = (block.name as string) || null
                this.streamState.toolInputJson = ''
            }
        } else if (event.type === 'content_block_delta') {
            const delta = event.delta as Record<string, unknown> | undefined
            if (delta?.type === 'text_delta' && delta.text) {
                this.partialText += delta.text as string
                this.queue.pushNoWait({
                    type: 'text',
                    chatId: this.chatId,
                    taskId: this.taskId,
                    text: delta.text as string
                })
            } else if (delta?.type === 'thinking_delta' && delta.thinking) {
                this.partialReasoning += delta.thinking as string
                this.queue.pushNoWait({
                    type: 'reasoning',
                    chatId: this.chatId,
                    taskId: this.taskId,
                    text: delta.thinking as string
                })
            } else if (delta?.type === 'input_json_delta' && delta.partial_json) {
                this.streamState.toolInputJson += delta.partial_json as string
            }
        } else if (event.type === 'content_block_stop') {
            if (this.streamState.currentToolId && this.streamState.currentToolName) {
                let toolArgs: Record<string, unknown> = {}
                try {
                    if (this.streamState.toolInputJson) {
                        toolArgs = JSON.parse(this.streamState.toolInputJson)
                    }
                } catch {
                    // Invalid JSON, use empty args
                }
                this.queue.pushNoWait({
                    type: 'tool_start',
                    chatId: this.chatId,
                    taskId: this.taskId,
                    tool: this.streamState.currentToolName,
                    toolCallId: this.streamState.currentToolId,
                    args: toolArgs
                })
                this.streamState.currentToolId = null
                this.streamState.currentToolName = null
                this.streamState.toolInputJson = ''
            }
        }
    }

    /**
     * System prompt for the blog chatbot
     */
    private getSystemPrompt(): string {
        return `You are a knowledgeable and helpful AI assistant on Chris Towles's Blog. Try to be funny but helpful.
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
    }
}

/**
 * Factory function to create an agent session
 */
export function createAgentSession(
    options: AgentSessionOptions,
    queue: MessageQueue<WSServerMessage>
): AgentSession {
    return new AgentSession(options, queue)
}
