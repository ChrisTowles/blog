/**
 * Read-only access to files that Nitro `serverAssets` ships inside the Worker bundle (see
 * `nitro.serverAssets` in nuxt.config.ts). A Worker has no filesystem, so anything the server
 * reads at runtime must come through here rather than `node:fs`.
 */
import { useStorage } from 'nitropack/runtime';
import { z } from 'zod';

export type ServerAssetBase = 'skills' | 'mcp-ui';

const textSchema = z.string();

/** `key` is relative to the asset base directory; `/` and `:` both work as separators. */
export async function readServerAssetText(
  base: ServerAssetBase,
  key: string,
): Promise<string | null> {
  const raw: unknown = await useStorage(`assets:${base}`).getItem(key.replaceAll('/', ':'));
  const parsed = textSchema.safeParse(raw);

  return parsed.success ? parsed.data : null;
}

export async function listServerAssetKeys(base: ServerAssetBase): Promise<string[]> {
  return useStorage(`assets:${base}`).getKeys();
}

/** Injection seam so callers can be tested against real files instead of the Nitro storage. */
export interface ServerAssets {
  readText(base: ServerAssetBase, key: string): Promise<string | null>;
  listKeys(base: ServerAssetBase): Promise<string[]>;
}

export const bundledAssets: ServerAssets = {
  readText: readServerAssetText,
  listKeys: listServerAssetKeys,
};
