output "cloud_run_url" {
  description = "Cloud Run service URL"
  value       = module.cloud_run.service_url
}

output "database_instance_name" {
  description = "Cloud SQL instance name"
  value       = module.cloud_sql.instance_name
}

output "artifact_registry_repository" {
  description = "Artifact Registry repository"
  value       = "${module.shared.artifact_registry_location}-docker.pkg.dev/${var.project_id}/${module.shared.artifact_registry_repository}"
}

output "container_image_base" {
  description = "Base URL for container images"
  value       = module.shared.container_image_base
}
