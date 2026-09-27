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

variable "plan_project_ids" {
  description = "Projects the drift-check SA can read"
  type        = list(string)
}

variable "sql_wake_project_ids" {
  description = "Projects whose stopped Cloud SQL the drift-check SA may start"
  type        = list(string)
}

variable "tfstate_buckets" {
  description = "GCS buckets holding terraform state"
  type        = list(string)
}
