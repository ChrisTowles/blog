import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { defineConfig } from 'drizzle-kit';
import { findUpSync } from 'find-up';

// Load package .env, then root .env (root values fill in missing vars)
const packageEnv = findUpSync('.env');
if (packageEnv) {
  dotenv.config({ path: packageEnv });
  const rootEnv = findUpSync('.env', { cwd: join(dirname(packageEnv), '..') });
  if (rootEnv && rootEnv !== packageEnv) {
    dotenv.config({ path: rootEnv });
  }
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
