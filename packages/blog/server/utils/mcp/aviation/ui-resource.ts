/**
 * UI resource — `ui://aviation-answer`. Serves the pre-built iframe bundle;
 * structuredContent is delivered at runtime via the AppBridge, not embedded.
 *
 * CSP: the iframe POSTs to `/mcp/aviation/query` on the MCP server origin to
 * stream the answer. `connectDomains` must include that origin so the host's
 * sandbox allows the fetch. The origin is injected at registration time from
 * the Nuxt runtime config (`NUXT_PUBLIC_SITE_URL`).
 */

import { AVIATION_UI_RESOURCE_URI } from '../../../../shared/mcp-aviation-types';
import { createBundleLoader } from '../ui-bundle-loader';
import { registerAppResource } from '@modelcontextprotocol/ext-apps/server';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const loader = createBundleLoader({
  relPath: 'mcp-ui/aviation-answer/dist/index.html',
  label: 'Aviation answer',
  uri: AVIATION_UI_RESOURCE_URI,
});

export function readAviationBundle(): string {
  return loader.read();
}

/** @internal */
export function __resetAviationBundleCache(): void {
  loader.reset();
}

/**
 * Normalize a URL to a bare origin (`https://host[:port]`), stripping any path.
 * Returns an empty string on invalid input so the caller can skip the entry.
 */
function toOrigin(raw: string | undefined | null): string {
  if (!raw) return '';
  try {
    return new URL(raw).origin;
  } catch {
    return '';
  }
}

export function registerAviationUiResource(server: McpServer, serverOrigin: string): void {
  const origin = toOrigin(serverOrigin);
  const connectDomains = origin ? [origin] : [];

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
            connectDomains,
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
          _meta: {
            ui: {
              csp: {
                connectDomains,
                resourceDomains: ['self'],
                frameDomains: [],
              },
            },
          },
        },
      ],
    }),
  );
}
