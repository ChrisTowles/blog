#!/usr/bin/env -S pnpx tsx
import { $, chalk, question } from 'zx'

const PROXY_PORT = parseInt(process.env.PROXY_PORT || '5433')

const ENV_CONFIG = {
  staging: { project: 'blog-towles-staging' },
  production: { project: 'blog-towles-production' },
} as const

type Environment = keyof typeof ENV_CONFIG

async function promptEnvironment(): Promise<Environment> {
  console.log('Select environment:')
  console.log('  1) staging')
  console.log('  2) production')

  const choice = await question('Enter choice [1-2]: ')

  switch (choice.trim()) {
    case '1': return 'staging'
    case '2': return 'production'
    default:
      console.error(chalk.red('Invalid choice'))
      process.exit(1)
  }
}

async function main() {
  const env = await promptEnvironment()
  const { project } = ENV_CONFIG[env]

  console.log(chalk.yellow(`🔑 Fetching secrets for ${env} in project ${project}...`))

  const connectionString = (
    await $`gcloud secrets versions access latest --secret="db-connection-string" --project="${project}"`
  ).stdout.trim()

  const connectionName = (
    await $`gcloud secrets versions access latest --secret="db-connection-name" --project="${project}"`
  ).stdout.trim()

  console.log(chalk.gray(`Connection name: ${connectionName}`))
  console.log(chalk.gray(`Connection string: ${connectionString}`))

  // Build localhost proxy URL by replacing @localhost/db?host=... with @localhost:PORT/db
  const proxyConnectionString = connectionString.replace(
    /@localhost\/([^?]+)\?host=.*/,
    `@localhost:${PROXY_PORT}/$1`
  )

  console.log()
  console.log(chalk.green(`Use this connection string locally (connects via proxy on port ${PROXY_PORT}):`))
  console.log(chalk.cyan(`  ${proxyConnectionString}`))

  console.log()
  console.log(chalk.yellow(`🔌 Starting Cloud SQL Proxy on port ${PROXY_PORT}...`))
  await $`cloud-sql-proxy --port ${PROXY_PORT} ${connectionName}`
}

main().catch((err) => {
  console.error(chalk.red('❌ Error:'), err)
  process.exit(1)
})
