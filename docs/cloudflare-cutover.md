# Cloudflare cutover runbook

One-time steps to move chris.towles.dev and sandbox.towles.dev from GCP to Cloudflare. Steady-state operations live in [hosting.md](hosting.md). Decisions and resource names: [cloudflare-migration.md](cloudflare-migration.md).

Run every command from the repo root unless a `cd` says otherwise. Replace the placeholder D1 ids in `packages/blog/wrangler.jsonc` with the real ones from step 1 before deploying.

## 0. Prerequisites

- `wrangler` logged in (`pnpm --filter @chris-towles/blog exec wrangler whoami`) to account `baf9cdac6eb4d8c477d85ceccae6679d`, Workers Paid plan active.
- Docker running locally (the container image builds during `wrangler deploy`).
- GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` set; token permissions in [hosting.md](hosting.md#ci-credentials).

## 1. Provision

Names come from the migration brief. The `dev` D1 is local-only and needs no creation.

```bash
cd packages/blog
W="pnpm exec wrangler"

# D1: copy each database_id into wrangler.jsonc (top level = production)
$W d1 create towles-blog
$W d1 create towles-blog-staging

# R2
$W r2 bucket create towles-blog-media
$W r2 bucket create towles-blog-media-staging

# Vectorize: 1024 dims matches the Workers AI Qwen3 embedding model
$W vectorize create towles-blog-rag --dimensions 1024 --metric cosine
$W vectorize create towles-blog-rag-staging --dimensions 1024 --metric cosine
```

AI Gateway has no wrangler command. Dashboard: AI > AI Gateway > Create Gateway, id `towles-blog`. Enable authentication if the app sends a gateway token, then add the Anthropic key under Provider Keys (BYOK). Staging shares this gateway.

Commit the real D1 ids.

## 2. Secrets

Follow the table in [hosting.md](hosting.md#worker-secrets). Staging first (`--env staging`), production after staging is verified. Confirm with `wrangler secret list --env staging`.

## 3. Staging deploy

```bash
pnpm cf:migrate:staging
pnpm cf:deploy:staging
```

The first deploy of each Worker attaches its custom domain (`stage-chris.towles.dev`, `stage-sandbox.towles.dev`) and writes the DNS records. If wrangler refuses because the hostname already has a DNS record, delete the old record first (step 6 lists them). Neither staging hostname is user-facing, so do it now.

Check:

```bash
scripts/smoke-test.sh https://stage-chris.towles.dev / '/api/health?'
scripts/smoke-test.sh https://stage-sandbox.towles.dev /sandbox.html
pnpm cf:tail:staging
```

## 4. Data copy

Source of truth until cutover is Cloud SQL (Postgres). `scripts/pg-to-d1.ts` (written by the data-move work) reads Postgres and writes SQL for D1; follow its header for flags. Shape of the run:

```bash
# Postgres side: start the Auth Proxy to the instance (staging first)
cloud-sql-proxy blog-towles-staging:us-central1:<instance> --port 5432 &
DATABASE_URL=postgresql://... pnpm tsx scripts/pg-to-d1.ts --env staging
```

Rehearse on staging, compare row counts per table, then repeat for production right before cutover. Production is a point-in-time copy, so freeze writes (put the old site in read-only or accept the gap) between the final copy and the DNS switch.

Aviation Parquet is already in R2 under `aviation/`; confirm the prefix exists in both buckets:

```bash
R2_ACCOUNT_ID=... R2_BUCKET=towles-blog-media pnpm etl:aviation
```

Run it only if the objects are missing.

## 5. Re-embed

Vectors do not move: the old index used Bedrock embeddings, the new one uses Workers AI at 1024 dims. After the D1 copy, trigger a full ingest on each environment with an admin session (or the `ADMIN_SEED_TOKEN` header where the endpoint accepts it):

```bash
curl -X POST https://stage-chris.towles.dev/api/admin/rag/ingest -H "x-admin-token: $ADMIN_SEED_TOKEN"
```

The route and its auth are owned by the RAG work; check `packages/blog/server/api/admin/rag/ingest.post.ts` for the current contract. Then run a search on the site and confirm results.

## 6. DNS cutover

Do staging verification first: sign-in with both OAuth providers, chat, search, typing audio, aviation tool, `/mcp` tools, the sandbox iframe on `/apps`. Update the OAuth apps' callback URLs for the production hostname if they are not already correct.

Old records to remove before the Worker can claim each hostname (Cloudflare dashboard: DNS > Records, or the API):

| Hostname                   | Old record                   | Owner                            |
| -------------------------- | ---------------------------- | -------------------------------- |
| `chris.towles.dev`         | CNAME `ghs.googlehosted.com` | manual                           |
| `stage-chris.towles.dev`   | CNAME `ghs.googlehosted.com` | manual                           |
| `sandbox.towles.dev`       | CNAME `ghs.googlehosted.com` | was `cloudflare_record.mcp_host` |
| `stage-sandbox.towles.dev` | CNAME `ghs.googlehosted.com` | was `cloudflare_record.mcp_host` |

Delete the sandbox CNAMEs by hand, not with `terraform apply`. The GCP stack no longer declares them, so the next plan finds them gone and stays quiet on that point. Leave the Cloud Run domain mappings and services untouched: they are the rollback path. A GCP drift issue for the pending domain-mapping destroy is expected during the soak; do not apply the GCP stacks until step 9.

Then deploy production:

```bash
pnpm cf:migrate
pnpm cf:deploy
```

Wrangler creates the custom-domain records for `chris.towles.dev` and `sandbox.towles.dev`. The hostname is down between deleting the CNAME and the certificate issuing, usually under a minute. Merging to `main` runs the same sequence through CI.

## 7. Verify

```bash
scripts/smoke-test.sh https://chris.towles.dev / '/api/health?'
scripts/smoke-test.sh https://sandbox.towles.dev /sandbox.html
dig +short chris.towles.dev   # Cloudflare anycast addresses, not Google's
pnpm cf:tail
```

Repeat the staging checklist against production: sign-in, chat, search, typing, aviation, MCP, sandbox iframe. Watch `wrangler tail` and the New Relic stream for errors for the first day.

## 8. Rollback

GCP was decommissioned in step 9, so there is no DNS rollback. For a bad Worker release, use `pnpm --filter @chris-towles/blog exec wrangler rollback`.

## 9. Decommission (done 2026-10-11)

- [x] Final Cloud SQL exports (both environments) and copies of the GCS media, MCP data and tfstate buckets are in the private R2 bucket `towles-blog-archive` as `gcp-final-2026-10-11.tar.gz`.
- [x] Deleted by `gcloud` rather than `terraform destroy` (the staging state held a Cloudflare record its provider could no longer read): Cloud Run services and domain mappings, Cloud SQL, Cloud Functions, the staging scheduler, every bucket, Artifact Registry, Secret Manager secrets, HMAC keys, service accounts, the Workload Identity pool, the kill-switch Pub/Sub topic, the BigQuery billing export, the four blog budgets and the kill-switch's billing-account IAM binding.
- [x] Billing unlinked from `blog-towles-production` and `blog-towles-staging`. The projects are not deleted: each owns the Google OAuth client its environment signs in with.
- [x] Removed `infra/terraform/`, `infra/gcp-billing/`, the GCP drift jobs and the `GCP_*` repo variables. The Cloudflare stack moved to local state.
- [ ] Delete the AWS Bedrock IAM users and the stack in `infra/aws_cloudformation`; nothing on Cloudflare calls Bedrock.
- [x] Deleted the legacy `blog` / `blog-preview` Workers and D1 databases (no domains or routes, nothing in the repo used them). D1 exports: `towles-blog-archive/legacy-cf-blog-2026-10-11.tar.gz`.
