# Deployment Guide

This document provides instructions for deploying the blog to Google Cloud Platform using Terraform and GitHub Actions.

## Quick Start

### Prerequisites

- Google Cloud account with billing enabled
- Two GCP projects:
  - `blog-towles-staging` (staging environment)
  - `blog-towles-prod` (production environment)
- `gcloud` CLI installed and authenticated
- Terraform >= 1.5 installed
- GitHub repository admin access

### 1. Automated Setup (Recommended)

Use the automated setup script to configure Workload Identity Federation:

```bash
# For staging
./infra/scripts/setup-wif.sh staging

# For production
./infra/scripts/setup-wif.sh prod
```

The script will output the secrets you need to add to GitHub.

### 2. Add GitHub Secrets

Go to your repository settings → Secrets and variables → Actions, and add:

1. **GCP_WORKLOAD_IDENTITY_PROVIDER** (from script output)
2. **GCP_SERVICE_ACCOUNT** (from script output)

### 3. Initialize Terraform

For each environment:

```bash
# Staging
cd infra/terraform/environments/staging
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform init
terraform apply

# Production
cd infra/terraform/environments/prod
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform init
terraform apply
```

### 4. Deploy

**Staging**: Push to `main` branch
```bash
git push origin main
```

**Production**: Create a tag
```bash
git tag v1.0.0
git push origin v1.0.0
```

**Manual**: Use GitHub Actions UI
- Go to Actions → Deploy to GCP → Run workflow
- Select environment (staging/prod)

## Architecture

```
GitHub Actions → Build Docker Image → Push to Artifact Registry → Deploy to Cloud Run
                                                                           ↓
                                                                   Cloud SQL (PostgreSQL)
```

## Environments

### Staging
- **Project**: `blog-towles-staging`
- **URL**: From Cloud Run (auto-generated)
- **Trigger**: Push to `main` branch
- **Database**: db-f1-micro, zonal

### Production
- **Project**: `blog-towles-prod`
- **URL**: From Cloud Run (auto-generated)
- **Trigger**: Tag matching `v*` (e.g., v1.0.0)
- **Database**: db-f1-micro, zonal, deletion protection enabled

## Workflows

### Deploy to GCP Workflow

File: `.github/workflows/deploy-gcp.yml`

**Jobs:**
1. **Setup**: Determine environment and configuration
2. **Build**: Build and push Docker image to Artifact Registry
3. **Deploy**: Deploy image to Cloud Run

**Triggers:**
- Push to `main` → staging
- Tag `v*` → production
- Manual workflow dispatch → choose environment

## Infrastructure

### Terraform Modules

Located in `infra/terraform/modules/`:

- **shared**: IAM, service accounts, Artifact Registry
- **cloud-sql**: PostgreSQL database with public IP
- **cloud-run**: Container hosting with auto-scaling

### Terraform Environments

Located in `infra/terraform/environments/`:

- **staging/**: Staging environment configuration
- **prod/**: Production environment configuration

Each environment includes:
- `main.tf`: Module composition
- `variables.tf`: Input variables
- `outputs.tf`: Output values
- `terraform.tfvars.example`: Example configuration
- `.terraform.lock.hcl`: Dependency lock file

## Security

✅ **Workload Identity Federation**: Keyless authentication (no service account keys)
✅ **Secrets Manager**: Database credentials stored securely
✅ **IAM**: Least privilege service accounts
✅ **SSL/TLS**: Required for all connections
✅ **Cloud SQL Auth Proxy**: IAM-based database authentication

## Cost Estimate

### Per Environment
- Cloud SQL (db-f1-micro): ~$10/month
- Cloud Run (scales to zero): ~$0-5/month
- Artifact Registry: ~$1/month
- **Total: ~$11-16/month per environment**

### Both Environments
- **Total: ~$22-32/month**

## Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

```bash
# Build and push image
export PROJECT_ID="blog-towles-staging"
export REGION="us-central1"

# Authenticate Docker
gcloud auth configure-docker ${REGION}-docker.pkg.dev

# Build image
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/staging-containers/blog:latest .

# Push image
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/staging-containers/blog:latest

# Deploy to Cloud Run
gcloud run deploy staging-blog \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/staging-containers/blog:latest \
  --region=${REGION} \
  --project=${PROJECT_ID} \
  --platform=managed \
  --allow-unauthenticated
```

## Troubleshooting

### Build Failures

Check GitHub Actions logs:
- Go to Actions → Latest workflow run
- Check build job logs

### Deployment Failures

Check Cloud Run logs:
```bash
gcloud run services logs read staging-blog \
  --project=blog-towles-staging \
  --region=us-central1 \
  --limit=50
```

### Database Connection Issues

Verify Cloud SQL is running:
```bash
gcloud sql instances list --project=blog-towles-staging
```

Check database connection secret:
```bash
gcloud secrets versions access latest \
  --secret=staging-database-connection-string \
  --project=blog-towles-staging
```

### Permission Issues

Verify service account has required roles:
```bash
gcloud projects get-iam-policy blog-towles-staging \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:github-actions-sa@*"
```

## Monitoring

### Cloud Run Metrics

```bash
# View service details
gcloud run services describe staging-blog \
  --region=us-central1 \
  --project=blog-towles-staging
```

### View Logs

```bash
# Cloud Run logs
gcloud run services logs read staging-blog \
  --region=us-central1 \
  --project=blog-towles-staging

# Cloud SQL logs
gcloud sql operations list \
  --instance=staging-blog-db \
  --project=blog-towles-staging
```

## Rollback

### Rollback to Previous Image

```bash
# List revisions
gcloud run revisions list \
  --service=staging-blog \
  --region=us-central1 \
  --project=blog-towles-staging

# Rollback to specific revision
gcloud run services update-traffic staging-blog \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1 \
  --project=blog-towles-staging
```

## Cleanup

### Delete Staging Environment

```bash
cd infra/terraform/environments/staging
terraform destroy
```

### Delete Production Environment

```bash
cd infra/terraform/environments/prod
terraform destroy
```

**Warning**: This will delete all resources including the database. Make sure you have backups!

## Additional Resources

- [Detailed Setup Guide](.github/workflows/SETUP.md)
- [Terraform Documentation](infra/terraform/README.md)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Cloud Run and Cloud SQL logs
3. Check GitHub Actions workflow logs
4. Create an issue in the repository
