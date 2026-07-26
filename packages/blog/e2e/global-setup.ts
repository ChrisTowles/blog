import { request, type FullConfig } from '@playwright/test';

/**
 * Warm the dev server before the suite runs.
 *
 * Nuxt's dev server compiles routes on demand, so the first visit to a route
 * pays a multi-second compile. That cost lands *inside* the first assertion
 * that touches it, which showed up as tests failing cold and passing on retry
 * — first in the loan and poker specs, then, once those were fixed, in
 * whichever spec happened to hit the home page first.
 *
 * Playwright's `webServer.url` check only waits for the server to answer at
 * all; it doesn't compile the rest of the routes. Requesting each one here
 * moves the compile out of the tests, so assertion timeouts measure the app
 * rather than the bundler.
 *
 * This is a no-op against a built server (nothing left to compile), so it only
 * earns its keep on local runs — CI serves `.output` instead. It stays because
 * local runs are where the flakiness it fixes actually happens.
 *
 * Failures are deliberately ignored: a route that errors under warmup is the
 * tests' business to report, not this hook's.
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
