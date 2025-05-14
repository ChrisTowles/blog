import { describe, test, expect } from 'vitest'
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

describe('anthropic-utils', async () => {
  test('generateText', async () => {
    const { text } = await generateText({
      model: anthropic('claude-3-haiku-20240307'),
      prompt: 'Write a vegetarian lasagna recipe for 4 people.'
    })

    expect(text).toMatch(/vegetarian lasagna recipe/i)
  })

  test('generateText', async () => {
    const { text } = await generateText({
      model: anthropic('claude-3-haiku-20240307'),

      messages: [
        {
          role: 'system',
          content: `you are a helpful assistant that always answers in ALL CAPS!`
        },
        {
          role: 'user',
          content:
            'Tell me a joke?'
        }
      ]
    })

    expect(text).toContain('JOKE')
  })
})
