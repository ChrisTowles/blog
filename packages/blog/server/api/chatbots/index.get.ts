import { useDrizzle, tables } from '../../utils/drizzle'
import { capabilityRegistry } from '../../utils/capabilities'

defineRouteMeta({
  openAPI: {
    description: 'List all available chatbot flavors',
    tags: ['chatbots']
  }
})

export default defineEventHandler(async () => {
  const db = useDrizzle()

  // Try DB first for custom personas
  const dbPersonas = await db.select().from(tables.personas)

  // Merge with built-in personas (built-ins take precedence for same slug)
  const builtInPersonas = capabilityRegistry.getAllPersonas()
  const builtInSlugs = new Set(builtInPersonas.map(p => p.slug))

  // Custom personas from DB (exclude built-ins that are also in DB)
  const customPersonas = dbPersonas.filter(p => !builtInSlugs.has(p.slug))

  // Combine: built-in first, then custom
  const allPersonas = [
    ...builtInPersonas.map(persona => ({
      slug: persona.slug,
      name: persona.name,
      description: persona.description,
      icon: persona.icon,
      theme: persona.theme || { primaryColor: 'blue', icon: persona.icon },
      isDefault: persona.isDefault,
      isBuiltIn: true
    })),
    ...customPersonas.map(persona => ({
      slug: persona.slug,
      name: persona.name,
      description: persona.description,
      icon: persona.icon,
      theme: persona.theme || { primaryColor: 'blue', icon: persona.icon },
      isDefault: persona.isDefault,
      isBuiltIn: false
    }))
  ]

  return allPersonas
})
