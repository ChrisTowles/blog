/**
 * Integration tests for blog chatbot agent
 * Uses real Agent SDK, Bedrock, and database
 *
 * TODO: Come back to these tests once agent implementation is stable
 */
import { describe, it, expect } from 'vitest'
import { runAgent, runAgentSync } from './agent'

describe.skip('agent', () => {
  describe('runAgent', () => {
    it('should return a stream of messages for a simple prompt', async () => {
      const messages = []

      for await (const msg of runAgent({
        prompt: 'What is 2 + 2?',
        maxTurns: 1
      })) {
        messages.push(msg)
      }

      // Should have at least system init and result
      expect(messages.length).toBeGreaterThan(0)

      // Should end with a result message
      const resultMsg = messages.find(m => m.type === 'result')
      expect(resultMsg).toBeDefined()
    })

    it('should use searchBlogContent tool for blog-related queries', async () => {
      const messages = []

      for await (const msg of runAgent({
        prompt: 'What has the author written about Vue?',
        maxTurns: 3
      })) {
        messages.push(msg)
      }

      // Should have called the search tool
      const hasToolUse = messages.some(m =>
        m.type === 'assistant'
        && m.message?.content?.some((c: { type: string, name?: string }) =>
          c.type === 'tool_use' && c.name === 'mcp__blog-tools__searchBlogContent'
        )
      )
      expect(hasToolUse).toBe(true)
    })

    it('should respect maxTurns limit', async () => {
      const messages = []

      for await (const msg of runAgent({
        prompt: 'Search for posts about AI, then search for posts about Vue, then search for posts about TypeScript',
        maxTurns: 2
      })) {
        messages.push(msg)
      }

      // Count assistant messages (each turn produces one)
      const assistantMsgs = messages.filter(m => m.type === 'assistant')
      expect(assistantMsgs.length).toBeLessThanOrEqual(2)
    })
  })

  describe('runAgentSync', () => {
    it('should return collected messages and result', async () => {
      const { result, messages } = await runAgentSync({
        prompt: 'Say hello in exactly 3 words',
        maxTurns: 1
      })

      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(messages.length).toBeGreaterThan(0)
    })

    it('should handle tool use and return final result', async () => {
      const { result, messages } = await runAgentSync({
        prompt: 'What time is it?',
        maxTurns: 2
      })

      // Should have used getCurrentDateTime tool
      const hasTimeToolUse = messages.some(m =>
        m.type === 'assistant'
        && m.message?.content?.some((c: { type: string, name?: string }) =>
          c.type === 'tool_use' && c.name === 'mcp__blog-tools__getCurrentDateTime'
        )
      )
      expect(hasTimeToolUse).toBe(true)

      // Result should mention time
      expect(result).toBeDefined()
    })
  })

  describe('tool integration', () => {
    it('should use getWeather tool for weather queries', async () => {
      const { messages } = await runAgentSync({
        prompt: 'What is the weather in London?',
        maxTurns: 2
      })

      const hasWeatherToolUse = messages.some(m =>
        m.type === 'assistant'
        && m.message?.content?.some((c: { type: string, name?: string }) =>
          c.type === 'tool_use' && c.name === 'mcp__blog-tools__getWeather'
        )
      )
      expect(hasWeatherToolUse).toBe(true)
    })

    it('should use rollDice tool for dice rolling', async () => {
      const { messages, result } = await runAgentSync({
        prompt: 'Roll 2d6 for me',
        maxTurns: 2
      })

      const hasDiceToolUse = messages.some(m =>
        m.type === 'assistant'
        && m.message?.content?.some((c: { type: string, name?: string }) =>
          c.type === 'tool_use' && c.name === 'mcp__blog-tools__rollDice'
        )
      )
      expect(hasDiceToolUse).toBe(true)

      // Result should contain dice roll info
      expect(result).toMatch(/\d/)
    })

    it('should use getAuthorInfo for author queries', async () => {
      const { messages, result } = await runAgentSync({
        prompt: 'Who is the author of this blog?',
        maxTurns: 2
      })

      const hasAuthorToolUse = messages.some(m =>
        m.type === 'assistant'
        && m.message?.content?.some((c: { type: string, name?: string }) =>
          c.type === 'tool_use' && c.name === 'mcp__blog-tools__getAuthorInfo'
        )
      )
      expect(hasAuthorToolUse).toBe(true)

      // Result should mention Chris Towles
      expect(result.toLowerCase()).toContain('chris')
    })
  })
})
