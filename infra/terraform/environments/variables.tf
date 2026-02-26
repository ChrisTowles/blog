variable "environment" {
  description = "Environment name (staging or prod)"
  type        = string

  validation {
    condition     = contains(["staging", "prod"], var.environment)
    error_message = "environment must be 'staging' or 'prod'"
  }
}

variable "project_id" {
  description = "GCP project ID"
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
}

variable "site_url" {
  description = "Public URL for the site"
  type        = string
}

variable "gtag_id" {
  description = "Google Analytics 4 Measurement ID"
  type        = string
  default     = ""
}

variable "braintrust_project_name" {
  description = "Braintrust project name"
  type        = string
}

variable "deletion_protection" {
  description = "Enable deletion protection on Cloud SQL"
  type        = bool
  default     = true
}

variable "min_instances" {
  description = "Minimum Cloud Run instances"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum Cloud Run instances"
  type        = number
  default     = 2
}
