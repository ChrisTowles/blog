/**
 * Manages WebSocket chat sessions.
 *
 * Each chat has one session that tracks:
 * - SDK session ID for multi-turn resume
 * - Processing state
 * - Subscribed WebSocket peers
 */
import type { ChatSessionState } from './types'

export class SessionManager {
    private sessions: Map<string, ChatSessionState> = new Map()
    private cleanupInterval: ReturnType<typeof setInterval> | null = null

    constructor() {
        // Start cleanup interval (every 30s)
        this.cleanupInterval = setInterval(() => {
            this.cleanupStaleSessions(60 * 1000) // 60s timeout
        }, 30 * 1000)
    }

    /**
     * Get or create a session for a chat
     */
    getOrCreateSession(chatId: string, userId: string): ChatSessionState {
        const existing = this.sessions.get(chatId)
        if (existing) {
            return existing
        }

        const session: ChatSessionState = {
            chatId,
            userId,
            sdkSessionId: null,
            isProcessing: false,
            lastActivityAt: new Date(),
            subscribers: new Set(),
            messageCount: 0
        }

        this.sessions.set(chatId, session)
        return session
    }

    /**
     * Get an existing session
     */
    getSession(chatId: string): ChatSessionState | undefined {
        return this.sessions.get(chatId)
    }

    /**
     * Subscribe a peer to a chat session
     */
    subscribe(chatId: string, peer: unknown): boolean {
        const session = this.sessions.get(chatId)
        if (!session) {
            return false
        }

        session.subscribers.add(peer)
        session.lastActivityAt = new Date()
        return true
    }

    /**
     * Unsubscribe a peer from a chat session
     */
    unsubscribe(chatId: string, peer: unknown): void {
        const session = this.sessions.get(chatId)
        if (session) {
            session.subscribers.delete(peer)
            session.lastActivityAt = new Date()
        }
    }

    /**
     * Set the SDK session ID for multi-turn resume
     */
    setSdkSessionId(chatId: string, sdkSessionId: string): boolean {
        const session = this.sessions.get(chatId)
        if (!session) {
            return false
        }

        session.sdkSessionId = sdkSessionId
        session.lastActivityAt = new Date()
        return true
    }

    /**
     * Set processing state for a session
     */
    setProcessing(chatId: string, isProcessing: boolean): void {
        const session = this.sessions.get(chatId)
        if (session) {
            session.isProcessing = isProcessing
            session.lastActivityAt = new Date()
        }
    }

    /**
     * Remove a session
     */
    removeSession(chatId: string): void {
        this.sessions.delete(chatId)
    }

    /**
     * Get all active sessions
     */
    getActiveSessions(): ChatSessionState[] {
        return Array.from(this.sessions.values())
    }

    /**
     * Get all sessions for a specific user
     */
    getSessionsForUser(userId: string): ChatSessionState[] {
        return Array.from(this.sessions.values()).filter(s => s.userId === userId)
    }

    /**
     * Clean up sessions that have been inactive for longer than timeout
     * @returns Number of sessions removed
     */
    cleanupStaleSessions(timeoutMs: number): number {
        const now = Date.now()
        let removed = 0

        for (const [chatId, session] of this.sessions) {
            // Don't clean up sessions that are currently processing
            if (session.isProcessing) {
                continue
            }

            const inactiveMs = now - session.lastActivityAt.getTime()
            if (inactiveMs > timeoutMs) {
                this.sessions.delete(chatId)
                removed++
            }
        }

        return removed
    }

    /**
     * Clean up resources
     */
    cleanup(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval)
            this.cleanupInterval = null
        }
        this.sessions.clear()
    }
}
