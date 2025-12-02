import { describe, it, expect } from 'vitest'
import type Anthropic from '@anthropic-ai/sdk'
import { processStreamChunk, formatSSEEvent } from './chat'

describe('chat streaming', () => {
  describe('stream event processing', () => {
    it('should process a complete streaming sequence', () => {
      const chunks: Anthropic.MessageStreamEvent[] = [
        {
          type: 'message_start',
          message: {
            id: 'msg-1',
            type: 'message',
            role: 'assistant',
            content: [],
            model: 'claude-sonnet-4-5',
            stop_reason: null,
            stop_sequence: null,
            usage: {
              input_tokens: 10,
              output_tokens: 0
            }
          }
        },
        {
          type: 'content_block_start',
          index: 0,
          content_block: {
            type: 'text',
            text: ''
          }
        },
        {
          type: 'content_block_delta',
          index: 0,
          delta: {
            type: 'text_delta',
            text: 'Hello'
          }
        },
        {
          type: 'content_block_delta',
          index: 0,
          delta: {
            type: 'text_delta',
            text: ' world'
          }
        },
        {
          type: 'content_block_stop',
          index: 0
        },
        {
          type: 'message_delta',
          delta: {
            stop_reason: 'end_turn',
            stop_sequence: null
          },
          usage: {
            output_tokens: 10
          }
        },
        {
          type: 'message_stop'
        }
      ]

      const events = chunks
        .map(chunk => processStreamChunk(chunk))
        .filter(Boolean)

      expect(events).toEqual([
        'data: {"type":"text","text":"Hello"}\n\n',
        'data: {"type":"text","text":" world"}\n\n'
      ])
    })

    it('should handle empty text deltas', () => {
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'content_block_delta',
        index: 0,
        delta: {
          type: 'text_delta',
          text: ''
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toBe('data: {"type":"text","text":""}\n\n')
    })

    it('should handle special characters in text', () => {
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'content_block_delta',
        index: 0,
        delta: {
          type: 'text_delta',
          text: 'Line 1\nLine 2\t"quoted"'
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toContain('Line 1\\nLine 2\\t\\"quoted\\"')
    })

    it('should ignore message_start events', () => {
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
            output_tokens: 0
          }
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toBeNull()
    })

    it('should ignore content_block_stop events', () => {
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'content_block_stop',
        index: 0
      }

      const result = processStreamChunk(chunk)
      expect(result).toBeNull()
    })

    it('should ignore message_delta events', () => {
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'message_delta',
        delta: {
          stop_reason: 'end_turn',
          stop_sequence: null
        },
        usage: {
          output_tokens: 10
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toBeNull()
    })

    it('should ignore message_stop events', () => {
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'message_stop'
      }

      const result = processStreamChunk(chunk)
      expect(result).toBeNull()
    })
  })

  describe('SSE event formatting', () => {
    it('should escape JSON special characters', () => {
      const result = formatSSEEvent({
        type: 'text',
        text: 'Test "quotes" and \\ backslashes'
      })

      expect(result).toContain('\\"quotes\\"')
      expect(result).toContain('\\\\')
    })

    it('should handle newlines in text', () => {
      const result = formatSSEEvent({
        type: 'text',
        text: 'Line 1\nLine 2'
      })

      expect(result).toContain('\\n')
    })

    it('should handle unicode characters', () => {
      const result = formatSSEEvent({
        type: 'text',
        text: 'Hello 👋 世界'
      })

      expect(result).toContain('Hello 👋 世界')
    })

    it('should handle long messages', () => {
      const longText = 'x'.repeat(10000)
      const result = formatSSEEvent({
        type: 'text',
        text: longText
      })

      expect(result).toContain(longText)
      expect(result.startsWith('data: ')).toBe(true)
      expect(result.endsWith('\n\n')).toBe(true)
    })

    it('should handle empty text', () => {
      const result = formatSSEEvent({
        type: 'text',
        text: ''
      })

      expect(result).toBe('data: {"type":"text","text":""}\n\n')
    })
  })

  describe('edge cases', () => {
    it('should handle rapid successive text deltas', () => {
      const deltas = ['H', 'e', 'l', 'l', 'o']
      const chunks: Anthropic.MessageStreamEvent[] = deltas.map(text => ({
        type: 'content_block_delta',
        index: 0,
        delta: {
          type: 'text_delta',
          text
        }
      }))

      const events = chunks
        .map(chunk => processStreamChunk(chunk))
        .filter(Boolean)

      expect(events).toHaveLength(5)
      expect(events[0]).toContain('"text":"H"')
      expect(events[4]).toContain('"text":"o"')
    })

    it('should handle code blocks in streaming', () => {
      const codeBlock = '```javascript\nfunction test() {\n  return 42;\n}\n```'
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'content_block_delta',
        index: 0,
        delta: {
          type: 'text_delta',
          text: codeBlock
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toContain('```javascript')
      expect(result).toContain('function test()')
    })

    it('should handle markdown in streaming', () => {
      const markdown = '# Heading\n\n**bold** and *italic*'
      const chunk: Anthropic.MessageStreamEvent = {
        type: 'content_block_delta',
        index: 0,
        delta: {
          type: 'text_delta',
          text: markdown
        }
      }

      const result = processStreamChunk(chunk)
      expect(result).toContain('# Heading')
      expect(result).toContain('**bold**')
      expect(result).toContain('*italic*')
    })
  })
})
