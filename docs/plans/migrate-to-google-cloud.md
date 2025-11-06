# Migration Plan: Blog to GCP Cloud Run

This is github issue [88](https://github.com/ChrisTowles/blog/issues/88)

## Overview

Migrate the blog from Cloudflare Workers/NuxtHub to Google Cloud Platform using Cloud Run with containerization.

**Target Environment:**
- GCP Project: `blog-chris-towles`
- Compute: Cloud Run (serverless containers)
- Database: Cloud SQL PostgreSQL
- Strategy: Replace Cloudflare deployment

## Phase 1: Docker Containerization

### 1.1 Create Dockerfile
- [ ] Create multi-stage build:
  - Build stage: Node 24 + pnpm to build Nuxt app
  - Production stage: Node runtime to serve `.output/server/index.mjs`
- [ ] Include native dependencies build tools (for better-sqlite3, sharp, etc)
- [ ] Copy content directory for markdown files

### 1.2 Create .dockerignore
- [ ] Exclude: node_modules, .output, .nuxt, dist, build artifacts
- [ ] Include: source code, content, package files

### 1.3 Update Nuxt Configuration
- [ ] Change preset from `cloudflare_pages` to `node-server` in `nuxt.config.ts`
- [ ] Remove Cloudflare-specific modules if any
- [ ] Ensure SSR remains enabled

### 1.4 Test Docker Build Locally
- [ ] Build image: `docker build -t blog:test .`
- [ ] Run container: `docker run -p 3000:3000 blog:test`
- [ ] Verify blog loads at localhost:3000

## Phase 2: GCP Infrastructure Setup

### 2.1 Enable Required GCP APIs
- [ ] Enable Cloud Run API
- [ ] Enable Cloud SQL Admin API
- [ ] Enable Secret Manager API
- [ ] Enable Artifact Registry API
```bash
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 2.2 Create Cloud SQL PostgreSQL Instance
- [ ] Create PostgreSQL 15 instance with db-f1-micro tier
```bash
gcloud sql instances create blog-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --project=blog-chris-towles
```

### 2.3 Create Artifact Registry Repository
- [ ] Create Docker repository for blog images
```bash
gcloud artifacts repositories create blog-images \
  --repository-format=docker \
  --location=us-central1 \
  --project=blog-chris-towles
```

### 2.4 Set Up Secret Manager
- [ ] Create secret for `NUXT_SESSION_PASSWORD`
- [ ] Create secret for `NUXT_OAUTH_GITHUB_CLIENT_SECRET`
- [ ] Create secrets for database connection credentials
```bash
echo -n "secret-value" | gcloud secrets create SECRET_NAME --data-file=-
```

## Phase 3: Database Setup

### 3.1 Create Database
- [ ] Create initial database in Cloud SQL instance
```bash
gcloud sql databases create blog --instance=blog-db
```

### 3.2 Run Database Migrations
- [ ] Run Drizzle migrations to set up schema
```bash
pnpm run db:migrate
```

### 3.3 Configure Database Connection
- [ ] Set up Cloud SQL connection string for application
- [ ] Update environment variables with database credentials
- [ ] Configure Cloud SQL Proxy connection if needed

## Phase 4: Application Updates

### 4.1 Remove NuxtHub/Cloudflare Dependencies
- [ ] Remove `@nuxthub/core` from `packages/blog/package.json`
- [ ] Remove `wrangler` from dependencies
- [ ] Remove other Cloudflare-specific packages
- [ ] Run `pnpm install` to update lockfile

### 4.2 Update Environment Variables
- [ ] Create `.env.production` for GCP
- [ ] Add database URL for Cloud SQL
- [ ] Update OAuth callback URLs for new domain
- [ ] Add Google Analytics ID
- [ ] Add session password

### 4.3 Remove Cloudflare Configs
- [ ] Delete `wrangler.toml` if exists
- [ ] Remove Cloudflare deployment scripts from package.json
- [ ] Clean up Cloudflare-specific code references

### 4.4 Update Build Scripts
- [ ] Remove `deploy:nuxthub` script from package.json
- [ ] Remove `deploy:main` script
- [ ] Add `deploy:gcp` script for Cloud Run deployment

## Phase 5: Cloud Run Deployment

### 5.1 Build and Push Docker Image
- [ ] Build and push image to Artifact Registry
```bash
cd packages/blog
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/blog-chris-towles/blog-images/blog:latest \
  --project=blog-chris-towles
```

### 5.2 Deploy to Cloud Run
- [ ] Deploy service with Cloud SQL connection and secrets
```bash
gcloud run deploy blog \
  --image us-central1-docker.pkg.dev/blog-chris-towles/blog-images/blog:latest \
  --platform managed \
  --region us-central1 \
  --add-cloudsql-instances blog-chris-towles:us-central1:blog-db \
  --set-secrets="SESSION_PASSWORD=NUXT_SESSION_PASSWORD:latest" \
  --allow-unauthenticated \
  --project=blog-chris-towles
```

### 5.3 Configure Environment Variables
- [ ] Set non-sensitive environment variables
```bash
gcloud run services update blog \
  --set-env-vars="NUXT_PUBLIC_GTAG_ID=..." \
  --region=us-central1
```

### 5.4 Set Up Custom Domain (Optional)
- [ ] Map custom domain to Cloud Run service
```bash
gcloud run domain-mappings create \
  --service blog \
  --domain yourdomain.com \
  --region us-central1
```

### 5.5 Configure Auto-Scaling
- [ ] Set scaling parameters (min/max instances, concurrency, resources)
```bash
gcloud run services update blog \
  --min-instances=0 \
  --max-instances=10 \
  --concurrency=80 \
  --cpu=1 \
  --memory=512Mi
```

## Phase 6: Create "hosting" Claude Skill

### 6.1 Create Skill Directory Structure
- [ ] Create `.claude/skills/hosting/` directory
- [ ] Create `skill.md` file
- [ ] Create `README.md` file

### 6.2 Create skill.md
- [ ] Add build & deploy commands (build image and deploy to Cloud Run)
- [ ] Add view logs command: `gcloud run logs read blog --region=us-central1`
- [ ] Add check status command: `gcloud run services describe blog --region=us-central1`

### 6.3 Test Skill Commands
- [ ] Test deploy workflow
- [ ] Test log retrieval
- [ ] Test status checking

## Phase 7: Testing & Cleanup

### 7.1 Validate Deployment
- [ ] Blog loads correctly
- [ ] Database connectivity works
- [ ] OAuth authentication works
- [ ] Static assets load
- [ ] Content renders properly
- [ ] Check logs for errors

### 7.2 Performance Testing
- [ ] Test auto-scaling behavior
- [ ] Monitor cold start times
- [ ] Check response times

### 7.3 Clean Up Old Configs
- [ ] Remove unused Cloudflare configuration files
- [ ] Clean up old deployment scripts
- [ ] Remove unused infrastructure configs

### 7.4 Update Documentation
- [ ] Update README with new deployment process
- [ ] Document GCP setup steps
- [ ] Update CLAUDE.md with new infrastructure details

## Key Considerations

### Security
- Use Secret Manager for all sensitive data
- Enable Cloud Armor if needed for DDoS protection
- Configure IAM roles with least privilege
- Enable Cloud SQL SSL connections

### Cost Optimization
- Cloud Run: Pay only for requests (0 cost when idle)
- Cloud SQL: Use smallest tier initially (db-f1-micro)
- Database starts fresh, no migration costs
- Consider stopping database during low-traffic periods
- Set up billing alerts

### Monitoring
- Enable Cloud Monitoring
- Set up log-based metrics
- Configure uptime checks
- Create alerting policies

## Rollback Plan

If issues occur:
- [ ] Keep Cloudflare deployment active during migration
- [ ] Use DNS to switch back to Cloudflare
- [ ] Tag Docker images for easy rollback
- [ ] Database is fresh, no data loss concern

## Estimated Timeline

- Phase 1-2: 2-3 hours
- Phase 3: 30 minutes (fresh database setup)
- Phase 4-5: 2-3 hours
- Phase 6: 1 hour
- Phase 7: 1-2 hours

**Total: 6.5-9.5 hours**

## Success Criteria

- [ ] Blog accessible via Cloud Run URL
- [ ] All pages load correctly
- [ ] Database queries work
- [ ] OAuth login functional
- [ ] No errors in logs
- [ ] Custom domain working (if configured)
- [ ] "hosting" skill deploys successfully
- [ ] Documentation updated
