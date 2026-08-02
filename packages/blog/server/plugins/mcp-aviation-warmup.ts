/**
 * Nitro startup plugin — reads the 1-row pre-warm.parquet at container boot to
 * amortize httpfs cold-start (2-5s, budgeted <2s) before the first aviation tool
 * call. Missing HMAC creds hard-fail here: the tool is structurally broken without
 * them. A prewarm network error is not fatal — the first request re-awaits it.
 */

import { defineNitroPlugin } from 'nitropack/runtime';
import { log } from 'evlog';
import { prewarmAviationDuckDb, requireAviationGcsCredentials } from '../utils/mcp/aviation/duckdb';
import { extractErrorMessage } from '../../shared/error-util';

export default defineNitroPlugin(() => {
  // Nitro boots this plugin during `nuxt build` prerender too, where runtime
  // secrets like GCS_HMAC_* aren't available. Skip there — the check fires
  // again at real container boot.
  if (import.meta.prerender) return;

  // Hard-fail startup if HMAC creds are missing. The aviation bucket is private
  // and the MCP tool will never work without them, so surface the misconfig
  // immediately instead of later as an opaque 403 from the first user request.
  requireAviationGcsCredentials();

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
        error: extractErrorMessage(e),
      });
    }
  })();
});
