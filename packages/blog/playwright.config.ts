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

// Nuxt's dev server binds the IPv6 loopback ([::1]) when given the default
// host. On a GitHub runner `localhost` resolves to 127.0.0.1 first, so
// Playwright polled IPv4, Nuxt listened on IPv6, and the two never met —
// `Timed out waiting 300000ms from config.webServer` after five minutes with
// no request ever reaching the (perfectly healthy) server.
//
// Pin both sides to IPv4 in CI: `--host 127.0.0.1` below binds it, and this
// host is what Playwright dials. Locally, `localhost` is left alone so a
// dev server started by hand is still reused.
const uiHost = process.env.CI ? '127.0.0.1' : 'localhost';
const baseURL = `http://${uiHost}:${uiPort}`;

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
  //
  // If local runs start failing anyway, suspect accumulated data before
  // parallelism: several specs create workflow rows and don't clean up, so
  // repeated local runs degrade against a long-lived database. CI is immune —
  // it gets a fresh Postgres service container per run.
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
      ? `pnpm --filter @chris-towles/blog exec nuxt dev --host ${uiHost}`
      : `UI_PORT=${uiPort} bun run dev`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    // Nuxt compiles routes on demand, and CI starts with no build cache on a
    // slower machine — the readiness probe's first request to `/` is still
    // compiling long after the server reports "Local: http://...". Nuxt only
    // logs a request once it completes, so this shows up as a webServer
    // timeout with zero request lines, which reads like a connection failure
    // rather than a slow one. 5 min was not enough; give it 15.
    timeout: (process.env.CI ? 900 : 120) * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
