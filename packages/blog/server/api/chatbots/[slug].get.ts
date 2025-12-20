import { z } from 'zod'

defineRouteMeta({
  openAPI: {
    description: 'Get specific chatbot config by slug with persona, theme, and capabilities',
    tags: ['chatbots']
  }
})

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, z.object({
    slug: z.string()
  }).parse)

  try {
    const config = await loadChatbotConfig(slug)
    return config
  } catch (error) {
    if (error instanceof Error && error.message.includes('Chatbot not found')) {
      throw createError({ statusCode: 404, statusMessage: `Chatbot not found: ${slug}` })
    }
    if (error instanceof Error && error.message.includes('Persona not found')) {
      throw createError({ statusCode: 500, statusMessage: `Invalid chatbot configuration: persona missing` })
    }
    throw error
  }
})
