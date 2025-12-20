import { capabilityRegistry } from '../../utils/capabilities'

defineRouteMeta({
  openAPI: {
    description: 'List all available personas',
    tags: ['personas']
  }
})

export default defineEventHandler(async () => {
  const personas = capabilityRegistry.getAllPersonas()

  return personas.map(persona => ({
    slug: persona.slug,
    name: persona.name,
    description: persona.description,
    icon: persona.icon,
    capabilitySlugs: persona.capabilitySlugs,
    isDefault: persona.isDefault,
    isBuiltIn: persona.isBuiltIn
  }))
})
