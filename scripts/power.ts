#!/usr/bin/env bun

import { $, fs } from 'zx'
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
    service: 'blog',
    sqlInstance: `${vars.project_id}-db`,
    functionName: 'stage-power-settings'
  }
}

function usage() {
  console.log(`Usage: ${process.argv[1]} <on|off> [OPTIONS]

Commands:
  on     Start Cloud SQL (Cloud Run auto-starts on first request)
  off    Stop Cloud SQL (Cloud Run auto-scales to zero when idle)

Options:
  -e, --environment ENV  Environment (staging only for now)
  -h, --help             Show this help message

Note: Cloud Run scales to zero automatically. The main cost savings
come from stopping Cloud SQL when not in use.
`)
  process.exit(1)
}

async function callPowerFunction(config: ReturnType<typeof getEnvConfig>, action: 'on' | 'off') {
  const actionLabel = action === 'on' ? 'ON' : 'OFF'
  console.log(`\nPowering ${actionLabel} ${config.project}...\n`)

  console.log(`Calling Cloud Function to ${action === 'on' ? 'start' : 'stop'} Cloud SQL...`)

  const data = JSON.stringify({ action })
  await $`gcloud functions call ${config.functionName} \
        --project=${config.project} \
        --region=${config.region} \
        --gen2 \
        --data ${data}`

  if (action === 'on') {
    console.log('Cloud SQL starting. Waiting for it to become available...')
    await $`sleep 30`
    console.log('Cloud SQL ready.')
    console.log('Cloud Run will start automatically on first request.\n')
  } else {
    console.log('Cloud SQL stopped.')
    console.log('Note: Cloud Run scales to zero automatically when idle.\n')
  }

  console.log(`Environment powered ${actionLabel.toLowerCase()}.`)
}

// Parse arguments
let action: 'on' | 'off' | null = null
let environment = 'staging'

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i]

  switch (arg) {
    case 'on':
    case 'off':
      action = arg
      break
    case '-e':
    case '--environment':
      environment = process.argv[++i]
      break
    case '-h':
    case '--help':
      usage()
      break
    default:
      if (arg.startsWith('--environment=')) {
        environment = arg.split('=')[1]
      } else if (arg.startsWith('-')) {
        console.error(`Unknown option: ${arg}`)
        usage()
      }
  }
}

if (!action) {
  console.error('Error: Must specify action (on or off)')
  usage()
}

if (environment !== 'staging') {
  console.error('Error: Only staging environment is supported for power control (safety)')
  process.exit(1)
}

const config = getEnvConfig(environment as 'staging')

console.log(`Environment: ${environment}`)
console.log(`  Project: ${config.project}`)
console.log(`  Region: ${config.region}`)
console.log(`  Cloud Run: ${config.service}`)
console.log(`  Cloud SQL: ${config.sqlInstance}`)

await callPowerFunction(config, action)
