# Terraform Infrastructure

Infrastructure as code for blog deployment on Google Cloud Platform.

Uses simplified architecture with Cloud SQL public IP + Auth Proxy (no VPC) to minimize costs (~$20-30/mo for both environments).

## GCP Projects

- https://console.cloud.google.com/welcome?project=blog-towles-production
- https://console.cloud.google.com/welcome?project=blog-towles-staging

## Structure

```
infra/terraform/
├── modules/
│   ├── cloud-sql/        # PostgreSQL database (public IP)
│   ├── cloud-run/        # Container hosting
│   ├── shared/           # IAM, service accounts, Artifact Registry
│   ├── github-oidc/      # Workload Identity Federation (prod only)
│   └── cost-scheduler/   # Cloud Function + Scheduler to stop SQL nightly (staging only)
└── environments/
    ├── main.tf               # Unified config with conditional modules
    ├── variables.tf          # Single variable definition set
    ├── outputs.tf            # Merged outputs
    ├── staging.tfvars        # Staging values
    ├── prod.tfvars           # Production values
    ├── staging.backend.tfvars  # Staging state bucket
    └── prod.backend.tfvars     # Production state bucket
```

Single root module with per-environment `.tfvars` files. Environment-specific modules use `count` conditionals:

- `github_oidc` — prod only
- `cost_scheduler` — staging only

## Prerequisites

1. **Install Terraform** (>= 1.5)

   ```bash
   wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
   echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
   sudo apt update && sudo apt install terraform
   ```

2. **Install gcloud CLI**

   ```bash
   curl https://sdk.cloud.google.com | bash
   ```

3. **Create GCP projects**
   - Staging: `blog-towles-staging`
   - Prod: `blog-towles-production`

4. **Authenticate**

   ```bash
   gcloud auth login
   gcloud auth application-default login

   # Set active project
   gcloud config set project blog-towles-staging
   # or
   gcloud config set project blog-towles-production
   ```

5. **Enable billing** on both projects

## Initial Setup

### 1. Create state buckets

```bash
# Staging
gcloud storage buckets create gs://blog-towles-staging-tfstate \
  --project=blog-towles-staging \
  --location=us-central1 \
  --uniform-bucket-level-access

# Prod
gcloud storage buckets create gs://blog-towles-production-tfstate \
  --project=blog-towles-production \
  --location=us-central1 \
  --uniform-bucket-level-access
```

### 2. Enable versioning (recommended)

```bash
gcloud storage buckets update "gs://blog-towles-staging-tfstate" --versioning
gcloud storage buckets update "gs://blog-towles-production-tfstate" --versioning
```

### 3. Create secrets in GCP Secret Manager

Terraform references existing secrets rather than creating them. Secret names are the same in each project (project provides environment isolation).

```bash
# Set PROJECT to staging or production
export PROJECT=blog-towles-staging  # or blog-towles-production
export DB_PASSWORD="$(openssl rand -base64 16)"

# Create secrets (first time only)
echo -n "REPLACE_ME" | gcloud secrets create anthropic-api-key --data-file=- --project=$PROJECT
echo -n "$(openssl rand -base64 32)" | gcloud secrets create session-password --data-file=- --project=$PROJECT
echo "DB_PASSWORD: $DB_PASSWORD"
echo -n "$DB_PASSWORD" | gcloud secrets create database-password --data-file=- --project=$PROJECT
```

#### AWS Bedrock credentials (for RAG embeddings)

```bash
echo -n "AKIAXXXXXXXX" | gcloud secrets create aws-access-key-id --data-file=- --project=$PROJECT
echo -n "xxxxxxxxxx" | gcloud secrets create aws-secret-access-key --data-file=- --project=$PROJECT
```

#### GitHub OAuth credentials (site login)

Create OAuth apps at https://github.com/settings/developers (one per environment).

Callback URLs:

- Staging: `https://staging-chris.towles.dev/api/auth/github`
- Production: `https://chris.towles.dev/api/auth/github`

```bash
echo -n "YOUR_CLIENT_ID" | gcloud secrets create github-oauth-client-id --data-file=- --project=$PROJECT
echo -n "YOUR_CLIENT_SECRET" | gcloud secrets create github-oauth-client-secret --data-file=- --project=$PROJECT
```

#### Update secrets

