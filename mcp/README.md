# mcp

Cloudflare Worker (`towles-sandbox`, staging `towles-sandbox-staging`) that hosts
**`sandbox.towles.dev`** (prod) and **`stage-sandbox.towles.dev`** (staging) — the
MCP Apps (SEP-1865) iframe host used by [towles.dev](https://towles.dev) to isolate
untrusted HTML UI resources in a cross-origin iframe.

The MCP Apps spec requires the host and the iframe to sit on **different
origins**. The blog runs on `chris.towles.dev` / `stage-chris.towles.dev`; this
Worker runs on `sandbox.*.towles.dev`, which is a different origin, satisfying
the requirement. It is a dedicated Worker (not the blog Worker) so a bug in the
blog cannot reach the sandbox surface.

## Files

| File                            | Purpose                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `worker.ts`                     | Worker entry. Routes `/`, `/sandbox.html`, `/sandbox.js`, `/relay.js` + baseline headers.   |
| `wrangler.jsonc`                | Worker config: static assets (`run_worker_first`), custom-domain routes, `staging` env.     |
| `public/`                       | Static assets read through the `ASSETS` binding. Only files here are ever served.           |
| `public/sandbox.html`           | Page loaded inside the blog's iframe. Imports `sandbox.js` as an ES module.                 |
| `public/sandbox.js`             | Browser entry: wires window events → `relay.js` and runs the post-load sandbox self-test.   |
| `public/relay.js`               | Testable core: origin validation + message relay state machine. Plain JS with JSDoc types.  |
| `public/index.html`             | Landing page served at `/`. Informational only.                                             |
| `csp.ts`                        | Strict CSP param parser. Directive-key allowlist + injection-character strip + length cap.  |
| `csp.test.ts`, `origin.test.ts` | Vitest unit tests for the security-critical parsing and relay logic.                        |
| `worker.test.ts`                | Vitest tests for routing and headers, with a fake `ASSETS` binding.                         |
| `e2e/`                          | Playwright: runs `wrangler dev` plus a host page on a second origin for the full handshake. |

## Security model

- **Origin isolation.** SEP-1865 requires host ≠ iframe origins. `sandbox.towles.dev` is a different origin from `chris.towles.dev`, and is a separate Worker.
- **Referrer allowlist.** `relay.js` validates `document.referrer` against `ALLOWED_HOST_ORIGIN_PATTERNS` at load time. Unknown embedders throw before any messages are processed.
- **CSP parsing.** `csp.ts` accepts only a JSON object with keys `connectDomains`, `resourceDomains`, `frameDomains`, `baseUriDomains`. Unknown keys are dropped; each entry must be a syntactically valid http(s) URL with no injection characters; the raw query is capped at 4 KiB.
- **Per-request CSP headers.** `worker.ts` computes the CSP from the `?csp=` query param and emits it as an HTTP header (not a meta tag). Meta-tag CSP is spoofable; HTTP headers are not.
- **Post-message origin checks.** Every inbound message is origin-checked against the derived host origin (parent) or our own origin (inner iframe). Replies to the parent use the specific host origin, never `"*"`.
- **Sandbox self-test.** On load, `sandbox.js` attempts `window.top.alert(...)`; if this succeeds the iframe is misconfigured and the script throws. A passing self-test means isolation is working.
- **Baseline hardening.** Every response carries HSTS, nosniff, referrer policy, COOP, CORP. The landing page adds `X-Frame-Options: DENY` and a strict CSP.

## Local dev

```bash
pnpm --filter @chris-towles/mcp dev
# → http://sandbox.localhost:8081/sandbox.html
```

Port 8081 matches the blog's default `NUXT_PUBLIC_MCP_SANDBOX_URL`. Browsers
resolve `*.localhost` to loopback, so the sandbox and the blog (`localhost:3000`)
stay on different origins.

## Tests

```bash
pnpm --filter @chris-towles/mcp test       # unit tests
pnpm --filter @chris-towles/mcp test:e2e   # Playwright against wrangler dev
```

Coverage:

- **CSP:** malformed JSON → default; `;`/`"`/`'`/newline/space injection → stripped; unknown directive → dropped; non-array directive value → dropped; length cap; shape of the default header; defense-in-depth resanitization.
- **Relay / origin:** unexpected parent origin ignored; unexpected inner origin ignored; `sandbox-resource-ready` writes HTML; unrelated messages relayed; inner → parent targets the specific host origin (not `*`); referrer allowlist accepts the blog origins and rejects everything else.
- **Worker:** baseline headers on every response, per-route headers, 404 for anything outside `public/`, per-request CSP.

## Deploy

```bash
pnpm --filter @chris-towles/mcp deploy          # production → sandbox.towles.dev
pnpm --filter @chris-towles/mcp deploy:staging  # staging    → stage-sandbox.towles.dev
```

The `routes` in `wrangler.jsonc` are Workers custom domains: wrangler creates the
DNS record itself, so the hostname must not already have one (remove the old
Cloud Run CNAME first).

## Verification checklist

- [ ] `curl -sI https://sandbox.towles.dev/sandbox.html` → 200 plus `Content-Security-Policy: …`
- [ ] `curl -sI 'https://sandbox.towles.dev/sandbox.html?csp=%7B%22connectDomains%22%3A%5B%22https%3A%2F%2Fapi.example.com%22%5D%7D'` → CSP header contains `connect-src 'self' https://api.example.com`.
- [ ] `curl -sI 'https://sandbox.towles.dev/sandbox.html?csp=%7B%22connectDomains%22%3A%5B%22https%3A%2F%2Fevil.com%3B%20script-src%20%27unsafe-eval%27%22%5D%7D'` → CSP header's `connect-src` is just `'self'` (the injected value was dropped).
- [ ] Browser load of `sandbox.html` in an iframe fires `ui/notifications/sandbox-proxy-ready` upward within 500 ms.
- [ ] `window.top.alert(...)` inside the inner iframe throws `SecurityError` (origin isolation).
