/**
 * Playwright config scoped to the aviation-answer iframe bundle tests, run via
 * `pnpm --filter @chris-towles/blog test:ui-bundle:e2e`. It serves the built bundle
 * from `e2e/server.mjs` rather than the blog's Nuxt dev server, so these stay
 * deterministic and need no live dev server.
 */
import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.AVIATION_E2E_PORT || 8182);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `AVIATION_E2E_PORT=${PORT} node e2e/server.mjs`,
    url: `http://127.0.0.1:${PORT}/bundle.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    cwd: '.',
  },
  projects: [
    {
      name: 'chromium',
      use: { channel: 'chromium' },
    },
  ],
});
