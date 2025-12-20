import { eq } from 'drizzle-orm'
import { useDrizzle, tables } from './drizzle'

/**
 * Load skills content for a chatbot from database
 *
 * @param skillSlugs Array of skill slugs to load
 * @returns Array of loaded skills with slug, name, and content
 */
async function loadSkillsForChatbot(skillSlugs: string[]) {
  if (!skillSlugs || skillSlugs.length === 0) {
    return []
  }

  const db = useDrizzle()

  // Note: assumes skills table exists with slug, name, and content columns
  // Gracefully handle if table doesn't exist yet
  try {
    // Load skills from database - filter by slug
    const skills = await Promise.all(
      skillSlugs.map(async (slug) => {
        try {
          const [skill] = await db
            .select()
            .from(tables.skills)
            .where(eq(tables.skills.slug, slug))

          if (!skill) {
            console.warn(`Skill not found: ${slug}`)
            return null
          }

          return {
            slug: skill.slug,
            name: skill.name,
            content: skill.content
          }
        } catch (error) {
          console.warn(`Failed to load skill ${slug}:`, error)
          return null
        }
      })
    )

    return skills.filter((s): s is { slug: string, name: string, content: string } => s !== null)
  } catch (error) {
    console.warn('Skills table not available or error loading skills:', error)
    return []
  }
}

/**
 * Load complete chatbot config with persona and skills combined
 */
export async function loadChatbotConfig(slug: string) {
  const db = useDrizzle()

  // Get chatbot from DB
  const [chatbot] = await db
    .select()
    .from(tables.chatbots)
    .where(eq(tables.chatbots.slug, slug))

  if (!chatbot) {
    throw new Error(`Chatbot not found: ${slug}`)
  }

  // Get persona details
  const [persona] = await db
    .select()
    .from(tables.personas)
    .where(eq(tables.personas.slug, chatbot.personaSlug))

  if (!persona) {
    throw new Error(`Persona not found: ${chatbot.personaSlug}`)
  }

  // Get persona capabilities
  const personaCapabilities = await db
    .select({
      capability: tables.capabilities
    })
    .from(tables.personaCapabilities)
    .innerJoin(tables.capabilities, eq(tables.personaCapabilities.capabilityId, tables.capabilities.id))
    .where(eq(tables.personaCapabilities.personaId, persona.id))

  const capabilities = personaCapabilities.map(pc => pc.capability)

  // Load skills for this chatbot
  const skills = await loadSkillsForChatbot(chatbot.skillSlugs || [])

  return {
    chatbot: {
      slug: chatbot.slug,
      name: chatbot.name,
      description: chatbot.description,
      urlPath: chatbot.urlPath,
      theme: chatbot.theme,
      isPublic: chatbot.isPublic,
      isActive: chatbot.isActive
    },
    persona: {
      slug: persona.slug,
      name: persona.name,
      description: persona.description,
      icon: persona.icon,
      baseSystemPrompt: persona.baseSystemPrompt,
      theme: persona.theme,
      isDefault: persona.isDefault,
      isBuiltIn: persona.isBuiltIn
    },
    customSystemPrompt: chatbot.customSystemPrompt || null,
    skillSlugs: chatbot.skillSlugs || [],
    skills,
    capabilities: capabilities.map(c => ({
      slug: c.slug,
      name: c.name,
      description: c.description,
      systemPromptSegment: c.systemPromptSegment,
      toolsConfig: c.toolsConfig,
      priority: c.priority
    })),
    tools: capabilities.flatMap(c => c.toolsConfig || [])
  }
}

/**
 * Load chatbot by URL path
 */
export async function loadChatbotByPath(path: string) {
  const db = useDrizzle()

  const [chatbot] = await db
    .select()
    .from(tables.chatbots)
    .where(eq(tables.chatbots.urlPath, path))

  if (!chatbot) {
    throw new Error(`Chatbot not found for path: ${path}`)
  }

  return loadChatbotConfig(chatbot.slug)
}
