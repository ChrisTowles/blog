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
  ],

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: 'Chris\'s Blog',
      titleTemplate: '%s - Chris Towles\'s Blog',
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
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'always',
        braceStyle: '1tbs',
      },
    },
  },

  devtools: { enabled: true },

})
