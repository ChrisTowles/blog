# ---- Pub/Sub topic that budgets publish to ----
resource "google_pubsub_topic" "billing_alerts" {
  project = var.host_project_id
  name    = var.pubsub_topic_name

  depends_on = [google_project_service.apis]
}

# NOTE: We intentionally do NOT create a topic-level iam_member for the billing-budgets
# service agent (service-<project_number>@gcp-sa-billingbudgets.iam.gserviceaccount.com).
# That service agent doesn't exist until the first google_billing_budget on this billing
# account is created — which happens in Unit 5 (staging canary) and Unit 6 (Phase 2 apply),
# not here. Google auto-grants the publisher role on the topic when the first budget
# points at it, so pre-granting would both fail (principal doesn't exist) and be redundant.
# The authoritative guard against forged trips is the ALLOWED_PROJECTS allowlist in the
# function (see service_config below), not topic-level IAM.

# ---- Service account used by the Cloud Function runtime ----
resource "google_service_account" "kill_switch" {
  project      = var.host_project_id
  account_id   = var.function_sa_id
  display_name = "Billing cap kill-switch"
}

# Disabling billing on a project (calling updateBillingInfo with an empty
# billingAccountName) requires permissions that Google's canonical sample uses
# roles/billing.admin for. roles/billing.projectManager is documented as sufficient
# for linking projects, but there are reports of it being insufficient for unlinking
# in some configurations. Using roles/billing.admin eliminates that uncertainty
# at the cost of a slightly broader role on this billing account only.
resource "google_billing_account_iam_member" "kill_switch_billing_admin" {
  billing_account_id = var.billing_account_id
  role               = "roles/billing.admin"
  member             = "serviceAccount:${google_service_account.kill_switch.email}"
}

# Eventarc trigger needs to receive events on behalf of this SA.
resource "google_project_iam_member" "kill_switch_eventarc_receiver" {
  project = var.host_project_id
  role    = "roles/eventarc.eventReceiver"
  member  = "serviceAccount:${google_service_account.kill_switch.email}"
}

# Cloud Run invoker (2nd-gen Cloud Functions run on Cloud Run).
resource "google_project_iam_member" "kill_switch_run_invoker" {
  project = var.host_project_id
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.kill_switch.email}"
}

# Pub/Sub service agent needs iam.serviceAccountTokenCreator to mint auth tokens
# for pushing events through Eventarc into Cloud Run (2nd gen pattern).
resource "google_project_iam_member" "pubsub_token_creator" {
  project = var.host_project_id
  role    = "roles/iam.serviceAccountTokenCreator"
  member  = "serviceAccount:service-${data.google_project.host.number}@gcp-sa-pubsub.iam.gserviceaccount.com"

  depends_on = [google_project_service.apis]
}

# ---- Function source bucket + zipped source ----
# Named to match the cost-scheduler module's convention so future Cloud Functions
# in this project can share a single source bucket (each function gets its own
# object inside, keyed by content hash).
resource "google_storage_bucket" "function_source" {
  project                     = var.host_project_id
  name                        = "${var.host_project_id}-functions"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = true
}

data "archive_file" "kill_switch_source" {
  type        = "zip"
  source_dir  = "${path.module}/function"
  output_path = "${path.module}/function.zip"
}

resource "google_storage_bucket_object" "kill_switch_source" {
  name   = "billing-kill-switch-${data.archive_file.kill_switch_source.output_md5}.zip"
  bucket = google_storage_bucket.function_source.name
  source = data.archive_file.kill_switch_source.output_path
}

# ---- 2nd-gen Cloud Function triggered by Pub/Sub ----
resource "google_cloudfunctions2_function" "kill_switch" {
  project  = var.host_project_id
  location = var.region
  name     = var.function_name

  build_config {
    runtime     = "nodejs20"
    entry_point = "killSwitch"
    source {
      storage_source {
        bucket = google_storage_bucket.function_source.name
        object = google_storage_bucket_object.kill_switch_source.name
      }
    }
  }

  service_config {
    min_instance_count    = 0
    max_instance_count    = 1
    available_memory      = "256M"
    timeout_seconds       = 60
    service_account_email = google_service_account.kill_switch.email
    environment_variables = {
      # Allowlist enforced in the function: a kill can only target a project
      # that appears in var.project_caps. Prevents forged Pub/Sub messages
      # from targeting arbitrary projects even if the topic IAM is bypassed
      # via inherited project-level roles.
      ALLOWED_PROJECTS = join(",", keys(var.project_caps))
    }
  }

  event_trigger {
    trigger_region        = var.region
    event_type            = "google.cloud.pubsub.topic.v1.messagePublished"
    pubsub_topic          = google_pubsub_topic.billing_alerts.id
    retry_policy          = "RETRY_POLICY_RETRY"
    service_account_email = google_service_account.kill_switch.email
  }

  depends_on = [
    google_project_service.apis,
    google_project_iam_member.kill_switch_eventarc_receiver,
    google_project_iam_member.kill_switch_run_invoker,
    google_project_iam_member.pubsub_token_creator,
  ]
}
