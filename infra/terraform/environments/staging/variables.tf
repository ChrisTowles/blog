variable "project_id" {
  description = "GCP project ID for staging"
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
  default     = "us-central1-docker.pkg.dev/blog-towles-staging/containers/blog:latest"
}

variable "site_url" {
  description = "Public URL for staging site"
  type        = string
  default     = "https://staging-chris.towles.dev/"
}

variable "gtag_id" {
  description = "Google Analytics 4 Measurement ID"
  type        = string
  default     = ""
}
