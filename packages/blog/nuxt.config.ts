// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-og-image',
    '@nuxtjs/mdc',
    'nuxt-auth-utils',
    'nuxt-studio',
    '@nuxt/test-utils/module'
  ],
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

  runtimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY!,
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    public: {
      model_fast: 'claude-haiku-4-5',
      model: 'claude-sonnet-4-5'
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
    viewTransition: true,
    rolldown: true
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
    preset: 'node-server',
    experimental: {
      openAPI: true
    },
    esbuild: {
      options: {
        target: 'esnext'
      }
    },

    prerender: {
      // Pre-render the homepage
      routes: ['/'],
      // Then crawl all the links on the page
      crawlLinks: true
    },

    imports: {
      // Nitro only auto-imports top-level server/utils/ by default.
      // This enables auto-import from nested dirs (ai/, rag/, etc.)
      dirs: ['./server/utils/**']
    },
    hooks: {
      async compiled(nitro) {
        const { rollup } = await import('rollup')
        const { default: typescript } = await import('@rollup/plugin-typescript')
        const { default: resolve } = await import('@rollup/plugin-node-resolve')
        const { cp, mkdir } = await import('node:fs/promises')
        const { join } = await import('node:path')

        const rootDir = nitro.options.rootDir
        const outputDir = nitro.options.output.dir

        // Ensure database output dir exists
        await mkdir(join(outputDir, 'database'), { recursive: true })

        // Bundle migrate script with rollup
        const bundle = await rollup({
          input: join(rootDir, 'scripts/migrate.ts'),
          plugins: [resolve(), typescript({ tsconfig: join(rootDir, 'tsconfig.json') })],
          external: ['pg', /^node:/]
        })
        await bundle.write({
          file: join(outputDir, 'database/migrate.mjs'),
          format: 'esm'
        })
        await bundle.close()
        console.log('✓ Built migrate script')

        // Copy migrations
        await cp(
          join(rootDir, 'server/database/migrations'),
          join(outputDir, 'database/migrations'),
          { recursive: true }
        )
        console.log('✓ Copied migrations')
      }
    }
  },

  vite: {
    // include debug fixed a issue, in mdx, does not provide an export named 'default' (at create-tokenizer.js
    optimizeDeps: {
      include: ['debug']
    }
    // Note: vite:vue-jsx shows esbuild deprecation warning until @nuxt/vite-builder updates
    // Vite 8 auto-converts esbuild→oxc via compatibility layer, so it still works
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
  },

  studio: {
    route: '/_studio', // default: '/_studio'
    repository: {
      provider: 'github',
      owner: 'christowles',
      repo: 'blog',
      branch: 'main'
    }
  }
})
