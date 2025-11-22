# GitHub Actions GCP Deployment Setup

This guide will help you set up automated deployments to Google Cloud Platform using GitHub Actions with Workload Identity Federation (WIF) for secure, keyless authentication.

## Prerequisites

- Two GCP projects created:
  - `blog-towles-staging` (staging environment)
  - `blog-towles-prod` (production environment)
- Billing enabled on both projects
- Owner or Editor permissions on both projects
- GitHub repository with admin access

## Step 1: Set Up GCP Projects

Run these commands for **each environment** (staging and prod):

```bash
# Set your project ID
export PROJECT_ID="blog-towles-staging"  # or blog-towles-prod
export REGION="us-central1"

# Set the active project
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  iamcredentials.googleapis.com \
  iam.googleapis.com
```

## Step 2: Set Up Terraform Backend

Create state buckets for each environment:

```bash
# Staging
gcloud storage buckets create gs://blog-towles-staging-tfstate \
  --project=blog-towles-staging \
  --location=us-central1 \
  --uniform-bucket-level-access

gcloud storage buckets update gs://blog-towles-staging-tfstate --versioning

# Prod
gcloud storage buckets create gs://blog-towles-prod-tfstate \
  --project=blog-towles-prod \
  --location=us-central1 \
  --uniform-bucket-level-access

gcloud storage buckets update gs://blog-towles-prod-tfstate --versioning
```

## Step 3: Configure Terraform

For each environment, update the backend configuration:

### Staging

Edit `infra/terraform/environments/staging/main.tf` and uncomment:

```hcl
backend "gcs" {
  bucket = "blog-towles-staging-tfstate"
  prefix = "terraform/state"
}
```

### Production

Edit `infra/terraform/environments/prod/main.tf` and uncomment:

```hcl
backend "gcs" {
  bucket = "blog-towles-prod-tfstate"
  prefix = "terraform/state"
}
```

## Step 4: Set Up Workload Identity Federation

This enables GitHub Actions to authenticate to GCP without service account keys.

### For Staging Environment

```bash
export PROJECT_ID="blog-towles-staging"
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
export POOL_NAME="github-actions-pool"
export PROVIDER_NAME="github-provider"
export SERVICE_ACCOUNT_NAME="github-actions-sa"
export REPO="ChrisTowles/blog"  # Your GitHub repo (owner/repo)

gcloud config set project $PROJECT_ID

# Create Workload Identity Pool
gcloud iam workload-identity-pools create $POOL_NAME \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Create Workload Identity Provider
gcloud iam workload-identity-pools providers create-oidc $PROVIDER_NAME \
  --location="global" \
  --workload-identity-pool=$POOL_NAME \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner=='ChrisTowles'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Create Service Account
gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME \
  --display-name="GitHub Actions Service Account"

# Grant permissions to the service account
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"

# Allow GitHub Actions to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding \
  "${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/attribute.repository/${REPO}"

# Get the Workload Identity Provider name (save this for GitHub secrets)
echo "Workload Identity Provider:"
echo "projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/providers/${PROVIDER_NAME}"

echo "Service Account:"
echo "${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
```

### For Production Environment

Repeat the same steps but change the project:

```bash
export PROJECT_ID="blog-towles-prod"
# ... repeat all the commands above
```

## Step 5: Initialize Terraform

For each environment:

```bash
# Staging
cd infra/terraform/environments/staging
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

terraform init
terraform plan
terraform apply

# Prod
cd infra/terraform/environments/prod
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

terraform init
terraform plan
terraform apply
```

## Step 6: Configure GitHub Secrets

Go to your GitHub repository settings → Secrets and variables → Actions

Add the following **repository secrets**:

### For Staging and Production (shared)

These work for both environments since we're using the same setup:

1. `GCP_WORKLOAD_IDENTITY_PROVIDER`
   ```
   projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions-pool/providers/github-provider
   ```
   Use the staging project number (both environments can share the same WIF pool, or create separate ones)

