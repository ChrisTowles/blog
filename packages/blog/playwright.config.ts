import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { defineConfig, devices } from '@playwright/test';
import { findUpSync } from 'find-up';

// Load package .env, then root .env (root values fill in missing vars)
const packageEnv = findUpSync('.env');
if (packageEnv) {
  dotenv.config({ path: packageEnv });
  const rootEnv = findUpSync('.env', { cwd: join(dirname(packageEnv), '..') });
  if (rootEnv && rootEnv !== packageEnv) {
    dotenv.config({ path: rootEnv });
  }
}

// CI has no .env, so UI_PORT is unset there. Without a default the baseURL
// became "http://localhost:undefined". Locally `tt` renders UI_PORT into .env
// (3000-3019), which the dotenv load above picks up.
const uiPort = process.env.UI_PORT || '3000';
const baseURL = `http://localhost:${uiPort}`;

export default defineConfig({
  testDir: './e2e',
  // Compiles every route once before the suite, so on-demand compile time
  // doesn't land inside the first assertion that touches a route.
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // One local retry absorbs dev-server contention timeouts; persistent
  // failures still fail the run.
  retries: process.env.CI ? 2 : 1,
  // Unbounded local workers oversubscribe the on-demand-compiling dev server
  // and produce rotating timeout failures; 4 keeps runs reliable.
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',
  // The dev server compiles routes on demand, so the first hit on a route can
  // take well over Playwright's 5s default — which showed up as flaky loan and
  // poker runs that failed cold and passed on retry.
  expect: {
    timeout: (process.env.CI ? 20 : 10) * 1000,
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    // Locally, `bun run dev` from the repo root brings up docker, migrations
    // and the mcp/ui-bundle watchers alongside Nuxt.
    //
    // CI can't use that: bun isn't installed, and the workflow already
    // provides Postgres as a service and runs migrations + the ui-bundle
    // build as their own steps. So there it starts Nuxt directly, which is
    // exactly the part `pnpm dev` would have contributed.
    command: process.env.CI
      ? 'pnpm --filter @chris-towles/blog exec nuxt dev'
      : `UI_PORT=${uiPort} bun run dev`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    // A cold CI boot compiles the whole app on first request; 2 min is not
    // enough there.
    timeout: (process.env.CI ? 300 : 120) * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
