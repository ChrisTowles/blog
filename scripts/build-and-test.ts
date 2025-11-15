#!/usr/bin/env node
import 'zx/globals'

const IMAGE_NAME = 'blog-test'
const CONTAINER_NAME = 'blog-test-container'
const PORT = process.env.TEST_PORT || '3001'
const MAX_WAIT = 60

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

async function main() {
  try {
    console.log(chalk.yellow('🔨 Building Docker image...'))
    await $`docker build -t ${IMAGE_NAME} .`

    console.log(chalk.yellow('\n🧹 Cleaning up any existing container...'))
    await $`docker rm -f ${CONTAINER_NAME}`.quiet().nothrow()

    console.log(chalk.yellow(`\n🚀 Starting container on port ${PORT}...`))
    await $`docker run -d --name ${CONTAINER_NAME} -p ${PORT}:3000 ${IMAGE_NAME}`

    const success = await waitForHealthy()

    await cleanup()
    process.exit(success ? 0 : 1)
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error)
    await cleanup()
    process.exit(1)
  }
}

main()
