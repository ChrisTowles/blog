import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load package .env, then root .env (root values fill in missing vars).
// No find-up here: drizzle-kit compiles this config as CJS, and find-up >= 7
// is ESM-only. drizzle-kit always runs from packages/blog, so the paths are fixed.
dotenv.config({ path: ['.env', '../../.env'], quiet: true });

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/database/schema',
  out: './server/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
