# BigQuery dataset that will receive Cloud Billing export data.
#
# NOTE: Terraform cannot enable the actual export. After apply, a human has to flip
# the switch once in the Billing Console (see README). Terraform manages the dataset
# and the IAM that lets the billing-export service agent write into it.

resource "google_bigquery_dataset" "billing_export" {
  project                    = var.host_project_id
  dataset_id                 = var.bigquery_dataset_id
  location                   = var.bigquery_location
  description                = "Cloud Billing export (standard + detailed usage cost). Enabled manually in Billing Console."
  delete_contents_on_destroy = false

  depends_on = [google_project_service.apis]
}

# Lookup used elsewhere in the stack (pubsub_function.tf).
data "google_project" "host" {
  project_id = var.host_project_id
}

# NOTE: We intentionally do NOT create a google_bigquery_dataset_iam_member for the
# billing-export service agent (service-<project_number>@gcp-sa-billing-bq-exp.iam.gserviceaccount.com).
# That service agent is provisioned by Google only when Cloud Billing's BigQuery export
# is first configured against this billing account — which happens in Unit 2 of the rollout
# plan, not during Terraform apply. Pre-granting IAM to a non-existent principal fails with
# "Service account ... does not exist". Google auto-grants the required dataEditor role
# on the dataset when the console export is enabled, so this Terraform does not need to.
