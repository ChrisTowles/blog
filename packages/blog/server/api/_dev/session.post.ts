import { timingSafeEqual } from 'node:crypto';

/**
 * TEST-ONLY: mint a session so E2E specs can hit authenticated routes without a
 * real OAuth round-trip. Unless NUXT_DEV_SESSION_SECRET is set *and* matches the
 * request's `x-dev-session-secret`, this 404s as if it did not exist — only `.env`
 * and the E2E job set it. Gating on NODE_ENV instead breaks CI, which builds prod.
 */
export default defineEventHandler(async (event) => {
  const secret = process.env.NUXT_DEV_SESSION_SECRET;
  const presented = getHeader(event, 'x-dev-session-secret');

  if (!secret || !presented || !safeEqual(secret, presented)) {
    throw createError({ statusCode: 404, message: 'Not found' });
  }

  const body = await readBody(event);
  if (!body?.user) {
    throw createError({ statusCode: 400, message: 'Missing user' });
  }

  await setUserSession(event, { user: body.user });
  return { ok: true };
});

/** Constant-time compare. Length is checked first — timingSafeEqual throws on unequal lengths. */
function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
