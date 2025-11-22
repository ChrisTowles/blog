import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'

defineRouteMeta({
  openAPI: {
    description: 'Chat with AI using Anthropic Claude.',
    tags: ['ai']
  }
})

// Define available tools for agents
const tools: Anthropic.Tool[] = [
  {
    name: 'get_current_time',
    description: 'Get the current time in a specific timezone. Useful when users ask about time or scheduling.',
    input_schema: {
      type: 'object',
      properties: {
        timezone: {
          type: 'string',
          description: 'The IANA timezone name (e.g., America/New_York, Europe/London, Asia/Tokyo)'
        }
      },
      required: ['timezone']
    }
  },
  {
    name: 'calculate',
    description: 'Perform mathematical calculations. Supports basic arithmetic and mathematical expressions.',
    input_schema: {
      type: 'object',
      properties: {
        expression: {
          type: 'string',
          description: 'The mathematical expression to evaluate (e.g., "2 + 2", "sqrt(16)", "10 * 5")'
        }
      },
      required: ['expression']
    }
  }
]

// Tool execution functions
async function executeTool(toolName: string, toolInput: Record<string, unknown>): Promise<string> {
  switch (toolName) {
    case 'get_current_time': {
      const timezone = toolInput.timezone as string
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          dateStyle: 'full',
          timeStyle: 'long'
        })
        return formatter.format(now)
      } catch {
        return `Error: Invalid timezone "${timezone}"`
      }
    }
    case 'calculate': {
      const expression = toolInput.expression as string
      try {
        // Simple safe evaluation for basic math
        // In production, use a proper math expression parser
        const result = Function(`'use strict'; return (${expression})`)()
        return String(result)
      } catch {
        return `Error: Could not evaluate expression "${expression}"`
      }
    }
    default:
      return `Error: Unknown tool "${toolName}"`
  }
}

// Message part schema for validation
const MessagePartSchema = z.union([
  z.object({
    type: z.literal('text'),
    text: z.string()
  }),
  z.object({
    type: z.literal('tool-call'),
    toolCallId: z.string(),
    toolName: z.string(),
    args: z.record(z.unknown())
  }),
  z.object({
    type: z.literal('tool-result'),
    toolCallId: z.string(),
    toolName: z.string(),
    result: z.unknown(),
    isError: z.boolean().optional()
  })
])

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const config = useRuntimeConfig()

  const { id } = getRouterParams(event)

  const { model, messages } = await readValidatedBody(event, z.object({
    model: z.string(),
    messages: z.array(z.object({
      id: z.string(),
      role: z.enum(['user', 'assistant']),
      parts: z.array(MessagePartSchema)
    }))
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

  // Initialize Anthropic client
  const anthropic = new Anthropic({
    apiKey: config.anthropicApiKey as string
  })

  // Generate title if needed
  if (!chat.title && messages.length > 0) {
    const firstMessage = messages[0]
    if (firstMessage) {
      const firstText = firstMessage.parts.find(p => p.type === 'text')

      if (firstText && 'text' in firstText) {
        const titleResponse = await anthropic.messages.create({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 100,
          messages: [{
            role: 'user',
            content: `Generate a short title (less than 30 characters) for a chat that starts with: "${firstText.text}". Return only the title, no quotes or punctuation.`
          }]
        })

        const titleContent = titleResponse.content[0]
        if (titleContent && titleContent.type === 'text') {
          await db.update(tables.chats).set({ title: titleContent.text }).where(eq(tables.chats.id, id as string))
        }
      }
    }
  }

  // Save user message
  const lastMessage = messages[messages.length - 1]
  if (lastMessage?.role === 'user' && messages.length > 1) {
    await db.insert(tables.messages).values({
      chatId: id as string,
      role: 'user',
      parts: lastMessage.parts
    })
  }

  // Convert messages to Anthropic format
  const anthropicMessages: Anthropic.MessageParam[] = messages.map((msg) => {
    const content: Anthropic.MessageParam['content'] = []

    for (const part of msg.parts) {
      if (part.type === 'text') {
        content.push({
          type: 'text',
          text: part.text
        })
      } else if (part.type === 'tool-result') {
        content.push({
          type: 'tool_result',
          tool_use_id: part.toolCallId,
          content: typeof part.result === 'string' ? part.result : JSON.stringify(part.result),
          is_error: part.isError
        })
      }
    }

    return {
      role: msg.role,
      content
    }
  })

  // Determine which model to use
  let anthropicModel = 'claude-3-5-sonnet-20241022'
  if (model.includes('haiku')) {
    anthropicModel = 'claude-3-5-haiku-20241022'
  } else if (model.includes('opus')) {
    anthropicModel = 'claude-opus-4-20250514'
  }

  // Stream response
  setResponseHeader(event, 'Content-Type', 'text/event-stream')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'Connection', 'keep-alive')

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()

      const sendEvent = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`))
      }

      try {
        let fullResponse: Array<Anthropic.TextBlock | Anthropic.ToolUseBlock> = []
        let hasToolUse = false

        // Stream from Anthropic
        const anthropicStream = await anthropic.messages.stream({
          model: anthropicModel,
          max_tokens: 4096,
          tools,
          messages: anthropicMessages,
          system: 'You are a helpful assistant that can answer questions and help with tasks. When appropriate, use the available tools to provide more accurate and helpful responses.'
        })

        for await (const event of anthropicStream) {
          if (event.type === 'content_block_start') {
            if (event.content_block.type === 'text') {
              sendEvent('text-delta', { delta: '' })
            } else if (event.content_block.type === 'tool_use') {
              hasToolUse = true
              sendEvent('tool-call-start', {
                toolCallId: event.content_block.id,
                toolName: event.content_block.name
              })
            }
          } else if (event.type === 'content_block_delta') {
            if (event.delta.type === 'text_delta') {
              sendEvent('text-delta', { delta: event.delta.text })
            } else if (event.delta.type === 'input_json_delta') {
              sendEvent('tool-call-delta', { delta: event.delta.partial_json })
            }
          } else if (event.type === 'message_stop') {
            const finalMessage = await anthropicStream.finalMessage()
            fullResponse = finalMessage.content

            // Execute tools if present
            if (hasToolUse) {
              for (const block of finalMessage.content) {
                if (block.type === 'tool_use') {
                  sendEvent('tool-execute', {
                    toolCallId: block.id,
                    toolName: block.name
                  })

                  const result = await executeTool(block.name, block.input as Record<string, unknown>)

                  sendEvent('tool-result', {
                    toolCallId: block.id,
                    toolName: block.name,
                    result
                  })
                }
              }
            }
          }
        }

        // Save assistant message to database
        const assistantParts = fullResponse.map((block): typeof MessagePartSchema._type => {
          if (block.type === 'text') {
            return {
              type: 'text',
              text: block.text
            }
          } else if (block.type === 'tool_use') {
            return {
              type: 'tool-call',
              toolCallId: block.id,
              toolName: block.name,
              args: block.input as Record<string, unknown>
            }
          }
          return {
            type: 'text',
            text: ''
          }
        }).filter((p): p is typeof MessagePartSchema._type => p.type === 'text' ? p.text !== '' : true)

        await db.insert(tables.messages).values({
          chatId: chat.id,
          role: 'assistant',
          parts: assistantParts
        })

        sendEvent('done', {})
        controller.close()
      } catch (error) {
        sendEvent('error', {
          message: error instanceof Error ? error.message : 'An error occurred'
        })
        controller.close()
      }
    }
  })

  return stream
})
