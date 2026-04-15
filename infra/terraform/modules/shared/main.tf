# Enable required APIs
resource "google_project_service" "required_apis" {
  for_each = toset([
    "run.googleapis.com",
    "sqladmin.googleapis.com",
    "secretmanager.googleapis.com",
    "artifactregistry.googleapis.com",
  ])

  project                    = var.project_id
  service                    = each.value
  disable_on_destroy         = false
  disable_dependent_services = false
}

# Service Account for Cloud Run
resource "google_service_account" "cloud_run" {
  account_id   = "cloud-run"
  project      = var.project_id
  display_name = "Cloud Run Service Account"

  depends_on = [google_project_service.required_apis]
}

# Grant Cloud Run service account access to Secret Manager
resource "google_project_iam_member" "cloud_run_secret_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

# Grant Cloud Run service account access to Cloud SQL
resource "google_project_iam_member" "cloud_run_sql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

# Artifact Registry for container images
resource "google_artifact_registry_repository" "containers" {
  location      = var.region
  project       = var.project_id
  repository_id = "containers"
  description   = "Container registry"
  format        = "DOCKER"

  depends_on = [google_project_service.required_apis]
}

# Reference existing secrets from GCP Secret Manager
data "google_secret_manager_secret" "anthropic_api_key" {
  secret_id = "anthropic-api-key"
  project   = var.project_id
}

data "google_secret_manager_secret" "session_password" {
  secret_id = "session-password"
  project   = var.project_id
}

data "google_secret_manager_secret" "aws_access_key_id" {
  secret_id = "aws-access-key-id"
  project   = var.project_id
}

data "google_secret_manager_secret" "aws_secret_access_key" {
  secret_id = "aws-secret-access-key"
  project   = var.project_id
}

data "google_secret_manager_secret" "github_oauth_client_id" {
  secret_id = "github-oauth-client-id"
  project   = var.project_id
}

data "google_secret_manager_secret" "github_oauth_client_secret" {
  secret_id = "github-oauth-client-secret"
  project   = var.project_id
}

data "google_secret_manager_secret" "google_oauth_client_id" {
  secret_id = "google-oauth-client-id"
  project   = var.project_id
}

data "google_secret_manager_secret" "google_oauth_client_secret" {
  secret_id = "google-oauth-client-secret"
  project   = var.project_id
}

data "google_secret_manager_secret" "braintrust_api_key" {
  secret_id = "braintrust-api-key"
  project   = var.project_id
}

data "google_secret_manager_secret" "nuxt_og_image_secret" {
  secret_id = "nuxt-og-image-secret"
  project   = var.project_id
}

# GCS bucket for media (story illustrations, etc.)
resource "google_storage_bucket" "media" {
  name                        = "${var.project_id}-media"
  location                    = var.region
  project                     = var.project_id
  uniform_bucket_level_access = true
  force_destroy               = false

  depends_on = [google_project_service.required_apis]
}

# Public read access for media bucket objects
resource "google_storage_bucket_iam_member" "media_public_read" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Grant Cloud Run service account write access to media bucket
resource "google_storage_bucket_iam_member" "media_cloud_run_writer" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectCreator"
  member = "serviceAccount:${google_service_account.cloud_run.email}"
}

# GCS bucket for MCP aviation-demo Parquet dataset (Unit 1 of MCP UI-in-Chat plan).
# Private bucket — DuckDB httpfs reads go through HMAC credentials scoped to the
# Cloud Run service account (see aviation_hmac_key below). Readers who want to
# reproduce the demo against their own data run the ETL script into their own
# GCP project's bucket; this bucket is not shared.
resource "google_storage_bucket" "aviation_parquet" {
  name                        = "blog-mcp-aviation-${var.environment_suffix}"
  location                    = var.region
  project                     = var.project_id
  uniform_bucket_level_access = true
  force_destroy               = false

  depends_on = [google_project_service.required_apis]
}

# Grant Cloud Run service account write access to the aviation bucket so the ETL
# script (when run locally with user ADC) and any future server-side refresh can
# upload Parquet files.
resource "google_storage_bucket_iam_member" "aviation_parquet_cloud_run_writer" {
  bucket = google_storage_bucket.aviation_parquet.name
  role   = "roles/storage.objectCreator"
  member = "serviceAccount:${google_service_account.cloud_run.email}"
}

# Read-side grant for Cloud Run SA on the aviation bucket. Required because the
# bucket is private: DuckDB httpfs authenticates via HMAC keys derived from this
# SA (see aviation_hmac_key) and the HMAC identity inherits the SA's IAM.
resource "google_storage_bucket_iam_member" "aviation_parquet_cloud_run_reader" {
  bucket = google_storage_bucket.aviation_parquet.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.cloud_run.email}"
}

# HMAC key for the Cloud Run SA. DuckDB httpfs talks to GCS via the S3-compat
# interoperability API, which only accepts HMAC credentials (not ADC / OAuth).
# Rotate by `terraform taint module.shared.google_storage_hmac_key.aviation` +
# apply, which regenerates the key and pushes a new Secret Manager version.
resource "google_storage_hmac_key" "aviation" {
  project               = var.project_id
  service_account_email = google_service_account.cloud_run.email
}

resource "google_secret_manager_secret" "gcs_hmac_key_id" {
  secret_id = "gcs-hmac-key-id-${var.environment_suffix}"
  project   = var.project_id

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_apis]
}

resource "google_secret_manager_secret_version" "gcs_hmac_key_id" {
  secret      = google_secret_manager_secret.gcs_hmac_key_id.id
  secret_data = google_storage_hmac_key.aviation.access_id
}

resource "google_secret_manager_secret" "gcs_hmac_secret" {
  secret_id = "gcs-hmac-secret-${var.environment_suffix}"
  project   = var.project_id

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_apis]
}

resource "google_secret_manager_secret_version" "gcs_hmac_secret" {
  secret      = google_secret_manager_secret.gcs_hmac_secret.id
  secret_data = google_storage_hmac_key.aviation.secret
}

# Removed blocks to safely remove resources from state without deleting them
removed {
  from = google_secret_manager_secret.anthropic_api_key
  lifecycle {
    destroy = false
  }
}

removed {
  from = google_secret_manager_secret_version.anthropic_api_key
  lifecycle {
    destroy = false
  }
}

removed {
  from = google_secret_manager_secret.session_password
  lifecycle {
    destroy = false
  }
}

removed {
  from = google_secret_manager_secret_version.session_password
  lifecycle {
    destroy = false
  }
}
