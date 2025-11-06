variable "project_id" {
  description = "GCP project ID for staging"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "database_password" {
  description = "Database password (use terraform.tfvars or env var)"
  type        = string
  sensitive   = true
}

variable "container_image" {
  description = "Container image URL"
  type        = string
  default     = "us-central1-docker.pkg.dev/PROJECT_ID/staging-containers/blog:latest"
}

variable "site_url" {
  description = "Public URL for staging site"
  type        = string
  default     = "https://staging.yourdomain.com"
}

variable "ci_service_account_email" {
  description = "Service account for CI/CD"
  type        = string
  default     = ""
}
