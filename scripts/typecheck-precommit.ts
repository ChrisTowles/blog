#!/usr/bin/env -S pnpx tsx
import { spawnSync } from 'node:child_process';
import net from 'node:net';
import { consola } from 'consola';
import dotenv from 'dotenv';
import { findUpSync } from 'find-up';

/**
 * Pre-commit wrapper around `pnpm typecheck`. Regenerating `.nuxt` while a dev server
 * runs against it makes that server reload mid-write and abort on a native addon's
 * `Napi::Error`, coming back without its Content tables — so typecheck is skipped
 * whenever UI_PORT is listening, and CI typechecks every push instead. Detection is by
 * port, not process name; CLAUDE.md records why that and a separate buildDir failed.
 */

const envPath = findUpSync('.env');
if (envPath) dotenv.config({ path: envPath, quiet: true });

const port = Number(process.env.UI_PORT) || 3000;

/** Nuxt may bind IPv4 or IPv6, so check both before declaring the port free. */
function portInUse(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host });
    const done = (result: boolean) => {
      socket.destroy();
      resolve(result);
    };
    socket.once('connect', () => done(true));
    socket.once('error', () => done(false));
    socket.setTimeout(500, () => done(false));
  });
}

const devServerRunning = (await portInUse('127.0.0.1')) || (await portInUse('::1'));

if (devServerRunning) {
  consola.warn(`A dev server is listening on port ${port} — skipping typecheck for this commit.`);
  consola.info('Running it now would abort that server and blank its content database.');
  consola.info('CI typechecks every push and PR, so this is still enforced.');
  process.exit(0);
}

const result = spawnSync('pnpm', ['typecheck'], { stdio: 'inherit' });
process.exit(result.status ?? 1);
