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
  description = "Container image URL for the mcp service"
  type        = string
}

variable "service_account_email" {
  description = "Service account email for the Cloud Run service"
  type        = string
}

variable "custom_domain" {
  description = "Custom hostname to map to this Cloud Run service (e.g. sandbox.towles.dev). Empty to skip domain mapping."
  type        = string
  default     = ""
}

variable "min_instances" {
  description = "Minimum Cloud Run instances (scale-to-zero safe)"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum Cloud Run instances. Bumped to 5 so a burst can't saturate 2 tiny static-asset instances."
  type        = number
  default     = 5
}

variable "cpu_limit" {
  description = "CPU limit"
  type        = string
  default     = "1"
}

variable "memory_limit" {
  description = "Memory limit — static files + CSP header generation, 256Mi is plenty"
  type        = string
  default     = "256Mi"
}

variable "allow_public_access" {
  description = "Whether to allow unauthenticated invocation"
  type        = bool
  default     = true
}
