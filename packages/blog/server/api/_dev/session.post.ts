/**
 * DEV-ONLY: Create a test session for E2E testing.
 * Only works when NUXT_DEV_SESSION_SECRET matches.
 */
export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV === 'production') {
    throw createError({ statusCode: 404, message: 'Not found' });
  }

  const body = await readBody(event);
  if (!body?.user) {
    throw createError({ statusCode: 400, message: 'Missing user' });
  }

  await setUserSession(event, { user: body.user });
  return { ok: true };
});
