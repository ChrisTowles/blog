import { skillRegistry } from '../../utils/skills'

defineRouteMeta({
  openAPI: {
    description: 'List all available skills',
    tags: ['skills']
  }
})

export default defineEventHandler(async () => {
  const skills = skillRegistry.getAllSkills()

  return skills.map(skill => ({
    slug: skill.slug,
    name: skill.name,
    description: skill.description,
    tools: skill.tools,
    isBuiltIn: skill.isBuiltIn,
    priority: skill.priority
  }))
})
