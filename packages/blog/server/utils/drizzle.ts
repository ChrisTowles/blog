import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from '../database/schema'

export { sql, eq, and, or, desc } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  return drizzle({
    connection: {
      connectionString: process.env.DATABASE_URL
    },
    schema
  })
}

export type dbChat = typeof schema.chats.$inferSelect
export type dbMessage = typeof schema.messages.$inferSelect
