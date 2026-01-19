#!/usr/bin/env -S pnpx tsx
import dotenv from 'dotenv'
import { findUpSync } from 'find-up'
import 'zx/globals'

dotenv.config({ 
  path: findUpSync('.env')!, 
  quiet: true
})

const args = process.argv.slice(2)
const command = args[0]
const environment = args[1] || 'staging'

// Configuration
const IMAGE_NAME = 'blog-test'
const CONTAINER_NAME = 'blog-test-container'
const TEST_UI_PORT = parseInt(process.env.UI_PORT!) + 50 // Use a different port to avoid conflicts
const MAX_WAIT = 60

function printUsage() {
  console.log(`
Usage:
  build.ts test [environment] [--keep]    - Build and test container locally
  build.ts deploy <environment>           - Build, push and deploy to GCP Cloud Run

Arguments:
  environment  - staging or prod (default: staging)

Options:
  --keep      - Keep container running after test (for test command)

Notes:
  Images are tagged with date-time (YYYY-MM-DD-HH-mm) and also pushed as 'latest'

Examples:
  build.ts test staging --keep
  build.ts deploy staging
  build.ts deploy prod
`)
}

async function cleanup() {
  console.log(chalk.yellow('\n🧹 Stopping and removing container...'))
  await $`docker rm -f ${CONTAINER_NAME}`.quiet().nothrow()
}

async function waitForHealthy(): Promise<boolean> {
  console.log(chalk.yellow('\n⏳ Waiting for container to be ready...'))

  const startTime = Date.now()
  let elapsed = 0

  while (elapsed < MAX_WAIT) {
    // Check if container is still running
    const psResult = await $`docker ps --filter name=${CONTAINER_NAME} --format {{.Names}}`.quiet().nothrow()
    if (!psResult.stdout.includes(CONTAINER_NAME)) {
      console.log(chalk.red('❌ Container stopped unexpectedly'))
      await $`docker logs ${CONTAINER_NAME}`
      return false
    }

    // Try to fetch homepage
    try {
      const response = await fetch(`http://localhost:${TEST_UI_PORT}`, {
        signal: AbortSignal.timeout(2000)
      })

      if (response.ok) {
        console.log(chalk.green('✅ Container is ready and home page is accessible!'))
        console.log(chalk.green(`✅ Home page returned HTTP ${response.status}`))
        console.log(chalk.green('\n🎉 All tests passed!'))
        return true
      } else {
        console.log(chalk.red(`❌ Home page returned HTTP ${response.status} (expected 200)`))
        return false
      }
    } catch {
      // Connection failed, wait and retry
    }

    await sleep(2000)
    elapsed = Math.floor((Date.now() - startTime) / 1000)
    console.log(`   Waiting... ${elapsed}s / ${MAX_WAIT}s`)
  }

  console.log(chalk.red('❌ Timeout waiting for container to respond'))
  console.log(chalk.yellow('\nContainer logs:'))
  await $`docker logs ${CONTAINER_NAME}`
  return false
}

async function testContainer() {
  try {
    console.log(chalk.yellow('🔨 Building Docker image...'))
    await $`docker build -f infra/container/blog.Dockerfile -t ${IMAGE_NAME} .`

    console.log(chalk.yellow('\n🧹 Cleaning up any existing container...'))
    await $`docker rm -f ${CONTAINER_NAME}`.quiet().nothrow()

    console.log(chalk.yellow(`\n🚀 Starting container on port ${TEST_UI_PORT}...`))
    $.verbose = true
    // --network="host" used so when it hits localdb it'll 
    await $`docker run -d --network="host" --name ${CONTAINER_NAME} --env-file .env -p ${TEST_UI_PORT}:3000 ${IMAGE_NAME}`
    $.verbose = false
    const success = await waitForHealthy()

    if (!argv.keep) {
      await cleanup()
    } else {
      console.log(chalk.yellow('\nℹ️  Skipping cleanup as requested (--keep)'))
    }
    process.exit(success ? 0 : 1)
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error)
    if (!argv.keep) {
      await cleanup()
    } else {
      console.log(chalk.yellow('\nℹ️  Skipping cleanup as requested (--keep)'))
    }
    process.exit(1)
  }
}

