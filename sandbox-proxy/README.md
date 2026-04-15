# sandbox-proxy

Static site for **`sandbox.towles.dev`** — the MCP Apps (SEP-1865) sandbox proxy
used by [towles.dev](https://towles.dev) to isolate untrusted HTML UI resources
in a cross-origin iframe.

This exists because the MCP Apps spec requires the host and the sandbox to have
**different origins**. The blog runs on `towles.dev` / `stage-chris.towles.dev`;
this site runs on `sandbox.towles.dev`, which is a different origin, satisfying
the requirement.

## What is in here

| File                            | Purpose                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| `sandbox.html`                  | Page loaded inside the blog's iframe. Imports `sandbox.js` as an ES module.                   |
| `sandbox.js`                    | Browser entry: wires window events → `relay.js` and runs the post-load sandbox self-test.     |
| `relay.js`                      | Testable core: origin validation + message relay state machine. Plain JS with JSDoc types.    |
| `csp.ts`                        | Strict CSP param parser. Directive-key allowlist + injection-character strip + length cap.    |
| `functions/sandbox.html.ts`     | Cloudflare Pages Function: applies per-request `Content-Security-Policy` header to responses. |
| `index.html`                    | Landing page served at `/`. Informational only.                                               |
| `_headers`                      | Static Cloudflare Pages headers — baseline hardening (HSTS, nosniff, referrer policy, etc.).  |
| `wrangler.toml`                 | Pages project config (`towles-sandbox-proxy`).                                                |
| `csp.test.ts`, `origin.test.ts` | Vitest unit tests for the security-critical parsing and relay logic.                          |

## Security model

- **Origin isolation.** SEP-1865 requires host ≠ sandbox origins. `sandbox.towles.dev` is a different origin from `towles.dev`.
- **Referrer allowlist.** `relay.js` validates `document.referrer` against `ALLOWED_HOST_ORIGIN_PATTERNS` at load time. Unknown embedders throw before any messages are processed.
- **CSP parsing.** `csp.ts` accepts only a JSON object with keys `connectDomains`, `resourceDomains`, `frameDomains`, `baseUriDomains`. Unknown keys are dropped; each entry must be a syntactically valid http(s) URL with no injection characters; the raw query is capped at 4 KiB. The plan line 774 explicitly calls this out as an upgrade over the ext-apps reference implementation, which character-strips but does not allowlist.
- **Per-request CSP headers.** `functions/sandbox.html.ts` computes the CSP from the query param and emits an HTTP header (not a meta tag). Meta-tag CSP is spoofable; HTTP headers are not.
- **Post-message origin checks.** Every inbound message is origin-checked against the derived host origin (parent) or our own origin (inner iframe). Replies to the parent use the specific host origin, never `"*"`.
- **Sandbox self-test.** On load, `sandbox.js` attempts `window.top.alert(...)`; if this succeeds the iframe is misconfigured and the script throws. A passing self-test means isolation is working.
- **Baseline hardening.** `_headers` sets HSTS, nosniff, referrer policy, COOP/CORP, and `X-Frame-Options: DENY` on the landing page.

## Tests

```bash
cd sandbox-proxy
pnpm install       # first time only
pnpm test          # runs vitest
```

Current coverage — 30 unit tests:

- **CSP:** malformed JSON → default; `;`/`"`/`'`/newline/space injection → stripped; unknown directive → dropped; non-array directive value → dropped; length cap; shape of the default header; defense-in-depth resanitization.
- **Relay / origin:** unexpected parent origin ignored; unexpected inner origin ignored; `sandbox-resource-ready` writes HTML; unrelated messages relayed; inner → parent targets the specific host origin (not `*`); referrer allowlist accepts the blog origins and rejects everything else.

## Local dev

```bash
cd sandbox-proxy
pnpm dlx wrangler pages dev .
# → http://127.0.0.1:8788
```

`wrangler pages dev` runs the Pages Function locally so you can verify the CSP
header path end-to-end before deploying.

## Deploy (Cloudflare Pages)

### One-time setup

The implementing user did not have `wrangler` or a Cloudflare API token present
when this module was built, so deployment is a manual one-time step:

1. Install wrangler: `pnpm dlx wrangler login` (opens a browser, signs into your Cloudflare account).
2. Create the Pages project: `pnpm dlx wrangler pages project create towles-sandbox-proxy --production-branch main`
3. Ensure the `sandbox-proxy/` source path is the Pages "root directory" (matches `pages_build_output_dir = "."` in `wrangler.toml`).

If you prefer a scripted flow, generate an API token with the **Pages:Edit**
scope at https://dash.cloudflare.com/profile/api-tokens and export:

```bash
export CLOUDFLARE_ACCOUNT_ID=<your account id>
export CLOUDFLARE_API_TOKEN=<the pages-edit token>
```

### Deploy a build

```bash
cd sandbox-proxy
pnpm deploy
# or explicitly:
pnpm dlx wrangler pages deploy . --project-name towles-sandbox-proxy --branch main
```

### Custom domain

In the Cloudflare dashboard → Pages → `towles-sandbox-proxy` → Custom domains,
add `sandbox.towles.dev`. Cloudflare will prompt you to add a CNAME record (see
DNS section below).

## DNS — `sandbox.towles.dev`

This repo's existing Terraform does not manage DNS (no `cloudflare_record`
resources in `infra/terraform/`), so DNS is a **manual step**.

