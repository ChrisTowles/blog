import { timingSafeEqual } from 'node:crypto';

/**
 * TEST-ONLY: mint a session so E2E specs can exercise authenticated routes
 * without driving a real OAuth round-trip.
 *
 * Gated on NUXT_DEV_SESSION_SECRET: unless that variable is set *and* the
 * request presents the same value in `x-dev-session-secret`, this route 404s
 * exactly as if it did not exist. Nothing sets it outside `.env` and the E2E
 * job in .github/workflows/test.yml, so it stays inert where it is deployed.
 *
 * It used to gate on `NODE_ENV !== 'production'` instead — the secret was
 * described in this comment but never actually checked. That broke once CI
 * started serving the *built* app rather than a dev server: a production build
 * is production, so every spec's beforeEach got a 404. A secret is both the
 * stronger check and the one that survives running against real output.
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
