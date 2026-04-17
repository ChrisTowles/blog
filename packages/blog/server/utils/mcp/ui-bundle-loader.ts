/**
 * Shared loader for MCP iframe bundles (aviation, echo).
 *
 * Bundles live at `<packages/blog>/mcp-ui/<subdir>/dist/index.html` and are
 * ~100KB-1MB of HTML. In prod we cache once (immutable per deploy). In dev we
 * cache by mtime so `build:ui-bundle:watch` rebuilds reflect live without
 * re-reading the file on every MCP tool call.
 *
 * Bundle path is resolved from `process.cwd()` rather than `__dirname` because
 * Nitro dev bundles server code into `.nuxt/dev/`, which breaks relative
 * walks up from the source file.
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { extractErrorMessage } from '../../../shared/error-util';

export interface BundleLoaderOptions {
  /** Relative path inside packages/blog, e.g. 'mcp-ui/aviation-answer/dist/index.html'. */
  relPath: string;
  /** Label used in placeholder HTML when the bundle is missing. */
  label: string;
  /** URI shown in the placeholder for the user-facing error. */
  uri: string;
}

export interface BundleLoader {
  read(): string;
  /** Test-only cache reset. */
  reset(): void;
  /** Absolute path the loader reads from (mainly for debugging). */
  path: string;
}

const IS_PROD = process.env.NODE_ENV === 'production';

function resolveBundlePath(relPath: string): string {
  const candidates = [
    resolve(process.cwd(), relPath),
    resolve(process.cwd(), 'packages/blog', relPath),
  ];
  return candidates.find((p) => existsSync(p)) ?? candidates[0]!;
}

export function createBundleLoader({ relPath, label, uri }: BundleLoaderOptions): BundleLoader {
  const path = resolveBundlePath(relPath);
  const placeholder = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${label} (bundle missing)</title></head>
<body><p>${uri} bundle not built — run <code>pnpm build:ui-bundle</code>.</p></body></html>`;

  let cached: string | undefined;
  let cachedMtimeMs = -1;

  function read(): string {
    if (IS_PROD && cached !== undefined) return cached;
    try {
      // Stat BEFORE read so the mtime we record matches the bytes we cache,
      // even if the watcher rewrites the file between calls.
      const mtime = IS_PROD ? 0 : statSync(path).mtimeMs;
      if (!IS_PROD && cached !== undefined && mtime === cachedMtimeMs) return cached;
      const html = readFileSync(path, 'utf8');
      cached = html;
      cachedMtimeMs = mtime;
      return html;
    } catch (err) {
      console.warn(
        `[ui-bundle] failed to read ${label} bundle at ${path}; serving placeholder.`,
        extractErrorMessage(err),
      );
      return placeholder;
    }
  }

  function reset(): void {
    cached = undefined;
    cachedMtimeMs = -1;
  }

  return { read, reset, path };
}
