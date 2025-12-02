import { describe, it, expect } from 'vitest'
import {
  chatNeedsTitle,
  shouldSaveUserMessage,
  type Chat
} from './chat-db'

describe('chat-db utilities', () => {
  describe('chatNeedsTitle', () => {
    it('should return true when chat has no title', () => {
      const chat: Chat = {
        id: '123',
        title: null,
        userId: 'user-1',
        createdAt: new Date()
      }

      expect(chatNeedsTitle(chat)).toBe(true)
    })

    it('should return true when chat has empty title', () => {
      const chat: Chat = {
        id: '123',
        title: '',
        userId: 'user-1',
        createdAt: new Date()
      }

      expect(chatNeedsTitle(chat)).toBe(true)
    })

    it('should return true when chat has whitespace-only title', () => {
      const chat: Chat = {
        id: '123',
        title: '   ',
        userId: 'user-1',
        createdAt: new Date()
      }

      expect(chatNeedsTitle(chat)).toBe(true)
    })

    it('should return false when chat has a valid title', () => {
      const chat: Chat = {
        id: '123',
        title: 'My Chat',
        userId: 'user-1',
        createdAt: new Date()
      }

      expect(chatNeedsTitle(chat)).toBe(false)
    })

    it('should return false when chat has title with leading/trailing spaces', () => {
      const chat: Chat = {
        id: '123',
        title: '  My Chat  ',
        userId: 'user-1',
        createdAt: new Date()
      }

      expect(chatNeedsTitle(chat)).toBe(false)
    })
  })

  describe('shouldSaveUserMessage', () => {
    it('should return false for first user message', () => {
      const messages = [{ role: 'user' }]
      const lastMessage = { role: 'user' }

      expect(shouldSaveUserMessage(messages, lastMessage)).toBe(false)
    })

    it('should return true for subsequent user messages', () => {
      const messages = [
        { role: 'user' },
        { role: 'assistant' },
        { role: 'user' }
      ]
      const lastMessage = { role: 'user' }

      expect(shouldSaveUserMessage(messages, lastMessage)).toBe(true)
    })

    it('should return false for assistant messages', () => {
      const messages = [
        { role: 'user' },
        { role: 'assistant' }
      ]
      const lastMessage = { role: 'assistant' }

      expect(shouldSaveUserMessage(messages, lastMessage)).toBe(false)
    })

    it('should return false when no messages', () => {
      const messages: Array<{ role: string }> = []
      const lastMessage = { role: 'user' }

      expect(shouldSaveUserMessage(messages, lastMessage)).toBe(false)
    })

    it('should return true for user message in long conversation', () => {
      const messages = [
        { role: 'user' },
        { role: 'assistant' },
        { role: 'user' },
        { role: 'assistant' },
        { role: 'user' }
      ]
      const lastMessage = { role: 'user' }

      expect(shouldSaveUserMessage(messages, lastMessage)).toBe(true)
    })

    it('should return false for assistant in long conversation', () => {
      const messages = [
        { role: 'user' },
        { role: 'assistant' },
        { role: 'user' },
        { role: 'assistant' }
      ]
      const lastMessage = { role: 'assistant' }

      expect(shouldSaveUserMessage(messages, lastMessage)).toBe(false)
    })
  })

  describe('edge cases', () => {
    it('chatNeedsTitle should handle undefined title as needing title', () => {
      const chat = {
        id: '123',
        title: undefined as unknown as null,
        userId: 'user-1',
        createdAt: new Date()
      }

      expect(chatNeedsTitle(chat)).toBe(true)
    })

    it('shouldSaveUserMessage should handle exactly 2 messages', () => {
      const messages = [
        { role: 'user' },
        { role: 'assistant' }
      ]
      const lastMessage = { role: 'user' }

      // Length is 2, but we're checking the 3rd message (not in array yet)
      // This represents the state before adding the new message
      expect(shouldSaveUserMessage(messages, lastMessage)).toBe(true)
    })

    it('shouldSaveUserMessage with mixed case roles', () => {
      const messages = [
        { role: 'user' },
        { role: 'assistant' },
        { role: 'user' }
      ]
      const lastMessage = { role: 'USER' } // Different case

      expect(shouldSaveUserMessage(messages, lastMessage)).toBe(false)
    })
  })
})
