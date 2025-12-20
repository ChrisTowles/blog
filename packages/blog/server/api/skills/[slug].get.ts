import { z } from 'zod'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const { slug } = await getValidatedRouterParams(event, z.object({
        slug: z.string()
    }).parse)

    const db = useDrizzle()

    const [skill] = await db
        .select()
        .from(tables.skills)
        .where(eq(tables.skills.slug, slug))

    if (!skill) {
        throw createError({ statusCode: 404, statusMessage: 'Skill not found' })
    }

    return skill
})
