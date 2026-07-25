#!/usr/bin/env -S pnpx tsx
import dotenv from 'dotenv';
import { findUpSync } from 'find-up';
import 'zx/globals';
import { consola } from 'consola';

dotenv.config({
  path: findUpSync('.env')!,
  quiet: true,
});

const args = process.argv.slice(2);
const command = args[0];
const environment = args[1] || 'staging';

// Configuration
const IMAGE_NAME = 'blog-test';
const CONTAINER_NAME = 'blog-test-container';
const TEST_UI_PORT = parseInt(process.env.UI_PORT!) + 50; // Use a different port to avoid conflicts
const MAX_WAIT = 60;

function printUsage() {
  consola.log(`
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
`);
}

async function cleanup() {
  consola.start('Stopping and removing container...');
  await $`docker rm -f ${CONTAINER_NAME}`.quiet().nothrow();
}

async function waitForHealthy(): Promise<boolean> {
  consola.start('Waiting for container to be ready...');

  const startTime = Date.now();
  let elapsed = 0;

  while (elapsed < MAX_WAIT) {
    // Check if container is still running
    const psResult = await $`docker ps --filter name=${CONTAINER_NAME} --format {{.Names}}`
      .quiet()
      .nothrow();
    if (!psResult.stdout.includes(CONTAINER_NAME)) {
      consola.error('Container stopped unexpectedly');
      await $`docker logs ${CONTAINER_NAME}`;
      return false;
    }

    // Try to fetch homepage
    try {
      const response = await fetch(`http://localhost:${TEST_UI_PORT}`, {
        signal: AbortSignal.timeout(2000),
      });

      if (response.ok) {
        consola.success('Container is ready and home page is accessible');
        consola.success(`Home page returned HTTP ${response.status}`);
        consola.success('All tests passed');
        return true;
      } else {
        consola.error(`Home page returned HTTP ${response.status} (expected 200)`);
        return false;
      }
    } catch {
      // Connection failed, wait and retry
    }

    await sleep(2000);
    elapsed = Math.floor((Date.now() - startTime) / 1000);
    consola.info(`Waiting... ${elapsed}s / ${MAX_WAIT}s`);
  }

  consola.error('Timeout waiting for container to respond');
  consola.info('Container logs:');
  await $`docker logs ${CONTAINER_NAME}`;
  return false;
}

async function testContainer() {
  try {
    consola.start('Building Docker image...');
    await $`docker build -f infra/container/blog.Dockerfile -t ${IMAGE_NAME} .`;

    consola.start('Cleaning up any existing container...');
    await $`docker rm -f ${CONTAINER_NAME}`.quiet().nothrow();

    consola.start(`Starting container on port ${TEST_UI_PORT}...`);
    $.verbose = true;
    // --network="host" used so when it hits localdb it'll
    await $`docker run -d --network="host" --name ${CONTAINER_NAME} --env-file .env -p ${TEST_UI_PORT}:3000 ${IMAGE_NAME}`;
    $.verbose = false;
    const success = await waitForHealthy();

    if (!argv.keep) {
      await cleanup();
    } else {
      consola.info('Skipping cleanup as requested (--keep)');
    }
    process.exit(success ? 0 : 1);
  } catch (error) {
    consola.error('Error:', error);
    if (!argv.keep) {
      await cleanup();
    } else {
      consola.info('Skipping cleanup as requested (--keep)');
    }
    process.exit(1);
  }
}

async function ensureSqlRunning(projectId: string, instanceName: string) {
  consola.start('Checking Cloud SQL instance state...');
  const state = (
    await $`gcloud sql instances describe ${instanceName} --project=${projectId} --format='value(state)'`.quiet()
  ).stdout.trim();

  if (state === 'RUNNABLE') {
    consola.success('SQL instance is running');
    return;
  }

  consola.start(`SQL instance is ${state}, starting...`);
  await $`gcloud sql instances patch ${instanceName} --activation-policy=ALWAYS --project=${projectId}`;
  consola.success('SQL instance started');
}

