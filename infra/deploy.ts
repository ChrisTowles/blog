#!/usr/bin/env zx

import { question, $ } from 'zx'

$.verbose = true

const SCRIPT_DIR = import.meta.dirname

async function promptEnvironment() {
  if (!process.env.ENVIRONMENT) {
    console.log('Select environment:')
    console.log('1) development')
    console.log('2) staging')
    console.log('3) production')

    const choice = await question('Enter choice [1-3]: ')

    switch (choice.trim()) {
      case '1':
        process.env.ENVIRONMENT = 'development'
        break
      case '2':
        process.env.ENVIRONMENT = 'staging'
        break
      case '3':
        process.env.ENVIRONMENT = 'production'
        break
      default:
        console.error('Invalid choice')
        process.exit(1)
    }
  }

  process.env.STACK_NAME = `blog-stack-${process.env.ENVIRONMENT}`
}

function usage() {
  console.log(`Usage: ${process.argv[1]} [OPTIONS]

Options:
  -g, --guided          Run guided deployment (interactive)
  -d, --delete          Delete the stack
  -s, --status          Show stack status and outputs
  -h, --help            Show this help message

Required environment variables:
  STACK_NAME            Stack name
  ENVIRONMENT           Environment tag
`)
  process.exit(1)
}

async function checkRequiredVars() {
  await promptEnvironment()

  const missing = []

  if (!process.env.STACK_NAME) missing.push('STACK_NAME')
  if (!process.env.ENVIRONMENT) missing.push('ENVIRONMENT')

  if (missing.length > 0) {
    console.error(`Error: Missing required environment variables: ${missing.join(', ')}`)
    console.log()
    usage()
  }

  console.log('Using configuration:')
  console.log(`  Environment: ${process.env.ENVIRONMENT}`)
  console.log(`  Stack Name: ${process.env.STACK_NAME}`)
  console.log()
}

async function deploy() {
  await checkRequiredVars()
  console.log('Deploying Blog Stack cluster...')

  await $`sam deploy \
    --template-file ${SCRIPT_DIR}/cloudformation/blog-stack.yaml \
    --stack-name ${process.env.STACK_NAME} \
    --parameter-overrides Environment=${process.env.ENVIRONMENT} \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset`

  console.log()
  await showOutputs()
}

async function deployGuided() {
  console.log('Running guided deployment...')

  await $`sam deploy \
    --template-file ${SCRIPT_DIR}/dsql.yaml \
    --stack-name ${process.env.STACK_NAME} \
    --guided`
}

async function deleteStack() {
  await checkRequiredVars()
  console.log(`Deleting stack ${process.env.STACK_NAME}...`)

  const confirm = await question(`Are you sure you want to delete ${process.env.STACK_NAME}? (yes/no): `)
  if (confirm.trim() !== 'yes') {
    console.log('Aborted.')
    process.exit(0)
  }

  await $`sam delete \
    --stack-name ${process.env.STACK_NAME} \
    --no-prompts`

  console.log('Stack deleted successfully')
}

async function showOutputs() {
  await checkRequiredVars()
  console.log('Stack outputs:')
  await $`aws cloudformation describe-stacks \
    --stack-name ${process.env.STACK_NAME} \
    --query 'Stacks[0].Outputs' \
    --output table`
}

// Parse arguments
const arg = process.argv[2]

switch (arg) {
  case '-g':
  case '--guided':
    await deployGuided()
    break
  case '-d':
  case '--delete':
    await deleteStack()
    break
  case '-s':
  case '--status':
    await showOutputs()
    break
  case '-h':
  case '--help':
    usage()
    break
  case undefined:
    await deploy()
    break
  default:
    console.error(`Unknown option: ${arg}`)
    usage()
}
