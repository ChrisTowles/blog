#!/usr/bin/env -S pnpx tsx
import { spawnSync } from 'node:child_process';
import net from 'node:net';
import { consola } from 'consola';
import dotenv from 'dotenv';
import { findUpSync } from 'find-up';

/**
 * Pre-commit wrapper around `pnpm typecheck`.
 *
 * `nuxt typecheck` regenerates the build dir. When a `nuxt dev` server is
 * running against that same `.nuxt`, the dev server reloads mid-write and a
 * native addon (better-sqlite3 / duckdb) throws a Napi::Error that aborts the
 * process outright:
 *
 *     terminate called after throwing an instance of 'Napi::Error'
 *     Aborted (core dumped)
 *
 * The dev server then usually restarts without its Nuxt Content tables
 * ("no such table: _content_index"), which renders the home page blank because
 * index.vue is wrapped in `v-if="page"` — so it surfaces as "the site is
 * broken" rather than "typecheck killed my server".
 *
 * Since pre-commit runs on every commit, this killed the dev server routinely.
 * Skip typecheck when a dev server is up; CI runs `pnpm typecheck` on every
 * push and pull request, so types stay enforced either way.
 *
 * Detection is by port, not process name. `pgrep -f "nuxt.mjs dev"` was tried
 * first and matched any shell whose command line merely contained that string
 * — including the pre-commit hook itself — which would have silently skipped
 * typecheck forever.
 *
 * Isolating typecheck into its own build dir was also tried and rejected: a
 * fresh build dir makes nuxt-og-image generate an empty template union, so
 * `defineOgImage('SaaS', ...)` fails with "not assignable to type 'never'" —
 * false errors that would block every commit.
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
