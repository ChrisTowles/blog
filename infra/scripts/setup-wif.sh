#!/bin/bash

# Setup Workload Identity Federation for GitHub Actions
# This script automates the setup of WIF for secure, keyless authentication

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
GITHUB_REPO="${GITHUB_REPO:-ChrisTowles/blog}"
GITHUB_OWNER="${GITHUB_OWNER:-ChrisTowles}"
POOL_NAME="github-actions-pool"
PROVIDER_NAME="github-provider"
SERVICE_ACCOUNT_NAME="github-actions-sa"
REGION="us-central1"

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
print_info "Checking prerequisites..."

if ! command_exists gcloud; then
    print_error "gcloud CLI is not installed. Please install it first."
    exit 1
fi

if ! command_exists jq; then
    print_warning "jq is not installed. Installing..."
    if command_exists apt-get; then
        sudo apt-get update && sudo apt-get install -y jq
    elif command_exists brew; then
        brew install jq
    else
        print_error "Please install jq manually"
        exit 1
    fi
fi

# Get environment from argument
ENVIRONMENT=$1
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "prod" ]]; then
    echo "Usage: $0 <staging|prod>"
    echo ""
    echo "Example:"
    echo "  $0 staging"
    echo "  $0 prod"
    exit 1
fi

# Set project ID based on environment
if [[ "$ENVIRONMENT" == "staging" ]]; then
    PROJECT_ID="blog-towles-staging"
else
    PROJECT_ID="blog-towles-prod"
fi

print_info "Setting up Workload Identity Federation for ${ENVIRONMENT} environment"
print_info "Project ID: ${PROJECT_ID}"
print_info "GitHub Repo: ${GITHUB_REPO}"

# Confirm before proceeding
read -p "Do you want to continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "Aborted."
    exit 0
fi

# Set active project
print_info "Setting active project..."
gcloud config set project $PROJECT_ID

# Get project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
print_info "Project Number: ${PROJECT_NUMBER}"

# Enable required APIs
print_info "Enabling required APIs..."
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  iamcredentials.googleapis.com \
  iam.googleapis.com

# Create Workload Identity Pool
print_info "Creating Workload Identity Pool..."
if gcloud iam workload-identity-pools describe $POOL_NAME --location=global &>/dev/null; then
    print_warning "Workload Identity Pool already exists, skipping..."
else
    gcloud iam workload-identity-pools create $POOL_NAME \
      --location="global" \
      --display-name="GitHub Actions Pool"
    print_info "✓ Workload Identity Pool created"
fi

# Create Workload Identity Provider
print_info "Creating Workload Identity Provider..."
if gcloud iam workload-identity-pools providers describe $PROVIDER_NAME \
    --workload-identity-pool=$POOL_NAME \
    --location=global &>/dev/null; then
    print_warning "Workload Identity Provider already exists, skipping..."
else
    gcloud iam workload-identity-pools providers create-oidc $PROVIDER_NAME \
      --location="global" \
      --workload-identity-pool=$POOL_NAME \
      --display-name="GitHub Provider" \
      --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
      --attribute-condition="assertion.repository_owner=='${GITHUB_OWNER}'" \
      --issuer-uri="https://token.actions.githubusercontent.com"
    print_info "✓ Workload Identity Provider created"
fi

# Create Service Account
print_info "Creating Service Account..."
if gcloud iam service-accounts describe ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com &>/dev/null; then
    print_warning "Service Account already exists, skipping..."
else
    gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME \
      --display-name="GitHub Actions Service Account"
    print_info "✓ Service Account created"
fi

# Grant IAM roles to service account
print_info "Granting IAM roles to service account..."

ROLES=(
    "roles/run.admin"
    "roles/iam.serviceAccountUser"
    "roles/artifactregistry.writer"
    "roles/storage.objectViewer"
)

for ROLE in "${ROLES[@]}"; do
    print_info "  Granting ${ROLE}..."
    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
      --role="$ROLE" \
      --condition=None \
      >/dev/null 2>&1 || true
done

print_info "✓ IAM roles granted"

# Allow GitHub Actions to impersonate the service account
print_info "Allowing GitHub Actions to impersonate service account..."
gcloud iam service-accounts add-iam-policy-binding \
  "${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/attribute.repository/${GITHUB_REPO}" \
  >/dev/null 2>&1 || true

print_info "✓ Workload Identity binding created"

# Print summary
echo ""
print_info "================================================================"
print_info "Setup Complete! 🎉"
print_info "================================================================"
echo ""
print_info "Add these secrets to your GitHub repository:"
echo ""
echo "1. GCP_WORKLOAD_IDENTITY_PROVIDER:"
echo "   projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/providers/${PROVIDER_NAME}"
echo ""
echo "2. GCP_SERVICE_ACCOUNT:"
echo "   ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
echo ""
print_info "================================================================"
echo ""
print_info "To add secrets to GitHub:"
echo "  1. Go to https://github.com/${GITHUB_REPO}/settings/secrets/actions"
echo "  2. Click 'New repository secret'"
echo "  3. Add each secret with the values above"
echo ""
print_info "Next steps:"
echo "  1. Run this script for the other environment if needed"
echo "  2. Add the secrets to GitHub (see above)"
echo "  3. Initialize and apply Terraform"
echo "  4. Test the deployment workflow"
echo ""
