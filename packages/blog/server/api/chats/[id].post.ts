import util from 'util'
import { streamText, tool } from 'ai'
import { generateChatTitle } from '~~/server/utils/ai-sdk-utils'
import { z } from 'zod'
import { autoTrimTools, runWithTools} from '@cloudflare/ai-utils'


defineRouteMeta({
  openAPI: {
    description: 'Chat with AI.',
    tags: ['ai']
  }
})

export const weatherTool = tool({
  description: 'Get the weather in a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  // location below is inferred to be a string:
  execute: async ({ location }) => ({
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
});



// export const weatherTool2 = tool({
//  				name: "get-weather",
// 				description: "Gets weather information of a particular city",
// 				parameters: {
// 					type: "object",
// 					properties: {
// 						city: {
// 							type: "string",
// 							description: "The city name",
// 						},
// 					},
// 					required: ["city"],
// 				},
// 				function: async ({ city }) => {
// 					// fetch weather data from an API
// 					console.log("value from llm", city);

// 					return city;
// 				},
			
// });

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const { id } = getRouterParams(event)
  // TODO: Use readValidatedBody
  const { model, messages } = await readBody(event)

  const db = useDrizzle()
  // Enable AI Gateway if defined in environment variables
  const { gateway, workersAi, hubAi } = setupAIWorkers()

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


//   const result = await runWithTools(
//       workersAi(model),
//      '@cf/meta/llama-3.1-8b-instruct', 
//   {
//     messages: messages,
//     tools: [weatherTool2],

//   }, 
//   {
//     // options
//     streamFinalResponse: true,
//     verbose: true,
//     maxRecursiveToolRuns: 1,
//     	// If there's too many tools, you can enable this
// 		trimFunction: autoTrimTools,
//   }
// )
  // return result;

  return streamText({
    model: workersAi(model),
    // this is the key line which uses the `@agentic/ai-sdk` adapter
    // tools: {
    //   "getWeatherInformation": weatherTool,
    //   // getWeather: {
    //   //   toolName: 'get-weather',
    //   //   description: 'show the weather in a given city to the user',
    //   //   parameters: z.object({ city: z.string() }),
    //   //   execute: async ({}: { city: string }) => {
    //   //     const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
    //   //     return weatherOptions[
    //   //       Math.floor(Math.random() * weatherOptions.length)
    //   //     ];
    //   //   },
    //   // },
    // },
    maxSteps: 10, // allow up to 5 steps
    toolCallStreaming: true,
    tools: {
      getWeather: weatherTool,
    },
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
