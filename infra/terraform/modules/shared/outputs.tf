output "service_account_email" {
  description = "Cloud Run service account email"
  value       = google_service_account.cloud_run.email
}

output "artifact_registry_repository" {
  description = "Artifact Registry repository name"
  value       = google_artifact_registry_repository.containers.name
}

output "artifact_registry_location" {
  description = "Artifact Registry location"
  value       = google_artifact_registry_repository.containers.location
}

output "container_image_base" {
  description = "Base URL for container images"
  value       = "${google_artifact_registry_repository.containers.location}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.containers.name}"
}

output "anthropic_api_key_secret_id" {
  description = "Secret Manager secret ID for Anthropic API key"
  value       = google_secret_manager_secret.anthropic_api_key.secret_id
}

output "session_password_secret_id" {
  description = "Secret Manager secret ID for Nuxt session password"
  value       = google_secret_manager_secret.session_password.secret_id
}
