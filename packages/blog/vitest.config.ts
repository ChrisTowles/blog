import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';
import { findUpSync } from 'find-up';

const NON_NODE_CONDITIONS = new Set([
  'workerd',
  'wintercg',
  'worker',
  'web',
  'browser',
  'edge-light',
  'netlify',
  'edge-routine',
  'deno',
]);

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        plugins: [
          {
            // The cloudflare_module preset puts workerd/browser-style export conditions on the
            // SSR environment. Tests run in Node, where those pick browser-only builds of
            // dependencies (e.g. @aws-sdk/core's `index.browser`) that fail to load.
            name: 'node-export-conditions',
            enforce: 'post',
            configEnvironment(name, config) {
              if (name !== 'ssr' || !config.resolve) return;

              const keep = (c: string) => !NON_NODE_CONDITIONS.has(c);
              config.resolve.conditions = config.resolve.conditions?.filter(keep);
              config.resolve.externalConditions = config.resolve.externalConditions?.filter(keep);
            },
          },
        ],
        test: {
          name: 'nuxt',
          testTimeout: 60_000,
          // Nuxt env boot in beforeAll exceeds vitest's 10s default hookTimeout on cold caches
          hookTimeout: 60_000,
          globals: true,
          // Setup file provides Nitro server auto-imports as globals
          setupFiles: ['./vitest.setup.ts'],
          include: ['**/*.{test,spec}.ts', '../layers/**/*.{test,spec}.ts'],
          exclude: [
            '**/node_modules/**',
            '../layers/**/node_modules/**',
            '**/e2e/**',
            '**/*.integration.test.ts',
          ],
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
