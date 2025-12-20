export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })),
      config: {}
    }
  }

  return {
    valid: true,
    errors: [],
    config: getMaskedConfig(result.data)
  }
})
