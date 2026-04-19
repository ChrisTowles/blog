output "service_name" {
  description = "Cloud Run service name"
  value       = google_cloud_run_v2_service.main.name
}

output "service_uri" {
  description = "Default run.app URL for the service"
  value       = google_cloud_run_v2_service.main.uri
}

output "domain_mapping_records" {
  description = "DNS records required at the registrar for the custom domain. Empty if no custom_domain is set."
  value = var.custom_domain != "" ? [
    for record in google_cloud_run_domain_mapping.custom[0].status[0].resource_records :
    {
      name   = record.name
      rrdata = record.rrdata
      type   = record.type
    }
  ] : []
}
