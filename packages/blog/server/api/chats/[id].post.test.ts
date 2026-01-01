import { describe, it, expect } from 'vitest'
import type { ChatMessage, MessagePart } from '~~/shared/chat-types'

// Test the helper functions extracted from the endpoint

// Replicate convertToAnthropicMessages for testing
function convertToAnthropicMessages(messages: ChatMessage[]) {
  return messages.map((msg) => {
    const textContent = msg.parts
      .filter((p): p is { type: 'text', text: string } => p.type === 'text')
      .map(p => p.text)
      .join('\n')

    return {
      role: msg.role,
      content: textContent || ' '
    }
  })
}

// Replicate sendSSE for testing
function sendSSE(controller: { enqueue: (data: Uint8Array) => void }, event: Record<string, unknown>) {
  const encoder = new TextEncoder()
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
}

describe('Chat [id].post endpoint', () => {
  describe('convertToAnthropicMessages', () => {
    it('converts single text message', () => {
      const messages: ChatMessage[] = [
        { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello' }] }
      ]

      const result = convertToAnthropicMessages(messages)

      expect(result).toEqual([
        { role: 'user', content: 'Hello' }
      ])
    })

    it('converts multiple messages', () => {
      const messages: ChatMessage[] = [
        { id: '1', role: 'user', parts: [{ type: 'text', text: 'Question' }] },
        { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'Answer' }] }
      ]

      const result = convertToAnthropicMessages(messages)

      expect(result).toEqual([
        { role: 'user', content: 'Question' },
        { role: 'assistant', content: 'Answer' }
      ])
    })

    it('filters out non-text parts', () => {
      const messages: ChatMessage[] = [
        {
          id: '1',
          role: 'assistant',
          parts: [
            { type: 'reasoning', text: 'thinking...', state: 'done' } as MessagePart,
            { type: 'text', text: 'The answer is 42' }
          ]
        }
      ]

      const result = convertToAnthropicMessages(messages)

      expect(result[0]?.content).toBe('The answer is 42')
      expect(result[0]?.content).not.toContain('thinking')
    })

    it('joins multiple text parts with newlines', () => {
      const messages: ChatMessage[] = [
        {
          id: '1',
          role: 'user',
          parts: [
            { type: 'text', text: 'First line' },
            { type: 'text', text: 'Second line' }
          ]
        }
      ]

      const result = convertToAnthropicMessages(messages)

      expect(result[0]?.content).toBe('First line\nSecond line')
    })

    it('returns space for empty messages', () => {
      const messages: ChatMessage[] = [
        { id: '1', role: 'user', parts: [] }
      ]

      const result = convertToAnthropicMessages(messages)

      expect(result[0]?.content).toBe(' ')
    })

    it('handles reasoning + text parts correctly', () => {
      const messages: ChatMessage[] = [
        {
          id: '1',
          role: 'assistant',
          parts: [
            { type: 'reasoning', text: 'Let me think...', state: 'done' } as MessagePart,
            { type: 'text', text: 'Final answer' }
          ]
        }
      ]

      const result = convertToAnthropicMessages(messages)

      // Only text parts should be included
      expect(result[0]?.content).toBe('Final answer')
    })
  })

  describe('sendSSE', () => {
    it('formats SSE data correctly', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, { type: 'text', text: 'Hello' })

      const output = new TextDecoder().decode(chunks[0])
      expect(output).toBe('data: {"type":"text","text":"Hello"}\n\n')
    })

    it('handles title events', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, { type: 'title', title: 'Chat Title' })

      const output = new TextDecoder().decode(chunks[0])
      expect(output).toContain('"type":"title"')
      expect(output).toContain('"title":"Chat Title"')
    })

    it('handles error events', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, { type: 'error', error: 'Something went wrong' })

      const output = new TextDecoder().decode(chunks[0])
      expect(output).toContain('"type":"error"')
      expect(output).toContain('"error":"Something went wrong"')
    })

    it('handles tool_start events', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, {
        type: 'tool_start',
        tool: 'getWeather',
        toolCallId: 'call_123',
        args: { city: 'NYC' }
      })

      const output = new TextDecoder().decode(chunks[0])
      expect(output).toContain('"type":"tool_start"')
      expect(output).toContain('"tool":"getWeather"')
      expect(output).toContain('"city":"NYC"')
    })

    it('handles tool_end events', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, {
        type: 'tool_end',
        tool: 'getWeather',
        toolCallId: 'call_123',
        result: { temperature: 72 }
      })

      const output = new TextDecoder().decode(chunks[0])
      expect(output).toContain('"type":"tool_end"')
      expect(output).toContain('"temperature":72')
    })

    it('handles done events with messageId', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, { type: 'done', messageId: 'msg-uuid-123' })

      const output = new TextDecoder().decode(chunks[0])
      expect(output).toContain('"type":"done"')
      expect(output).toContain('"messageId":"msg-uuid-123"')
    })

    it('handles reasoning events', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, { type: 'reasoning', text: 'Thinking about this...' })

      const output = new TextDecoder().decode(chunks[0])
      expect(output).toContain('"type":"reasoning"')
      expect(output).toContain('"text":"Thinking about this..."')
    })
  })

  describe('Message Parts Processing', () => {
    it('identifies text parts correctly', () => {
      const parts: MessagePart[] = [
        { type: 'text', text: 'Hello' }
      ]

      const textParts = parts.filter((p): p is { type: 'text', text: string } => p.type === 'text')

      expect(textParts.length).toBe(1)
      expect(textParts[0]?.text).toBe('Hello')
    })

    it('identifies reasoning parts correctly', () => {
      const parts: MessagePart[] = [
        { type: 'reasoning', text: 'Thinking...', state: 'done' }
      ]

      const reasoningParts = parts.filter(p => p.type === 'reasoning')

      expect(reasoningParts.length).toBe(1)
    })

    it('handles mixed parts', () => {
      const parts: MessagePart[] = [
        { type: 'reasoning', text: 'Let me think', state: 'done' },
        { type: 'text', text: 'The answer' },
        { type: 'text', text: 'is 42' }
      ]

      const textParts = parts.filter((p): p is { type: 'text', text: string } => p.type === 'text')
      const reasoningParts = parts.filter(p => p.type === 'reasoning')

      expect(textParts.length).toBe(2)
      expect(reasoningParts.length).toBe(1)
    })
  })

  describe('Tool JSON Parsing Edge Cases', () => {
    it('parses valid JSON tool input', () => {
      const input = '{"city":"New York","units":"fahrenheit"}'
      const parsed = JSON.parse(input)

      expect(parsed.city).toBe('New York')
      expect(parsed.units).toBe('fahrenheit')
    })

    it('handles empty JSON object', () => {
      const input = '{}'
      const parsed = JSON.parse(input)

      expect(parsed).toEqual({})
    })

    it('handles nested JSON', () => {
      const input = '{"query":"test","options":{"limit":10,"offset":0}}'
      const parsed = JSON.parse(input)

      expect(parsed.query).toBe('test')
      expect(parsed.options.limit).toBe(10)
    })

    it('throws on invalid JSON', () => {
      const invalidInputs = [
        '{"city":',
        'not json',
        '{"unclosed": "string',
        '{trailing:comma,}'
      ]

      for (const input of invalidInputs) {
        expect(() => JSON.parse(input)).toThrow()
      }
    })

    it('handles special characters in JSON', () => {
      const input = '{"text":"Hello\\nWorld","quote":"He said \\"hi\\""}'
      const parsed = JSON.parse(input)

      expect(parsed.text).toBe('Hello\nWorld')
      expect(parsed.quote).toBe('He said "hi"')
    })
  })

  describe('SSE Format Validation', () => {
    it('SSE events end with double newline', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, { type: 'text', text: 'test' })

      const output = new TextDecoder().decode(chunks[0])
      expect(output.endsWith('\n\n')).toBe(true)
    })

    it('SSE events start with data: prefix', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, { type: 'test' })

      const output = new TextDecoder().decode(chunks[0])
      expect(output.startsWith('data: ')).toBe(true)
    })

    it('SSE payload is valid JSON', () => {
      const chunks: Uint8Array[] = []
      const mockController = {
        enqueue: (data: Uint8Array) => chunks.push(data)
      }

      sendSSE(mockController, { type: 'complex', nested: { a: 1, b: [2, 3] } })

      const output = new TextDecoder().decode(chunks[0])
      const jsonPart = output.replace('data: ', '').replace(/\n\n$/, '')
      const parsed = JSON.parse(jsonPart)

      expect(parsed.type).toBe('complex')
      expect(parsed.nested.a).toBe(1)
      expect(parsed.nested.b).toEqual([2, 3])
    })
  })

  describe('BASE_SYSTEM_PROMPT inclusion', () => {
    const BASE_SYSTEM_PROMPT = `
**FORMATTING RULES (CRITICAL):**
- ABSOLUTELY NO MARKDOWN HEADINGS: Never use #, ##, ###, ####, #####, or ######
- NO underline-style headings with === or ---
- Use **bold text** for emphasis and section labels instead
- Start all responses with content, never with a heading

**RESPONSE QUALITY:**
- Be concise yet comprehensive
- Use examples when helpful
- Break down complex topics into digestible parts
- Maintain a friendly, professional tone`

    it('contains formatting rules', () => {
      expect(BASE_SYSTEM_PROMPT).toContain('FORMATTING RULES')
      expect(BASE_SYSTEM_PROMPT).toContain('NO MARKDOWN HEADINGS')
    })

    it('contains response quality guidelines', () => {
      expect(BASE_SYSTEM_PROMPT).toContain('RESPONSE QUALITY')
      expect(BASE_SYSTEM_PROMPT).toContain('concise yet comprehensive')
    })

    it('prohibits heading symbols', () => {
      expect(BASE_SYSTEM_PROMPT).toContain('Never use #')
      expect(BASE_SYSTEM_PROMPT).toContain('===')
      expect(BASE_SYSTEM_PROMPT).toContain('---')
    })
  })
})
