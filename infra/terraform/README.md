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
│   ├── cloud-sql/      # PostgreSQL database (public IP)
│   ├── cloud-run/      # Container hosting
│   └── shared/         # IAM, service accounts, Artifact Registry
└── environments/
    ├── staging/        # Staging environment
    └── prod/           # Production environment
```

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
   
   # test
   gcloud config set project blog-towles-staging

   gcloud config set project blog-towles-production

   
   gcloud auth login

   

   gcloud auth application-default login
   ```

5. **Enable billing** on both projects

## Initial Setup

### 1. Create state buckets

For each environment:

```bash
# Staging
ENV_STAGING_PROJECT_ID="blog-towles-staging"
gcloud storage buckets create gs://$ENV_STAGING_PROJECT_ID-tfstate \
  --project=$ENV_STAGING_PROJECT_ID \
  --location=us-central1 \
  --uniform-bucket-level-access

# Prod
ENV_PROD_PROJECT_ID="blog-towles-production"
gcloud storage buckets create gs://$ENV_PROD_PROJECT_ID-tfstate \
  --project=$ENV_PROD_PROJECT_ID \
  --location=us-central1 \
  --uniform-bucket-level-access
```

### 2. Enable versioning (recommended)

```bash
gcloud storage buckets update "gs://$ENV_STAGING_PROJECT_ID-tfstate" --versioning
gcloud storage buckets update "gs://$ENV_PROD_PROJECT_ID-tfstate" --versioning
```

### 3. Create secrets in GCP Secret Manager

Terraform references existing secrets rather than creating them. Secret names are the same in each project (project provides environment isolation).

#### Staging
```bash
export PROJECT=blog-towles-staging
export DB_PASSWORD="$(openssl rand -base64 16)"

# Create secrets (first time only)
echo -n "REPLACE_ME" | gcloud secrets create anthropic-api-key --data-file=- --project=$PROJECT
echo -n "$(openssl rand -base64 32)" | gcloud secrets create session-password --data-file=- --project=$PROJECT
echo "DB_PASSWORD: $DB_PASSWORD"
echo -n "$DB_PASSWORD" | gcloud secrets create database-password --data-file=- --project=$PROJECT
```

#### Production
```bash
export PROJECT=blog-towles-production
export DB_PASSWORD="$(openssl rand -base64 16)"

# Create secrets (first time only)
echo -n "REPLACE_ME" | gcloud secrets create anthropic-api-key --data-file=- --project=$PROJECT
echo -n "$(openssl rand -base64 32)" | gcloud secrets create session-password --data-file=- --project=$PROJECT
echo "DB_PASSWORD: $DB_PASSWORD"
echo -n "$DB_PASSWORD" | gcloud secrets create database-password --data-file=- --project=$PROJECT
```

#### AWS Bedrock credentials (for RAG embeddings)
```bash
# Set PROJECT to staging or production
export PROJECT=blog-towles-staging  # or blog-towles-production

echo -n "AKIAXXXXXXXX" | gcloud secrets create aws-access-key-id --data-file=- --project=$PROJECT
echo -n "xxxxxxxxxx" | gcloud secrets create aws-secret-access-key --data-file=- --project=$PROJECT
```

#### Update secrets
```bash
# Set PROJECT to staging or production
export PROJECT=blog-towles-staging  # or blog-towles-production

echo -n "NEW_VALUE" | gcloud secrets versions add anthropic-api-key --data-file=- --project=$PROJECT
echo -n "NEW_VALUE" | gcloud secrets versions add session-password --data-file=- --project=$PROJECT
echo -n "NEW_VALUE" | gcloud secrets versions add database-password --data-file=- --project=$PROJECT
echo -n "NEW_VALUE" | gcloud secrets versions add aws-access-key-id --data-file=- --project=$PROJECT
echo -n "NEW_VALUE" | gcloud secrets versions add aws-secret-access-key --data-file=- --project=$PROJECT
```

