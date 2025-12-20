import { skillRegistry } from '../utils/skills'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const { input, personaSlug } = await readBody(event)
  const db = useDrizzle()

  // Validate persona exists if provided
  let personaId: string | null = null
  if (personaSlug) {
    // Look up persona in DB first, fall back to built-in
    const dbPersona = await db.query.personas.findFirst({
      where: (p, { eq }) => eq(p.slug, personaSlug)
    })

    if (dbPersona) {
      personaId = dbPersona.id
    } else {
      // Check built-in personas
      const builtInPersona = skillRegistry.getPersona(personaSlug)
      if (!builtInPersona) {
        throw createError({ statusCode: 400, statusMessage: `Invalid persona: ${personaSlug}` })
      }
      // Built-in personas don't have DB IDs, we'll use the slug
    }
  }

  const [chat] = await db.insert(tables.chats).values({
    title: '',
    userId: session.user?.id || session.id,
    personaId: personaId // Will be null for built-in personas
  }).returning()
  if (!chat) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create chat' })
  }

  await db.insert(tables.messages).values({
    chatId: chat.id,
    role: 'user',
    parts: [{ type: 'text', text: input }]
  })

  // Return chat with persona info
  return {
    ...chat,
    personaSlug: personaSlug || skillRegistry.getDefaultPersona()?.slug
  }
})
