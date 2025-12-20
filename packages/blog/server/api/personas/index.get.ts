import { skillRegistry } from '../../utils/skills'

defineRouteMeta({
  openAPI: {
    description: 'List all available personas',
    tags: ['personas']
  }
})

export default defineEventHandler(async () => {
  const personas = skillRegistry.getAllPersonas()

  return personas.map(persona => ({
    slug: persona.slug,
    name: persona.name,
    description: persona.description,
    icon: persona.icon,
    skillSlugs: persona.skillSlugs,
    isDefault: persona.isDefault,
    isBuiltIn: persona.isBuiltIn
  }))
})
