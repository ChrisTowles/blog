# Read access for the scheduled drift check. The SA itself lives in infra/terraform.
resource "google_billing_account_iam_member" "drift_check_viewer" {
  billing_account_id = var.billing_account_id
  role               = "roles/billing.viewer"
  member             = "serviceAccount:${var.drift_check_service_account}"
}

# user_project_override bills Budgets API quota to the host project.
resource "google_project_iam_member" "drift_check_quota" {
  project = var.host_project_id
  role    = "roles/serviceusage.serviceUsageConsumer"
  member  = "serviceAccount:${var.drift_check_service_account}"
}
