// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@vueuse/nuxt',
    // '@nuxt/fonts',
    // '@nuxtjs/eslint-module', { /* module options */ }],
    // 'nuxt-og-image',
    // '@nuxtjs/robots',
    // '@nuxtjs/fontaine',
    // 'nuxt-simple-sitemap',
    // '@stefanobartoletti/nuxt-social-share',

    // '@nuxtjs/seo',
    'nuxt-gtag',
    // '@nuxtjs/sitemap',
    // '@nuxt/icon',
    'nuxt-og-image',
    '@nuxthub/core'
  ],
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  future: {
    compatibilityVersion: 4
  },
  // app: {
  //     head: {
  //         charset: 'utf-16',
  //         viewport: 'width=device-width,initial-scale=1',
  //         title: 'Chris\'s Towles Blog',
  //         titleTemplate: '%s - Software, Development and Technology Architecture',
  //         meta: [{ name: 'description', content: 'Chris Towles Blog' }],
  //     },
  //     pageTransition: { name: 'page', mode: 'out-in' },
  //     layoutTransition: { name: 'layout', mode: 'out-in' },
  // },

  // site: {
  //     url: 'https://chris.towles.dev',

  // },

  compatibilityDate: '2025-04-01',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  typescript: {
    //    typeCheck: true,
    //     strict: true,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // nitro: {
  //   prerender: {
  //     autoSubfolderIndex: false, // https://nuxt.com/deploy/cloudflare
  //     crawlLinks: true,
  //     routes: [
  //       '/',
  //     ],
  //   },
  // },

  // set in .env with NUXT_PUBLIC_GTAG_ID
  // gtag: {
  //     id: 'G-X0H34W6PGC', // set correct here, but over ridden locally G-XXXXXXXXX
  //     config: { anonymize_ip: false },
  // },

  // ui: {
  //     icons: ['heroicons', 'simple-icons'],
  // },
  icon: {
    serverBundle: {
      collections: ['simple-icons', 'heroicons'] // <!--- this
    }
  }
})
