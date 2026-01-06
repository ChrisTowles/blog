/**
 * Tests for WebSocket SessionManager
 *
 * Tests session lifecycle, subscriber management, and cleanup
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { SessionManager } from '../session-manager'

describe('SessionManager', () => {
    let sessionManager: SessionManager

    beforeEach(() => {
        sessionManager = new SessionManager()
    })

    afterEach(() => {
        sessionManager.cleanup()
    })

    describe('getOrCreateSession', () => {
        it('creates a new session for a chat', () => {
            const session = sessionManager.getOrCreateSession('chat-1', 'user-1')

            expect(session).toBeDefined()
            expect(session.chatId).toBe('chat-1')
            expect(session.userId).toBe('user-1')
            expect(session.sdkSessionId).toBeNull()
            expect(session.isProcessing).toBe(false)
            expect(session.messageCount).toBe(0)
        })

        it('returns existing session for same chatId', () => {
            const session1 = sessionManager.getOrCreateSession('chat-1', 'user-1')
            const session2 = sessionManager.getOrCreateSession('chat-1', 'user-1')

            expect(session1).toBe(session2)
        })

        it('creates separate sessions for different chats', () => {
            const session1 = sessionManager.getOrCreateSession('chat-1', 'user-1')
            const session2 = sessionManager.getOrCreateSession('chat-2', 'user-1')

            expect(session1).not.toBe(session2)
            expect(session1.chatId).toBe('chat-1')
            expect(session2.chatId).toBe('chat-2')
        })
    })

    describe('getSession', () => {
        it('returns undefined for non-existent session', () => {
            const session = sessionManager.getSession('non-existent')

            expect(session).toBeUndefined()
        })

        it('returns existing session', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')
            const session = sessionManager.getSession('chat-1')

            expect(session).toBeDefined()
            expect(session?.chatId).toBe('chat-1')
        })
    })

    describe('subscribe', () => {
        it('adds subscriber to session', () => {
            const session = sessionManager.getOrCreateSession('chat-1', 'user-1')
            const peer = { id: 'peer-1' }

            sessionManager.subscribe('chat-1', peer as any)

            expect(session.subscribers.has(peer)).toBe(true)
        })

        it('allows multiple subscribers to same session', () => {
            const session = sessionManager.getOrCreateSession('chat-1', 'user-1')
            const peer1 = { id: 'peer-1' }
            const peer2 = { id: 'peer-2' }

            sessionManager.subscribe('chat-1', peer1 as any)
            sessionManager.subscribe('chat-1', peer2 as any)

            expect(session.subscribers.size).toBe(2)
        })

        it('returns false if session does not exist', () => {
            const peer = { id: 'peer-1' }
            const result = sessionManager.subscribe('non-existent', peer as any)

            expect(result).toBe(false)
        })
    })

    describe('unsubscribe', () => {
        it('removes subscriber from session', () => {
            const session = sessionManager.getOrCreateSession('chat-1', 'user-1')
            const peer = { id: 'peer-1' }
            sessionManager.subscribe('chat-1', peer as any)

            sessionManager.unsubscribe('chat-1', peer as any)

            expect(session.subscribers.has(peer)).toBe(false)
        })

        it('does not error if subscriber was not subscribed', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')
            const peer = { id: 'peer-1' }

            expect(() => sessionManager.unsubscribe('chat-1', peer as any)).not.toThrow()
        })
    })

    describe('setSdkSessionId', () => {
        it('sets SDK session ID on existing session', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')

            sessionManager.setSdkSessionId('chat-1', 'sdk-session-123')

            const session = sessionManager.getSession('chat-1')
            expect(session?.sdkSessionId).toBe('sdk-session-123')
        })

        it('returns false if session does not exist', () => {
            const result = sessionManager.setSdkSessionId('non-existent', 'sdk-123')

            expect(result).toBe(false)
        })
    })

    describe('setProcessing', () => {
        it('sets processing state', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')

            sessionManager.setProcessing('chat-1', true)
            expect(sessionManager.getSession('chat-1')?.isProcessing).toBe(true)

            sessionManager.setProcessing('chat-1', false)
            expect(sessionManager.getSession('chat-1')?.isProcessing).toBe(false)
        })

        it('updates lastActivityAt', async () => {
            const session = sessionManager.getOrCreateSession('chat-1', 'user-1')
            const initialTime = session.lastActivityAt.getTime()

            // Wait a bit to ensure time difference
            await new Promise(resolve => setTimeout(resolve, 10))

            sessionManager.setProcessing('chat-1', true)

            expect(session.lastActivityAt.getTime()).toBeGreaterThanOrEqual(initialTime)
        })
    })

    describe('removeSession', () => {
        it('removes session from manager', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')

            sessionManager.removeSession('chat-1')

            expect(sessionManager.getSession('chat-1')).toBeUndefined()
        })
    })

    describe('getActiveSessions', () => {
        it('returns all active sessions', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')
            sessionManager.getOrCreateSession('chat-2', 'user-2')

            const sessions = sessionManager.getActiveSessions()

            expect(sessions.length).toBe(2)
        })
    })

    describe('cleanupStaleSessions', () => {
        beforeEach(() => {
            vi.useFakeTimers()
        })

        afterEach(() => {
            vi.useRealTimers()
        })

        it('removes sessions inactive for longer than timeout', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')

            // Advance time past the default timeout (60s)
            vi.advanceTimersByTime(61 * 1000)

            const removed = sessionManager.cleanupStaleSessions(60 * 1000)

            expect(removed).toBe(1)
            expect(sessionManager.getSession('chat-1')).toBeUndefined()
        })

        it('keeps sessions with recent activity', () => {
            const session = sessionManager.getOrCreateSession('chat-1', 'user-1')

            // Advance time but update activity
            vi.advanceTimersByTime(30 * 1000)
            session.lastActivityAt = new Date()

            vi.advanceTimersByTime(30 * 1000)

            const removed = sessionManager.cleanupStaleSessions(60 * 1000)

            expect(removed).toBe(0)
            expect(sessionManager.getSession('chat-1')).toBeDefined()
        })

        it('keeps sessions that are currently processing', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')
            sessionManager.setProcessing('chat-1', true)

            // Advance time past timeout
            vi.advanceTimersByTime(120 * 1000)

            const removed = sessionManager.cleanupStaleSessions(60 * 1000)

            expect(removed).toBe(0)
            expect(sessionManager.getSession('chat-1')).toBeDefined()
        })
    })

    describe('getSessionsForUser', () => {
        it('returns all sessions for a user', () => {
            sessionManager.getOrCreateSession('chat-1', 'user-1')
            sessionManager.getOrCreateSession('chat-2', 'user-1')
            sessionManager.getOrCreateSession('chat-3', 'user-2')

            const sessions = sessionManager.getSessionsForUser('user-1')

            expect(sessions.length).toBe(2)
            expect(sessions.every(s => s.userId === 'user-1')).toBe(true)
        })
    })
})