async function ensureSqlRunning(projectId: string, instanceName: string) {
  console.log(chalk.yellow(`\n🔍 Checking Cloud SQL instance state...`))
  const state = (await $`gcloud sql instances describe ${instanceName} --project=${projectId} --format='value(state)'`.quiet()).stdout.trim()

  if (state === 'RUNNABLE') {
    console.log(chalk.green(`   ✓ SQL instance is running`))
    return
  }

  console.log(chalk.yellow(`   SQL instance is ${state}, starting...`))
  await $`gcloud sql instances patch ${instanceName} --activation-policy=ALWAYS --project=${projectId}`
  console.log(chalk.green(`   ✓ SQL instance started`))
}

async function deployContainer() {
  if (!['staging', 'prod'].includes(environment)) {
    console.error(chalk.red('❌ Invalid environment. Use "staging" or "prod"'))
    process.exit(1)
  }

  const terraformDir = `infra/terraform/environments/${environment}`

  if (!fs.existsSync(terraformDir)) {
    console.error(chalk.red(`❌ Terraform directory not found: ${terraformDir}`))
    process.exit(1)
  }

  // Generate date-time tag: YYYY-MM-DD-HH-mm
  const now = new Date()
  const dateTag = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0')
  ].join('-')

  const rootDir = process.cwd()
  console.log(chalk.yellow(`🚀 Building and pushing container for ${environment}...`))
  console.log(chalk.yellow(`   Tag: ${dateTag}`))

  // Step 1: Get artifact registry URL from terraform output
  console.log(chalk.yellow('\n📦 Getting registry URL from Terraform...'))
  cd(terraformDir)
  let registry = ''
  try {
    registry = (await $`terraform output -raw container_image_base`).stdout.trim()
  } catch {
    console.log(chalk.yellow('⚠️  Could not get registry URL. Initializing infrastructure...'))
    await $`terraform init`
    await $`terraform apply -target=module.shared -auto-approve -lock=false` // setting -lock=false to avoid lock issues every single time.
    registry = (await $`terraform output -raw container_image_base`).stdout.trim()
  }
  cd(rootDir)
  console.log(`   Registry: ${registry}`)

  // Step 2: Authenticate Docker
  console.log(chalk.yellow('\n🔐 Authenticating Docker...'))
  const registryHostname = registry.split('/')[0]
  await $`gcloud auth configure-docker ${registryHostname}`

  // Step 3: Get git SHA
  const gitSha = (await $`git rev-parse --short HEAD`.quiet()).stdout.trim()

  // Step 4: Build the image with both date tag and latest
  const imageWithDateTag = `${registry}/blog:${dateTag}`
  const imageWithLatest = `${registry}/blog:latest`
  console.log(chalk.yellow(`\n🔨 Building Docker image: ${imageWithDateTag}`))
  console.log(chalk.gray(`   Git SHA: ${gitSha}`))
  await $`docker build -f infra/container/blog.Dockerfile --build-arg GIT_SHA=${gitSha} --build-arg BUILD_TAG=${dateTag} -t ${imageWithDateTag} -t ${imageWithLatest} .`

  // Step 5: Push both tags
  console.log(chalk.yellow(`\n📤 Pushing images to registry...`))
  await $`docker push ${imageWithDateTag}`
  await $`docker push ${imageWithLatest}`

  // Step 6: Ensure Cloud SQL is running before terraform apply
  const projectId = environment === 'staging' ? 'blog-towles-staging' : 'blog-towles-production'
  const envSuffix = environment === 'prod' ? 'production' : environment
  const instanceName = `blog-towles-${envSuffix}-db`
  await ensureSqlRunning(projectId, instanceName)

  // Step 7: Update Cloud Run with the dated image
  console.log(chalk.yellow(`\n☁️  Updating Cloud Run with new image...`))
  cd(terraformDir)
  $.verbose = true
  await $`terraform apply -auto-approve -var="container_image=${imageWithDateTag}"`
  $.verbose = false
  cd(rootDir)

  // Output the public URL
  const publicUrl = environment === 'staging'
    ? 'https://stage-chris.towles.dev'
    : 'https://chris.towles.dev'

  console.log(chalk.green(`\n✅ Successfully deployed ${imageWithDateTag} to ${environment}!`))
  console.log(chalk.cyan(`\n🌐 ${publicUrl}`))
}

async function main() {
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    printUsage()
    process.exit(0)
  }

  switch (command) {
    case 'test':
      await testContainer()
      break
    case 'deploy':
      await deployContainer()
      break
    default:
      console.error(chalk.red(`❌ Unknown command: ${command}`))
      printUsage()
      process.exit(1)
  }
}

main().catch((err) => {
  console.error(chalk.red('❌ Error:'), err)
  process.exit(1)
})
