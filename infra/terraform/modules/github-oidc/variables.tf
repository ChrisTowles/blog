variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "github_repo" {
  description = "GitHub repository in 'owner/repo' format"
  type        = string
}

variable "cloud_run_service_account_email" {
  description = "Email of the Cloud Run service account (for actAs permission)"
  type        = string
}

variable "artifact_registry_repository" {
  description = "Artifact Registry repository name (e.g., 'containers')"
  type        = string
}
