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
