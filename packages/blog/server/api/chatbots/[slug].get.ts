import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { useDrizzle, tables } from '../../utils/drizzle'
import { capabilityRegistry } from '../../utils/capabilities'

defineRouteMeta({
  openAPI: {
    description: 'Get chatbot configuration with loaded persona and theme',
    tags: ['chatbots']
  }
})

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, z.object({
    slug: z.string()
  }).parse)

  // Try built-in registry first
  try {
    const loaded = capabilityRegistry.loadPersona(slug)

    return {
      chatbot: {
        slug: loaded.persona.slug,
        name: loaded.persona.name,
        description: loaded.persona.description,
        icon: loaded.persona.icon,
        theme: loaded.persona.theme || {
          primaryColor: 'blue',
          icon: loaded.persona.icon
        }
      },
      persona: {
        slug: loaded.persona.slug,
        systemPrompt: loaded.systemPrompt,
        isDefault: loaded.persona.isDefault
      },
      capabilities: loaded.capabilities.map(c => ({
        slug: c.slug,
        name: c.name,
        description: c.description
      })),
      toolCount: loaded.tools.length,
      isBuiltIn: true
    }
  } catch {
    // Not a built-in persona, try database
  }

  // Try database for custom persona
  const db = useDrizzle()
  const [dbPersona] = await db.select().from(tables.personas).where(eq(tables.personas.slug, slug))

  if (!dbPersona) {
    throw createError({ statusCode: 404, statusMessage: 'Chatbot not found' })
  }

  // Load capabilities for this persona from DB
  const personaCapabilities = await db
    .select({
      capability: tables.capabilities
    })
    .from(tables.personaCapabilities)
    .innerJoin(tables.capabilities, eq(tables.personaCapabilities.capabilityId, tables.capabilities.id))
    .where(eq(tables.personaCapabilities.personaId, dbPersona.id))

  const capabilities = personaCapabilities.map(pc => pc.capability)
  const tools = capabilities.flatMap(c => c.toolsConfig || [])

  return {
    chatbot: {
      slug: dbPersona.slug,
      name: dbPersona.name,
      description: dbPersona.description,
      icon: dbPersona.icon,
      theme: dbPersona.theme || {
        primaryColor: 'blue',
        icon: dbPersona.icon
      }
    },
    persona: {
      slug: dbPersona.slug,
      systemPrompt: dbPersona.baseSystemPrompt,
      isDefault: dbPersona.isDefault
    },
    capabilities: capabilities.map(c => ({
      slug: c.slug,
      name: c.name,
      description: c.description
    })),
    toolCount: new Set(tools).size,
    isBuiltIn: false
  }
})
