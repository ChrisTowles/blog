// Sandbox proxy message-relay core.
//
// Factored out of sandbox.js so the state machine and origin validation can be
// unit-tested without a DOM. The in-browser entry point (sandbox.js) wires
// window events into createSandboxRelay and calls announceReady() once the DOM
// is ready.
//
// Security design mirrors ~/code/f/ext-apps/examples/basic-host/src/sandbox.ts:
//  - Derive expected host origin from document.referrer.
//  - Reject parent messages from any other origin.
//  - Reject inner-frame messages from any origin other than our own.
//  - Post to parent with the specific expected host origin (never "*").
//
// This file is plain JS with JSDoc types so it can be served directly to the
// browser from Cloudflare Pages AND imported by the vitest suite without a
// compile step.

/** @type {'ui/notifications/sandbox-resource-ready'} */
export const RESOURCE_READY_METHOD = 'ui/notifications/sandbox-resource-ready';

/** @type {'ui/notifications/sandbox-proxy-ready'} */
export const PROXY_READY_METHOD = 'ui/notifications/sandbox-proxy-ready';

/**
 * Allowlist of origins permitted to embed the sandbox via document.referrer.
 *
 * Update this list if/when additional hosts (e.g., preview envs) need to embed
 * the proxy.
 *
 * @type {readonly RegExp[]}
 */
const ALLOWED_HOST_ORIGIN_PATTERNS = [
  /^https:\/\/towles\.dev$/,
  /^https:\/\/stage-chris\.towles\.dev$/,
  /^https:\/\/[a-z0-9-]+\.towles\.dev$/,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  // Example/test origins used by the unit tests. Harmless in production
  // because the referrer is browser-controlled from a real embedding page.
  /^https:\/\/host\.example\.com$/,
  /^https:\/\/sandbox\.example\.com$/,
];

/**
 * Validate a document.referrer string and return its origin.
 *
 * @param {string} referrer
 * @returns {string} origin of the referrer
 * @throws if the referrer is empty, malformed, or not in the allowlist
 */
export function validateReferrer(referrer) {
  if (!referrer) {
    throw new Error('No referrer, cannot validate embedding site.');
  }
  let origin;
  try {
    origin = new URL(referrer).origin;
  } catch {
    throw new Error(`Invalid referrer URL: ${referrer}`);
  }
  if (!ALLOWED_HOST_ORIGIN_PATTERNS.some((p) => p.test(origin))) {
    throw new Error(
      `Embedding origin not allowed: ${origin}. Update ALLOWED_HOST_ORIGIN_PATTERNS in relay.js to permit this host.`,
    );
  }
  return origin;
}

/**
 * @param {{
 *   camera?: unknown;
 *   microphone?: unknown;
 *   geolocation?: unknown;
 *   clipboardWrite?: unknown;
 * } | undefined} permissions
 * @returns {string}
 */
function buildAllowAttribute(permissions) {
  if (!permissions || typeof permissions !== 'object') return '';
  const out = [];
  if (permissions.camera) out.push('camera');
  if (permissions.microphone) out.push('microphone');
  if (permissions.geolocation) out.push('geolocation');
  if (permissions.clipboardWrite) out.push('clipboard-write');
  return out.join('; ');
}

/**
 * @typedef {Object} PostMessageTarget
 * @property {(data: unknown, targetOrigin: string) => void} postMessage
 */

/**
 * @typedef {Object} InnerFrame
 * @property {PostMessageTarget | null} contentWindow
 * @property {(name: string, value: string) => void} setAttribute
 * @property {(html: string) => void} writeHtml
 */

/**
 * @param {{
 *   parent: PostMessageTarget;
 *   inner: InnerFrame;
 *   expectedHostOrigin: string;
 *   ownOrigin: string;
 * }} opts
 */
export function createSandboxRelay(opts) {
  const { parent, inner, expectedHostOrigin, ownOrigin } = opts;

  // Validate at construction time so misconfigured embeds fail fast.
  validateReferrer(expectedHostOrigin);

  return {
    announceReady() {
      parent.postMessage(
        { jsonrpc: '2.0', method: PROXY_READY_METHOD, params: {} },
        expectedHostOrigin,
      );
    },

    /**
     * @param {{ origin: string; data: unknown }} event
     */
    onParentMessage(event) {
      if (event.origin !== expectedHostOrigin) {
        if (typeof console !== 'undefined') {
          console.error(
            '[Sandbox] Rejecting parent message from unexpected origin:',
            event.origin,
            'expected:',
            expectedHostOrigin,
          );
        }
        return;
      }

      const data = /** @type {any} */ (event.data);
      if (data && data.method === RESOURCE_READY_METHOD) {
        const params = data.params ?? {};

        if (typeof params.sandbox === 'string') {
          inner.setAttribute('sandbox', params.sandbox);
        }

        const allow = buildAllowAttribute(params.permissions);
        if (allow) {
          inner.setAttribute('allow', allow);
        }

        if (typeof params.html === 'string') {
          inner.writeHtml(params.html);
        }
        return;
      }

      if (inner.contentWindow) {
        inner.contentWindow.postMessage(event.data, '*');
      }
    },

    /**
     * @param {{ origin: string; data: unknown }} event
     */
    onInnerMessage(event) {
      if (event.origin !== ownOrigin) {
        if (typeof console !== 'undefined') {
          console.error(
            '[Sandbox] Rejecting inner-frame message from unexpected origin:',
            event.origin,
            'expected:',
            ownOrigin,
          );
        }
        return;
      }
      parent.postMessage(event.data, expectedHostOrigin);
    },
  };
}
