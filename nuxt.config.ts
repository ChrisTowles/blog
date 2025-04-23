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
    '@nuxtjs/mdc',
    '@nuxthub/core',
    'nuxt-auth-utils'
    // '@nuxt/test-utils/module'
  ],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  css: ['~/assets/css/main.css'],

  // set in .env with NUXT_PUBLIC_GTAG_ID
  // gtag: {
  //     id: 'G-X0H34W6PGC', // set correct here, but over ridden locally G-XXXXXXXXX
  //     config: { anonymize_ip: false },
  // },

  colorMode: {
    preference: 'dark' // default value of $colorMode.preference
  },

  mdc: {
    highlight: {
      // noApiRoute: true
      shikiEngine: 'javascript'
    },
    components: {
      prose: false
      // map: {
      //   p: 'MyCustomPComponent'
      // }
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  future: {
    compatibilityVersion: 4
  },

  experimental: {
    viewTransition: true
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

  compatibilityDate: '2025-04-18',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    },
    experimental: {
      openAPI: true
    }
  },

  // nitro: {
  //   prerender: {

  hub: {
    ai: true,
    database: true
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
  icon: {
    serverBundle: {
      collections: ['simple-icons', 'heroicons'] // <!--- this
    }
  }

})
