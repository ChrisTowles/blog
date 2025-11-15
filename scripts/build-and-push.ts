#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync } from 'fs'

const args = process.argv.slice(2)
const environment = args[0] || 'staging'
const tag = args[1] || 'latest'

if (!['staging', 'prod'].includes(environment)) {
  console.error('❌ Invalid environment. Use "staging" or "prod"')
  process.exit(1)
}

const terraformDir = `infra/terraform/environments/${environment}`

if (!existsSync(terraformDir)) {
  console.error(`❌ Terraform directory not found: ${terraformDir}`)
  process.exit(1)
}

function run(command: string, options: { silent?: boolean } = {}): string {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit'
    })
    return result ? result.trim() : ''
  } catch (error) {
    console.error(`❌ Command failed: ${command}`)
    throw error
  }
}

console.log(`🚀 Building and pushing container for ${environment}...`)

// Step 1: Get artifact registry URL from terraform output
console.log('\n📦 Getting registry URL from Terraform...')
const registry = run(
  `cd ${terraformDir} && terraform output -raw container_image_base`,
  { silent: true }
)
console.log(`   Registry: ${registry}`)

// Step 2: Authenticate Docker
console.log('\n🔐 Authenticating Docker...')
run('gcloud auth configure-docker us-central1-docker.pkg.dev')

// Step 3: Build the image
const imageTag = `${registry}/blog:${tag}`
console.log(`\n🔨 Building Docker image: ${imageTag}`)
run(`docker build -t ${imageTag} .`)

// Step 4: Push the image
console.log(`\n📤 Pushing image to registry...`)
run(`docker push ${imageTag}`)

// Step 5: Update Cloud Run
console.log(`\n☁️  Updating Cloud Run with new image...`)
run(`cd ${terraformDir} && terraform apply -auto-approve -var="container_image=${imageTag}"`)

console.log(`\n✅ Successfully deployed ${imageTag} to ${environment}!`)
