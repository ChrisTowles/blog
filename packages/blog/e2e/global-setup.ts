import { request, type FullConfig } from '@playwright/test';

/**
 * Warm the dev server before the suite runs. Nuxt compiles routes on demand and
 * `webServer.url` only waits for the server to answer, so the first visit pays a
 * multi-second compile *inside* the first assertion touching it — specs failed
 * cold and passed on retry. A no-op against a built server, so this earns its
 * keep only on local runs, which is where that flakiness happens.
 */
const ROUTES = [
  '/',
  '/about',
  '/apps',
  '/blog',
  '/search',
  '/typing',
  '/workflows',
  '/poker',
  '/aviation',
  '/loan',
  '/chat',
];

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL;
  if (!baseURL) return;

  const context = await request.newContext({ baseURL });
  try {
    for (const route of ROUTES) {
      try {
        await context.get(route, { timeout: 120_000 });
      } catch {
        // Ignored on purpose — see above.
      }
    }
  } finally {
    await context.dispose();
  }
}
