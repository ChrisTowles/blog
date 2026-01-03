import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { findUp } from 'find-up'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

async function runMigrations() {
  dotenv.config({ 
    path: await findUp('.env'),
    quiet: true
  })

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error('DATABASE_URL is not set')
    process.exit(1)
  }

  console.log('Running database migrations...')

  const db = drizzle({ connection: { connectionString } })

  // Resolve migrations path relative to this script
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const migrationsFolder = join(__dirname, 'migrations')

  await migrate(db, { migrationsFolder })

  console.log('Migrations completed successfully')
  process.exit(0)
}

runMigrations().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
