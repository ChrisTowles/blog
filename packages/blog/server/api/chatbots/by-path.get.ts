import { z } from 'zod'
import { loadChatbotByPath } from '../../utils/chatbots'

defineRouteMeta({
  openAPI: {
    description: 'Get chatbot config by URL path (query: ?path=/chat/coding-buddy)',
    tags: ['chatbots']
  }
})

export default defineEventHandler(async (event) => {
  const { path } = await getValidatedQuery(event, z.object({
    path: z.string()
  }).parse)

  try {
    const config = await loadChatbotByPath(path)
    return config
  } catch (error) {
    if (error instanceof Error && error.message.includes('Chatbot not found')) {
      throw createError({ statusCode: 404, statusMessage: `Chatbot not found for path: ${path}` })
    }
    if (error instanceof Error && error.message.includes('Persona not found')) {
      throw createError({ statusCode: 500, statusMessage: `Invalid chatbot configuration: persona missing` })
    }
    throw error
  }
})
