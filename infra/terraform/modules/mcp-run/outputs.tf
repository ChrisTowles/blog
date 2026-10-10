output "service_name" {
  description = "Cloud Run service name"
  value       = google_cloud_run_v2_service.main.name
}

output "service_uri" {
  description = "Default run.app URL for the service"
  value       = google_cloud_run_v2_service.main.uri
}
