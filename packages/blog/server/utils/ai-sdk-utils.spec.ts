// @vitest-environment nuxt

import { describe, test, expect } from 'vitest'
import { generateChatTitle, setupAIWorkers } from './ai-sdk-utils'

describe('ai-sdk-utils', () => {
  const { gateway } = setupAIWorkers()

  // beforeAll( () => {

  //   // Mock the environment variables
  //   process.env.AI_WORKERS = 'true'

  //     // Enable AI Gateway if defined in environment variables
  //   process.env.AI_GATEWAY = 'http://localhost:3000'
  // })

  test('generateChatTitle', async () => {
    const result = await generateChatTitle({
      content: 'Hello, how are you?',
      gateway: gateway
    })

    expect(result).toBeDefined()
  })
})
