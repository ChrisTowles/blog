import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: '.',
  },
  resolve: {
    alias: {
      '~~/': resolve(__dirname, '../blog/') + '/',
    },
  },
});
