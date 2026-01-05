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

variable "service_account_email" {
  description = "Service account email for Cloud Run"
  type        = string
}

variable "database_connection_secret_id" {
  description = "Secret Manager secret ID for database connection"
  type        = string
  default     = ""
}

variable "site_url" {
  description = "Public URL for the site"
  type        = string
}

variable "cpu_limit" {
  description = "CPU limit"
  type        = string
  default     = "1"
}

variable "memory_limit" {
  description = "Memory limit"
  type        = string
  default     = "512Mi"
}

variable "min_instances" {
  description = "Minimum number of instances"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum number of instances"
  type        = number
  default     = 10
}

variable "allow_public_access" {
  description = "Allow public access to Cloud Run service"
  type        = bool
  default     = true
}

variable "additional_env_vars" {
  description = "Additional environment variables"
  type        = map(string)
  default     = {}
}

variable "anthropic_api_key_secret_id" {
  description = "Secret Manager secret ID for Anthropic API key"
  type        = string
  default     = ""
}

variable "session_password_secret_id" {
  description = "Secret Manager secret ID for Nuxt session password"
  type        = string
  default     = ""
}

variable "cloud_sql_connection_name" {
  description = "Cloud SQL instance connection name (project:region:instance)"
  type        = string
}

variable "aws_access_key_id_secret_id" {
  description = "Secret Manager secret ID for AWS access key ID"
  type        = string
}

variable "aws_secret_access_key_secret_id" {
  description = "Secret Manager secret ID for AWS secret access key"
  type        = string
}

variable "github_oauth_client_id_secret_id" {
  description = "Secret Manager secret ID for GitHub OAuth client ID"
  type        = string
}

variable "github_oauth_client_secret_secret_id" {
  description = "Secret Manager secret ID for GitHub OAuth client secret"
  type        = string
}

variable "braintrust_api_key_secret_id" {
  description = "Secret Manager secret ID for Braintrust API key"
  type        = string
}

variable "braintrust_project_name" {
  description = "Braintrust project name"
  type        = string
}
