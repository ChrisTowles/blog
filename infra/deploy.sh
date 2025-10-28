#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

prompt_environment() {
  if [ -z "$ENVIRONMENT" ]; then
    echo "Select environment:"
    echo "1) development"
    echo "2) staging"
    echo "3) production"
    read -p "Enter choice [1-3]: " choice

    case $choice in
      1) ENVIRONMENT="development" ;;
      2) ENVIRONMENT="staging" ;;
      3) ENVIRONMENT="production" ;;
      *) echo "Invalid choice"; exit 1 ;;
    esac
  fi

  STACK_NAME="blog-dsql-${ENVIRONMENT}"
}

ENVIRONMENT="${ENVIRONMENT}"
STACK_NAME="${STACK_NAME}"

usage() {
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -g, --guided          Run guided deployment (interactive)"
  echo "  -d, --delete          Delete the stack"
  echo "  -s, --status          Show stack status and outputs"
  echo "  -h, --help            Show this help message"
  echo ""
  echo "Required environment variables:"
  echo "  STACK_NAME            Stack name"
  echo "  ENVIRONMENT           Environment tag"
  exit 1
}

check_required_vars() {
  prompt_environment

  local missing=()

  [ -z "$STACK_NAME" ] && missing+=("STACK_NAME")
  [ -z "$ENVIRONMENT" ] && missing+=("ENVIRONMENT")

  if [ ${#missing[@]} -gt 0 ]; then
    echo "Error: Missing required environment variables: ${missing[*]}"
    echo ""
    usage
  fi

  echo "Using configuration:"
  echo "  Environment: ${ENVIRONMENT}"
  echo "  Stack Name: ${STACK_NAME}"
  echo ""
}

deploy() {
  check_required_vars
  echo "Deploying Aurora DSQL cluster..."

  sam deploy \
    --template-file "${SCRIPT_DIR}/cloudformation/dsql.yaml" \
    --stack-name "${STACK_NAME}" \
    --parameter-overrides Environment="${ENVIRONMENT}" \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset

  echo ""
  show_outputs
}

deploy_guided() {
  echo "Running guided deployment..."

  sam deploy \
    --template-file "${SCRIPT_DIR}/dsql.yaml" \
    --stack-name "${STACK_NAME}" \
    --guided
}

delete_stack() {
  check_required_vars
  echo "Deleting stack ${STACK_NAME}..."

  read -p "Are you sure you want to delete ${STACK_NAME}? (yes/no): " confirm
  if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
  fi

  sam delete \
    --stack-name "${STACK_NAME}" \
    --no-prompts

  echo "Stack deleted successfully"
}

show_outputs() {
  check_required_vars
  echo "Stack outputs:"
  aws cloudformation describe-stacks \
    --stack-name "${STACK_NAME}" \
    --query 'Stacks[0].Outputs' \
    --output table
}

# Parse arguments
case "${1}" in
  -g|--guided)
    deploy_guided
    ;;
  -d|--delete)
    delete_stack
    ;;
  -s|--status)
    show_outputs
    ;;
  -h|--help)
    usage
    ;;
  "")
    deploy
    ;;
  *)
    echo "Unknown option: ${1}"
    usage
    ;;
esac
