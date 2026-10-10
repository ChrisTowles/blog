/**
 * Shared loader for MCP iframe bundles (aviation, echo). The built `dist/index.html` files ship
 * in the Worker via `nitro.serverAssets` (base `mcp-ui`), so `pnpm build:ui-bundle` has to run
 * before the Nuxt build. In dev the assets storage reads from disk, so watch rebuilds land live.
 */

import { extractErrorMessage } from '../../../shared/error-util';
import { readServerAssetText } from '../server-assets';

export interface BundleLoaderOptions {
  /** Path inside `mcp-ui/`, e.g. 'aviation-answer/dist/index.html'. */
  assetKey: string;
  /** Label used in placeholder HTML when the bundle is missing. */
  label: string;
  /** URI shown in the placeholder for the user-facing error. */
  uri: string;
}

export interface BundleLoader {
  read(): Promise<string>;
}

export function createBundleLoader({ assetKey, label, uri }: BundleLoaderOptions): BundleLoader {
  const placeholder = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${label} (bundle missing)</title></head>
<body><p>${uri} bundle not built — run <code>pnpm build:ui-bundle</code>.</p></body></html>`;

  async function read(): Promise<string> {
    try {
      const html = await readServerAssetText('mcp-ui', assetKey);

      if (html !== null) return html;

      console.warn(`[ui-bundle] ${label} bundle ${assetKey} not found; serving placeholder.`);
    } catch (err) {
      console.warn(
        `[ui-bundle] failed to read ${label} bundle ${assetKey}; serving placeholder.`,
        extractErrorMessage(err),
      );
    }

    return placeholder;
  }

  return { read };
}
