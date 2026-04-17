# MCP Aviation — Operational Notes

Operational reference for `/mcp/aviation` co-hosted on the blog Cloud Run
service. Complements the architectural plan at
`docs/plans/2026-04-14-001-feat-mcp-ui-in-chat-plan.md`.

## Cloud Run posture

| Setting            | Value  | Why                                                                               |
| ------------------ | ------ | --------------------------------------------------------------------------------- |
| `memory`           | `2Gi`  | DuckDB in-process aggregation on 15M-row fact table spikes over 512Mi.            |
| `min_instances`    | `1`    | Keep DuckDB + httpfs warm. Pre-warm plugin reads a 1-row parquet at boot.         |
| `max_instances`    | `2`    | Cost bound — demo should not runaway-scale under abuse.                           |
| `timeout`          | `300s` | Generous head-room for LLM → SQL → DuckDB → iframe handshake on cold-start.       |
| `session_affinity` | `true` | Reduces the `Mcp-Session-Id`-across-instances risk. Best-effort, not a guarantee. |

## Session semantics & reconnect

`Mcp-Session-Id` is stored in-process per `StreamableHTTPServerTransport`. On a
pod rotation (autoscaler churn, deploy), the session disappears and subsequent
requests from that session return HTTP 404.

- **Blog chat** handles this via `useAviationMcp.ts`: on a first 404, we
  dispose the client and reconnect silently; a second 404 surfaces to the UI.
- **Claude Desktop** uses the `mcp-remote` stdio bridge (or native remote HTTP
  on newer builds); both retry session establishment on 404.

## Rate limiting

- Middleware: `packages/blog/server/middleware/mcp-rate-limit.ts`
- Scope: any path starting with `/mcp/`.
- Default: 60 requests per 5 minutes per IP. Overridable via `MCP_RATE_LIMIT_RPM`.
- State: module-level `Map<ip, Bucket>` — process-local. Paired with `min=1` +
  session-affinity this is good enough for a personal-blog traffic profile. If
  traffic patterns require, we'd move to Redis/Memorystore (deferred per plan
  Alternative Approaches).

## Cost backstop

The GCP $10 spend cap auto-offlines the service if abuse trips it. Anthropic's
account-level spend cap is a separate control and must be configured manually
before launch (plan risks row, line 773).

## DuckDB lockdown

Aviation's DuckDB connection is hardened at startup:

- `autoload_known_extensions=false`, `autoinstall_known_extensions=false`,
  `allow_community_extensions=false`, `allow_unsigned_extensions=false`.
- `httpfs` explicitly installed + loaded (needed for `gs://` reads).
- `CREATE SECRET (TYPE GCS, KEY_ID, SECRET)` with HMAC creds for the private
  aviation bucket. Without this, DuckDB picks up `AWS_*` env vars (used for
  Bedrock) as S3-style HMAC signatures and fails with `SignatureDoesNotMatch`.
- `disabled_filesystems='LocalFileSystem'` applied after `httpfs` load.
- `memory_limit` / `threads` configurable via `AVIATION_DUCKDB_MEMORY_LIMIT`
  (default `768MB`) / `AVIATION_DUCKDB_THREADS` (default `4`).

## Bucket auth

The aviation Parquet bucket is **private** — no `allUsers` IAM. Reads are
authenticated via GCS HMAC keys:

- **Cloud Run**: Terraform creates a `google_storage_hmac_key` for the Cloud
  Run service account (`infra/terraform/modules/shared/main.tf`), stores the
  access_id and secret in Secret Manager (`gcs-hmac-key-id-{env}` /
  `gcs-hmac-secret-{env}`), and injects them as `GCS_HMAC_KEY_ID` /
  `GCS_HMAC_SECRET` env vars into the service.
- **Rotate**: `terraform taint module.shared.google_storage_hmac_key.aviation`
  then apply. Regenerates the key and pushes a new Secret Manager version;
  Cloud Run picks it up on next revision.
- **Startup validation**: `server/plugins/mcp-aviation-warmup.ts` calls
  `requireAviationGcsCredentials()` synchronously at boot. Missing creds crash
  the process with an actionable error.

## Local dev setup

The bucket is not shared — set up your own:

1. Create your own GCS bucket in your dev GCP project.
2. Create a service account and grant it `roles/storage.objectViewer` on the
   bucket (and `objectCreator` if you'll re-run the ETL).
3. Generate HMAC keys: `gcloud storage hmac create <SA_EMAIL>`. Note the
   `access_id` and `secret`.
4. Run the ETL into your bucket (writes under the `aviation/` prefix):
   `MCP_DATA_BUCKET=your-bucket pnpm etl:aviation` (from
   `packages/blog/scripts/etl-aviation.ts`). This auto-downloads FAA
   Registry (one zip) and drives BTS's ASP.NET form via headless Playwright
   to pull the latest 12 months of T-100 Market data (one download per
   month, skipping unpublished periods). Override the month count with
   `AVIATION_ETL_MONTHS=N`. Expect 5–10 min end-to-end on a healthy
   network; BTS's form is the long pole.
5. In `.env`, set `MCP_DATA_BUCKET`, `GCS_HMAC_KEY_ID`, `GCS_HMAC_SECRET`.

`pnpm dev` hard-fails at startup if the HMAC vars are missing — the error
message points back here.

## BTS T-100 download

BTS only exposes T-100 Market data through the ASP.NET form at
`https://www.transtats.bts.gov/DL_SelectFields.asp?gnoyr_VQ=FMF`. There is
no direct-download API and no per-month PREZIP file. The ETL drives the
form with headless Chromium (Playwright) — selects year + month, fires the
`__doPostBack` for `chkAllVars` and `chkDownloadZip`, clicks the download
button, waits on the download event, then extracts the inner
`T_T100_MARKET_ALL_CARRIER.csv` into `bts-t100-<yyyymm>.csv`. Months with
no published data return a header-only CSV (<50 KB); those are skipped and
the loop walks one month further back.

If BTS renames the table (re-check `Tables.asp?QO_VQ=EEE`), the
`gnoyr_VQ=FMF` slug in `etl-aviation.ts:BTS_T100_FORM_URL` needs to change.

## Replay-fetch endpoint

`GET /mcp/aviation/resource?uri=ui://aviation-answer` serves the iframe
bundle with `Cache-Control: public, max-age=31536000, immutable`. The bundle
is immutable per deploy (re-read at module import). Allowlist is explicit — a
future second ui resource has to be opted in.

## Rollback

All aviation-demo surfaces are additive. A rollback to a pre-Unit-3 revision
leaves the rest of the blog intact.
