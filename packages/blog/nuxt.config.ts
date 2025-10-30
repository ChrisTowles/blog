// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/content', '@vueuse/nuxt', // '@nuxt/fonts',
    // '@nuxtjs/eslint-module', { /* module options */ }],
    // 'nuxt-og-image',
    // '@nuxtjs/robots',
    // '@nuxtjs/fontaine',
    // 'nuxt-simple-sitemap',
    // '@stefanobartoletti/nuxt-social-share',

    // '@nuxtjs/seo',
    'nuxt-gtag', // '@nuxtjs/sitemap',
    // '@nuxt/icon',
    'nuxt-og-image',
    '@nuxtjs/mdc', // 'nuxt-mcp', // not yet working
    // '@nuxthub/core', // for nuxt-hub
    'nuxt-auth-utils', '@nuxt/test-utils/module', '@nuxthub/core'],

  $development: {
    // https://github.com/nuxt-hub/core/blob/main/docs/content/docs/1.getting-started/4.remote-storage.md?plain=1
    hub: {
      remote: true
    }
  },
  ssr: true,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark' // default value of $colorMode.preference
  },

  mdc: {
    highlight: {
      // noApiRoute: true
      shikiEngine: 'javascript'
    },
    components: {
      prose: true
    }
  },
  ignore: [
    '**/*.{spec,test}.{js,cts,mts,ts,jsx,tsx}',
    '**/*.*.{spec,test}.{js,cts,mts,ts,jsx,tsx}'
  ],

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

  compatibilityDate: '2025-10-13',

  nitro: {
    experimental: {
      openAPI: true
    }
  },

  vite: {
    // include bebug fixed a issue, in mdx, does not provide an export named 'default' (at create-tokenizer.js
    optimizeDeps: {
      include: ['debug']
    },
    $server: {
      build: {
        rollupOptions: {
          output: {
            preserveModules: true
          }
        }
      }
    }
  },

  // nitro: {
  //   prerender: {

  // hub: {

  //   // bindings: {
  //   //   observability: {
  //   //     // enable with default settings
  //   //     logs: true,

  //   //     // customise settings
  //   //     logs: {
  //   //       head_sampling_rate: 0.5,
  //   //       invocation_logs: false
  //   //     }
  //   //   }
  //   // },
  //   ai: false,
  //   database: false
  // },

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
