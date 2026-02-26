variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "service_account_email" {
  description = "Service account email for Cloud Functions and Scheduler"
  type        = string
}

variable "cloud_sql_instance_name" {
  description = "Cloud SQL instance name to stop/start"
  type        = string
}
