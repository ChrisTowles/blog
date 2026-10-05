// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
// oxlint-disable-next-line no-shadow -- shadows global Promise.resolve, only used as path helper
import { dirname, resolve } from 'path';
import { MODEL_HAIKU, MODEL_SONNET } from './shared/models';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({
  path: resolve(__dirname, '../../.env'),
  quiet: true,
});

const evlogOptions = {
  enabled: true,
  env: { service: 'blog' },
  exclude: ['/api/_nuxt_icon/**'],
};
// evlog/nuxt's Nitro plugin can't resolve `nitropack/runtime/internal/config`
// from the dev bundle, so it silently drops `exclude`. __EVLOG_CONFIG is the
// plugin's first resolution path and works in both dev and prod.
process.env.__EVLOG_CONFIG = JSON.stringify(evlogOptions);

export default defineNuxtConfig({
  extends: ['../layers/workflows', '../layers/typing'],

  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-og-image',
    '@nuxtjs/mdc',
    'nuxt-auth-utils',
    'evlog/nuxt',
  ],

  evlog: evlogOptions,

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
    initCommands: [
      [
        'consent',
        'default',
        {
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          ad_storage: 'denied',
          analytics_storage: 'granted',
        },
      ],
    ],
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  devServer: {
    port: parseInt(process.env.UI_PORT!),
  },
  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
  },

  mdc: {
    highlight: {
      // noApiRoute: true
      shikiEngine: 'javascript',
    },
    components: {
      prose: true,
    },
  },

  runtimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY!,
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://chris.towles.dev',
      model_fast: MODEL_HAIKU,
      model: MODEL_SONNET,
      // Sandbox proxy URL for MCP Apps iframes. Defaults to the production
      // subdomain. Playwright e2e + local dev override via
      // NUXT_PUBLIC_MCP_SANDBOX_URL to point at a hermetic test server.
      mcpSandboxUrl:
        process.env.NUXT_PUBLIC_MCP_SANDBOX_URL || 'http://sandbox.localhost:8081/sandbox.html',
    },
  },
  ignore: [
    '**/*.{spec,test}.{js,cts,mts,ts,jsx,tsx}',
    '**/*.*.{spec,test}.{js,cts,mts,ts,jsx,tsx}',
  ],

  routeRules: {
    '/': { prerender: true },
    // Auth routes must NOT be pre-rendered — they are server-side OAuth handlers
    '/auth/**': { prerender: false },
    // Admin is behind the `auth` middleware and every panel loads its data from
    // authenticated endpoints, so a prerendered copy is a build-time cost that
    // ships an empty shell. The crawler reached these from links on `/`.
    '/admin/**': { prerender: false },
    // Chat pages don't need SSR (no SEO benefit, authenticated feature)
    // Note: There's a pre-existing Vite 8 beta + debug ESM issue affecting chat pages
    '/chat': { ssr: false },
    '/chat/**': { ssr: false },
    // Loan pages don't need SSR (authenticated feature)
    '/loan': { ssr: false },
    '/loan/**': { ssr: false },
    // Poker is interactive-only; PixiJS is bundled statically, so skip SSR
    // to keep the route's initial chunk slim and avoid running PIXI on the server.
    '/poker': { ssr: false },
    '/poker/**': { ssr: false },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2026-01-02',

  nitro: {
    preset: 'node-server',
    ignore: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.js', '**/*.spec.js'],
    experimental: {
      openAPI: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },

    prerender: {
      // Pre-render the homepage
      routes: ['/'],
      // Then crawl all the links on the page
      crawlLinks: true,
    },

    imports: {},
    hooks: {
      async compiled(nitro) {
        const { rollup } = await import('rollup');
        const { default: typescript } = await import('@rollup/plugin-typescript');
        const { default: rollupResolve } = await import('@rollup/plugin-node-resolve');
        const { cp, mkdir } = await import('node:fs/promises');
        const { join } = await import('node:path');

        const rootDir = nitro.options.rootDir;
        const outputDir = nitro.options.output.dir;

        // Ensure database output dir exists
        await mkdir(join(outputDir, 'database'), { recursive: true });

        // Bundle migrate script with rollup.
        //
        // The resolution options are overridden rather than inherited: the
        // tsconfig resolves to `moduleResolution: node10`, which TypeScript
        // deprecated, so every build printed a TS5107 warning. Dropping the
        // tsconfig entirely is not the fix — without its `paths` and generated
        // Nuxt types the same pass emits ~550 TS2304/TS2307 errors. Keep the
        // tsconfig, override just the resolution; output is byte-identical.
        const bundle = await rollup({
          input: join(rootDir, 'scripts/migrate.ts'),
          plugins: [
            rollupResolve(),
            typescript({
              tsconfig: join(rootDir, 'tsconfig.json'),
              module: 'esnext',
              moduleResolution: 'bundler',
              target: 'es2022',
              skipLibCheck: true,
              // Types are checked by `nuxt typecheck`; this pass only emits.
              declaration: false,
              sourceMap: false,
            }),
          ],
          external: ['pg', /^node:/],
        });
        await bundle.write({
          file: join(outputDir, 'database/migrate.mjs'),
          format: 'esm',
        });
        await bundle.close();
        console.log('✓ Built migrate script');

        // Copy migrations
        await cp(
          join(rootDir, 'server/database/migrations'),
          join(outputDir, 'database/migrations'),
          { recursive: true },
        );
        console.log('✓ Copied migrations');
      },
    },
  },

  typescript: {
    // Note: Test files are checked by vitest, not nuxt typecheck
    // The nuxt typecheck will show false positives for test files
  },

  ogImage: {
    // OG images render through Satori (`defineOgImage('SaaS', ...)`), never by
    // screenshotting a real browser. Left on, the browser binding statically
    // imports `playwright` into the server bundle, which pulled playwright and
    // playwright-core — a test dependency — into the production image.
    compatibility: {
      runtime: { browser: false },
      prerender: { browser: false },
    },
  },

  icon: {
    serverBundle: {
      collections: ['simple-icons', 'heroicons'], // <!--- this
    },
  },
});
