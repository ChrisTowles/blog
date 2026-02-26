# Grant service account Cloud SQL Admin role (needed to stop/start instances)
resource "google_project_iam_member" "sql_admin" {
  project = var.project_id
  role    = "roles/cloudsql.admin"
  member  = "serviceAccount:${var.service_account_email}"
}

# Enable required APIs for scheduled functions
resource "google_project_service" "cloudfunctions" {
  project = var.project_id
  service = "cloudfunctions.googleapis.com"
}

resource "google_project_service" "cloudscheduler" {
  project = var.project_id
  service = "cloudscheduler.googleapis.com"
}

resource "google_project_service" "cloudbuild" {
  project = var.project_id
  service = "cloudbuild.googleapis.com"
}

# Bucket for Cloud Function source code
resource "google_storage_bucket" "functions_source" {
  name     = "${var.project_id}-functions"
  location = var.region
  project  = var.project_id

  uniform_bucket_level_access = true
  force_destroy               = true
}

# Zip and upload the stage-power-settings function
data "archive_file" "stop_sql_function" {
  type        = "zip"
  source_dir  = "${path.module}/functions/stage-power-settings"
  output_path = "${path.module}/functions/stage-power-settings.zip"
}

resource "google_storage_bucket_object" "stop_sql_source" {
  name   = "stage-power-settings-${data.archive_file.stop_sql_function.output_md5}.zip"
  bucket = google_storage_bucket.functions_source.name
  source = data.archive_file.stop_sql_function.output_path
}

# Cloud Function to stop SQL
resource "google_cloudfunctions2_function" "stop_sql" {
  name     = "stage-power-settings"
  location = var.region
  project  = var.project_id

  build_config {
    runtime     = "nodejs20"
    entry_point = "stopSql"
    source {
      storage_source {
        bucket = google_storage_bucket.functions_source.name
        object = google_storage_bucket_object.stop_sql_source.name
      }
    }
  }

  service_config {
    min_instance_count = 0
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60
    environment_variables = {
      PROJECT_ID    = var.project_id
      INSTANCE_NAME = var.cloud_sql_instance_name
    }
    service_account_email = var.service_account_email
  }

  depends_on = [
    google_project_service.cloudfunctions,
    google_project_service.cloudbuild,
  ]
}

# IAM: Allow scheduler to invoke the function
resource "google_cloud_run_service_iam_member" "scheduler_invoker" {
  project  = var.project_id
  location = var.region
  service  = google_cloudfunctions2_function.stop_sql.name
  role     = "roles/run.invoker"
  member   = "serviceAccount:${var.service_account_email}"
}

# Cloud Scheduler job - runs at 2 AM daily
resource "google_cloud_scheduler_job" "stop_sql_nightly" {
  name      = "stage-power-settings-nightly"
  project   = var.project_id
  region    = var.region
  schedule  = "0 2 * * *"
  time_zone = "America/Chicago"

  http_target {
    uri         = google_cloudfunctions2_function.stop_sql.service_config[0].uri
    http_method = "POST"
    oidc_token {
      service_account_email = var.service_account_email
    }
  }

  depends_on = [google_project_service.cloudscheduler]
}
