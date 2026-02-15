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

output "wif_provider" {
  description = "Workload Identity Provider for GitHub Actions"
  value       = module.github_oidc.workload_identity_provider
}

output "ci_service_account_email" {
  description = "CI service account email for GitHub Actions"
  value       = module.github_oidc.ci_service_account_email
}
