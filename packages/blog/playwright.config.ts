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

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // One local retry absorbs dev-server contention timeouts; persistent
  // failures still fail the run.
  retries: process.env.CI ? 2 : 1,
  // Unbounded local workers oversubscribe the on-demand-compiling dev server
  // and produce rotating timeout failures; 4 keeps runs reliable.
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:` + process.env.UI_PORT,
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
    command: `UI_PORT=${process.env.UI_PORT} bun run dev`,
    url: `http://localhost:` + process.env.UI_PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
