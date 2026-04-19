/**
 * Tests for origin validation and the in-browser message-relay state machine.
 *
 * The relay is exposed as `createSandboxRelay()` so it can be unit-tested without
 * a real iframe or window. Production code wires the same factory to real
 * window events in sandbox.js.
 */

import { describe, expect, it } from 'vitest';
import { createSandboxRelay, RESOURCE_READY_METHOD } from './relay.js';

type Captured = { data: unknown; target: string };

function setup(opts?: { referrerOrigin?: string; ownOrigin?: string }) {
  const referrer = opts?.referrerOrigin ?? 'https://host.example.com';
  const own = opts?.ownOrigin ?? 'https://sandbox.example.com';

  const parentPosted: Captured[] = [];
  const innerPosted: Captured[] = [];

  const parent = {
    postMessage: (data: unknown, target: string) => {
      parentPosted.push({ data, target });
    },
  };

  const innerContentWindow = {
    postMessage: (data: unknown, target: string) => {
      innerPosted.push({ data, target });
    },
  };

  const innerWrites: string[] = [];
  const attrs: Record<string, string> = {};
  const inner = {
    contentWindow: innerContentWindow,
    setAttribute: (k: string, v: string) => {
      attrs[k] = v;
    },
    writeHtml: (html: string) => {
      innerWrites.push(html);
    },
  };

  const relay = createSandboxRelay({
    parent,
    inner,
    expectedHostOrigin: referrer,
    ownOrigin: own,
  });

  return { relay, parent, inner, parentPosted, innerPosted, innerWrites, attrs, referrer, own };
}

describe('createSandboxRelay', () => {
  it('emits sandbox-proxy-ready targeted at the expected host origin', () => {
    const { relay, parentPosted, referrer } = setup();
    relay.announceReady();
    expect(parentPosted).toHaveLength(1);
    expect(parentPosted[0].target).toBe(referrer);
    expect((parentPosted[0].data as any).method).toBe('ui/notifications/sandbox-proxy-ready');
  });

  it('ignores parent messages from an unexpected origin', () => {
    const { relay, innerPosted, innerWrites } = setup();
    relay.onParentMessage({
      origin: 'https://attacker.example.com',
      data: { method: 'ui/some-message', params: {} },
    });
    expect(innerPosted).toHaveLength(0);
    expect(innerWrites).toHaveLength(0);
  });

  it('on valid sandbox-resource-ready: writes HTML to inner frame', () => {
    const { relay, innerWrites, attrs } = setup();
    relay.onParentMessage({
      origin: 'https://host.example.com',
      data: {
        method: RESOURCE_READY_METHOD,
        params: { html: '<h1>hi</h1>', permissions: { microphone: {} } },
      },
    });
    expect(innerWrites).toEqual(['<h1>hi</h1>']);
    expect(attrs.allow).toBe('microphone');
  });

  it('relays unrelated parent messages to inner iframe', () => {
    const { relay, innerPosted } = setup();
    const msg = { jsonrpc: '2.0', method: 'ui/initialize', id: 1 };
    relay.onParentMessage({
      origin: 'https://host.example.com',
      data: msg,
    });
    expect(innerPosted).toHaveLength(1);
    expect(innerPosted[0].data).toBe(msg);
  });

  it('sandbox-resource-ready arriving before announceReady() still applies (ref-impl parity — inbound messages not gated on outbound ready)', () => {
    const { relay, innerWrites } = setup();
    relay.onParentMessage({
      origin: 'https://host.example.com',
      data: { method: RESOURCE_READY_METHOD, params: { html: '<p>x</p>' } },
    });
    expect(innerWrites).toEqual(['<p>x</p>']);
  });

  it('ignores inner-frame messages from unexpected origin', () => {
    const { relay, parentPosted } = setup();
    relay.onInnerMessage({
      origin: 'https://attacker.example.com',
      data: { foo: 'bar' },
    });
    expect(parentPosted).toHaveLength(0);
  });

  it('forwards inner-frame messages to parent using expected host origin (not *)', () => {
    const { relay, parentPosted, referrer, own } = setup();
    const payload = { jsonrpc: '2.0', method: 'ui/notifications/initialized' };
    relay.onInnerMessage({ origin: own, data: payload });
    expect(parentPosted).toHaveLength(1);
    expect(parentPosted[0].target).toBe(referrer);
    expect(parentPosted[0].data).toBe(payload);
  });

  it('rejects referrers that do not match the allowlist', () => {
    expect(() =>
      createSandboxRelay({
        parent: { postMessage: () => {} },
        inner: {
          contentWindow: { postMessage: () => {} },
          setAttribute: () => {},
          writeHtml: () => {},
        },
        expectedHostOrigin: 'file:///evil',
        ownOrigin: 'https://sandbox.example.com',
      }),
    ).toThrow(/origin/i);
  });
});

describe('validateReferrer', () => {
  it('allows the production blog origin', async () => {
    const { validateReferrer } = await import('./relay.js');
    expect(validateReferrer('https://towles.dev/chat')).toBe('https://towles.dev');
  });

  it('allows staging', async () => {
    const { validateReferrer } = await import('./relay.js');
    expect(validateReferrer('https://stage-chris.towles.dev/chat')).toBe(
      'https://stage-chris.towles.dev',
    );
  });

  it('allows localhost for dev', async () => {
    const { validateReferrer } = await import('./relay.js');
    expect(validateReferrer('http://localhost:3000/chat')).toBe('http://localhost:3000');
  });

  it('rejects unknown origins', async () => {
    const { validateReferrer } = await import('./relay.js');
    expect(() => validateReferrer('https://attacker.example.com/')).toThrow();
  });

  it('rejects empty referrer', async () => {
    const { validateReferrer } = await import('./relay.js');
    expect(() => validateReferrer('')).toThrow();
  });
});
