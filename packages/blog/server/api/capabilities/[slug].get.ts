import { z } from 'zod'

defineRouteMeta({
  openAPI: {
    description: 'Get capability details by slug',
    tags: ['capabilities']
  }
})

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, z.object({
    slug: z.string()
  }).parse)

  const capability = capabilityRegistry.getCapability(slug)

  if (!capability) {
    throw createError({ statusCode: 404, statusMessage: 'Capability not found' })
  }

  return {
    slug: capability.slug,
    name: capability.name,
    description: capability.description,
    systemPromptSegment: capability.systemPromptSegment,
    tools: capability.tools,
    knowledgeBases: capability.knowledgeBases,
    isBuiltIn: capability.isBuiltIn,
    priority: capability.priority
  }
})
