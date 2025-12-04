variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "environment" {
  description = "Environment name (staging/prod)"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "ci_service_account_email" {
  description = "Service account email for CI/CD to push images"
  type        = string
  default     = ""
}

variable "ai_gateway_api_key" {
  description = "Vercel AI Gateway API key"
  type        = string
  sensitive   = true
}

variable "session_password" {
  description = "Nuxt session password (minimum 32 characters)"
  type        = string
  sensitive   = true
}
