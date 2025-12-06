#!/usr/bin/env zx

import { question, $, fs } from 'zx'
import path from 'node:path'

$.verbose = true

const SCRIPT_DIR = import.meta.dirname

function parseTfvars(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, 'utf-8')
  const vars: Record<string, string> = {}
  for (const line of content.split('\n')) {
    const match = line.match(/^(\w+)\s*=\s*"([^"]*)"/)
    if (match) {
      vars[match[1]] = match[2]
    }
  }
  return vars
}

function getEnvConfig(env: 'staging' | 'production') {
  const tfDir = env === 'staging' ? 'staging' : 'prod'
  const tfvarsPath = path.join(SCRIPT_DIR, 'terraform', 'environments', tfDir, 'terraform.tfvars')
  const vars = parseTfvars(tfvarsPath)

  // Service name follows pattern: ${environment}-blog (from cloud-run module)
  const serviceEnv = env === 'production' ? 'prod' : 'staging'

  return {
    project: vars.project_id,
    region: vars.region || 'us-central1',
    service: `${serviceEnv}-blog`
  }
}

async function promptEnvironment() {
  if (!process.env.ENVIRONMENT) {
    console.log('Select environment:')
    console.log('1) staging')
    console.log('2) production')

    const choice = await question('Enter choice [1-2]: ')

    switch (choice.trim()) {
      case '1':
        process.env.ENVIRONMENT = 'staging'
        break
      case '2':
        process.env.ENVIRONMENT = 'production'
        break
      default:
        console.error('Invalid choice')
        process.exit(1)
    }
  }
}

function usage() {
  console.log(`Usage: ${process.argv[1]} [OPTIONS]

Options:
  -t, --tail            Tail logs (live stream)
  -f, --filter FILTER   Filter logs (e.g., "severity>=ERROR")
  -l, --limit N         Limit number of log entries (default: 50)
  -h, --help            Show this help message

Environment variable:
  ENVIRONMENT           Environment (development/staging/production)
`)
  process.exit(1)
}

async function getLogs(options = {}) {
  await promptEnvironment()

  const env = process.env.ENVIRONMENT as 'staging' | 'production'
  if (env !== 'staging' && env !== 'production') {
    console.error(`Invalid environment: ${process.env.ENVIRONMENT}`)
    process.exit(1)
  }

  const config = getEnvConfig(env)

  console.log(`Fetching logs for ${process.env.ENVIRONMENT}:`)
  console.log(`  Project: ${config.project}`)
  console.log(`  Service: ${config.service}`)
  console.log(`  Region: ${config.region}`)
  console.log()

  const args = [
    'run', 'services', 'logs',
    options.tail ? 'tail' : 'read',
    config.service,
    `--region=${config.region}`,
    `--project=${config.project}`
  ]

  if (!options.tail) {
    args.push(`--limit=${options.limit || 50}`)
  }

  if (options.filter) {
    args.push(`--log-filter=${options.filter}`)
  }

  await $`gcloud ${args}`
}

// Parse arguments
let tail = false
let filter = null
let limit = 50

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i]

  switch (arg) {
    case '-t':
    case '--tail':
      tail = true
      break
    case '-f':
    case '--filter':
      filter = process.argv[++i]
      break
    case '-l':
    case '--limit':
      limit = parseInt(process.argv[++i])
      break
    case '-h':
    case '--help':
      usage()
      break
    default:
      if (arg.startsWith('-')) {
        console.error(`Unknown option: ${arg}`)
        usage()
      }
  }
}

await getLogs({ tail, filter, limit })
