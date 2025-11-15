import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '../database/schema'

export { sql, eq, and, or, desc } from 'drizzle-orm'

export const tables = schema

let _db: ReturnType<typeof drizzle> | null = null

export function useDrizzle() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL || ''
    const client = postgres(connectionString, { prepare: false })
    _db = drizzle(client, { schema })
  }
  return _db
}

export type Chat = typeof schema.chats.$inferSelect
export type Message = typeof schema.messages.$inferSelect
