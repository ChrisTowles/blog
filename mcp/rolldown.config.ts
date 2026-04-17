import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'server.ts',
  platform: 'node',
  output: {
    file: 'dist/server.mjs',
    format: 'esm',
  },
});
