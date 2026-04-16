import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ECHO_UI_RESOURCE_URI } from '../../../../shared/mcp-echo-types';
import { extractErrorMessage } from '../../../../shared/error-util';
import { registerAppResource } from '@modelcontextprotocol/ext-apps/server';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BUNDLE_PATH = resolve(__dirname, '../../../../mcp-ui/echo/dist/index.html');

const MISSING_BUNDLE_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Echo (bundle missing)</title></head>
<body><p>ui://echo-result bundle not built — run <code>pnpm build:ui-bundle</code>.</p></body></html>`;

let cachedBundle: string | undefined;

function loadBundle(): string {
  if (cachedBundle !== undefined) return cachedBundle;
  try {
    cachedBundle = readFileSync(BUNDLE_PATH, 'utf8');
    return cachedBundle;
  } catch (err) {
    console.warn(
      `[ui-resource] failed to read echo bundle at ${BUNDLE_PATH}; serving placeholder.`,
      extractErrorMessage(err),
    );
    cachedBundle = MISSING_BUNDLE_HTML;
    return cachedBundle;
  }
}

export function readEchoBundle(): string {
  return loadBundle();
}

export function __resetEchoBundleCache(): void {
  cachedBundle = undefined;
}

export function registerEchoUiResource(server: McpServer): void {
  registerAppResource(
    server,
    'Echo result',
    ECHO_UI_RESOURCE_URI,
    {
      description: 'Simple echo card for testing MCP UI resource rendering.',
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
          uri: ECHO_UI_RESOURCE_URI,
          mimeType: 'text/html;profile=mcp-app',
          text: readEchoBundle(),
        },
      ],
    }),
  );
}
