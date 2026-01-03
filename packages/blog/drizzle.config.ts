import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { findUpSync } from 'find-up'

dotenv.config({ 
  path: findUpSync('.env', {allowSymlinks: true} )!, 
  quiet: true
 })

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
})
