import { loadSkillFromBuffer } from '~~/server/utils/skills/loader'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const file = formData.find(f => f.name === 'file')
  if (!file || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'No file field found' })
  }

  try {
    const skill = await loadSkillFromBuffer(file.data, file.filename || 'upload')

    const slug = skill.metadata.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const db = useDrizzle()

    const [existing] = await db
      .select()
      .from(tables.skills)
      .where(eq(tables.skills.slug, slug))

    if (existing) {
      throw createError({ statusCode: 409, statusMessage: 'Skill already exists' })
    }

    const [created] = await db
      .insert(tables.skills)
      .values({
        slug,
        name: skill.metadata.name,
        description: skill.metadata.description,
        content: skill.body,
        skillZip: file.data,
        isBuiltIn: false,
        isActive: true
      })
      .returning()

    return created
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    throw createError({ statusCode: 400, statusMessage: 'Invalid skill file' })
  }
})
