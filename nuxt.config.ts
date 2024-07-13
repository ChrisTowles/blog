// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/content',
    // '@nuxtjs/eslint-module', { /* module options */ }],
    // 'nuxt-icon',
    // 'nuxt-og-image',
    // '@nuxtjs/robots',
    // '@nuxtjs/fontaine',
    // 'nuxt-simple-sitemap',
    // '@stefanobartoletti/nuxt-social-share',
    '@nuxt/ui',
    '@nuxtjs/seo',
    'nuxt-gtag',
  ],

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: 'Chris\'s Towles Blog',
      titleTemplate: '%s - Software, Development and Technology Architecture',
      meta: [{ name: 'description', content: 'Chris Towles Blog' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  site: {
    url: 'https://chris.towles.me',

  },

  ui: {
    icons: ['heroicons', 'simple-icons'],
  },

  routeRules: {
    '/': { prerender: true },
  },

  typescript: {
    // typeCheck: true,
    strict: true,
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false, // https://nuxt.com/deploy/cloudflare
      crawlLinks: true,
      routes: [
        '/',
      ],
    },
    // experimental: {
    //   wasm: true,
    // },
  },
  // $production: {
  //   nitro: {
  //     // !Important: we only want to enable the wasm feature in production since it will break syntax highlighting when running the dev server
  //     // https://github.com/nuxt-modules/mdc/issues/159
  //     experimental: {
  //       wasm: true,
  //     },
  //   },
  // },

  vite: {
    build: {
      rollupOptions: {
        external: [
          'shiki/onig.wasm', // !Important: externalize the wasm import https://github.com/nuxt-modules/mdc/issues/159
        ],
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'always',
        braceStyle: '1tbs',
      },
    },
  },

  // set in .env with NUXT_PUBLIC_GTAG_ID
  gtag: {
    id: 'G-X0H34W6PGC', // set correct here, but over ridden locally G-XXXXXXXXX
    config: { anonymize_ip: false },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-07-12',
})
