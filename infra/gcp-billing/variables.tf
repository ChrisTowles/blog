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

variable "project_caps" {
  description = <<EOT
Map of project_id => monthly USD cap (integer). Each entry creates a Cloud Billing budget
scoped to that project with threshold notifications at 50/90/100%. When costAmount >= budgetAmount,
the kill-switch function disables billing on that specific project.

Leave empty to provision the kill-switch infrastructure without any budgets yet. Add entries
after you have spend visibility from the BigQuery export.

Example:
  project_caps = {
    "blog-towles-production"     = 50
    "blog-towles-staging"        = 15
    "blog-chris-towles"          = 15
    "jarvis-home-487516"         = 10
    "progression-labs-stage"     = 10
    "gen-lang-client-0238175572" = 10
  }
EOT
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
