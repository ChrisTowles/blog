import { describe, test, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('ai-sdk-utils', { skip: true }, async () => {
  // const gateway: GatewayOptions | null = null
  await setup({
    host: 'http://localhost:3001', // use the running dev server, couldn't get with working with server started by test-utils, was always missing the remote hubAI binding
    setupTimeout: 2 * 60 * 1000
  })

  it('Check manifest (Ai is enabled)', async () => {
    const manifest = await $fetch('/api/_hub/manifest')

    expect(manifest).toMatchObject({
      storage: {
        database: true,
        kv: false,
        blob: false
      },
      features: {
        ai: true,
        analytics: false,
        cache: false,
        browser: false
      }
    })
  })

  test('generateChatTitle', async () => {
    // couldn't find way to call library function directly, so using the api route to test events
    const test = await $fetch('/api/tests/generate-chat-title')
    expect(test).toStrictEqual({
      title: 'Rudolph'
    })
  })
})
