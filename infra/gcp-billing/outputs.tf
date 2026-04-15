output "pubsub_topic" {
  description = "Pub/Sub topic that budgets publish to."
  value       = google_pubsub_topic.billing_alerts.id
}

output "function_name" {
  description = "Kill-switch Cloud Function name."
  value       = google_cloudfunctions2_function.kill_switch.name
}

output "function_service_account" {
  description = "Runtime SA for the kill-switch function."
  value       = google_service_account.kill_switch.email
}

output "bigquery_dataset" {
  description = "Dataset the Billing Console export should write to."
  value       = "${var.host_project_id}.${google_bigquery_dataset.billing_export.dataset_id}"
}

output "configured_caps" {
  description = "Per-project caps currently provisioned."
  value       = var.project_caps
}