#### View secrets
```bash
# Set PROJECT to staging or production
export PROJECT=blog-towles-staging  # or blog-towles-production

gcloud secrets versions access latest --secret=anthropic-api-key --project=$PROJECT
gcloud secrets versions access latest --secret=session-password --project=$PROJECT
gcloud secrets versions access latest --secret=database-password --project=$PROJECT
```

### 4. Configure environment

```bash
cd terraform/environments/staging
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
```

### 5. Uncomment backend config

In `main.tf`, uncomment the backend block and update bucket name.

### 6. Initialize and apply

```bash
terraform init
terraform plan
terraform apply
```

Repeat for prod environment.

## Common Operations

### Deploy to staging

```bash
cd infra/terraform/environments/staging
terraform apply
```

### Deploy to prod

```bash
cd infra/terraform/environments/prod
terraform plan  # Review changes carefully
terraform apply
```

### Update container image

```bash
terraform apply -var='container_image=us-central1-docker.pkg.dev/PROJECT/REPO/blog:v1.2.3'
```

Or update in terraform.tfvars and run `terraform apply`.

### View outputs

```bash
terraform output
```

### Destroy staging (careful!)

```bash
cd infra/terraform/environments/staging
terraform destroy
```

## Container Build & Push

After applying infrastructure, build and push images:

```bash
# Get artifact registry URL from terraform output
REGISTRY=$(cd infra/terraform/environments/staging && terraform output -raw container_image_base)

# Authenticate Docker
gcloud auth configure-docker us-central1-docker.pkg.dev

# Build and push
docker build -t $REGISTRY/blog:latest .
docker push $REGISTRY/blog:latest

# Update Cloud Run with new image
cd infra/terraform/environments/staging
terraform apply -var="container_image=$REGISTRY/blog:latest"
```

## Environment Differences

| Feature                | Staging     | Prod        |
| ---------------------- | ----------- | ----------- |
| Cloud SQL Tier         | db-f1-micro | db-f1-micro |
| Availability           | Zonal       | Zonal       |
| Point-in-time Recovery | No          | No          |
| Deletion Protection    | No          | Yes         |
| Min Instances          | 0           | 0           |
| Max Instances          | 2           | 2           |
| CPU                    | 1           | 1           |
| Memory                 | 512Mi       | 512Mi       |

*Prod has same resource allocation as staging to minimize costs. Only difference is deletion protection.*

## Cost Estimates

Both environments use same resource tiers to minimize costs:

- Cloud SQL: ~$10/month (db-f1-micro, zonal, public IP)
- Cloud Run: ~$0-5/month (scales to zero)
- **Total per environment: ~$10-15/month**

**Both staging + prod: ~$20-30/month**

*Can upgrade prod to db-g1-small regional HA (~$50/mo) + min instance (+ $15/mo) if traffic/uptime requirements increase.*

## Security

- Database credentials stored in Secret Manager
- Cloud SQL uses public IP with Cloud SQL Auth Proxy (IAM-based authentication)
- Service accounts with minimal permissions (cloudsql.client role required)
- SSL required for all database connections
- No IP allowlisting needed - authentication via IAM
- `terraform.tfvars` in `.gitignore` (never commit secrets)

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

## CI/CD Integration

Create service account for deployments:

```bash
gcloud iam service-accounts create ci-cd \
  --project=PROJECT_ID \
  --display-name="CI/CD Service Account"

# Grant necessary roles
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:ci-cd@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:ci-cd@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

Add to `terraform.tfvars`:
```
ci_service_account_email = "ci-cd@PROJECT_ID.iam.gserviceaccount.com"
```

## Migration from Cloudflare

1. Apply Terraform to create GCP infrastructure
2. Build and push container image
3. Run database migrations against Cloud SQL
4. Test staging deployment
5. Update DNS to point to Cloud Run URL
6. Apply prod Terraform
7. Deploy to prod
8. Verify and decommission Cloudflare resources
