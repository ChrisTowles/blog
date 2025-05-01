// @vitest-environment node
import { describe, test, expect } from 'vitest'

describe('api.chats.id.post', () => {
  test('my test', () => {
    // ... test without Nuxt environment!
    expect(1).toBe(1)
  })

  test('hubAI', async () => {
    return await hubAI().run('@cf/meta/llama-3.1-8b-instruct', {
      prompt: 'Who is the author of Nuxt?'
    })
  })
})