async function deployContainer() {
  if (!['staging', 'prod'].includes(environment)) {
    consola.error('Invalid environment. Use "staging" or "prod"');
    process.exit(1);
  }

  const terraformDir = `infra/terraform/environments`;

  if (!fs.existsSync(terraformDir)) {
    consola.error(`Terraform directory not found: ${terraformDir}`);
    process.exit(1);
  }

  // Generate date-time tag: YYYY-MM-DD-HH-mm
  const now = new Date();
  const dateTag = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
  ].join('-');

  const rootDir = process.cwd();
  consola.start(`Building and pushing container for ${environment}...`);
  consola.info(`Tag: ${dateTag}`);

  // Step 1: Get artifact registry URL from terraform output
  consola.start('Getting registry URL from Terraform...');
  cd(terraformDir);
  await $`terraform init -backend-config=${environment}.backend.tfvars -reconfigure`.quiet();
  let registry = '';
  try {
    registry = (await $`terraform output -raw container_image_base`).stdout.trim();
  } catch {
    consola.warn('Could not get registry URL. Bootstrapping shared module...');
    await $`terraform apply -target=module.shared -auto-approve -var-file=${environment}.tfvars -lock=false`; // setting -lock=false to avoid lock issues every single time.
    registry = (await $`terraform output -raw container_image_base`).stdout.trim();
  }
  cd(rootDir);
  consola.info(`Registry: ${registry}`);

  // Step 2: Authenticate Docker
  consola.start('Authenticating Docker...');
  const registryHostname = registry.split('/')[0];
  await $`gcloud auth configure-docker ${registryHostname}`;

  // Step 3: Get git SHA
  const gitSha = (await $`git rev-parse --short HEAD`.quiet()).stdout.trim();

  // Step 3b: Read NUXT_PUBLIC_* build-time values from tfvars. Nuxt bakes
  // runtimeConfig.public.* into prerendered HTML (and the SPA shell for
  // ssr:false routes), so these must come from tfvars at build time — a
  // runtime env on Cloud Run can't override what's already frozen.
  const tfvarsContent = fs.readFileSync(`${terraformDir}/${environment}.tfvars`, 'utf-8');
  const gtagId = tfvarsContent.match(/gtag_id\s*=\s*"([^"]*)"/)?.[1] || '';
  const mcpSandboxUrl = tfvarsContent.match(/mcp_sandbox_url\s*=\s*"([^"]*)"/)?.[1] || '';

  // Step 4: Build the image with both date tag and latest
  const imageWithDateTag = `${registry}/blog:${dateTag}`;
  const imageWithLatest = `${registry}/blog:latest`;
  consola.start(`Building Docker image: ${imageWithDateTag}`);
  consola.info(`Git SHA: ${gitSha}`);
  if (gtagId) consola.info(`Gtag ID: ${gtagId}`);
  if (mcpSandboxUrl) consola.info(`MCP sandbox URL: ${mcpSandboxUrl}`);
  await $`docker build -f infra/container/blog.Dockerfile --build-arg GIT_SHA=${gitSha} --build-arg BUILD_TAG=${dateTag} --build-arg NUXT_PUBLIC_GTAG_ID=${gtagId} --build-arg NUXT_PUBLIC_MCP_SANDBOX_URL=${mcpSandboxUrl} -t ${imageWithDateTag} -t ${imageWithLatest} .`;

  // Step 5: Push both tags
  consola.start('Pushing images to registry...');
  await $`docker push ${imageWithDateTag}`;
  await $`docker push ${imageWithLatest}`;

  // Step 6: Ensure Cloud SQL is running before terraform apply
  const projectId = environment === 'staging' ? 'blog-towles-staging' : 'blog-towles-production';
  const envSuffix = environment === 'prod' ? 'production' : environment;
  const instanceName = `blog-towles-${envSuffix}-db`;
  await ensureSqlRunning(projectId, instanceName);

  // Step 7: Update Cloud Run with the dated image
  consola.start('Updating Cloud Run with new image...');
  cd(terraformDir);
  $.verbose = true;
  await $`terraform apply -auto-approve -var-file=${environment}.tfvars -var="container_image=${imageWithDateTag}"`;
  $.verbose = false;
  cd(rootDir);

  // Output the public URL
  const publicUrl =
    environment === 'staging' ? 'https://stage-chris.towles.dev' : 'https://chris.towles.dev';

  consola.success(`Successfully deployed ${imageWithDateTag} to ${environment}`);
  consola.box(publicUrl);
}

async function main() {
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    printUsage();
    process.exit(0);
  }

  switch (command) {
    case 'test':
      await testContainer();
      break;
    case 'deploy':
      await deployContainer();
      break;
    default:
      consola.error(`Unknown command: ${command}`);
      printUsage();
      process.exit(1);
  }
}

main().catch((err) => {
  consola.error('Error:', err);
  process.exit(1);
});
