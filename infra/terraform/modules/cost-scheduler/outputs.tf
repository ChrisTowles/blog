output "cloud_function_url" {
  description = "URL of the stop-sql Cloud Function"
  value       = google_cloudfunctions2_function.stop_sql.service_config[0].uri
}
