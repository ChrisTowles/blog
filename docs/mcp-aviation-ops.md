# MCP Aviation — Operational Notes

Operational reference for `/mcp/aviation` on the blog Worker. See
`docs/aviation-schema.md` for the dataset's column-level schema.

## Architecture

The Worker cannot host DuckDB, so queries run in a Cloudflare Container:

```
Worker (sql-safety.ts)  ->  env.AVIATION (AviationContainer DO)  ->  services/aviation (Node + DuckDB)
                                                                        |
                                                                        v  httpfs over R2's S3 API
                                                                      R2: s3://<bucket>/aviation/**/*.parquet
```

- `packages/blog/server/utils/aviation-container.ts` exports `AviationContainer`
  (`defaultPort 8080`, `sleepAfter 10m`, R2 settings forwarded as container env).
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

## Bucket auth

The Parquet lives in the app's R2 bucket (`towles-blog-media`, staging
`towles-blog-media-staging`) under `aviation/`. The container reads it through R2's
S3 API with an R2 API token, and the ETL writes with the same token family.

- Create an R2 API token scoped to the one bucket: **Object Read only** for the
  container, **Object Read & Write** for the ETL. R2 shows the access key id and
  secret once.
- Worker config: `R2_ACCOUNT_ID` and `R2_BUCKET` are `vars` in `wrangler.jsonc`;
  `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` are secrets
  (`wrangler secret put R2_ACCESS_KEY_ID`, per environment).
- Rotate: create a new token, `wrangler secret put` both values, then delete the old
  token. The container reads them when it next starts; redeploy, or wait out `sleepAfter`,
  to force that.

## Local dev setup

The bucket is not shared. Either point at a real R2 bucket or a local S3 server:

1. Create an R2 bucket and a Read & Write API token (see above).
2. Run the ETL (writes under the `aviation/` prefix):
   `R2_ACCOUNT_ID=… R2_BUCKET=… R2_ACCESS_KEY_ID=… R2_SECRET_ACCESS_KEY=… pnpm etl:aviation`
   (`packages/blog/scripts/etl-aviation.ts`). This auto-downloads FAA
   Registry (one zip) and drives BTS's ASP.NET form via headless Playwright
   to pull the latest 12 months of T-100 Market data (one download per
   month, skipping unpublished periods). Override the month count with
   `AVIATION_ETL_MONTHS=N`. Expect 5–10 min end-to-end on a healthy
   network; BTS's form is the long pole.
3. Build and run the container against it:

   ```bash
   docker build -t towles-aviation services/aviation
   docker run --rm -p 8080:8080 -e R2_ACCOUNT_ID -e R2_BUCKET \
     -e R2_ACCESS_KEY_ID -e R2_SECRET_ACCESS_KEY towles-aviation
   curl -s localhost:8080/query -H 'content-type: application/json' \
     -d '{"sql":"SELECT COUNT(*) AS n FROM '"'"'aviation://dims/aircraft.parquet'"'"'"}'
   ```

   `R2_ENDPOINT=http://host:port` (container and ETL) targets any S3-compatible
   server instead of R2, e.g. SeaweedFS for an offline loop. With
   `AVIATION_ETL_FIXTURE_DIR=packages/blog/scripts/__fixtures__/aviation` the ETL
   builds a tiny dataset with the real schema.

4. Smoke-test a running container: `cd services/aviation && npm install &&
AVIATION_SMOKE_URL=http://localhost:8080 npm test`.

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
