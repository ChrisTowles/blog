import { streamText, tool } from 'ai'
import { Chat, setupAIWorkers } from './../../tools/chatAgent'
// sdk-agnostic imports
import { z } from 'zod'

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
    // @ts-expect-error - response is not typed
    const { response: title } = await hubAI().run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      stream: false,
      messages: [{
        role: 'system',
        content: `You are a title generator for a chat:
        - Generate a short title based on the first user's message
        - The title should be less than 30 characters long
        - The title should be a summary of the user's message
        - Do not use markdown, just plain text`
      }, {
        role: 'user',
        content: chat.messages[0]!.content
      }]
    }, {
      gateway
    })
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
    chatId: chat.id,
  })

  return streamText({
    model: workersAI(model),
    maxTokens: 10000,
  // this is the key line which uses the `@agentic/ai-sdk` adapter
    tools: {
      getWeatherInformation: {
        description: 'show the weather in a given city to the user',
        parameters: z.object({ city: z.string() }),
        execute: async ({}: { city: string }) => {
          const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
          return weatherOptions[
            Math.floor(Math.random() * weatherOptions.length)
          ];
        },
      },
    },
    maxSteps: 10, // allow up to 5 steps
    toolCallStreaming: true,
    system: 'You are a helpful assistant that that can answer questions and help. You must answer in markdown syntax.',
    messages,
    async onStepFinish(result) {
      console.info('onStepFinish:', {
        result,
      })
    },
    async onFinish(response) {

      console.info('onFinish:', {
        steps: response.steps,
      })
      

      await db.insert(tables.messages).values({
        chatId: chat.id,
        role: 'assistant',
        content: response.text
      })
    }
  }).toDataStreamResponse()
})
