output "ci_service_account_email" {
  description = "CI service account email for GitHub Actions"
  value       = google_service_account.github_actions.email
}

output "workload_identity_provider" {
  description = "Workload Identity Provider resource name for GitHub Actions auth"
  value       = google_iam_workload_identity_pool_provider.github.name
}
