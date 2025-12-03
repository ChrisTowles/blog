// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useAnthropicChat } from './useAnthropicChat'
import type { Message } from './useAnthropicChat'

describe('useAnthropicChat', () => {
  it('should initialize with provided messages and idle status', () => {
    const initialMessages: Message[] = [
      { id: '1', role: 'user', content: 'Hello' }
    ]

    const { messages, status, error } = useAnthropicChat({
      id: 'test-chat',
      initialMessages,
      model: ref('claude-haiku-4-5')
    })

    expect(messages.value).toEqual(initialMessages)
    expect(status.value).toBe('idle')
    expect(error.value).toBeNull()
  })

  it('should send message and receive response', async () => {
    const { messages, status, sendMessage } = useAnthropicChat({
      id: 'test-chat',
      initialMessages: [],
      model: ref('claude-haiku-4-5')
    })

    await sendMessage({ text: '2 + 2' })

    expect(messages.value.length).toBeGreaterThanOrEqual(2)
    expect(messages.value[0].role).toBe('user')
    expect(messages.value[0].content).toBe('2 + 2')
    expect(messages.value[1]).toBe('assistant')

    expect(messages.value[1]).toBe('assistant')
    console.log('Assistant response content:', messages.value[1]?.content)

    expect(messages.value[1]?.content.toString()).includes('4')
    expect(status.value).toBe('idle')

    // wait for
  }, 30000)
})
