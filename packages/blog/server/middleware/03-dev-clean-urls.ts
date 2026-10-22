/**
 * Dev only: serve public/<path>.html for an extensionless /i-cant-clap/<name>, the way Cloudflare's
 * static assets do in production. Without it, `pnpm dev` renders the Nuxt 404 for every video link.
 */
export default defineEventHandler((event) => {
  if (!import.meta.dev) return;

  const url = getRequestURL(event);

  if (!/^\/i-cant-clap\/[a-z0-9-]+$/.test(url.pathname)) return;

  return proxyRequest(event, `${url.origin}${url.pathname}.html`);
});
