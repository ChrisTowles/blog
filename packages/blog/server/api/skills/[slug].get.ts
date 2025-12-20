import { z } from 'zod'
import { skillRegistry } from '../../utils/skills'

defineRouteMeta({
  openAPI: {
    description: 'Get skill details by slug',
    tags: ['skills']
  }
})

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, z.object({
    slug: z.string()
  }).parse)

  const skill = skillRegistry.getSkill(slug)

  if (!skill) {
    throw createError({ statusCode: 404, statusMessage: 'Skill not found' })
  }

  return {
    slug: skill.slug,
    name: skill.name,
    description: skill.description,
    systemPromptSegment: skill.systemPromptSegment,
    tools: skill.tools,
    knowledgeBases: skill.knowledgeBases,
    isBuiltIn: skill.isBuiltIn,
    priority: skill.priority
  }
})
