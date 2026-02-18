import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';
import { findUpSync } from 'find-up';

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        test: {
          name: 'integration',
          testTimeout: 60_000,
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          include: ['**/*.integration.test.ts'],
          exclude: ['**/node_modules/**', '**/e2e/**'],
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              domEnvironment: 'happy-dom',
              overrides: {},
            },
          },
          env: {
            ...dotenv.config({
              path: findUpSync('.env'),
              quiet: true,
            }).parsed,
          },
        },
      }),
    ],
  },
});
