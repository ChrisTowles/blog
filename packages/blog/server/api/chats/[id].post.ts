import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import {
  convertToAnthropicMessages,
  generateChatTitle,
  formatSSEEvent,
  processStreamChunk,
  extractTextFromContent
} from '../../utils/chat'
import {
  findChatByIdAndUser,
  updateChatTitle,
  saveUserMessage,
  saveAssistantMessage,
  chatNeedsTitle,
  shouldSaveUserMessage
} from '../../utils/chat-db'

defineRouteMeta({
  openAPI: {
    description: 'Chat with AI.',
    tags: ['ai']
  }
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const config = useRuntimeConfig()
  const { id } = getRouterParams(event)

  // Zod schema for message validation
  const messageSchema = z.object({
    id: z.string(),
    role: z.enum(['user', 'assistant']),
    content: z.union([
      z.string(),
      z.array(z.any())
    ])
  })

  const { model, messages } = await readValidatedBody(event, z.object({
    model: z.string(),
    messages: z.array(messageSchema)
  }).parse)

  const db = useDrizzle()

  const chat = await findChatByIdAndUser(
    db,
    id as string,
    session.user?.id || session.id
  )

  if (!chat) {
    throw createError({ statusCode: 404, statusMessage: 'Chat not found' })
  }

  const client = new Anthropic({
    apiKey: config.anthropicApiKey
  })

  // Generate title if needed
  if (chatNeedsTitle(chat)) {
    const firstUserMessage = messages.find(m => m.role === 'user')
    let firstMessageText = 'New chat'

    if (firstUserMessage) {
      if (typeof firstUserMessage.content === 'string') {
        firstMessageText = firstUserMessage.content
      } else {
        firstMessageText = extractTextFromContent(firstUserMessage.content)
      }
    }

    const title = await generateChatTitle(
      client,
      firstMessageText,
      config.public.model_fast as string
    )

    await updateChatTitle(db, id as string, title)
  }

  const lastMessage = messages[messages.length - 1]
  if (shouldSaveUserMessage(messages, lastMessage)) {
    await saveUserMessage(db, id as string, lastMessage.content)
  }

  // Convert messages to Anthropic format
  const anthropicMessages = convertToAnthropicMessages(messages)

  // Start streaming
  const stream = client.messages.stream({
    model: model as string,
    max_tokens: 4096,
    system: 'You are a helpful assistant that can answer questions and help.',
    messages: anthropicMessages
  })

  setResponseStatus(event, 200)
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  const encoder = new TextEncoder()
  const send = (data: string) => {
    event.node.res.write(encoder.encode(data))
  }

  try {
    for await (const chunk of stream) {
      const eventData = processStreamChunk(chunk)
      if (eventData) {
        send(eventData)
      }
    }

    const finalMessage = await stream.finalMessage()

    // Save assistant message to database
    await saveAssistantMessage(db, chat.id, finalMessage.content)

    send(formatSSEEvent({ type: 'done' }))
  } catch (error) {
    send(formatSSEEvent({
      type: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }))
  }

  event.node.res.end()
})
