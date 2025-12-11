import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'
import { z } from 'zod'
import type { ChatMessage, MessagePart, SSEEvent } from '~~/shared/chat-types'
import { chatTools, executeTool } from '../../utils/ai/tools'
import { getAnthropicClient } from '../../utils/ai/anthropic'

defineRouteMeta({
  openAPI: {
    description: 'Chat with AI.',
    tags: ['ai']
  }
})

const SYSTEM_PROMPT = `You are a knowledgeable and helpful AI assistant on Chris Towles's Blog. Try to be funny but helpful.
Your goal is to provide clear, accurate, and well-structured responses.

**FORMATTING RULES (CRITICAL):**
- ABSOLUTELY NO MARKDOWN HEADINGS: Never use #, ##, ###, ####, #####, or ######
- NO underline-style headings with === or ---
- Use **bold text** for emphasis and section labels instead
- Examples:
  * Instead of "## Usage", write "**Usage:**" or just "Here's how to use it:"
  * Instead of "# Complete Guide", write "**Complete Guide**" or start directly with content
- Start all responses with content, never with a heading

**RESPONSE QUALITY:**
- Be concise yet comprehensive
- Use examples when helpful
- Break down complex topics into digestible parts
- Maintain a friendly, professional tone`

function convertToAnthropicMessages(messages: ChatMessage[]): MessageParam[] {
  return messages.map((msg) => {
    const textContent = msg.parts
      .filter((p): p is { type: 'text', text: string } => p.type === 'text')
      .map(p => p.text)
      .join('\n')

    return {
      role: msg.role,
      content: textContent || ' '
    }
  })
}

function sendSSE(controller: ReadableStreamDefaultController, event: SSEEvent) {
  const encoder = new TextEncoder()
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const config = useRuntimeConfig()
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string()
  }).parse)

  const { model, messages } = await readValidatedBody(event, z.object({
    model: z.string(),
    messages: z.array(z.custom<ChatMessage>())
  }).parse)

  const db = useDrizzle()

  const chat = await db.query.chats.findFirst({
    where: (chat, { eq }) => and(eq(chat.id, id as string), eq(chat.userId, session.user?.id || session.id)),
    with: {
      messages: true
    }
  })

  if (!chat) {
    throw createError({ statusCode: 404, statusMessage: 'Chat not found' })
  }

  // Generate title if needed
  let generatedTitle: string | null = null
  if (!chat.title && messages.length > 0) {
    const client = getAnthropicClient()
    const titleResponse = await client.messages.create({
      model: config.public.model_fast as string,
      max_tokens: 50,
      system: `You are a title generator for a chat:
- Generate a short title based on the first user's message
- The title should be less than 30 characters long
- The title should be a summary of the user's message
- Do not use quotes (' or ") or colons (:) or any other punctuation
- Do not use markdown, just plain text`,
      messages: [{ role: 'user', content: JSON.stringify(messages[0]?.parts ?? '') }]
    })

    const titleContent = titleResponse.content[0]
    if (titleContent?.type === 'text') {
      generatedTitle = titleContent.text.slice(0, 30)
      await db.update(tables.chats).set({ title: generatedTitle }).where(eq(tables.chats.id, id as string))
    }
  }

  // Save the last user message
  const lastMessage = messages[messages.length - 1]
  if (lastMessage?.role === 'user' && messages.length > 1) {
    await db.insert(tables.messages).values({
      chatId: id as string,
      role: 'user',
      parts: lastMessage.parts
    })
  }

  // Create SSE stream
  const stream = new ReadableStream({
    async start(controller) {
      try {
        if (generatedTitle) {
          sendSSE(controller, { type: 'title', title: generatedTitle })
        }

        const client = getAnthropicClient()
        const anthropicMessages = convertToAnthropicMessages(messages)

        let fullText = ''
        let reasoningText = ''
        const messageId = crypto.randomUUID()
        let currentToolUseId: string | null = null
        let currentToolName: string | null = null
        let _toolInputJson = ''

        // Run up to 5 turns for tool use
        let turnCount = 0
        const maxTurns = 5
        let currentMessages = [...anthropicMessages]

        while (turnCount < maxTurns) {
          turnCount++

          const streamResponse = await client.messages.stream({
            model,
            max_tokens: 4096,
            system: SYSTEM_PROMPT,
            messages: currentMessages,
            tools: chatTools
          })

          let hasToolUse = false
          const toolResults: { type: 'tool_result', tool_use_id: string, content: string }[] = []

          for await (const event of streamResponse) {
            if (event.type === 'content_block_start') {
              if (event.content_block.type === 'thinking') {
                // Extended thinking block starting
              } else if (event.content_block.type === 'tool_use') {
                currentToolUseId = event.content_block.id
                currentToolName = event.content_block.name
                _toolInputJson = ''
                hasToolUse = true
              }
            } else if (event.type === 'content_block_delta') {
              if (event.delta.type === 'thinking_delta') {
                reasoningText += event.delta.thinking
                sendSSE(controller, { type: 'reasoning', text: event.delta.thinking })
              } else if (event.delta.type === 'text_delta') {
                fullText += event.delta.text
                sendSSE(controller, { type: 'text', text: event.delta.text })
              } else if (event.delta.type === 'input_json_delta') {
                _toolInputJson += event.delta.partial_json
              }
            } else if (event.type === 'content_block_stop') {
              if (currentToolUseId && currentToolName) {
                // Execute tool
                const toolResult = executeTool(currentToolName)
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: currentToolUseId,
                  content: JSON.stringify(toolResult)
                })
                currentToolUseId = null
                currentToolName = null
                _toolInputJson = ''
              }
            }
          }

          // If tool was used, continue the conversation
          if (hasToolUse && toolResults.length > 0) {
            // Add assistant's tool use to messages
            const assistantContent: Array<{ type: 'text', text: string } | { type: 'tool_use', id: string, name: string, input: Record<string, unknown> }> = []
            if (fullText) {
              assistantContent.push({ type: 'text', text: fullText })
            }
            // Add tool uses (simplified - in reality we'd track them during streaming)
            for (const result of toolResults) {
              assistantContent.push({
                type: 'tool_use',
                id: result.tool_use_id,
                name: 'tool', // This is simplified
                input: {}
              })
            }

            currentMessages = [
              ...currentMessages,
              { role: 'assistant' as const, content: assistantContent.length > 0 ? assistantContent : [{ type: 'text' as const, text: ' ' }] },
              { role: 'user' as const, content: toolResults }
            ]
          } else {
            // No tool use, we're done
            break
          }
        }

        // Save assistant message to database
        const messageParts: MessagePart[] = []
        if (reasoningText) {
          messageParts.push({ type: 'reasoning', text: reasoningText, state: 'done' })
        }
        if (fullText) {
          messageParts.push({ type: 'text', text: fullText })
        }

        await db.insert(tables.messages).values({
          chatId: chat.id,
          role: 'assistant',
          parts: messageParts
        })

        sendSSE(controller, { type: 'done', messageId })
        controller.close()
      } catch (error) {
        console.error('Stream error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        sendSSE(controller, { type: 'error', error: errorMessage })
        controller.close()
      }
    }
  })

  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')

  return stream
})
