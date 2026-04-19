variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "environment_suffix" {
  description = "Environment suffix for MCP aviation bucket (staging or prod)"
  type        = string
}

