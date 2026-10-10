import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { findUpSync } from 'find-up';

// Plain Node project, not `defineVitestProject`: the Nuxt test plugin copies the Nitro preset's
// `workerd`/`browser` export conditions onto Node, which makes `ws` (and so wrangler's
// getPlatformProxy) resolve to its browser build.
export default defineConfig({
  resolve: {
    alias: {
      '~~': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    name: 'integration',
    testTimeout: 60_000,
    hookTimeout: 60_000,
    globals: true,
    fileParallelism: false,
    setupFiles: ['./vitest.setup.ts', './vitest.integration.setup.ts'],
    include: ['**/*.integration.test.ts'],
    exclude: ['**/node_modules/**', '**/e2e/**'],
    environment: 'node',
    env: {
      ...dotenv.config({
        path: findUpSync('.env'),
        quiet: true,
      }).parsed,
    },
  },
});
