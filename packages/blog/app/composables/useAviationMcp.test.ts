/**
 * Vitest unit tests for useAviationMcp.
 *
 * Per project rules (CLAUDE.md), `vi.mock` is banned; we inject the transport
 * via options.createTransport instead of module-mocking the MCP SDK.
 */

import { describe, it, expect } from 'vitest';
import { useAviationMcp } from './useAviationMcp';
import {
  AVIATION_TOOL_NAMES,
  AVIATION_UI_RESOURCE_URI,
  type AviationToolResult,
} from '~~/shared/mcp-aviation-types';

/**
 * A minimal fake MCP transport that satisfies the SDK's Transport interface
 * closely enough to pass `Client.connect`. The SDK sends JSON-RPC messages
 * via `send()`; we reply synchronously via `onmessage` based on the method.
 *
 * This is constructor-injected (not vi.mock'd) per project convention.
 */
class FakeTransport {
  public onmessage?: (m: unknown) => void;
  public onclose?: () => void;
  public onerror?: (e: unknown) => void;
  public sessionId?: string = 'fake-session';
  public setProtocolVersion?: (v: string) => void = () => undefined;

  /**
   * Behavior toggles: pushing a string onto `throwOnCall` makes the *next*
   * `tools/call` reject with that message; after consumption the next call
   * succeeds.
   */
  public throwOnCall: string[] = [];
  public callCount = 0;
  public askResult: AviationToolResult;

  constructor(opts: { askResult: AviationToolResult }) {
    this.askResult = opts.askResult;
  }

  async start(): Promise<void> {
    return;
  }

  async close(): Promise<void> {
    this.onclose?.();
  }

  async send(message: unknown): Promise<void> {
    if (!this.onmessage) return;
    const msg = message as { id?: number | string; method?: string };
    if (msg.method === 'initialize') {
      this.onmessage({
        jsonrpc: '2.0',
        id: msg.id,
        result: {
          protocolVersion: '2025-03-26',
          capabilities: { tools: {}, resources: {} },
          serverInfo: { name: 'fake-aviation', version: '0.0.0' },
        },
      });
      return;
    }
    if (msg.method === 'notifications/initialized') {
      return;
    }
    if (msg.method === 'tools/call') {
      this.callCount++;
      const nextThrow = this.throwOnCall.shift();
      if (nextThrow) {
        this.onmessage({
          jsonrpc: '2.0',
          id: msg.id,
          error: { code: -32000, message: nextThrow },
        });
        return;
      }
      this.onmessage({
        jsonrpc: '2.0',
        id: msg.id,
        result: {
          content: [
            { type: 'text', text: this.askResult.answer },
            {
              type: 'resource',
              resource: {
                uri: AVIATION_UI_RESOURCE_URI,
                mimeType: 'text/html;profile=mcp-app',
                text: '<!doctype html><html><body></body></html>',
                _meta: { ui: { csp: { connectDomains: [] } } },
              },
            },
          ],
          structuredContent: this.askResult,
        },
      });
      return;
    }
  }
}

const STUB_RESULT: AviationToolResult = {
  sql: 'SELECT 1',
  answer: 'two',
  chart_option: { title: { text: 'x' }, series: [] },
  followups: ['a', 'b', 'c'],
  rows: [],
  truncated: false,
};

describe('useAviationMcp', () => {
  it('callAsk returns structuredContent + iframe html + ui meta', async () => {
    const transport = new FakeTransport({ askResult: STUB_RESULT });
    const mcp = useAviationMcp({
      endpoint: 'http://localhost/mcp/aviation',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createTransport: () => transport as unknown as any,
    });

    const payload = await mcp.callAsk('What is 1 + 1?');
    expect(payload.structuredContent).toEqual(STUB_RESULT);
    expect(payload.uiResourceUri).toBe(AVIATION_UI_RESOURCE_URI);
    expect(payload.html).toContain('<!doctype html>');
    expect(payload.csp).toEqual({ connectDomains: [] });
    expect(payload.error).toBe(false);
    expect(transport.callCount).toBe(1);
  });

  it('silently reconnects once on a 404-shaped error (session expired)', async () => {
    const transport1 = new FakeTransport({ askResult: STUB_RESULT });
    transport1.throwOnCall.push('HTTP 404: session expired');
    const transport2 = new FakeTransport({ askResult: STUB_RESULT });

    let nextTransport: FakeTransport = transport1;
    const mcp = useAviationMcp({
      endpoint: 'http://localhost/mcp/aviation',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createTransport: (): any => {
        const t = nextTransport;
        nextTransport = transport2;
        return t;
      },
    });

    const payload = await mcp.callAsk('q');
    expect(payload.structuredContent).toEqual(STUB_RESULT);
    // 1 call on transport1 (throws), 1 on transport2 (succeeds).
    expect(transport1.callCount).toBe(1);
    expect(transport2.callCount).toBe(1);
  });

  it('propagates a second 404 (caller sees the error)', async () => {
    const transport1 = new FakeTransport({ askResult: STUB_RESULT });
    transport1.throwOnCall.push('HTTP 404: session expired');
    const transport2 = new FakeTransport({ askResult: STUB_RESULT });
    transport2.throwOnCall.push('HTTP 404: session expired again');

    let nextTransport: FakeTransport = transport1;
    const mcp = useAviationMcp({
      endpoint: 'http://localhost/mcp/aviation',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createTransport: (): any => {
        const t = nextTransport;
        nextTransport = transport2;
        return t;
      },
    });

    await expect(mcp.callAsk('q')).rejects.toThrow(/404/i);
  });

  it('uses the ask_aviation tool name exactly', () => {
    // Regression guard: if the server renames the tool, this test fails visibly.
    expect(AVIATION_TOOL_NAMES.ASK).toBe('ask_aviation');
  });
});
