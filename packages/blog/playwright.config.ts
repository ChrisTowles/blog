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

// Always `localhost`, never `127.0.0.1`, and that is load-bearing: the session
// cookie is flagged Secure (h3's useSession hard-codes it), and Playwright's
// request context only sends a Secure cookie over plain http when the host is
// literally "localhost". Dialing the IP instead silently dropped the cookie, so
// every authenticated request got a fresh anonymous session and the workflow
// specs failed with 401s that looked like a broken sign-in endpoint.
//
// CI used to pin 127.0.0.1 because Nuxt's *dev* server binds the IPv6 loopback
// and a runner resolves localhost to IPv4 first, so the two never met. The
// built server below binds every interface, which covers both stacks and makes
// the pin unnecessary.
const uiHost = 'localhost';
const baseURL = `http://${uiHost}:${uiPort}`;

// Unlocks POST /api/_dev/session (see e2e/support/session.ts). CI sets this in
// the job env; locally it comes from .env. The fallback is the same value
// .env.example ships, so a dev server started from .env and a server started by
// webServer below agree on it — otherwise sign-in would 404 against a reused
// dev server. Both the server and the test process need it, hence the assign.
const devSessionSecret = (process.env.NUXT_DEV_SESSION_SECRET ||= 'local-e2e-dev-session-secret');

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
    // CI serves the *built* app instead of running `nuxt dev`. The dev server
    // compiles routes on demand, and in CI that compile lands inside whatever
    // assertion first touches the route — which produced a long tail of
    // timeouts (the editor canvas at /workflows/{id} was the last one) that
    // could only be fixed by warming each route or raising each timeout, one
    // uncovered route at a time. A built server has nothing left to compile,
    // so the whole class of failure goes away, and it exercises the same
    // output that actually ships. The workflow runs `pnpm build` first.
    command: process.env.CI ? 'node .output/server/index.mjs' : `UI_PORT=${uiPort} bun run dev`,
    // HOST is deliberately left unset so Nitro binds every interface; pinning it
    // to one loopback address is what made the stack mismatch possible before.
    env: {
      NUXT_DEV_SESSION_SECRET: devSessionSecret,
      ...(process.env.CI ? { PORT: uiPort, NITRO_PORT: uiPort } : {}),
    },
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    // The built server boots in seconds; only a dev server needed minutes.
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
