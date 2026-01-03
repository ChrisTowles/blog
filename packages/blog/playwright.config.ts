import dotenv from 'dotenv'
import { defineConfig, devices } from '@playwright/test'
import { findUpSync } from 'find-up'

dotenv.config({ 
  path: findUpSync('.env')!, 
  override: true
})

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:` + process.env.UI_PORT,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  webServer: {
    command: `UI_PORT=${process.env.UI_PORT} bun run dev`,
    url: `http://localhost:` + process.env.UI_PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
})
