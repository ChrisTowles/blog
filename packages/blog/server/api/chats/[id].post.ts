import { anthropic } from '@ai-sdk/anthropic'
import { streamText, tool } from 'ai'
import { z } from 'zod'
import { generateChatTitle } from '~~/server/utils/ai-sdk-utils'

defineRouteMeta({
  openAPI: {
    description: 'Chat with AI.',
    tags: ['ai']
  }
})

export const weatherTool = tool({
  description: 'Get the weather in a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for')
  }),
  // location below is inferred to be a string:
  execute: async ({ location }) => ({
    location,
    temperature: Math.random() * 100
  })
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const { id } = getRouterParams(event)
  // TODO: Use readValidatedBody
  const { model, messages } = await readBody(event)

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

  if (!chat.title) {
    const title = await generateChatTitle({ content: messages[0].content })

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

  //   return await runWithTools(
  //      hubAI,
  //      '@cf/meta/llama-3.1-8b-instruct',
  //   {
  //     messages: messages,

  //     tools: [
  //       {
  //         name: 'get-weather',
  //         description: 'Gets the weather for a given city',
  //         parameters: {
  //           type: 'object',
  //           properties: {
  //             city: {
  //               type: 'number',
  //               description: 'The city to retrieve weather information for'
  //             },
  //           },
  //           required: ['city'],
  //         },
  //         function: (args: any): Promise<string> => {
  //           // use an API to get the weather information
  //           return   Promise.resolve('72');
  //         },
  //       },
  //     ]
  //   },
  //   {
  //     // options
  //     streamFinalResponse: true,
  //     verbose: true,
  //     maxRecursiveToolRuns: 1,
  //   }
  // )

  return streamText({
    model: anthropic(model),
    maxTokens: 8192,
    toolChoice: 'auto',
    // this is the key line which uses the `@agentic/ai-sdk` adapter
    tools: {
      getWeatherInformation: weatherTool
      // getWeather: {
      //   toolName: 'get-weather',
      //   description: 'show the weather in a given city to the user',
      //   parameters: z.object({ city: z.string() }),
      //   execute: async ({}: { city: string }) => {
      //     const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
      //     return weatherOptions[
      //       Math.floor(Math.random() * weatherOptions.length)
      //     ];
      //   },
      // },
    },
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
        response
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
