# Google Login Setup

Google OAuth login for the blog, using `nuxt-auth-utils` with `defineOAuthGoogleEventHandler`.

## Architecture

```
User clicks "Sign in with Google" on /login
  -> Redirects to /auth/google
  -> nuxt-auth-utils handles OAuth flow with Google
  -> Google redirects back to /auth/google with auth code
  -> Server exchanges code for user info (sub, name, email, picture)
  -> User created/found in DB, session set
  -> Redirects to original page
```

## Prerequisites

- GCP project with Google Auth Platform configured
- OAuth consent screen (External, published)
- OAuth 2.0 Client ID (Web application type)
- Secrets stored in GCP Secret Manager

## Setup Per Environment

Each GCP project (prod, staging) needs its own OAuth client with environment-specific redirect URIs.

### 1. Configure OAuth Consent Screen

Go to: `https://console.cloud.google.com/auth/overview/create?project=<PROJECT_ID>`

| Field | Value |
|-------|-------|
| App name | Chris Towles Blog |
| User support email | chris.towles@gmail.com |
| Audience | External |
| Contact email | support@towles.dev |

After creation, go to **Audience** and publish the app to move from Testing to Production mode.

### 2. Create OAuth Client

Go to: `https://console.cloud.google.com/auth/clients/create?project=<PROJECT_ID>`

| Field | Value |
|-------|-------|
| Application type | Web application |
| Name | Blog Web Client |
| Authorized redirect URIs | See table below |

#### Redirect URIs by Environment

| Environment | Redirect URI |
|-------------|-------------|
| Production | `https://chris.towles.dev/auth/google` |
| Staging | `https://staging-chris.towles.dev/auth/google` |
| Local dev | `http://localhost:3000/auth/google` |

Add the local dev URI to whichever OAuth client you use for development.

### 3. Store Secrets in GCP Secret Manager

```bash
# Create secrets
echo -n "<CLIENT_ID>" | gcloud secrets create google-oauth-client-id \
  --project=<PROJECT_ID> --data-file=- --replication-policy=automatic

echo -n "<CLIENT_SECRET>" | gcloud secrets create google-oauth-client-secret \
  --project=<PROJECT_ID> --data-file=- --replication-policy=automatic

# Grant Cloud Run service account access
gcloud secrets add-iam-policy-binding google-oauth-client-id \
  --project=<PROJECT_ID> \
  --member="serviceAccount:cloud-run@<PROJECT_ID>.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding google-oauth-client-secret \
  --project=<PROJECT_ID> \
  --member="serviceAccount:cloud-run@<PROJECT_ID>.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 4. Terraform

The secrets are wired through Terraform modules:

- `modules/shared/main.tf` — `data` sources for Secret Manager secrets
- `modules/shared/outputs.tf` — exposes secret IDs
- `modules/cloud-run/variables.tf` — accepts secret ID variables
- `modules/cloud-run/main.tf` — injects as `NUXT_OAUTH_GOOGLE_CLIENT_ID` and `NUXT_OAUTH_GOOGLE_CLIENT_SECRET` env vars
- `environments/*/main.tf` — passes secret IDs from shared to cloud-run

Run `terraform apply` after adding secrets to deploy.

### 5. Local Development

Add to your `.env`:

```bash
NUXT_OAUTH_GOOGLE_CLIENT_ID=<client-id-from-gcp>
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=<client-secret-from-gcp>
```

## Support Email

`support@towles.dev` is configured via Cloudflare Email Routing, forwarding to `chris.towles@gmail.com`. DNS records (MX, SPF, DKIM) are managed automatically by Cloudflare.

## Code References

- Login page: `packages/blog/app/pages/login.vue`
- Google OAuth handler: `packages/blog/server/routes/auth/google.get.ts`
- GitHub OAuth handler: `packages/blog/server/routes/auth/github.get.ts`
- Env validation: `packages/blog/server/utils/env-config.ts`
- DB schema (users table): `packages/blog/server/database/schema/blog.ts`

## GCP Projects

| Environment | Project ID | Domain |
|-------------|-----------|--------|
| Production | blog-towles-production | chris.towles.dev |
| Staging | blog-towles-staging | staging-chris.towles.dev |
