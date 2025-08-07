import { generateChatTitle } from '~~/server/utils/ai-sdk-utils'

defineRouteMeta({
  openAPI: {
    description: 'Chat with AI.',
    tags: ['ai']
  }
})

export default defineEventHandler(async (event) => {
  // ts-expect-error - event.context not typed
  const { gateway, workersAI } = setupAIWorkers()

  const title = await generateChatTitle({ gateway, content: 'The name of of a raindeer with a red nose.' })
  return {
    title: title
  }
})
