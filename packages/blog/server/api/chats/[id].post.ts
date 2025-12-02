import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod'

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

  interface Message {
    id: string
    role: 'user' | 'assistant'
    content: Anthropic.ContentBlock[]
  }

  const { model, messages } = await readValidatedBody(event, z.object({
    model: z.string(),
    messages: z.array(z.custom<Message>())
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

  const client = new Anthropic({
    apiKey: config.anthropicApiKey
  });


  if (!chat.title) {


    const params: Anthropic.MessageCreateParams = {
      max_tokens: 1024,
      system: `You are a title generator for a chat:
          - Generate a short title based on the first user's message
          - The title should be less than 30 characters long
          - The title should be a summary of the user's message
          - Do not use quotes (' or ") or colons (:) or any other punctuation
          - Do not use markdown, just plain text`,
      messages: [{ role: 'user', content: "test 123" }],
      model: config.model_fast as string,

    };
    const titleTemplate = await client.messages.create(params);

    const title  = titleTemplate.content.toString().trim();

    await db.update(tables.chats).set({ title }).where(eq(tables.chats.id, id as string))
  }

  const lastMessage = messages[messages.length - 1]
  if (lastMessage.role === 'user' && messages.length > 1) {
    await db.insert(tables.messages).values({
      chatId: id as string,
      role: 'user',
      content: lastMessage.content
    })
  }

  // Convert messages to Anthropic format
  const anthropicMessages: Anthropic.MessageParam[] = messages.map(msg => ({
    role: msg.role,
    content: msg.content.map(block => {
      if (block.type === 'text') {
        return { type: 'text' as const, text: block.text }
      }
      return block
    }).filter(block => block.type === 'text')
  }))

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
      if (chunk.type === 'content_block_delta') {
        if (chunk.delta.type === 'text_delta') {
          send(`data: ${JSON.stringify({ type: 'text', text: chunk.delta.text })}\n\n`)
        }
      }
    }

    const finalMessage = await stream.finalMessage()

    // Save assistant message to database
    await db.insert(tables.messages).values({
      chatId: chat.id,
      role: 'assistant',
      content: finalMessage.content
    })

    send(`data: ${JSON.stringify({ type: 'done' })}\n\n`)
  } catch (error) {
    send(`data: ${JSON.stringify({ type: 'error', message: error instanceof Error ? error.message : 'Unknown error' })}\n\n`)
  }

  event.node.res.end()
})
