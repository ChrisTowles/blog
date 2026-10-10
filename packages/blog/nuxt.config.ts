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

  evlog: {
    enabled: true,
    env: {
      service: 'blog',
    },
    exclude: ['/api/_nuxt_icon/**'],
  },

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

  // Cloudflare Images transformations in production; originals as-is in dev. No IPX/sharp.
  image: {
    provider: process.env.NODE_ENV === 'production' ? 'cloudflare' : 'none',
  },

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

  compatibilityDate: {
    default: '2026-01-02',
    cloudflare: '2026-10-01',
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      nodeCompat: true,
      dev: { environment: 'dev' },
    },
    rollupConfig: {
      plugins: [
        {
          // A Durable Object class must be a named export of the Worker's main module, and
          // Nitro's cloudflare_module entry only exports the fetch handler.
          name: 'export-aviation-container',
          transform(code, id) {
            if (!id.endsWith('presets/cloudflare/runtime/cloudflare-module.mjs')) return null;

            const source = resolve(__dirname, 'server/utils/aviation-container.ts');

            return `${code}\nexport { AviationContainer } from ${JSON.stringify(source)};\n`;
          },
        },
      ],
    },
    // Workers have no filesystem: these ship inside the bundle and are read via
    // `useStorage('assets:<baseName>')` (see server/utils/server-assets.ts).
    serverAssets: [
      {
        baseName: 'skills',
        dir: resolve(__dirname, '../../.claude/skills'),
        pattern: '**/SKILL.md',
      },
      { baseName: 'mcp-ui', dir: resolve(__dirname, 'mcp-ui'), pattern: '*/dist/index.html' },
    ],
    ignore: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.js', '**/*.spec.js'],
    experimental: {
      openAPI: true,
      asyncContext: true,
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
