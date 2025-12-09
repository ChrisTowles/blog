#!/usr/bin/env node
import 'zx/globals'

const args = process.argv.slice(2)
const command = args[0]
const environment = args[1] || 'staging'

// Configuration
const IMAGE_NAME = 'blog-test'
const CONTAINER_NAME = 'blog-test-container'
const PORT = process.env.TEST_PORT || '3001'
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
      const response = await fetch(`http://localhost:${PORT}`, {
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
    await $`docker build -t ${IMAGE_NAME} .`

    console.log(chalk.yellow('\n🧹 Cleaning up any existing container...'))
    await $`docker rm -f ${CONTAINER_NAME}`.quiet().nothrow()

    console.log(chalk.yellow(`\n🚀 Starting container on port ${PORT}...`))
    console.log(chalk.gray(`> docker run -d --name ${CONTAINER_NAME} -p ${PORT}:3000 ${IMAGE_NAME}`))
    await $`docker run -d --name ${CONTAINER_NAME} -p ${PORT}:3000 ${IMAGE_NAME}`

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
    await $`terraform apply -target=module.shared -auto-approve`
    registry = (await $`terraform output -raw container_image_base`).stdout.trim()
  }
  cd(rootDir)
  console.log(`   Registry: ${registry}`)

  // Step 2: Authenticate Docker
  console.log(chalk.yellow('\n🔐 Authenticating Docker...'))
  const registryHostname = registry.split('/')[0]
  await $`gcloud auth configure-docker ${registryHostname}`

  // Step 3: Build the image with both date tag and latest
  const imageWithDateTag = `${registry}/blog:${dateTag}`
  const imageWithLatest = `${registry}/blog:latest`
  console.log(chalk.yellow(`\n🔨 Building Docker image: ${imageWithDateTag}`))
  await $`docker build -t ${imageWithDateTag} -t ${imageWithLatest} .`

  // Step 4: Push both tags
  console.log(chalk.yellow(`\n📤 Pushing images to registry...`))
  await $`docker push ${imageWithDateTag}`
  await $`docker push ${imageWithLatest}`

  // Step 5: Update Cloud Run with the dated image
  console.log(chalk.yellow(`\n☁️  Updating Cloud Run with new image...`))
  cd(terraformDir)
  $.verbose = true
  await $`terraform apply -auto-approve -var="container_image=${imageWithDateTag}"`
  $.verbose = false
  cd(rootDir)

  console.log(chalk.green(`\n✅ Successfully deployed ${imageWithDateTag} to ${environment}!`))
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
