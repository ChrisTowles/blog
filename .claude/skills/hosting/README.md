# Hosting Skill

Claude Code skill for deploying and managing the blog on Google Cloud Platform Cloud Run.

## Purpose

Provides commands and workflows for:
- Building and deploying Docker containers to GCP
- Viewing logs and monitoring application status
- Managing environment variables and secrets
- Rolling back deployments

## Usage

Invoke this skill in Claude Code with `/hosting` or reference commands from `skill.md`.

## Prerequisites

- `gcloud` CLI installed and authenticated
- Access to `blog-chris-towles` GCP project
- Docker (for local testing)

## Quick Start

Deploy the blog:
```bash
# Build and push
cd packages/blog
gcloud builds submit --tag us-central1-docker.pkg.dev/blog-chris-towles/blog-images/blog:latest

# Deploy
gcloud run deploy blog \
  --image us-central1-docker.pkg.dev/blog-chris-towles/blog-images/blog:latest \
  --region us-central1 \
  --project=blog-chris-towles
```

## Related Documentation

- [Migration Plan](../../../docs/plans/migrate-to-google-cloud.md)
- [GCP Cloud Run Docs](https://cloud.google.com/run/docs)
