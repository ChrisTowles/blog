#!/usr/bin/env zx

import { question, $, fs } from 'zx'
import path from 'node:path'

$.verbose = true

const SCRIPT_DIR = import.meta.dirname
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..')

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
  const tfvarsPath = path.join(PROJECT_ROOT, 'infra', 'terraform', 'environments', tfDir, 'terraform.tfvars')
  const vars = parseTfvars(tfvarsPath)

  return {
    project: vars.project_id,
    region: vars.region || 'us-central1',
    service: 'blog'
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
  -e, --environment ENV Environment (staging/production)
  -t, --tail            Tail logs (live stream)
  -f, --filter FILTER   Filter logs (e.g., "severity>=ERROR")
  -l, --limit N         Limit number of log entries (default: 50)
  -h, --help            Show this help message
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

  // Use gcloud logging read instead of gcloud run services logs (which has bugs)
  const baseFilter = `resource.type="cloud_run_revision" resource.labels.service_name="${config.service}" resource.labels.location="${config.region}"`
  const fullFilter = options.filter ? `${baseFilter} ${options.filter}` : baseFilter

  const args = [
    'logging', 'read',
    fullFilter,
    `--project=${config.project}`,
    `--format=value(timestamp,severity,textPayload)`,
    `--limit=${options.limit || 150}`
  ]

  if (options.tail) {
    // For tail mode, use gcloud logging tail
    await $`gcloud logging tail ${fullFilter} --project=${config.project} --format=value(timestamp,severity,textPayload)`
  } else {
    await $`gcloud ${args}`
  }
}

// Parse arguments
let tail = false
let filter = null
let limit = 150

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
    case '-e':
    case '--environment':
      process.env.ENVIRONMENT = process.argv[++i]
      break
    default:
      if (arg.startsWith('--environment=')) {
        process.env.ENVIRONMENT = arg.split('=')[1]
      } else if (arg.startsWith('--limit=')) {
        limit = parseInt(arg.split('=')[1])
      } else if (arg.startsWith('--filter=')) {
        filter = arg.split('=')[1]
      } else if (arg.startsWith('-')) {
        console.error(`Unknown option: ${arg}`)
        usage()
      }
  }
}

await getLogs({ tail, filter, limit })
