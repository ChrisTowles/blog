/**
 * Nitro startup plugin — pre-warm DuckDB + httpfs for the aviation MCP tool.
 *
 * Runs once at container boot. Reads the 1-row pre-warm.parquet file to amortize
 * httpfs cold-start (2-5s) before the first real tool call arrives. See plan
 * Key Decisions — "Pre-warm DuckDB on cold start".
 *
 * Expected duration: <2s on a cold container (plan verification bar, line 453).
 * Failures are logged but don't block startup — the tool will still work, just
 * with a first-query latency penalty.
 */

import { defineNitroPlugin } from 'nitropack/runtime';
import { log } from 'evlog';
import { prewarmAviationDuckDb } from '../utils/mcp/aviation/duckdb';

export default defineNitroPlugin(() => {
  // Fire-and-forget so we don't block the server from accepting traffic if GCS
  // is slow. The first MCP request will await the same promise via the singleton.
  void (async () => {
    try {
      const { ms, skipped } = await prewarmAviationDuckDb();
      if (!skipped) {
        log.info({
          tag: 'mcp-aviation',
          message: `nitro startup prewarm complete in ${ms}ms`,
        });
      }
    } catch (e) {
      log.warn({
        tag: 'mcp-aviation',
        message: `nitro startup prewarm failed (non-fatal)`,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  })();
});
