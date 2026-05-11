/**
 * Preserve the `?redirect=...` query across an OAuth round-trip.
 *
 * The /auth/{provider} routes accept a `?redirect=...` query that callers
 * use to land the user back where they started (e.g. /typing). But the
 * OAuth provider only echoes back the registered redirect URI plus its
 * own `code` + `state` params — our `?redirect=` is dropped between the
 * initial bounce and the callback.
 *
 * Fix: on the initial hit (no `code` query — this is the user's first
 * GET that will redirect them to the provider), stash the requested
 * destination in a short-lived cookie. The provider handler's
 * `onSuccess` reads the cookie and uses it as the final landing target,
 * then clears it.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (!url.pathname.startsWith('/auth/')) return;
  if (url.searchParams.has('code')) return; // callback phase — cookie already set

  const redirect = url.searchParams.get('redirect');
  if (!redirect || !redirect.startsWith('/')) return; // same-origin only

  setCookie(event, 'oauth_redirect', redirect, {
    maxAge: 60 * 10, // 10 minutes — long enough for OAuth, short enough to expire
    sameSite: 'lax',
    secure: !import.meta.dev,
    path: '/',
    httpOnly: true,
  });
});
