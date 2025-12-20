defineRouteMeta({
  openAPI: {
    description: 'List all active chatbots with persona and theme info',
    tags: ['chatbots']
  }
})

export default defineEventHandler(async () => {
  const db = useDrizzle()

  // Get all active chatbots with related personas
  const chatbots = await db
    .select({
      chatbot: tables.chatbots,
      persona: tables.personas
    })
    .from(tables.chatbots)
    .innerJoin(tables.personas, eq(tables.chatbots.personaSlug, tables.personas.slug))
    .where(eq(tables.chatbots.isActive, true))

  return chatbots.map(({ chatbot, persona }) => ({
    slug: chatbot.slug,
    name: chatbot.name,
    description: chatbot.description,
    urlPath: chatbot.urlPath,
    theme: chatbot.theme,
    personaSlug: chatbot.personaSlug,
    persona: {
      slug: persona.slug,
      name: persona.name,
      icon: persona.icon,
      theme: persona.theme
    },
    skillSlugs: chatbot.skillSlugs,
    isPublic: chatbot.isPublic,
    isActive: chatbot.isActive
  }))
})
