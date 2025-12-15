import { z } from 'zod'

const envSchema = z.object({
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

type EnvConfig = z.infer<typeof envSchema>

const SENSITIVE_KEYS = new Set([
  'DATABASE_URL',
  'NUXT_SESSION_PASSWORD',
  'ANTHROPIC_API_KEY',
  'NUXT_OAUTH_GITHUB_CLIENT_SECRET',
  'AWS_SECRET_ACCESS_KEY'
])

function maskValue(key: string, value: string): string {
  if (!SENSITIVE_KEYS.has(key)) return value
  if (value.length >= 6) return `${value.slice(0, 2)}***${value.slice(-4)}`
  return '***'
}

function logConfig(config: EnvConfig) {
  console.log('='.repeat(60))
  console.log('SERVER STARTUP - Validated Environment')
  console.log('='.repeat(60))

  for (const [key, value] of Object.entries(config).sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`${key}=${maskValue(key, String(value))}`)
  }

  console.log('='.repeat(60))
}

export default defineNitroPlugin(() => {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    console.error('='.repeat(60))
    console.error('ENV VALIDATION FAILED')
    console.error('='.repeat(60))
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`)
    }
    console.error('='.repeat(60))
    throw new Error('Environment validation failed')
  } else {
    console.log('Environment validation succeeded')
  }

  if (import.meta.dev) {
    console.log('='.repeat(10) + ' Skipping env logging in dev mode ' + '='.repeat(10))
    // return
  }

  logConfig(result.data)
})
