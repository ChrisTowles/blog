import { z } from 'zod'
import { capabilityRegistry } from '../../utils/capabilities'

defineRouteMeta({
  openAPI: {
    description: 'Get persona details with loaded capabilities',
    tags: ['personas']
  }
})

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, z.object({
    slug: z.string()
  }).parse)

  try {
    const loaded = capabilityRegistry.loadPersona(slug)

    return {
      persona: {
        slug: loaded.persona.slug,
        name: loaded.persona.name,
        description: loaded.persona.description,
        icon: loaded.persona.icon,
        isDefault: loaded.persona.isDefault,
        isBuiltIn: loaded.persona.isBuiltIn
      },
      capabilities: loaded.capabilities.map(c => ({
        slug: c.slug,
        name: c.name,
        description: c.description,
        tools: c.tools
      })),
      toolCount: loaded.tools.length,
      systemPrompt: loaded.systemPrompt
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Persona not found')) {
      throw createError({ statusCode: 404, statusMessage: error.message })
    }
    console.error('Unexpected error loading persona:', error)
    throw error
  }
})
