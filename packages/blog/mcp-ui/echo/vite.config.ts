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
