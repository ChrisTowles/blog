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

// CI has no .env, and an unset UI_PORT makes the baseURL "http://localhost:undefined".
const uiPort = process.env.UI_PORT || '3000';

// Always `localhost`, never `127.0.0.1`, and that is load-bearing: h3's useSession
// hard-codes the Secure flag, and Playwright's request context only sends a Secure
// cookie over plain http when the host is literally "localhost". Dialing the IP drops
// it silently, so every authenticated request gets a fresh anonymous session and the
// specs fail with 401s that look like a broken sign-in endpoint.
const uiHost = 'localhost';
const baseURL = `http://${uiHost}:${uiPort}`;

// Unlocks POST /api/_dev/session. The fallback matches what .env.example ships, so a
// reused dev server and the one webServer starts agree; both processes need it.
const devSessionSecret = (process.env.NUXT_DEV_SESSION_SECRET ||= 'local-e2e-dev-session-secret');

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // One local retry absorbs dev-server contention; persistent failures still fail.
  retries: process.env.CI ? 2 : 1,
  // Unbounded local workers oversubscribe the on-demand-compiling dev server. When runs
  // fail anyway, suspect leftover workflow rows — specs don't clean up, and only CI gets
  // a fresh Postgres per run.
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',
  // A route's first hit compiles it, which runs well past Playwright's 5s default.
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
    // CI serves the *built* app (the workflow runs `pnpm build` first). A dev server
    // compiles on demand, and that compile lands inside whichever assertion touches the
    // route first — a tail of timeouts only fixable one uncovered route at a time.
    command: process.env.CI ? 'node .output/server/index.mjs' : `UI_PORT=${uiPort} bun run dev`,
    // HOST is deliberately left unset so Nitro binds every interface; pinning it
    // to one loopback address is what made the stack mismatch possible before.
    env: {
      NUXT_DEV_SESSION_SECRET: devSessionSecret,
      ...(process.env.CI ? { PORT: uiPort, NITRO_PORT: uiPort } : {}),
    },
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
