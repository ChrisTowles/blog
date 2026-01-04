#!/usr/bin/env tsx
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'
import { execFileSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from repo root
config({
  path: resolve(__dirname, '../../.env'),
  silent: true
})

// Verify API key is loaded
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY not found in environment')
  console.error('Make sure .env file exists at repo root with ANTHROPIC_API_KEY')
  process.exit(1)
}

// Run promptfoo with args passed to this script
const args = process.argv.slice(2)

console.log(`Running: promptfoo ${args.join(' ')}\n`)


execFileSync('promptfoo', args, {
  stdio: 'inherit',
  env: process.env,
})
