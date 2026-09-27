variable "billing_account_id" {
  description = "Cloud Billing account ID (e.g. 015529-D0D3BB-5BEDEE)"
  type        = string
}

variable "host_project_id" {
  description = "Project that hosts the Pub/Sub topic, Cloud Function, BigQuery dataset, and terraform state."
  type        = string
}

variable "region" {
  description = "Region for the Cloud Function and Eventarc trigger."
  type        = string
  default     = "us-central1"
}

variable "bigquery_location" {
  description = "BigQuery dataset location. Must match the region you select in the Billing Console when enabling export."
  type        = string
  default     = "US"
}

variable "bigquery_dataset_id" {
  description = "BigQuery dataset for billing export. Point the Billing Console export at this dataset."
  type        = string
  default     = "billing_export"
}

variable "project_alerts" {
  description = "project_id => expected monthly USD. Emails billing admins at 50/90/100% actual and 100% forecast. Never touches billing."
  type        = map(number)
  default     = {}
}

variable "project_caps" {
  description = "project_id => hard monthly USD cap. At 100% the kill-switch disables billing on that project. Set well above project_alerts."
  type        = map(number)
  default     = {}
}

variable "function_name" {
  description = "Name of the kill-switch Cloud Function."
  type        = string
  default     = "billing-kill-switch"
}

variable "pubsub_topic_name" {
  description = "Name of the Pub/Sub topic that budgets notify."
  type        = string
  default     = "billing-cap-alerts"
}

variable "function_sa_id" {
  description = "Account ID (prefix) for the kill-switch service account."
  type        = string
  default     = "billing-kill-switch"
}

variable "drift_check_service_account" {
  description = "SA that runs terraform plan in .github/workflows/terraform-drift.yml (created by infra/terraform github-oidc)"
  type        = string
}
