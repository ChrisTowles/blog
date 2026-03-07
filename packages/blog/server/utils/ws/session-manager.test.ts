import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SessionManager } from './session-manager';
import type { WSPeer } from './types';

function createMockPeer(id: string): WSPeer {
  return {
    id,
    send: vi.fn(),
    close: vi.fn(),
    request: {
      url: 'ws://localhost/_ws/chat',
      headers: new Headers(),
    },
  };
}

describe('SessionManager', () => {
  let manager: SessionManager;

  beforeEach(() => {
    vi.useFakeTimers();
    manager = new SessionManager();
  });

  afterEach(() => {
    manager.dispose();
    vi.useRealTimers();
  });

  describe('addPeer', () => {
    it('registers a peer with userId', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      const session = manager.getSession('peer-1');
      expect(session).toBeDefined();
      expect(session?.userId).toBe('user-123');
      expect(manager.connectionCount).toBe(1);
    });
  });

  describe('subscribe / unsubscribe', () => {
    it('subscribes a peer to a chat', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      const result = manager.subscribe('peer-1', 'chat-abc');
      expect(result).toBe(true);

      const session = manager.getSession('peer-1');
      expect(session?.chatId).toBe('chat-abc');
    });

    it('returns false for unknown peer', () => {
      const result = manager.subscribe('nonexistent', 'chat-abc');
      expect(result).toBe(false);
    });

    it('unsubscribes from previous chat on re-subscribe', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      manager.subscribe('peer-1', 'chat-1');
      expect(manager.getPeerForChat('chat-1')).toBeDefined();

      manager.subscribe('peer-1', 'chat-2');
      expect(manager.getPeerForChat('chat-1')).toBeUndefined();
      expect(manager.getPeerForChat('chat-2')).toBeDefined();
    });

    it('unsubscribes a peer from its chat', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');
      manager.subscribe('peer-1', 'chat-abc');

      manager.unsubscribe('peer-1');

      const session = manager.getSession('peer-1');
      expect(session?.chatId).toBe('');
      expect(manager.getPeerForChat('chat-abc')).toBeUndefined();
    });
  });

  describe('getPeerForChat', () => {
    it('returns the peer subscribed to a chat', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');
      manager.subscribe('peer-1', 'chat-abc');

      const found = manager.getPeerForChat('chat-abc');
      expect(found).toBeDefined();
      expect(found?.id).toBe('peer-1');
    });

    it('returns undefined for unknown chatId', () => {
      expect(manager.getPeerForChat('nonexistent')).toBeUndefined();
    });
  });

  describe('removePeer', () => {
    it('removes peer and cleans up chat mapping', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');
      manager.subscribe('peer-1', 'chat-abc');

      manager.removePeer('peer-1');

      expect(manager.getSession('peer-1')).toBeUndefined();
      expect(manager.getPeerForChat('chat-abc')).toBeUndefined();
      expect(manager.connectionCount).toBe(0);
    });

    it('handles removing nonexistent peer gracefully', () => {
      expect(() => manager.removePeer('nonexistent')).not.toThrow();
    });
  });

  describe('setSdkSessionId', () => {
    it('stores SDK session ID on the session', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      manager.setSdkSessionId('peer-1', 'sdk-session-456');

      const session = manager.getSession('peer-1');
      expect(session?.sdkSessionId).toBe('sdk-session-456');
    });
  });

  describe('sendToPeer', () => {
    it('sends JSON message to peer', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      const result = manager.sendToPeer('peer-1', { type: 'pong' });
      expect(result).toBe(true);
      expect(peer.send).toHaveBeenCalledWith(JSON.stringify({ type: 'pong' }));
    });

    it('returns false for unknown peer', () => {
      const result = manager.sendToPeer('nonexistent', { type: 'pong' });
      expect(result).toBe(false);
    });

    it('removes peer if send throws', () => {
      const peer = createMockPeer('peer-1');
      (peer.send as ReturnType<typeof vi.fn>).mockImplementation(() => {
        throw new Error('connection reset');
      });
      manager.addPeer(peer, 'user-123');

      const result = manager.sendToPeer('peer-1', { type: 'pong' });
      expect(result).toBe(false);
      expect(manager.getSession('peer-1')).toBeUndefined();
    });
  });

  describe('sendToChat', () => {
    it('sends message to peer subscribed to chat', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');
      manager.subscribe('peer-1', 'chat-abc');

      const result = manager.sendToChat('chat-abc', { type: 'pong' });
      expect(result).toBe(true);
      expect(peer.send).toHaveBeenCalled();
    });

    it('returns false for chat with no subscriber', () => {
      const result = manager.sendToChat('no-one-here', { type: 'pong' });
      expect(result).toBe(false);
    });
  });

  describe('touch', () => {
    it('updates lastActivityAt timestamp', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      const before = manager.getSession('peer-1')?.lastActivityAt;
      vi.advanceTimersByTime(1000);
      manager.touch('peer-1');
      const after = manager.getSession('peer-1')?.lastActivityAt;

      expect(after!.getTime()).toBeGreaterThan(before!.getTime());
    });
  });

  describe('stale session cleanup', () => {
    it('removes sessions that exceed the stale timeout', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');
      manager.subscribe('peer-1', 'chat-abc');

      // Advance past the 60s stale timeout + cleanup interval
      vi.advanceTimersByTime(61_000);

      expect(manager.getSession('peer-1')).toBeUndefined();
      expect(manager.getPeerForChat('chat-abc')).toBeUndefined();
      expect(peer.close).toHaveBeenCalledWith(1000, 'Session timeout');
    });

    it('does not remove active sessions', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      // Touch the session periodically
      vi.advanceTimersByTime(30_000);
      manager.touch('peer-1');
      vi.advanceTimersByTime(30_000);
      manager.touch('peer-1');
      vi.advanceTimersByTime(30_000);

      expect(manager.getSession('peer-1')).toBeDefined();
    });
  });

  describe('dispose', () => {
    it('clears all sessions and timers', () => {
      const peer1 = createMockPeer('peer-1');
      const peer2 = createMockPeer('peer-2');
      manager.addPeer(peer1, 'user-1');
      manager.addPeer(peer2, 'user-2');

      manager.dispose();

      expect(manager.connectionCount).toBe(0);
    });
  });

  describe('ping health checks', () => {
    it('sends pong messages on ping interval', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      // Advance to trigger ping interval (30s)
      vi.advanceTimersByTime(30_000);

      expect(peer.send).toHaveBeenCalledWith(JSON.stringify({ type: 'pong' }));
    });

    it('removes peer if ping send fails', () => {
      const peer = createMockPeer('peer-1');
      manager.addPeer(peer, 'user-123');

      // Make send fail
      (peer.send as ReturnType<typeof vi.fn>).mockImplementation(() => {
        throw new Error('connection closed');
      });

      // Advance to trigger ping
      vi.advanceTimersByTime(30_000);

      expect(manager.getSession('peer-1')).toBeUndefined();
    });
  });
});
