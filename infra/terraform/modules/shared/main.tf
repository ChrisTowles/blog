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
  account_id   = "${var.environment}-cloud-run"
  project      = var.project_id
  display_name = "Cloud Run Service Account for ${var.environment}"

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
  repository_id = "${var.environment}-containers"
  description   = "Container registry for ${var.environment}"
  format        = "DOCKER"

  depends_on = [google_project_service.required_apis]
}

# Grant service account access to push to Artifact Registry (for CI/CD)
resource "google_artifact_registry_repository_iam_member" "ci_writer" {
  count = var.ci_service_account_email != "" ? 1 : 0

  project    = var.project_id
  location   = google_artifact_registry_repository.containers.location
  repository = google_artifact_registry_repository.containers.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${var.ci_service_account_email}"
}
