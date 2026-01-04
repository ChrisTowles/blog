import { z } from 'zod'

export const envSchema = z.object({
  // Build metadata
  GIT_SHA: z.string().default('dev'),
  BUILD_TAG: z.string().default('local'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Nuxt Auth
  NUXT_SESSION_PASSWORD: z.string().min(32, 'NUXT_SESSION_PASSWORD must be at least 32 characters'),

  // Anthropic
  ANTHROPIC_API_KEY: z.string().min(1, 'ANTHROPIC_API_KEY is required'),

  // GitHub OAuth
  NUXT_OAUTH_GITHUB_CLIENT_ID: z.string().min(1, 'NUXT_OAUTH_GITHUB_CLIENT_ID is required'),
  NUXT_OAUTH_GITHUB_CLIENT_SECRET: z.string().min(1, 'NUXT_OAUTH_GITHUB_CLIENT_SECRET is required'),

  // AWS Bedrock
  AWS_REGION: z.string().default('us-east-1'),
  AWS_ACCESS_KEY_ID: z.string().min(1, 'AWS_ACCESS_KEY_ID is required'),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, 'AWS_SECRET_ACCESS_KEY is required')
})

export type EnvConfig = z.infer<typeof envSchema>

const SENSITIVE_KEYS = new Set([
  'DATABASE_URL',
  'NUXT_SESSION_PASSWORD',
  'ANTHROPIC_API_KEY',
  'NUXT_OAUTH_GITHUB_CLIENT_SECRET',
  'AWS_SECRET_ACCESS_KEY'
])

export function maskValue(key: string, value: string): string {
  if (!SENSITIVE_KEYS.has(key)) return value
  if (value.length >= 6) return `${value.slice(0, 2)}***${value.slice(-4)}`
  return '***'
}

export function getMaskedConfig(config: EnvConfig): Record<string, string> {
  const masked: Record<string, string> = {}
  for (const [key, value] of Object.entries(config).sort(([a], [b]) => a.localeCompare(b))) {
    masked[key] = maskValue(key, String(value))
  }
  return masked
}
