// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ 
  path: resolve(__dirname, '../../.env'), 
  quiet: true
})

export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-og-image',
    '@nuxtjs/mdc',
    'nuxt-auth-utils',
    // 'nuxt-studio', Disabled till i fix some issues, not having correct path to open pr to the file edited, not setting github secret once deployed.
    '@nuxt/test-utils/module'
  ],

  ssr: true,
  
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  devServer: {
    port: parseInt(process.env.UI_PORT! ),
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
    '/': { prerender: true },
    // Chat pages don't need SSR (no SEO benefit, authenticated feature)
    // Note: There's a pre-existing Vite 8 beta + debug ESM issue affecting chat pages
    '/chat': { ssr: false },
    '/chat/**': { ssr: false }
  },

  future: {
    compatibilityVersion: 4
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: '2026-01-02',

  nitro: {
    preset: 'node-server',
    ignore: [
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.test.js',
      '**/*.spec.js'
    ],
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
          external: ['pg', 'dotenv', 'find-up', /^node:/]
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

  },

  // nitro: {
  //   prerender: {

  typescript: {
    // Note: Test files are checked by vitest, not nuxt typecheck
    // The nuxt typecheck will show false positives for test files
  },

  icon: {
    serverBundle: {
      collections: ['simple-icons', 'heroicons'] // <!--- this
    }
  }

  // studio: {
  //   route: '/_studio', // default: '/_studio'
  //   repository: {
  //     provider: 'github',
  //     owner: 'christowles',
  //     repo: 'blog',
  //     branch: 'main'
  //   }
  // }
})
