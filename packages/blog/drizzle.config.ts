import { defineConfig } from 'drizzle-kit';

// Schema generation only. Migrations are applied by `wrangler d1 migrations apply`.
export default defineConfig({
  dialect: 'sqlite',
  schema: './server/database/schema',
  out: './server/database/migrations',
});