```bash
echo -n "NEW_VALUE" | gcloud secrets versions add SECRET_NAME --data-file=- --project=$PROJECT
```

#### View secrets

```bash
gcloud secrets versions access latest --secret=SECRET_NAME --project=$PROJECT
```

### 4. Initialize and apply

```bash
cd infra/terraform/environments

# Staging
terraform init -backend-config=staging.backend.tfvars
terraform plan -var-file=staging.tfvars
terraform apply -var-file=staging.tfvars

# Prod (switch backend)
terraform init -backend-config=prod.backend.tfvars -reconfigure
terraform plan -var-file=prod.tfvars
terraform apply -var-file=prod.tfvars
```

## Common Operations

### Deploy to staging

**Always use the deploy script** (builds container + applies terraform):

```bash
pnpm gcp:staging:deploy
```

To apply infrastructure changes only (no container build):

```bash
pnpm gcp:staging:apply
```

### Deploy to prod

**Always use the deploy script** (builds container + applies terraform):

```bash
pnpm gcp:prod:deploy
```

To apply infrastructure changes only (no container build):

```bash
pnpm gcp:prod:apply
```

### Plan changes

```bash
pnpm gcp:staging:plan
pnpm gcp:prod:plan
```

### View outputs

```bash
cd infra/terraform/environments
terraform init -backend-config=staging.backend.tfvars -reconfigure
terraform output
```

### Destroy staging (careful!)

```bash
pnpm gcp:staging:destroy
```

## Environment Differences

| Feature                | Staging                     | Prod                     |
| ---------------------- | --------------------------- | ------------------------ |
| Cloud SQL Tier         | db-f1-micro                 | db-f1-micro              |
| Availability           | Zonal                       | Zonal                    |
| Point-in-time Recovery | No                          | No                       |
| Deletion Protection    | No                          | No                       |
| Min Instances          | 0                           | 0                        |
| Max Instances          | 2                           | 2                        |
| GitHub OIDC            | No                          | Yes                      |
| Cost Scheduler         | Yes                         | No                       |
| Google Analytics       | `gtag_id` in staging.tfvars | `gtag_id` in prod.tfvars |

The `gtag_id` variable sets `NUXT_PUBLIC_GTAG_ID` on Cloud Run. See [Analytics docs](../../docs/analytics.md) for measurement IDs and GA4 property details.

## Cost Estimates

Both environments use same resource tiers to minimize costs:

- Cloud SQL: ~$10/month (db-f1-micro, zonal, public IP)
- Cloud Run: ~$0-5/month (scales to zero)
- **Total per environment: ~$10-15/month**

**Both staging + prod: ~$20-30/month**

## Security

- Database credentials stored in Secret Manager
- Cloud SQL uses public IP with Cloud SQL Auth Proxy (IAM-based authentication)
- Service accounts with minimal permissions (cloudsql.client role required)
- SSL required for all database connections
- No IP allowlisting needed - authentication via IAM

## CI/CD Integration

GitHub Actions deploys automatically on push to `main` using Workload Identity Federation (no long-lived keys).

The `github_oidc` Terraform module creates:

- Workload Identity Pool + OIDC Provider for GitHub Actions
- `github-actions-ci` service account with Cloud Run, Artifact Registry, and actAs permissions
- WIF binding scoped to the `ChrisTowles/blog` repository

### Setup

1. Apply Terraform for prod:

   ```bash
   pnpm gcp:prod:apply
   ```

2. Set GitHub repo variables from terraform output:

   ```bash
   cd infra/terraform/environments
   terraform init -backend-config=prod.backend.tfvars -reconfigure
   gh variable set GCP_WIF_PROVIDER --body "$(terraform output -raw wif_provider)"
   gh variable set GCP_WIF_SERVICE_ACCOUNT --body "$(terraform output -raw ci_service_account_email)"
   ```

3. Push to `main` — the Deploy workflow triggers automatically.

## Troubleshooting

### API not enabled

```bash
gcloud services enable SERVICE_NAME.googleapis.com --project=PROJECT_ID
```

### Cloud Run can't connect to Cloud SQL

- Check service account has `cloudsql.client` role
- Verify DATABASE_URL secret is set correctly
- Check Cloud SQL instance has public IP enabled
- Ensure SSL is required in Cloud SQL settings

### State lock issues

```bash
terraform force-unlock LOCK_ID
```