Work out who hosts DNS for `towles.dev` first:

```bash
# From any machine with dig:
dig +short NS towles.dev
# → expect either Cloudflare (e.g. foo.ns.cloudflare.com) or another registrar.
```

### If DNS is on Cloudflare

1. Dashboard → `towles.dev` → DNS → **Add record**.
2. **Type:** CNAME — **Name:** `sandbox` — **Target:** `towles-sandbox-proxy.pages.dev` — **Proxy status:** Proxied (orange cloud).
3. Pages custom-domain flow will see it and issue TLS automatically within ~5 min.

### If DNS is on another registrar

1. Add a CNAME `sandbox.towles.dev` → `towles-sandbox-proxy.pages.dev`.
2. Verify in the Cloudflare Pages custom-domain UI.

### If Cloudflare Pages is not an option

Fallback: second Cloud Run service or GCS static bucket. Terraform module slot
reserved at `infra/terraform/modules/sandbox-proxy/` but not populated; the
scope-guardian plan-review decision (plan line 791) says to avoid a Terraform
module for 3 static files unless Cloudflare Pages is actually off the table.

## Updating

1. Edit `relay.js`, `sandbox.js`, `csp.ts`, or `functions/sandbox.html.ts`.
2. `pnpm test` — all 30 tests must pass before deploying.
3. `pnpm deploy` (Cloudflare Pages picks up the static files and the Function).

## Verification checklist

- [ ] `curl -sI https://sandbox.towles.dev/sandbox.html` → 200 plus `Content-Security-Policy: …`
- [ ] `curl -sI 'https://sandbox.towles.dev/sandbox.html?csp=%7B%22connectDomains%22%3A%5B%22https%3A%2F%2Fapi.example.com%22%5D%7D'` → CSP header contains `connect-src 'self' https://api.example.com`.
- [ ] `curl -sI 'https://sandbox.towles.dev/sandbox.html?csp=%7B%22connectDomains%22%3A%5B%22https%3A%2F%2Fevil.com%3B%20script-src%20%27unsafe-eval%27%22%5D%7D'` → CSP header's `connect-src` is just `'self'` (the injected value was dropped).
- [ ] Browser load of `sandbox.html` in an iframe fires `ui/notifications/sandbox-proxy-ready` upward within 500 ms.
- [ ] `window.top.alert(...)` inside the inner iframe throws `SecurityError` (origin isolation).
