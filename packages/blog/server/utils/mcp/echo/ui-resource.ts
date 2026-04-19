import { ECHO_UI_RESOURCE_URI } from '../../../../shared/mcp-echo-types';
import { createBundleLoader } from '../ui-bundle-loader';
import { registerAppResource } from '@modelcontextprotocol/ext-apps/server';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const loader = createBundleLoader({
  relPath: 'mcp-ui/echo/dist/index.html',
  label: 'Echo',
  uri: ECHO_UI_RESOURCE_URI,
});

export const ECHO_UI_META = {
  ui: {
    csp: { connectDomains: [], resourceDomains: ['self'], frameDomains: [] },
  },
};

export function readEchoBundle(): string {
  return loader.read();
}

/** @internal */
export function __resetEchoBundleCache(): void {
  loader.reset();
}

export function registerEchoUiResource(server: McpServer): void {
  registerAppResource(
    server,
    'Echo result',
    ECHO_UI_RESOURCE_URI,
    {
      description: 'Simple echo card for testing MCP UI resource rendering.',
      _meta: ECHO_UI_META,
    },
    async () => ({
      contents: [
        {
          uri: ECHO_UI_RESOURCE_URI,
          mimeType: 'text/html;profile=mcp-app',
          text: readEchoBundle(),
        },
      ],
    }),
  );
}
