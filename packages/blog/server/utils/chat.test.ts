import { describe, it, expect } from 'vitest'
import Anthropic from '@anthropic-ai/sdk'
import {
  type Message,
  convertToAnthropicMessages,
  generateChatTitle,
  formatSSEEvent,
  processStreamChunk,
  extractTextFromContent
} from './chat'

describe('chat utilities', () => {
  it('should access mocked runtime config', () => {
    const config = useRuntimeConfig()

    expect(config.anthropicApiKey.length).toBeGreaterThanOrEqual(20)
    expect(config.public.model_fast).toContain('claude-haiku')
    expect(config.public.model).toBe('claude-sonnet')
  })

  describe('convertToAnthropicMessages', () => {
    it('should convert messages by stripping id field', () => {
      const messages: Message[] = [
        {
          id: '1',
          role: 'user',
          content: 'Hello'
        },
        {
          id: '2',
          role: 'assistant',
          content: 'Hi there!'
        }
      ]

      const result = convertToAnthropicMessages(messages)

      expect(result).toEqual([
        {
          role: 'user',
          content: 'Hello'
        },
        {
          role: 'assistant',
          content: 'Hi there!'
        }
      ])
      expect(result[0]).not.toHaveProperty('id')
      expect(result[1]).not.toHaveProperty('id')
    })

    it('should preserve content blocks structure', () => {
      const messages: Message[] = [
        {
          id: '1',
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Hello'
            },
            {
              type: 'tool_use',
              id: 'tool-1',
              name: 'test-tool',
              input: {}
            }
          ]
        }
      ]

      const result = convertToAnthropicMessages(messages)

      expect(result).toEqual([
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Hello'
            },
            {
              type: 'tool_use',
              id: 'tool-1',
              name: 'test-tool',
              input: {}
            }
          ]
        }
      ])
    })

    it('should handle empty messages', () => {
      const messages: Message[] = []
      const result = convertToAnthropicMessages(messages)
      expect(result).toEqual([])
    })

    it('should handle messages with empty content array', () => {
      const messages: Message[] = [
        {
          id: '1',
          role: 'user',
          content: []
        }
      ]

      const result = convertToAnthropicMessages(messages)

      expect(result).toEqual([
        {
          role: 'user',
          content: []
        }
      ])
      expect(result[0]).not.toHaveProperty('id')
    })
  })

  describe('extractTextFromContent', () => {
    it('should extract text from text blocks', () => {
      const content: Anthropic.ContentBlock[] = [
        {
          type: 'text',
          text: 'Hello world',
          citations: null
        }
      ]

      const result = extractTextFromContent(content)
      expect(result).toBe('Hello world')
    })

    it('should concatenate multiple text blocks', () => {
      const content: Anthropic.ContentBlock[] = [
        {
          type: 'text',
          text: 'Hello ',
          citations: null
        },
        {
          type: 'text',
          text: 'world',
          citations: null
        }
      ]

      const result = extractTextFromContent(content)
      expect(result).toBe('Hello world')
    })

    it('should filter out non-text blocks', () => {
      const content: Anthropic.ContentBlock[] = [
        {
          type: 'text',
          text: 'Hello',
          citations: null
        },
        {
          type: 'tool_use',
          id: 'tool-1',
          name: 'test-tool',
          input: {}
        }
      ]

      const result = extractTextFromContent(content)
      expect(result).toBe('Hello')
    })

    it('should return empty string for empty content', () => {
      const content: Anthropic.ContentBlock[] = []
      const result = extractTextFromContent(content)
      expect(result).toBe('')
    })
  })

  describe('formatSSEEvent', () => {
    it('should format text event', () => {
      const result = formatSSEEvent({ type: 'text', text: 'Hello' })
      expect(result).toBe('data: {"type":"text","text":"Hello"}\n\n')
    })

    it('should format done event', () => {
      const result = formatSSEEvent({ type: 'done' })
      expect(result).toBe('data: {"type":"done"}\n\n')
    })

    it('should format error event', () => {
      const result = formatSSEEvent({ type: 'error', message: 'Something went wrong' })
      expect(result).toBe('data: {"type":"error","message":"Something went wrong"}\n\n')
    })
  })

  describe('processStreamChunk', () => {
    it('should process text delta chunks', () => {
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'content_block_delta',
        index: 0,
        delta: {
          type: 'text_delta',
          text: 'Hello'
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toBe('data: {"type":"text","text":"Hello"}\n\n')
    })

    it('should return null for non-text-delta chunks', () => {
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'message_start',
        message: {
          id: 'msg-1',
          type: 'message',
          role: 'assistant',
          content: [],
          model: 'claude-3',
          stop_reason: null,
          stop_sequence: null,
          usage: {
            input_tokens: 10,
            output_tokens: 0,
            cache_creation_input_tokens: null,
            cache_read_input_tokens: null
          }
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toBeNull()
    })

    it('should return null for content_block_start', () => {
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'content_block_start',
        index: 0,
        content_block: {
          type: 'text',
          text: '',
          citations: null
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toBeNull()
    })
  })

  describe('generateChatTitle', () => {
    // Skip if no API key available
    const apiKey = process.env.ANTHROPIC_API_KEY
    const testCondition = apiKey ? it : it.skip

    testCondition('should generate title from first message', async () => {
      const client = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true
      })

      const result = await generateChatTitle(
        client,
        'What is the meaning of life?',
        'claude-haiku-4-5'
      )

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      expect(result.length).toBeLessThanOrEqual(30) // Per system prompt requirement
    }, 10000)

    testCondition('should trim whitespace from title', async () => {
      const client = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true
      })

      const result = await generateChatTitle(
        client,
        'Test message',
        'claude-haiku-4-5'
      )

      expect(result).toBe(result.trim()) // Should not have leading/trailing whitespace
    }, 10000)

    testCondition('should generate different titles for different messages', async () => {
      const client = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true
      })

      const result1 = await generateChatTitle(
        client,
        'How do I learn Python?',
        'claude-haiku-4-5'
      )

      const result2 = await generateChatTitle(
        client,
        'What is quantum computing?',
        'claude-haiku-4-5'
      )

      expect(result1).toBeTruthy()
      expect(result2).toBeTruthy()
      expect(result1).not.toBe(result2)
    }, 15000)

    testCondition('should handle long messages', async () => {
      const client = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true
      })

      const longMessage = 'I have a very long question about machine learning and artificial intelligence and how they relate to neural networks and deep learning algorithms that are used in modern applications. Can you help me understand this topic better?'

      const result = await generateChatTitle(
        client,
        longMessage,
        'claude-haiku-4-5'
      )

      expect(result).toBeTruthy()
      expect(result.length).toBeLessThanOrEqual(50) // Should be reasonably short
      expect(result.length).toBeGreaterThan(0)
    }, 10000)
  })
})
