#!/usr/bin/env node
import 'zx/globals'

const args = process.argv.slice(2)
const environment = args[0] || 'staging'
const tag = args[1] || 'latest'

if (!['staging', 'prod'].includes(environment)) {
  console.error(chalk.red('❌ Invalid environment. Use "staging" or "prod"'))
  process.exit(1)
}

const terraformDir = `infra/terraform/environments/${environment}`

if (!fs.existsSync(terraformDir)) {
  console.error(chalk.red(`❌ Terraform directory not found: ${terraformDir}`))
  process.exit(1)
}

async function main() {
  const rootDir = process.cwd()
  console.log(chalk.yellow(`🚀 Building and pushing container for ${environment}...`))

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

  // Step 3: Build the image
  const imageTag = `${registry}/blog:${tag}`
  console.log(chalk.yellow(`\n🔨 Building Docker image: ${imageTag}`))
  await $`docker build -t ${imageTag} .`

  // Step 4: Push the image
  console.log(chalk.yellow(`\n📤 Pushing image to registry...`))
  await $`docker push ${imageTag}`

  // Step 5: Update Cloud Run
  console.log(chalk.yellow(`\n☁️  Updating Cloud Run with new image...`))
  cd(terraformDir)
  $.verbose = true
  await $`terraform apply -auto-approve -var="container_image=${imageTag}"`
  $.verbose = false
  cd(rootDir)

  console.log(chalk.green(`\n✅ Successfully deployed ${imageTag} to ${environment}!`))
}

main().catch((err) => {
  console.error(chalk.red('❌ Error:'), err)
  process.exit(1)
})