2. `GCP_SERVICE_ACCOUNT`
   ```
   github-actions-sa@blog-towles-staging.iam.gserviceaccount.com
   ```

**Note:** If you want separate WIF setups for staging and prod, you can use GitHub environments and environment-specific secrets. The current workflow uses a single WIF setup for simplicity.

## Step 7: Configure GitHub Environments (Optional but Recommended)

Create two environments in GitHub:

1. Go to Settings → Environments → New environment
2. Create `staging` environment
   - No protection rules needed
3. Create `prod` environment
   - Add protection rules:
     - Required reviewers (optional)
     - Wait timer (optional)
     - Deployment branches: `main` and tags matching `v*`

## Step 8: Test the Workflow

### Test Staging Deployment

```bash
git add .
git commit -m "feat: add GCP deployment workflow"
git push origin main
```

This will trigger a deployment to staging.

### Test Production Deployment

```bash
git tag v1.0.0
git push origin v1.0.0
```

This will trigger a deployment to production.

### Manual Deployment

Go to Actions → Deploy to GCP → Run workflow → Select environment

## Architecture Overview

```
┌─────────────────┐
│  GitHub Actions │
│                 │
│  1. Build       │──┐
│  2. Push Image  │  │
│  3. Deploy      │  │
└─────────────────┘  │
                     │
                     ▼
         ┌──────────────────────┐
         │  Workload Identity   │
         │     Federation       │
         │  (Keyless Auth)      │
         └──────────────────────┘
                     │
                     ▼
         ┌──────────────────────┐
         │   Google Cloud       │
         │                      │
         │  ┌────────────────┐  │
         │  │ Artifact       │  │
         │  │ Registry       │  │
         │  │ (Docker)       │  │
         │  └────────────────┘  │
         │                      │
         │  ┌────────────────┐  │
         │  │  Cloud Run     │  │
         │  │  (App Server)  │  │
         │  └────────────────┘  │
         │           │          │
         │           ▼          │
         │  ┌────────────────┐  │
         │  │  Cloud SQL     │  │
         │  │  (PostgreSQL)  │  │
         │  └────────────────┘  │
         └──────────────────────┘
```

## Troubleshooting

### Permission Denied Errors

Make sure the service account has all required roles:
```bash
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:github-actions-sa@*"
```

### Workload Identity Federation Issues

Verify the WIF setup:
```bash
gcloud iam workload-identity-pools providers describe github-provider \
  --workload-identity-pool=github-actions-pool \
  --location=global
```

### Image Push Failures

Make sure Artifact Registry repository exists:
```bash
gcloud artifacts repositories list --location=us-central1
```

### Deployment Verification Fails

Check Cloud Run logs:
```bash
gcloud run services logs read SERVICE_NAME \
  --project=$PROJECT_ID \
  --region=us-central1 \
  --limit=50
```

## Cost Optimization

Current setup is optimized for low cost (~$20-30/month total):

- **Cloud SQL**: db-f1-micro (shared CPU, 614 MB RAM)
- **Cloud Run**: Scales to zero when not in use
- **Artifact Registry**: Pay for storage only
- **Secrets Manager**: First 6 versions free per secret

To reduce costs further:
- Delete staging environment when not needed
- Use Cloud SQL scheduled instances (start/stop on schedule)
- Enable Cloud Run CPU throttling

## Security Best Practices

✅ Using Workload Identity Federation (no service account keys)
✅ Secrets stored in Secret Manager
✅ Least privilege IAM roles
✅ SSL/TLS for all connections
✅ Public IP with Cloud SQL Auth Proxy

## Next Steps

1. Set up custom domain with Cloud Run
2. Configure Cloud CDN for static assets
3. Set up monitoring and alerting
4. Configure backup retention policies
5. Set up Cloud Armor for DDoS protection (optional)
