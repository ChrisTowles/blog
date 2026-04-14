terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    prefix = "terraform/state"
    # bucket set via -backend-config
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

module "shared" {
  source = "../modules/shared"

  project_id = var.project_id
  region     = var.region
}

module "cloud_sql" {
  source = "../modules/cloud-sql"

  project_id                     = var.project_id
  region                         = var.region
  tier                           = "db-f1-micro"
  availability_type              = "ZONAL"
  backup_enabled                 = true
  point_in_time_recovery_enabled = false
  deletion_protection            = var.deletion_protection

  depends_on = [module.shared]
}

module "cloud_run" {
  source = "../modules/cloud-run"

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
  nuxt_og_image_secret_secret_id       = module.shared.nuxt_og_image_secret_secret_id
  braintrust_project_name              = var.braintrust_project_name
  site_url                             = var.site_url
  min_instances                        = var.min_instances
  max_instances                        = var.max_instances
  additional_env_vars                  = { NUXT_PUBLIC_GTAG_ID = var.gtag_id }
  gcs_bucket_name                      = module.shared.media_bucket_name

  depends_on = [module.cloud_sql]
}

module "github_oidc" {
  source = "../modules/github-oidc"
  count  = var.environment == "prod" ? 1 : 0

  project_id                      = var.project_id
  region                          = var.region
  github_repo                     = "ChrisTowles/blog"
  cloud_run_service_account_email = module.shared.service_account_email
  artifact_registry_repository    = module.shared.artifact_registry_repository

  depends_on = [module.shared]
}

module "cost_scheduler" {
  source = "../modules/cost-scheduler"
  count  = var.environment == "staging" ? 1 : 0

  project_id              = var.project_id
  region                  = var.region
  service_account_email   = module.shared.service_account_email
  cloud_sql_instance_name = module.cloud_sql.instance_name

  depends_on = [module.cloud_sql]
}
