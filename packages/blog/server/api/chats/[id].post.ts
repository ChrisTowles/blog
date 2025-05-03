import util from 'util'
import { streamText } from 'ai'
// import { z } from 'zod'
import { generateChatTitle } from '~~/server/utils/ai-sdk-utils'

defineRouteMeta({
  openAPI: {
    description: 'Chat with AI.',
    tags: ['ai']
  }
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const { id } = getRouterParams(event)
  // TODO: Use readValidatedBody
  const { model, messages } = await readBody(event)

  const db = useDrizzle()
  // Enable AI Gateway if defined in environment variables
  const { gateway, workersAI } = setupAIWorkers()

  const chat = await db.query.chats.findFirst({
    where: (chat, { eq }) => and(eq(chat.id, id as string), eq(chat.userId, session.user?.id || session.id)),
    with: {
      messages: true
    }
  })
  if (!chat) {
    throw createError({ statusCode: 404, statusMessage: 'Chat not found' })
  }

  if (!chat.title) {
    const title = await generateChatTitle({ gateway, content: messages[0].content })

    setHeader(event, 'X-Chat-Title', title.replace(/:/g, '').split('\n')[0])
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

  console.info('AI prompt:', {
    model,
    messages,
    chatId: chat.id
  })

  return streamText({
    model: workersAI(model),
    maxTokens: 10000,
    // this is the key line which uses the `@agentic/ai-sdk` adapter
    // tools: {
    //   getWeatherInformation: {
    //     description: 'show the weather in a given city to the user',
    //     parameters: z.object({ city: z.string() }),
    //     execute: async ({}: { city: string }) => {
    //       const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
    //       return weatherOptions[
    //         Math.floor(Math.random() * weatherOptions.length)
    //       ];
    //     },
    //   },
    // },
    maxSteps: 10, // allow up to 5 steps
    toolCallStreaming: true,
    system: 'You are a helpful assistant that that can answer questions and help. You must answer in markdown syntax.',
    messages,
    async onStepFinish(result) {
      console.info('onStepFinish:', {
        result
      })
    },
    async onFinish(response) {
      console.info('onFinish:', {
        a: util.inspect(response, { colors: true })
      })

      await db.insert(tables.messages).values({
        chatId: chat.id,
        role: 'assistant',
        content: response.text
      })
    },
    async onError(error) {
      console.error('onError:', {
        error
      })
    }
  }).toDataStreamResponse()
})
