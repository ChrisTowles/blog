#!/usr/bin/env -S pnpx tsx
import { $, question } from 'zx';
import { consola } from 'consola';

const PROXY_PORT = parseInt(process.env.PROXY_PORT || '5433');

const ENV_CONFIG = {
  staging: { project: 'blog-towles-staging' },
  production: { project: 'blog-towles-production' },
} as const;

type Environment = keyof typeof ENV_CONFIG;

async function promptEnvironment(): Promise<Environment> {
  consola.log('Select environment:');
  consola.log('  1) staging');
  consola.log('  2) production');

  const choice = await question('Enter choice [1-2]: ');

  switch (choice.trim()) {
    case '1':
      return 'staging';
    case '2':
      return 'production';
    default:
      consola.error('Invalid choice');
      process.exit(1);
  }
}

async function main() {
  const env = await promptEnvironment();
  const { project } = ENV_CONFIG[env];

  consola.start(`Fetching secrets for ${env} in project ${project}...`);

  const connectionString = (
    await $`gcloud secrets versions access latest --secret="db-connection-string" --project="${project}"`
  ).stdout.trim();

  const connectionName = (
    await $`gcloud secrets versions access latest --secret="db-connection-name" --project="${project}"`
  ).stdout.trim();

  consola.info(`Connection name: ${connectionName}`);
  consola.info(`Connection string: ${connectionString}`);

  // Build localhost proxy URL by replacing @localhost/db?host=... with @localhost:PORT/db
  const proxyConnectionString = connectionString.replace(
    /@localhost\/([^?]+)\?host=.*/,
    `@localhost:${PROXY_PORT}/$1`,
  );

  consola.box(
    `Use this connection string locally (connects via proxy on port ${PROXY_PORT}):\n\n${proxyConnectionString}`,
  );

  consola.start(`Starting Cloud SQL Proxy on port ${PROXY_PORT}...`);
  await $`cloud-sql-proxy --port ${PROXY_PORT} ${connectionName}`;
}

main().catch((err) => {
  consola.error('Error:', err);
  process.exit(1);
});
