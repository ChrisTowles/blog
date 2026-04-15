terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    bucket = "blog-towles-staging-tfstate"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

module "shared" {
  source = "../../modules/shared"

  project_id         = var.project_id
  region             = var.region
  environment_suffix = "staging"
}

module "github_oidc" {
  source = "../../modules/github-oidc"

  project_id                      = var.project_id
  region                          = var.region
  github_repo                     = "ChrisTowles/blog"
  cloud_run_service_account_email = module.shared.service_account_email
  artifact_registry_repository    = module.shared.artifact_registry_repository

  depends_on = [module.shared]
}

# The CI pipeline uses a single service account (from the prod project) for
# every job: build, deploy-staging, and deploy-prod. The build step pushes the
# same image to both prod and staging Artifact Registries, and deploy-staging
# updates Cloud Run + wakes Cloud SQL on this project. Grant the prod CI SA
# all the staging-side permissions it needs for those jobs.
locals {
  prod_ci_sa = "serviceAccount:github-actions-ci@blog-towles-production.iam.gserviceaccount.com"
}

# Allow pushing images to the staging Artifact Registry (build step)
resource "google_artifact_registry_repository_iam_member" "prod_ci_writer" {
  project    = var.project_id
  location   = var.region
  repository = module.shared.artifact_registry_repository
  role       = "roles/artifactregistry.writer"
  member     = local.prod_ci_sa

  depends_on = [module.shared]
}

# Allow updating Cloud Run services in staging (deploy-staging step)
resource "google_project_iam_member" "prod_ci_run_developer" {
  project = var.project_id
  role    = "roles/run.developer"
  member  = local.prod_ci_sa
}

# Allow acting as the staging Cloud Run service account during deploy
resource "google_service_account_iam_member" "prod_ci_act_as_cloud_run" {
  service_account_id = "projects/${var.project_id}/serviceAccounts/${module.shared.service_account_email}"
  role               = "roles/iam.serviceAccountUser"
  member             = local.prod_ci_sa
}

# Allow starting/patching Cloud SQL instances (deploy-staging wakes the DB)
resource "google_project_iam_member" "prod_ci_cloud_sql_admin" {
  project = var.project_id
  role    = "roles/cloudsql.admin"
  member  = local.prod_ci_sa
}

module "cloud_sql" {
  source = "../../modules/cloud-sql"

  project_id                     = var.project_id
  region                         = var.region
  tier                           = "db-f1-micro"
  availability_type              = "ZONAL"
  backup_enabled                 = true
  point_in_time_recovery_enabled = false
  deletion_protection            = false # Allow easy teardown in staging

  depends_on = [module.shared]
}

# Grant service account Cloud SQL Admin role (needed to stop/start instances)
resource "google_project_iam_member" "cloud_run_sql_admin" {
  project = var.project_id
  role    = "roles/cloudsql.admin"
  member  = "serviceAccount:${module.shared.service_account_email}"
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
      INSTANCE_NAME = module.cloud_sql.instance_name
    }
    service_account_email = module.shared.service_account_email
  }

  depends_on = [
    google_project_service.cloudfunctions,
    google_project_service.cloudbuild,
    module.cloud_sql
  ]
}

# IAM: Allow scheduler to invoke the function
resource "google_cloud_run_service_iam_member" "scheduler_invoker" {
  project  = var.project_id
  location = var.region
  service  = google_cloudfunctions2_function.stop_sql.name
  role     = "roles/run.invoker"
  member   = "serviceAccount:${module.shared.service_account_email}"
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
      service_account_email = module.shared.service_account_email
    }
  }

  depends_on = [google_project_service.cloudscheduler]
}

module "cloud_run" {
  source = "../../modules/cloud-run"

  project_id                           = var.project_id
  region                               = var.region
  container_image                      = var.container_image
  service_account_email                = module.shared.service_account_email
  database_connection_secret_id        = module.cloud_sql.connection_string_secret_id
  cloud_sql_connection_name            = module.cloud_sql.instance_connection_name
  anthropic_api_key_secret_id          = module.shared.anthropic_api_key_secret_id
  session_password_secret_id           = module.shared.session_password_secret_id
  aws_access_key_id_secret_id          = module.shared.aws_access_key_id_secret_id
  aws_secret_access_key_secret_id      = module.shared.aws_secret_access_key_secret_id
  github_oauth_client_id_secret_id     = module.shared.github_oauth_client_id_secret_id
  github_oauth_client_secret_secret_id = module.shared.github_oauth_client_secret_secret_id
  google_oauth_client_id_secret_id     = module.shared.google_oauth_client_id_secret_id
  google_oauth_client_secret_secret_id = module.shared.google_oauth_client_secret_secret_id
  braintrust_api_key_secret_id         = module.shared.braintrust_api_key_secret_id
  braintrust_project_name              = "blog-stage"
  site_url                             = var.site_url
  memory_limit                         = "2Gi"
  min_instances                        = 1
  max_instances                        = 2
  additional_env_vars                  = { NUXT_PUBLIC_GTAG_ID = var.gtag_id }
  aviation_bucket                      = module.shared.aviation_parquet_bucket_name
  mcp_rate_limit_rpm                   = 60
  mcp_sandbox_url                      = "https://sandbox.towles.dev/sandbox.html"
  mcp_demo_enabled                     = true

  depends_on = [module.cloud_sql]
}
