# mcp

Cloud Run service that hosts **`sandbox.towles.dev`** (prod) and
**`stage-sandbox.towles.dev`** (staging) — the MCP Apps (SEP-1865) iframe host
used by [towles.dev](https://towles.dev) to isolate untrusted HTML UI resources
in a cross-origin iframe.

The MCP Apps spec requires the host and the iframe to sit on **different
origins**. The blog runs on `chris.towles.dev` / `stage-chris.towles.dev`; this
service runs on `sandbox.*.towles.dev`, which is a different origin, satisfying
the requirement. The service is a dedicated Cloud Run deployment (not the blog
process) so a bug in the blog cannot reach the sandbox surface.

## Files

| File                            | Purpose                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| `server.ts`                     | h3 HTTP server. Routes `/`, `/sandbox.html`, `/sandbox.js`, `/relay.js` + baseline headers.  |
| `sandbox.html`                  | Page loaded inside the blog's iframe. Imports `sandbox.js` as an ES module.                  |
| `sandbox.js`                    | Browser entry: wires window events → `relay.js` and runs the post-load sandbox self-test.    |
| `relay.js`                      | Testable core: origin validation + message relay state machine. Plain JS with JSDoc types.   |
| `csp.ts`                        | Strict CSP param parser. Directive-key allowlist + injection-character strip + length cap.   |
| `index.html`                    | Landing page served at `/`. Informational only.                                              |
| `csp.test.ts`, `origin.test.ts` | Vitest unit tests for the security-critical parsing and relay logic.                         |
| `e2e/`                          | Playwright fixture: boots two origins locally to exercise the full handshake.                |

## Security model

- **Origin isolation.** SEP-1865 requires host ≠ iframe origins. `sandbox.towles.dev` is a different origin from `chris.towles.dev`, and serves from a separate Cloud Run service.
- **Referrer allowlist.** `relay.js` validates `document.referrer` against `ALLOWED_HOST_ORIGIN_PATTERNS` at load time. Unknown embedders throw before any messages are processed.
- **CSP parsing.** `csp.ts` accepts only a JSON object with keys `connectDomains`, `resourceDomains`, `frameDomains`, `baseUriDomains`. Unknown keys are dropped; each entry must be a syntactically valid http(s) URL with no injection characters; the raw query is capped at 4 KiB.
- **Per-request CSP headers.** `server.ts` computes the CSP from the `?csp=` query param and emits it as an HTTP header (not a meta tag). Meta-tag CSP is spoofable; HTTP headers are not.
- **Post-message origin checks.** Every inbound message is origin-checked against the derived host origin (parent) or our own origin (inner iframe). Replies to the parent use the specific host origin, never `"*"`.
- **Sandbox self-test.** On load, `sandbox.js` attempts `window.top.alert(...)`; if this succeeds the iframe is misconfigured and the script throws. A passing self-test means isolation is working.
- **Baseline hardening.** Every response carries HSTS, nosniff, referrer policy, COOP, CORP. The landing page adds `X-Frame-Options: DENY` and a strict CSP.

## Local dev

```bash
pnpm --filter @chris-towles/mcp dev
# → http://localhost:8080
```

Or from the repo root as part of the full dev stack:

```bash
pnpm dev   # blog + mcp on 8081 + tooling
```

## Tests

```bash
cd mcp
pnpm install       # first time only
pnpm test          # 30 unit tests
```

Coverage:

- **CSP:** malformed JSON → default; `;`/`"`/`'`/newline/space injection → stripped; unknown directive → dropped; non-array directive value → dropped; length cap; shape of the default header; defense-in-depth resanitization.
- **Relay / origin:** unexpected parent origin ignored; unexpected inner origin ignored; `sandbox-resource-ready` writes HTML; unrelated messages relayed; inner → parent targets the specific host origin (not `*`); referrer allowlist accepts the blog origins and rejects everything else.

## Build + deploy

`pnpm --filter @chris-towles/mcp build` bundles `server.ts` into
`dist/server.mjs` via rolldown. The Dockerfile at
`infra/container/mcp.Dockerfile` runs the same bundle step and produces the
runtime image, then `node server.mjs` serves traffic with zero TS transform on
cold start.

Manual deploy path (CI handles this on merge to `main`):

```bash
# staging
docker build -t us-central1-docker.pkg.dev/blog-towles-staging/containers/mcp:latest \
  -f infra/container/mcp.Dockerfile .
docker push us-central1-docker.pkg.dev/blog-towles-staging/containers/mcp:latest
pnpm gcp:staging:apply   # applies Terraform incl. mcp-run + Cloudflare DNS

# prod
docker build -t us-central1-docker.pkg.dev/blog-towles-production/containers/mcp:latest \
  -f infra/container/mcp.Dockerfile .
docker push us-central1-docker.pkg.dev/blog-towles-production/containers/mcp:latest
pnpm gcp:prod:apply
```

Terraform in `infra/terraform/modules/mcp-run/` provisions:

- `google_cloud_run_v2_service` named `mcp`
- `google_cloud_run_domain_mapping` for the custom hostname (`sandbox.towles.dev` / `stage-sandbox.towles.dev`)
- `roles/run.invoker` bound to `allUsers`

DNS is managed by the `cloudflare_record` resource in `infra/terraform/environments/main.tf` (requires `TF_VAR_cloudflare_api_token`).

## Verification checklist

- [ ] `curl -sI https://sandbox.towles.dev/sandbox.html` → 200 plus `Content-Security-Policy: …`
- [ ] `curl -sI 'https://sandbox.towles.dev/sandbox.html?csp=%7B%22connectDomains%22%3A%5B%22https%3A%2F%2Fapi.example.com%22%5D%7D'` → CSP header contains `connect-src 'self' https://api.example.com`.
- [ ] `curl -sI 'https://sandbox.towles.dev/sandbox.html?csp=%7B%22connectDomains%22%3A%5B%22https%3A%2F%2Fevil.com%3B%20script-src%20%27unsafe-eval%27%22%5D%7D'` → CSP header's `connect-src` is just `'self'` (the injected value was dropped).
- [ ] Browser load of `sandbox.html` in an iframe fires `ui/notifications/sandbox-proxy-ready` upward within 500 ms.
- [ ] `window.top.alert(...)` inside the inner iframe throws `SecurityError` (origin isolation).
