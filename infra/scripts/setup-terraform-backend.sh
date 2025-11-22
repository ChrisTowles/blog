#!/bin/bash

# Setup Terraform Backend (GCS State Buckets)
# This script creates the GCS buckets needed for Terraform state storage

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    print_error "gcloud CLI is not installed. Please install it first."
    exit 1
fi

# Configuration
REGION="us-central1"
STAGING_PROJECT="blog-towles-staging"
PROD_PROJECT="blog-towles-prod"

print_info "Setting up Terraform state buckets..."
echo ""

# Function to create state bucket
create_state_bucket() {
    local project_id=$1
    local bucket_name="${project_id}-tfstate"

    print_info "Setting up bucket for project: ${project_id}"

    # Set active project
    gcloud config set project $project_id

    # Check if bucket exists
    if gsutil ls -b "gs://${bucket_name}" &>/dev/null; then
        print_warning "Bucket gs://${bucket_name} already exists, skipping creation..."
    else
        print_info "Creating bucket gs://${bucket_name}..."
        gcloud storage buckets create "gs://${bucket_name}" \
          --project=$project_id \
          --location=$REGION \
          --uniform-bucket-level-access

        print_info "✓ Bucket created"
    fi

    # Enable versioning
    print_info "Enabling versioning on bucket..."
    gcloud storage buckets update "gs://${bucket_name}" --versioning

    print_info "✓ Versioning enabled"
    echo ""
}

# Create buckets for both environments
create_state_bucket $STAGING_PROJECT
create_state_bucket $PROD_PROJECT

# Print summary
print_info "================================================================"
print_info "Terraform Backend Setup Complete! 🎉"
print_info "================================================================"
echo ""
print_info "State buckets created:"
echo "  - gs://${STAGING_PROJECT}-tfstate"
echo "  - gs://${PROD_PROJECT}-tfstate"
echo ""
print_info "Next steps:"
echo "  1. Update backend configuration in Terraform files"
echo "  2. Uncomment the backend block in main.tf for each environment"
echo "  3. Run 'terraform init' to migrate state to GCS"
echo ""
print_info "Example backend configuration:"
echo ""
echo "  # For staging (infra/terraform/environments/staging/main.tf)"
echo "  backend \"gcs\" {"
echo "    bucket = \"${STAGING_PROJECT}-tfstate\""
echo "    prefix = \"terraform/state\""
echo "  }"
echo ""
echo "  # For prod (infra/terraform/environments/prod/main.tf)"
echo "  backend \"gcs\" {"
echo "    bucket = \"${PROD_PROJECT}-tfstate\""
echo "    prefix = \"terraform/state\""
echo "  }"
echo ""
