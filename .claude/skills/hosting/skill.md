# Hosting Skill - GCP Cloud Run Deployment

This skill helps deploy and manage the blog on Google Cloud Platform Cloud Run.

## Commands

### Deploy to GCP Cloud Run

To deploy the blog to GCP:

1. Build and push Docker image to Artifact Registry:
```bash
cd packages/blog
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/blog-chris-towles/blog-images/blog:latest \
  --project=blog-chris-towles
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy blog \
  --image us-central1-docker.pkg.dev/blog-chris-towles/blog-images/blog:latest \
  --platform managed \
  --region us-central1 \
  --add-cloudsql-instances blog-chris-towles:us-central1:blog-db \
  --allow-unauthenticated \
  --project=blog-chris-towles
```

### View Logs

View application logs from Cloud Run:
```bash
gcloud run logs read blog --region=us-central1 --project=blog-chris-towles
```

Follow logs in real-time:
```bash
gcloud run logs tail blog --region=us-central1 --project=blog-chris-towles
```

### Check Status

Check service status and configuration:
```bash
gcloud run services describe blog --region=us-central1 --project=blog-chris-towles
```

List all Cloud Run services:
```bash
gcloud run services list --project=blog-chris-towles
```

Get service URL:
```bash
gcloud run services describe blog --region=us-central1 --project=blog-chris-towles --format='value(status.url)'
```

### Manage Environment Variables

Set environment variables:
```bash
gcloud run services update blog \
  --set-env-vars="KEY1=value1,KEY2=value2" \
  --region=us-central1 \
  --project=blog-chris-towles
```

View current environment variables:
```bash
gcloud run services describe blog --region=us-central1 --project=blog-chris-towles --format='value(spec.template.spec.containers[0].env)'
```

### Rollback

List revisions:
```bash
gcloud run revisions list --service=blog --region=us-central1 --project=blog-chris-towles
```

Rollback to a previous revision:
```bash
gcloud run services update-traffic blog \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1 \
  --project=blog-chris-towles
```

## Project Configuration

- **Project ID**: blog-chris-towles
- **Region**: us-central1
- **Service Name**: blog
- **Image Registry**: us-central1-docker.pkg.dev/blog-chris-towles/blog-images
- **Database**: Cloud SQL PostgreSQL (blog-db)

## Usage Notes

- Cloud Run auto-scales from 0 to configured max instances
- Cold starts occur when scaling from 0
- Secrets should be managed via Secret Manager, not environment variables
- Database connections use Cloud SQL Proxy automatically when configured
