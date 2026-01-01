#!/usr/bin/env -S pnpmx tsx
import 'zx/globals'
import pg from 'pg'

const PROJECT_ID = 'blog-towles-staging'
const ENVIRONMENT = 'staging'

async function main() {
  console.log(chalk.yellow('🔑 Fetching database secrets from Secret Manager...'))

  // Get connection string
  const connectionString = (
    await $`gcloud secrets versions access latest --secret="${ENVIRONMENT}-db-connection-string" --project="${PROJECT_ID}"`
  ).stdout.trim()

  // Get connection name for Cloud SQL Proxy
  const connectionName = (
    await $`gcloud secrets versions access latest --secret="${ENVIRONMENT}-db-connection-name" --project="${PROJECT_ID}"`
  ).stdout.trim()

  console.log(chalk.green(`✅ Connection name: ${connectionName}`))
  console.log(chalk.gray(`   Connection string: ${connectionString}`))

  // Parse the connection string to extract parts
  const url = new URL(connectionString)
  console.log(chalk.gray(`   Host: ${url.hostname}`))
  console.log(chalk.gray(`   Port: ${url.port}`))
  console.log(chalk.gray(`   Database: ${url.pathname.slice(1).split('?')[0]}`))
  console.log(chalk.gray(`   User: ${url.username}`))

  // Check if cloud-sql-proxy is installed
  try {
    await $`which cloud-sql-proxy`.quiet()
  } catch {
    console.log(chalk.red('❌ cloud-sql-proxy not found. Install it:'))
    console.log(chalk.gray('   brew install cloud-sql-proxy'))
    console.log(chalk.gray('   # or: gcloud components install cloud-sql-proxy'))
    process.exit(1)
  }

  // Kill any existing cloud-sql-proxy processes
  const existing = await $`pgrep -f cloud-sql-proxy`.quiet().nothrow()
  if (existing.stdout.trim()) {
    console.log(chalk.yellow('🧹 Killing existing cloud-sql-proxy...'))
    await $`pkill -f cloud-sql-proxy`.quiet().nothrow()
    await sleep(1000)
  }

  // Start Cloud SQL Proxy in background
  const PROXY_PORT = 5433
  console.log(chalk.yellow(`\n🔌 Starting Cloud SQL Proxy on port ${PROXY_PORT}...`))

  const proxy = $`cloud-sql-proxy --port=${PROXY_PORT} ${connectionName}`.nothrow()

  // Give proxy time to start
  await sleep(3000)

  // Build local connection string (via proxy)
  const db = url.pathname.slice(1).split('?')[0]
  const localUrl = `postgresql://${url.username}:${url.password}@localhost:${PROXY_PORT}/${db}`

  console.log(chalk.yellow('\n🧪 Testing connection with node-postgres...'))

  try {
    const client = new pg.Client({ connectionString: localUrl })
    await client.connect()
    const result = await client.query('SELECT version()')
    console.log(chalk.green('✅ Connection successful!'))
    console.log(chalk.gray(`   ${result.rows[0].version}`))
    await client.end()
  } catch (err) {
    console.log(chalk.red('❌ Connection failed'))
    console.log(err)
  }

  // Kill the proxy
  console.log(chalk.yellow('\n🧹 Stopping Cloud SQL Proxy...'))
  proxy.kill()

  process.exit(0)
}

main().catch((err) => {
  console.error(chalk.red('❌ Error:'), err)
  process.exit(1)
})
