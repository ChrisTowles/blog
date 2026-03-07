import type { WSPeer, SessionInfo } from './types';

interface ManagedSession {
  peer: WSPeer;
  info: SessionInfo;
  pingTimer?: ReturnType<typeof setInterval>;
}

const PING_INTERVAL_MS = 30_000;
const SESSION_STALE_TIMEOUT_MS = 60_000;

/**
 * Manages WebSocket connections and their associated chat sessions.
 * Maps peer IDs to session info and provides lookup by chatId.
 */
export class SessionManager {
  private sessions = new Map<string, ManagedSession>();
  private chatToPeer = new Map<string, string>();
  private cleanupTimer?: ReturnType<typeof setInterval>;

  constructor() {
    this.cleanupTimer = setInterval(() => this.cleanupStaleSessions(), SESSION_STALE_TIMEOUT_MS);
  }

  /**
   * Register a new peer connection with its authenticated userId.
   */
  addPeer(peer: WSPeer, userId: string): void {
    const session: ManagedSession = {
      peer,
      info: {
        userId,
        chatId: '',
        connectedAt: new Date(),
        lastActivityAt: new Date(),
      },
    };

    // Start ping/pong health check
    session.pingTimer = setInterval(() => {
      try {
        peer.send(JSON.stringify({ type: 'pong' }));
        this.touch(peer.id);
      } catch {
        this.removePeer(peer.id);
      }
    }, PING_INTERVAL_MS);

    this.sessions.set(peer.id, session);
    console.log(`[ws] Peer connected: ${peer.id} (user: ${userId})`);
  }

  /**
   * Subscribe a peer to a specific chat. One peer can only be subscribed
   * to one chat at a time.
   */
  subscribe(peerId: string, chatId: string): boolean {
    const session = this.sessions.get(peerId);
    if (!session) return false;

    // Unsubscribe from previous chat if any
    if (session.info.chatId) {
      this.chatToPeer.delete(session.info.chatId);
    }

    session.info.chatId = chatId;
    session.info.lastActivityAt = new Date();
    this.chatToPeer.set(chatId, peerId);

    console.log(`[ws] Peer ${peerId} subscribed to chat ${chatId}`);
    return true;
  }

  /**
   * Unsubscribe a peer from its current chat.
   */
  unsubscribe(peerId: string): void {
    const session = this.sessions.get(peerId);
    if (!session) return;

    if (session.info.chatId) {
      this.chatToPeer.delete(session.info.chatId);
      console.log(`[ws] Peer ${peerId} unsubscribed from chat ${session.info.chatId}`);
      session.info.chatId = '';
    }
  }

  /**
   * Remove a peer and clean up all associated state.
   */
  removePeer(peerId: string): void {
    const session = this.sessions.get(peerId);
    if (!session) return;

    if (session.pingTimer) {
      clearInterval(session.pingTimer);
    }

    if (session.info.chatId) {
      this.chatToPeer.delete(session.info.chatId);
    }

    this.sessions.delete(peerId);
    console.log(`[ws] Peer disconnected: ${peerId}`);
  }

  /**
   * Get the session info for a peer.
   */
  getSession(peerId: string): SessionInfo | undefined {
    return this.sessions.get(peerId)?.info;
  }

  /**
   * Get the peer subscribed to a specific chat.
   */
  getPeerForChat(chatId: string): WSPeer | undefined {
    const peerId = this.chatToPeer.get(chatId);
    if (!peerId) return undefined;
    return this.sessions.get(peerId)?.peer;
  }

  /**
   * Update the SDK session ID for a peer's current session.
   */
  setSdkSessionId(peerId: string, sdkSessionId: string): void {
    const session = this.sessions.get(peerId);
    if (session) {
      session.info.sdkSessionId = sdkSessionId;
    }
  }

  /**
   * Touch a session to update its last activity timestamp.
   */
  touch(peerId: string): void {
    const session = this.sessions.get(peerId);
    if (session) {
      session.info.lastActivityAt = new Date();
    }
  }

  /**
   * Send a JSON message to a specific peer.
   */
  sendToPeer(peerId: string, message: unknown): boolean {
    const session = this.sessions.get(peerId);
    if (!session) return false;

    try {
      session.peer.send(JSON.stringify(message));
      return true;
    } catch {
      this.removePeer(peerId);
      return false;
    }
  }

  /**
   * Send a JSON message to the peer subscribed to a specific chat.
   */
  sendToChat(chatId: string, message: unknown): boolean {
    const peerId = this.chatToPeer.get(chatId);
    if (!peerId) return false;
    return this.sendToPeer(peerId, message);
  }

  /**
   * Get the count of active connections.
   */
  get connectionCount(): number {
    return this.sessions.size;
  }

  /**
   * Clean up stale sessions that have not had activity within the timeout.
   */
  private cleanupStaleSessions(): void {
    const now = Date.now();
    for (const [peerId, session] of this.sessions) {
      const elapsed = now - session.info.lastActivityAt.getTime();
      if (elapsed >= SESSION_STALE_TIMEOUT_MS) {
        console.log(
          `[ws] Cleaning up stale session: ${peerId} (idle ${Math.round(elapsed / 1000)}s)`,
        );
        try {
          session.peer.close(1000, 'Session timeout');
        } catch {
          // Peer may already be closed
        }
        this.removePeer(peerId);
      }
    }
  }

  /**
   * Dispose of the session manager, clearing all timers and sessions.
   */
  dispose(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    for (const [, session] of this.sessions) {
      if (session.pingTimer) {
        clearInterval(session.pingTimer);
      }
    }
    this.sessions.clear();
    this.chatToPeer.clear();
  }
}

// Singleton instance for the server
let _sessionManager: SessionManager | undefined;

export function useSessionManager(): SessionManager {
  if (!_sessionManager) {
    _sessionManager = new SessionManager();
  }
  return _sessionManager;
}
