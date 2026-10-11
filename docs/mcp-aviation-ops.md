# MCP Aviation — Operational Notes

Operational reference for `/mcp/aviation` on the blog Worker. See
`docs/aviation-schema.md` for the dataset's column-level schema.

## Architecture

The Worker cannot host DuckDB, so queries run in a Cloudflare Container:

```
Worker (sql-safety.ts)  ->  env.AVIATION (AviationContainer DO)  ->  services/aviation (Node + DuckDB)
                                                                        |
                                                                        v  httpfs, plain HTTP to r2.internal
Worker outbound handler (aviation-r2-s3.ts)  ->  env.MEDIA (R2: aviation/**/*.parquet)
```

- `packages/blog/server/utils/aviation-container.ts` exports `AviationContainer`
  (`defaultPort 8080`, `sleepAfter 10m`, `enableInternet = false`, only `R2_BUCKET` forwarded
  as container env) and intercepts the container's outbound traffic.
- `packages/blog/server/utils/aviation-r2-s3.ts` answers that traffic from the `MEDIA`
  binding: `GET`/`HEAD` of `/<bucket>/aviation/...` with `Range`, and `ListObjectsV2`
  for globs. Other buckets or prefixes get 403, other methods 405.
- `packages/blog/server/utils/mcp/aviation/duckdb.ts` is the client: one named
  instance (`primary`), `POST /query` and `POST /parse`, `GET /health`.
- `services/aviation/` is the image: an HTTP server on 8080 around `@duckdb/node-api`.
- SQL addresses data as `aviation://dims/aircraft.parquet`. The container rewrites
  that prefix to `s3://$R2_BUCKET/aviation/`, so staging and production share
  prompts and allowlists.

## Container posture

| Setting         | Value        | Why                                                                          |
| --------------- | ------------ | ---------------------------------------------------------------------------- |
| `instance_type` | `standard-1` | 1/2 vCPU, 4 GiB. DuckDB is capped at 2GB so aggregation never OOMs the VM.   |
| `max_instances` | `1`          | One instance serves all traffic; DuckDB runs concurrent connections itself.  |
| `sleepAfter`    | `10m`        | Idle container sleeps; the next query pays the cold start (below).           |
| Query timeout   | `30s`        | Interrupts the DuckDB connection; the Worker allows 20s more for cold start. |

Cold start is the image boot (httpfs is baked in, no download) plus the first
R2 metadata read. Calling `warmAviationContainer()` (a `/health` ping) when a
client lists tools hides most of it.

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

`max_instances = 1` and the 10-minute idle sleep bound container spend.
Anthropic's account-level spend cap is a separate control and must be configured manually
before launch (plan risks row, line 773).

## DuckDB lockdown

The container refuses anything that is not a single `SELECT`, independent of the
Worker's `sql-safety.ts`:

- `extractStatements` must yield exactly one statement and its type must be `SELECT`.
- After the `aviation://` rewrite, every `scheme://` in the SQL must start with
  `s3://$R2_BUCKET/aviation/` (no `..`); `duckdb_*()`, `current_setting()` and
  `getenv()` calls are rejected.
- Startup runs `SET enable_external_access = false`, `allowed_directories =
['s3://$R2_BUCKET/aviation/']` and `lock_configuration = true`, so computed
  paths (`concat('s3', '://…')`) outside the prefix and local files fail inside
  DuckDB, and the settings cannot be changed afterwards.
- Extension autoload/autoinstall and community/unsigned extensions are off;
  `httpfs` is installed at image build time.
- `memory_limit` / `threads` come from `AVIATION_DUCKDB_MEMORY_LIMIT` (default
  `2GB`) / `AVIATION_DUCKDB_THREADS` (default `2`).

Status codes from the container: `403` rejected SQL, `422` DuckDB error,
`504` timeout, `400` bad request, `413` body over 64 KB.

## Bucket access

The Parquet lives in the app's R2 bucket (`towles-blog-media`, staging
`towles-blog-media-staging`) under `aviation/`. The container holds no R2 credentials and
has no internet. DuckDB's httpfs is pointed at `r2.internal` over plain HTTP (dummy key
pair, path-style, `AVIATION_S3_ENDPOINT` overrides the host); the Worker intercepts that
host through `@cloudflare/containers` outbound interception and serves it from `env.MEDIA`.
`ContainerProxy` must stay exported from the Worker entry (see `nuxt.config.ts`).

- Worker config: `R2_BUCKET` is a `vars` entry in `wrangler.jsonc`; there are no R2
  secrets.
- Only the ETL needs an R2 API token (Object Read & Write), because it runs on a laptop
  and uploads through the S3 API.

## Local dev setup

1. Run the ETL against a real bucket (writes under the `aviation/` prefix):
   `R2_ACCOUNT_ID=… R2_BUCKET=… R2_ACCESS_KEY_ID=… R2_SECRET_ACCESS_KEY=… pnpm etl:aviation`
   (`packages/blog/scripts/etl-aviation.ts`). This auto-downloads FAA
   Registry (one zip) and drives BTS's ASP.NET form via headless Playwright
   to pull the latest 12 months of T-100 Market data (one download per
   month, skipping unpublished periods). Override the month count with
   `AVIATION_ETL_MONTHS=N`. Expect 5–10 min end-to-end on a healthy
   network; BTS's form is the long pole. `R2_ENDPOINT=http://host:port` targets any
   S3-compatible server instead, and
   `AVIATION_ETL_FIXTURE_DIR=packages/blog/scripts/__fixtures__/aviation` builds a tiny
   dataset with the real schema.
2. To run the container locally, give `wrangler dev` an environment that has the
   `containers`, `durable_objects` and `migrations` blocks (Docker required), copy Parquet
   into the local bucket with `wrangler r2 object put <bucket>/aviation/<file> --file …
--local`, and call the container through the Worker. Local `wrangler dev` supports
   outbound interception.
3. Smoke-test a running container: `cd services/aviation && npm install &&
AVIATION_SMOKE_URL=http://localhost:8080 npm test`. A bare `docker run` cannot reach
   data (nothing answers `r2.internal`), so point the smoke test at the `wrangler dev`
   container port.

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
