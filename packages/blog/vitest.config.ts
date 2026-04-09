import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';
import { findUpSync } from 'find-up';

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        plugins: [
          {
            // Nuxt adds 'import' to SSR resolve conditions, which causes
            // Node 24's require() to load ESM pg-pool instead of CJS,
            // breaking pg's class extends. See vitest-dev/vitest#10012
            name: 'fix-pg-pool-esm',
            enforce: 'post',
            configEnvironment(name, config) {
              if (name === 'ssr') {
                config.resolve!.conditions = config.resolve!.conditions!.filter(
                  (c: string) => c !== 'import',
                );
              }
            },
          },
        ],
        test: {
          name: 'nuxt',
          testTimeout: 60_000,
          globals: true,
          // Setup file provides Nitro server auto-imports as globals
          setupFiles: ['./vitest.setup.ts'],
          include: ['**/*.{test,spec}.ts'],
          exclude: ['**/node_modules/**', '**/e2e/**', '**/*.integration.test.ts'],
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
