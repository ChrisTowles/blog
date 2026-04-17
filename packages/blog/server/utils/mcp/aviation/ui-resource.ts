/**
 * UI resource — `ui://aviation-answer`. Serves the pre-built iframe bundle;
 * structuredContent is delivered at runtime via the AppBridge, not embedded.
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
