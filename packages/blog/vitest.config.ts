// import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'
import { config } from 'dotenv'

export default defineVitestConfig({
  test: {
    testTimeout: 60_000, // 60 seconds
    exclude: ['**/node_modules/**', '**/e2e/**'],
    // https://vitest.dev/config/
    environment: 'nuxt', // nuxt testing - https://nuxt.com/docs/getting-started/testing
    // you can optionally set Nuxt-specific environment options
    environmentOptions: {
      nuxt: {
        // rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
        domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
        overrides: {
          // https://nuxt.com/docs/api/configuration/nuxt-config#overrides
          hub: {
            remote: 'production', // set to true for remote storage
            ai: true,
            database: true
          }
          // other Nuxt config you want to pass
        }
      }
    },
    env: {
      // Add any environment variables you want to set for the tests

      ...config({ path: '.env' }).parsed
    }
  }
})
