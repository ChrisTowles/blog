import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPlatformProxy } from 'wrangler';

const here = dirname(fileURLToPath(import.meta.url));

const migrationsDir = join(here, '../database/migrations');

/**
 * Boots wrangler's local D1 (in-memory, nothing persisted) and applies the same SQL migrations
 * that `wrangler d1 migrations apply` runs in deploys.
 */
export async function createTestD1() {
  const proxy = await getPlatformProxy<{ DB: D1Database }>({
    configPath: join(here, 'wrangler.test.jsonc'),
    persist: false,
  });

  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const statements = readFileSync(join(migrationsDir, file), 'utf8')
      .split('--> statement-breakpoint')
      .map((s) => s.trim())
      .filter(Boolean);

    for (const statement of statements) {
      await proxy.env.DB.prepare(statement).run();
    }
  }

  return { db: proxy.env.DB, dispose: () => proxy.dispose() };
}
