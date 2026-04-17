import { defineConfig } from '@playwright/test';

const HOST_PORT = process.env.HOST_PORT || '8080';
const SANDBOX_PORT = process.env.SANDBOX_PORT || '8081';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list']],
  webServer: {
    command: `HOST_PORT=${HOST_PORT} SANDBOX_PORT=${SANDBOX_PORT} pnpm dlx tsx e2e/server.mjs`,
    url: `http://127.0.0.1:${HOST_PORT}/host.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { channel: 'chromium' },
    },
  ],
});
