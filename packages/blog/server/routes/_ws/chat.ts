import type { WSClientMessage, WSPeer, WSServerMessage } from '~~/server/utils/ws/types';
import { useSessionManager } from '~~/server/utils/ws/session-manager';

function parseMessage(data: string | ArrayBuffer | Uint8Array): WSClientMessage | null {
  try {
    const text = typeof data === 'string' ? data : new TextDecoder().decode(data);
    return JSON.parse(text) as WSClientMessage;
  } catch {
    return null;
  }
}

function sendMessage(peer: WSPeer, message: WSServerMessage): void {
  peer.send(JSON.stringify(message));
}

/**
 * Extract user session from the WebSocket peer's upgrade request headers.
 *
 * Uses the same h3/nuxt-auth-utils session mechanism by constructing
 * a minimal event-like object with headers and context, then calling
 * getUserSession which reads the sealed cookie from the headers.
 */
async function authenticatePeer(peer: WSPeer): Promise<{ userId: string } | null> {
  const request = peer.request;
  if (!request?.headers) return null;

  // Build a minimal event-like object compatible with h3's getSession / _getReqHeader.
  // h3's _getReqHeader checks event.headers.get(name) as a fallback,
  // and getSession initializes event.context.sessions if missing.
  const fakeEvent = {
    headers: request.headers,
    context: {} as Record<string, unknown>,
  };

  try {
    // getUserSession from nuxt-auth-utils accepts event-like objects
    const session = await getUserSession(fakeEvent as Parameters<typeof getUserSession>[0]);
    const userId = session.user?.id || session.id;
    if (!userId) return null;
    return { userId };
  } catch {
    return null;
  }
}

export default defineWebSocketHandler({
  async open(peer) {
    const wsPeer = peer as unknown as WSPeer;
    const auth = await authenticatePeer(wsPeer);
    if (!auth) {
      console.warn(`[ws] Unauthorized connection attempt from peer ${peer.id}`);
      sendMessage(wsPeer, {
        type: 'error',
        chatId: '',
        content: 'Unauthorized: invalid or missing session',
      });
      peer.close(1008, 'Unauthorized');
      return;
    }

    const manager = useSessionManager();
    manager.addPeer(wsPeer, auth.userId);
  },

  message(peer, rawMessage) {
    const manager = useSessionManager();
    const session = manager.getSession(peer.id);
    const wsPeer = peer as unknown as WSPeer;

    if (!session) {
      sendMessage(wsPeer, {
        type: 'error',
        chatId: '',
        content: 'Session not found. Please reconnect.',
      });
      peer.close(1008, 'No session');
      return;
    }

    const data =
      typeof rawMessage === 'object' && 'text' in rawMessage
        ? (rawMessage as { text(): string }).text()
        : String(rawMessage);
    const message = parseMessage(data);
    if (!message) {
      sendMessage(wsPeer, {
        type: 'error',
        chatId: '',
        content: 'Invalid message format',
      });
      return;
    }

    manager.touch(peer.id);

    switch (message.type) {
      case 'ping': {
        sendMessage(wsPeer, { type: 'pong' });
        break;
      }

      case 'subscribe': {
        const subscribed = manager.subscribe(peer.id, message.chatId);
        if (!subscribed) {
          sendMessage(wsPeer, {
            type: 'error',
            chatId: message.chatId,
            content: 'Failed to subscribe to chat',
          });
        }
        break;
      }

      case 'unsubscribe': {
        manager.unsubscribe(peer.id);
        break;
      }

      case 'chat': {
        // Phase 2 will implement the actual AI chat flow.
        // For now, echo back an acknowledgment.
        if (!session.chatId) {
          // Auto-subscribe if not already subscribed
          manager.subscribe(peer.id, message.chatId);
        }

        sendMessage(wsPeer, {
          type: 'done',
          chatId: message.chatId,
        });
        break;
      }
    }
  },

  close(peer, details) {
    console.log(
      `[ws] Connection closed: ${peer.id} (code: ${details.code}, reason: ${details.reason})`,
    );
    const manager = useSessionManager();
    manager.removePeer(peer.id);
  },

  error(peer, error) {
    console.error(`[ws] Error on peer ${peer.id}:`, error);
    const manager = useSessionManager();
    manager.removePeer(peer.id);
  },
});
