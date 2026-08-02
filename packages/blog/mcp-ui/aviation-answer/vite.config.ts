/**
 * Build config for the `ui://aviation-answer` iframe bundle — one self-contained
 * `dist/index.html` that `server/utils/mcp/aviation/ui-resource.ts` reads at import
 * time. Standalone rather than a Nuxt/Nitro entry because a second iframe target
 * fights Nuxt's Vite lifecycle; `build:ui-bundle` runs it before `nuxt build`.
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
