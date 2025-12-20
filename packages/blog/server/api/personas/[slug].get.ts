import { z } from 'zod'
import { skillRegistry } from '../../utils/skills'

defineRouteMeta({
  openAPI: {
    description: 'Get persona details with loaded skills',
    tags: ['personas']
  }
})

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, z.object({
    slug: z.string()
  }).parse)

  try {
    const loaded = skillRegistry.loadPersona(slug)

    return {
      persona: {
        slug: loaded.persona.slug,
        name: loaded.persona.name,
        description: loaded.persona.description,
        icon: loaded.persona.icon,
        isDefault: loaded.persona.isDefault,
        isBuiltIn: loaded.persona.isBuiltIn
      },
      skills: loaded.skills.map(s => ({
        slug: s.slug,
        name: s.name,
        description: s.description,
        tools: s.tools
      })),
      toolCount: loaded.tools.length
    }
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Persona not found' })
  }
})
