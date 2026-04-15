/**
 * UI resource — `ui://aviation-answer`.
 *
 * Unit 4 wiring: reads the pre-built single-file HTML bundle at module-import
 * time and serves its bytes as the resource contents. The bundle is produced by
 * `pnpm --filter @chris-towles/blog build:ui-bundle` (Vite + vite-plugin-singlefile)
 * from `packages/blog/mcp-ui/aviation-answer/` and lands at
 * `mcp-ui/aviation-answer/dist/index.html`.
 *
 * The bundle is immutable per deploy (see plan Key Decision on persisted
 * UiResourcePart), so reading once at startup + caching is correct. Hosts may
 * `resources/read` the URI directly; they'll get the bundle and then drive its
 * lifecycle via the AppBridge postMessage flow.
 *
 * The structuredContent payload (sql, answer, chart_option, etc.) is NOT embedded
 * in the HTML — it arrives via `sendToolResult` at iframe runtime.
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AVIATION_UI_RESOURCE_URI } from '../../../../shared/mcp-aviation-types';
import { extractErrorMessage } from '../../../../shared/error-util';
import { registerAppResource } from '@modelcontextprotocol/ext-apps/server';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Absolute path to the built iframe bundle.
 * Source tree layout: packages/blog/server/utils/mcp/aviation/ui-resource.ts →
 *                     packages/blog/mcp-ui/aviation-answer/dist/index.html
 */
const BUNDLE_PATH = resolve(__dirname, '../../../../mcp-ui/aviation-answer/dist/index.html');

/**
 * Minimal placeholder used when the built bundle is missing — e.g. during
 * test runs that start before `build:ui-bundle` has produced a dist. We log
 * loudly so CI catches the drift; we do NOT fall back to a fake payload,
 * because that would mask an actual build failure in production.
 */
const MISSING_BUNDLE_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Aviation answer (bundle missing)</title></head>
<body><p>ui://aviation-answer bundle not built — run <code>pnpm build:ui-bundle</code>.</p></body></html>`;

let cachedBundle: string | undefined;

function loadBundle(): string {
  if (cachedBundle !== undefined) return cachedBundle;
  try {
    cachedBundle = readFileSync(BUNDLE_PATH, 'utf8');
    return cachedBundle;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      `[ui-resource] failed to read aviation-answer bundle at ${BUNDLE_PATH}; serving placeholder. Did you run \`pnpm build:ui-bundle\`?`,
      extractErrorMessage(err),
    );
    cachedBundle = MISSING_BUNDLE_HTML;
    return cachedBundle;
  }
}

/**
 * Read the pre-built iframe bundle (cached after first read).
 * Used both by the resource read handler and by aviation-tools to populate the
 * EmbeddedResource returned from ask_aviation.
 */
export function readAviationBundle(): string {
  return loadBundle();
}

/** Exported for tests — reset the in-memory cache between test files. */
export function __resetAviationBundleCache(): void {
  cachedBundle = undefined;
}

/**
 * Register the ui://aviation-answer resource. The resource read always returns
 * the same immutable HTML bundle; structuredContent is delivered via the
 * CallToolResult → AppBridge `tool-result` notification at iframe runtime.
 */
export function registerAviationUiResource(server: McpServer): void {
  registerAppResource(
    server,
    'Aviation answer',
    AVIATION_UI_RESOURCE_URI,
    {
      description:
        'Interactive answer bundle for the ask_aviation tool (ECharts + SQL + follow-ups).',
      _meta: {
        ui: {
          csp: {
            connectDomains: [],
            resourceDomains: ['self'],
            frameDomains: [],
          },
        },
      },
    },
    async () => ({
      contents: [
        {
          uri: AVIATION_UI_RESOURCE_URI,
          mimeType: 'text/html;profile=mcp-app',
          text: readAviationBundle(),
        },
      ],
    }),
  );
}
