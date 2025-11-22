#!/bin/bash

# Complete GCP Infrastructure Setup Script
# This orchestrates the entire setup process for both environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Print banner
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  Blog Deployment Infrastructure Setup                     ║"
echo "║  Google Cloud Platform + GitHub Actions                   ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check prerequisites
print_step "Checking prerequisites..."

if ! command -v gcloud &> /dev/null; then
    print_error "gcloud CLI is not installed"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

if ! command -v terraform &> /dev/null; then
    print_error "Terraform is not installed"
    echo "Install from: https://www.terraform.io/downloads"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    print_warning "jq is not installed (recommended)"
fi

print_info "✓ All required tools are installed"
echo ""

# Confirm setup
print_warning "This script will set up the complete infrastructure for:"
echo "  - Staging environment (blog-towles-staging)"
echo "  - Production environment (blog-towles-prod)"
echo ""
print_warning "Make sure you have:"
echo "  ✓ Created both GCP projects"
echo "  ✓ Enabled billing on both projects"
echo "  ✓ Have Owner or Editor permissions"
echo "  ✓ Authenticated with: gcloud auth login"
echo ""

read -p "Continue with setup? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "Setup cancelled."
    exit 0
fi

echo ""

# Step 1: Create Terraform state buckets
print_step "Step 1/3: Setting up Terraform state buckets..."
bash "$SCRIPT_DIR/setup-terraform-backend.sh"
echo ""

# Step 2: Setup Workload Identity Federation for staging
print_step "Step 2/3: Setting up Workload Identity Federation for STAGING..."
bash "$SCRIPT_DIR/setup-wif.sh" staging
echo ""

# Step 3: Setup Workload Identity Federation for production
print_step "Step 3/3: Setting up Workload Identity Federation for PRODUCTION..."
bash "$SCRIPT_DIR/setup-wif.sh" prod
echo ""

# Print final summary
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  Setup Complete! 🎉                                       ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

print_info "What's been set up:"
echo "  ✓ Terraform state buckets (both environments)"
echo "  ✓ Workload Identity Federation (both environments)"
echo "  ✓ Service accounts with required permissions"
echo "  ✓ API enablement"
echo ""

print_info "GitHub Secrets to Add:"
echo ""
echo "Go to: https://github.com/ChrisTowles/blog/settings/secrets/actions"
echo ""
echo "Add these secrets (from script outputs above):"
echo "  1. GCP_WORKLOAD_IDENTITY_PROVIDER"
echo "  2. GCP_SERVICE_ACCOUNT"
echo ""

print_info "Next Steps:"
echo ""
echo "1. Add GitHub secrets (see above)"
echo ""
echo "2. Initialize Terraform for staging:"
echo "   cd infra/terraform/environments/staging"
echo "   cp terraform.tfvars.example terraform.tfvars"
echo "   # Edit terraform.tfvars with your values"
echo "   terraform init"
echo "   terraform apply"
echo ""
echo "3. Initialize Terraform for production:"
echo "   cd infra/terraform/environments/prod"
echo "   cp terraform.tfvars.example terraform.tfvars"
echo "   # Edit terraform.tfvars with your values"
echo "   terraform init"
echo "   terraform apply"
echo ""
echo "4. Test deployment:"
echo "   git push origin main  # Deploy to staging"
echo "   git tag v1.0.0 && git push origin v1.0.0  # Deploy to prod"
echo ""

print_info "Documentation:"
echo "  - Quick Start: DEPLOYMENT.md"
echo "  - Detailed Setup: .github/workflows/SETUP.md"
echo "  - Terraform: infra/terraform/README.md"
echo ""
