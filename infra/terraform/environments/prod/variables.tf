variable "project_id" {
  description = "GCP project ID for production"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "container_image" {
  description = "Container image URL"
  type        = string
  default     = "us-central1-docker.pkg.dev/blog-towles-production/containers/blog:latest"
}

variable "site_url" {
  description = "Public URL for production site"
  type        = string
  default     = "https://chris.towles.dev"
}

variable "ci_service_account_email" {
  description = "Service account for CI/CD"
  type        = string
  default     = ""
}

