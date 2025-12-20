import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
    const db = useDrizzle()

    const skills = await db
        .select({
            id: tables.skills.id,
            slug: tables.skills.slug,
            name: tables.skills.name,
            description: tables.skills.description,
            isBuiltIn: tables.skills.isBuiltIn,
            isActive: tables.skills.isActive,
            createdAt: tables.skills.createdAt
        })
        .from(tables.skills)
        .where(eq(tables.skills.isActive, true))

    return skills
})
