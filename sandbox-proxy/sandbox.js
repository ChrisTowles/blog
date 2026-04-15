// Sandbox proxy entry point.
// Runs inside sandbox.towles.dev, embedded as an iframe from the host (blog).
// See ./relay.js for the testable core. This file contains only the DOM wiring
// that is awkward to unit-test.
//
// IMPORTANT: this file is served as static JS from Cloudflare Pages. No bundler
// runs; the browser parses it as an ES module. Keep it self-contained — any
// imports MUST be from other files in this directory that the browser can load
// directly.

import { createSandboxRelay, validateReferrer } from '/relay.js';

if (window.self === window.top) {
  throw new Error('sandbox.html is only usable inside an iframe.');
}

const expectedHostOrigin = validateReferrer(document.referrer);
const ownOrigin = new URL(window.location.href).origin;

// Security self-test: window.top access MUST throw.
// If it succeeds, the sandbox is misconfigured — fail loudly.
try {
  // eslint-disable-next-line no-undef
  window.top.alert('If you see this, the sandbox is not set up securely.');
  throw new Error('__SANDBOX_LEAK__');
} catch (e) {
  if (e instanceof Error && e.message === '__SANDBOX_LEAK__') {
    throw new Error('The sandbox is not set up securely — window.top is reachable.', {
      cause: e,
    });
  }
  // Expected: SecurityError means isolation is working.
}

const inner = document.createElement('iframe');
inner.style = 'width:100%;height:100%;border:none;';
inner.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
document.body.appendChild(inner);

const innerAdapter = {
  get contentWindow() {
    return inner.contentWindow;
  },
  setAttribute(name, value) {
    inner.setAttribute(name, value);
  },
  writeHtml(html) {
    const doc = inner.contentDocument || (inner.contentWindow && inner.contentWindow.document);
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    } else {
      // Fallback if cross-origin-ish weirdness blocks document access.
      console.warn('[Sandbox] document.write unavailable, falling back to srcdoc');
      inner.srcdoc = html;
    }
  },
};

const relay = createSandboxRelay({
  parent: window.parent,
  inner: innerAdapter,
  expectedHostOrigin,
  ownOrigin,
});

window.addEventListener('message', (event) => {
  if (event.source === window.parent) {
    relay.onParentMessage({ origin: event.origin, data: event.data });
  } else if (event.source === inner.contentWindow) {
    relay.onInnerMessage({ origin: event.origin, data: event.data });
  }
});

relay.announceReady();
