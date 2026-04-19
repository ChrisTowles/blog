/**
 * Build config for the `ui://aviation-answer` iframe bundle.
 *
 * Produces a single self-contained HTML file (`dist/index.html`) with all JS and CSS
 * inlined. `packages/blog/server/utils/mcp/aviation/ui-resource.ts` reads this file
 * at import time and serves its contents as the body of the UI resource.
 *
 * This config is intentionally standalone (not a Nuxt/Nitro entry) — mixing a second
 * iframe target into Nuxt's Vite pipeline fights the framework's lifecycle. Running
 * a tiny dedicated Vite build is the cleaner path, mirrors the upstream reference at
 * `@modelcontextprotocol/ext-apps/examples/basic-server-vanillajs/vite.config.ts`,
 * and integrates into the blog build via the `build:ui-bundle` script which runs
 * before `nuxt build`.
 */
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  root: __dirname,
  plugins: [viteSingleFile()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: isDevelopment ? 'inline' : false,
    cssMinify: !isDevelopment,
    minify: !isDevelopment,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  },
});
