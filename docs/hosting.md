# Hosting & Deployment

GCP via Terraform. Migrated from Cloudflare Workers/NuxtHub.

## Architecture

- **Cloud Run**: Container hosting (scales to zero)
- **Cloud SQL**: PostgreSQL (public IP + Auth Proxy)
- **Artifact Registry**: Docker images
- **Secret Manager**: API keys, DB credentials, session passwords

## GCP Projects

- Production: `blog-towles-production` - [Console](https://console.cloud.google.com/welcome?project=blog-towles-production)
- Staging: `blog-towles-staging` - [Console](https://console.cloud.google.com/welcome?project=blog-towles-staging)

## Deploy Commands

```bash
# Staging
nr gcp:staging:init      # terraform init
nr gcp:staging:plan      # terraform plan
nr gcp:staging:apply     # terraform apply
nr gcp:staging:deploy    # build & push container, deploy
nr gcp:staging:logs      # tail logs

# Production
nr gcp:prod:init         # terraform init
nr gcp:prod:apply        # terraform apply
nr gcp:prod:deploy       # build & push container, deploy
nr gcp:prod:logs         # tail logs
```

## Terraform Structure

```
infra/terraform/
├── modules/
│   ├── cloud-run/    # Container hosting
│   ├── cloud-sql/    # PostgreSQL database
│   └── shared/       # IAM, service accounts, registry
└── environments/
    ├── staging/
    └── prod/
```

Full terraform docs: [infra/terraform/README.md](../infra/terraform/README.md)

## Cost

~$20-30/month for both environments (Cloud SQL db-f1-micro + Cloud Run scales to zero).
