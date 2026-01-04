/**
 * Custom Anthropic provider for Promptfoo
 * Handles tool calling with proper message format
 */
import Anthropic from '@anthropic-ai/sdk'
import { getTools, executeToolCall } from './tools/blog-tools.ts'

class AnthropicProvider {
    private client: Anthropic
    private model: string
    private maxTokens: number

    constructor(options: { id?: string; config?: { model?: string; max_tokens?: number } }) {
        this.client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY
        })

        // Store config from constructor
        if (!options?.config?.model) {
            throw new Error('Model must be specified in provider config')
        }
        if (!options?.config?.max_tokens) {
            throw new Error('max_tokens must be specified in provider config')
        }

        this.model = options.config.model
        this.maxTokens = options.config.max_tokens
    }

    id() {
        return 'anthropic-custom'
    }

    async callApi(
        prompt: string,
        context?: { vars?: Record<string, any> }
    ) {
        const model = this.model
        const maxTokens = this.maxTokens

        const tools = getTools()

        // Create messages array
        const messages: Anthropic.MessageParam[] = [
            {
                role: 'user',
                content: context?.vars?.query || prompt
            }
        ]

        let response = await this.client.messages.create({
        model,
        max_tokens: maxTokens,
        system: prompt, // Use prompt as system message
        messages,
        tools: tools as any[]
    })

    // Handle tool calls
    while (response.stop_reason === 'tool_use') {
        const toolUseBlocks = response.content.filter(
            (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
        )

        // Add assistant message with all tool uses
        messages.push({
            role: 'assistant',
            content: response.content
        })

        // Execute all tool calls and collect results
        const toolResultBlocks = []
        for (const toolUse of toolUseBlocks) {
            const result = await executeToolCall(toolUse.name, toolUse.input)

            toolResultBlocks.push({
                type: 'tool_result' as const,
                tool_use_id: toolUse.id,
                content: JSON.stringify(result)
            })
        }

        // Add user message with all tool results
        messages.push({
            role: 'user',
            content: toolResultBlocks
        })

        // Continue conversation with tool results
        response = await this.client.messages.create({
            model,
            max_tokens: maxTokens,
            system: prompt,
            messages,
            tools: tools as any[]
        })
    }

        // Extract final text response
        const textBlocks = response.content.filter(
            (block): block is Anthropic.TextBlock => block.type === 'text'
        )
        const textOutput = textBlocks.map(block => block.text).join('\n\n')

        // Collect all tool calls made during the conversation
        const allToolCalls: any[] = []
        for (const msg of messages) {
            if (msg.role === 'assistant' && Array.isArray(msg.content)) {
                const toolUses = msg.content.filter(
                    (block: any) => block.type === 'tool_use'
                )
                allToolCalls.push(...toolUses)
            }
        }

        // Return in format tests expect (JSON with tool_calls)
        const output = JSON.stringify({
            text: textOutput,
            tool_calls: allToolCalls,
            stop_reason: response.stop_reason,
            model: response.model,
            usage: response.usage
        })

        return {
            output,
            tokenUsage: {
                total: response.usage.input_tokens + response.usage.output_tokens,
                prompt: response.usage.input_tokens,
                completion: response.usage.output_tokens
            }
        }
    }
}

export default AnthropicProvider
