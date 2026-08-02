/**
 * Preserves `?redirect=...` across an OAuth round-trip. The provider echoes back
 * only the registered redirect URI plus its own `code` + `state`, so the caller's
 * destination is dropped between the initial bounce and the callback. Stash it in
 * a short-lived cookie here; the provider's `onSuccess` reads it, then clears it.
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
