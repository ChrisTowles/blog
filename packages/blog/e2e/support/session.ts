import { expect, type APIRequestContext } from '@playwright/test';

/**
 * Sign a spec in through the test-only session endpoint.
 *
 * `/api/_dev/session` 404s unless the request presents NUXT_DEV_SESSION_SECRET
 * (see server/api/_dev/session.post.ts), so the header goes on every call from
 * one place rather than being repeated per spec.
 *
 * The response is asserted here on purpose: an unauthenticated run doesn't fail
 * at sign-in, it fails several steps later as "element not found" on a page
 * that quietly redirected — which reads as a UI bug rather than a missing
 * session.
 */
export async function signIn(
  request: APIRequestContext,
  user: Record<string, string>,
): Promise<void> {
  const response = await request.post('/api/_dev/session', {
    headers: { 'x-dev-session-secret': process.env.NUXT_DEV_SESSION_SECRET ?? '' },
    data: { user },
  });

  expect(
    response.ok(),
    `POST /api/_dev/session returned ${response.status()}. A 404 means NUXT_DEV_SESSION_SECRET is unset or mismatched between the test process and the server.`,
  ).toBeTruthy();
}
