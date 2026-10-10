import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { ServerAssets } from '../utils/server-assets';

/** `ServerAssets` backed by the real files under `dir`, keyed like Nitro's assets storage. */
export function createFsAssets(dir: string, pattern: RegExp): ServerAssets {
  const files = new Map<string, string>();

  function walk(current: string, prefix: string): void {
    for (const name of readdirSync(current)) {
      const full = join(current, name);
      const key = prefix ? `${prefix}:${name}` : name;

      if (statSync(full).isDirectory()) walk(full, key);
      else if (pattern.test(key)) files.set(key, readFileSync(full, 'utf8'));
    }
  }

  walk(dir, '');

  return {
    readText: async (_base, key) => files.get(key.replaceAll('/', ':')) ?? null,
    listKeys: async () => [...files.keys()],
  };
}
