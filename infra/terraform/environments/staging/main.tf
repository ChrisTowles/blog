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

  project_id                = var.project_id
  environment               = "staging"
  region                    = var.region
  ci_service_account_email  = var.ci_service_account_email
  anthropic_api_key         = var.anthropic_api_key
  session_password          = var.session_password
}

module "cloud_sql" {
  source = "../../modules/cloud-sql"

  project_id                        = var.project_id
  environment                       = "staging"
  region                            = var.region
  tier                              = "db-f1-micro"
  availability_type                 = "ZONAL"
  backup_enabled                    = true
  point_in_time_recovery_enabled    = false
  deletion_protection               = false # Allow easy teardown in staging
  database_password                 = var.database_password

  depends_on = [module.shared]
}

module "cloud_run" {
  source = "../../modules/cloud-run"

  project_id                    = var.project_id
  environment                   = "staging"
  region                        = var.region
  container_image               = var.container_image
  service_account_email         = module.shared.service_account_email
  database_connection_secret_id = module.cloud_sql.connection_string_secret_id
  cloud_sql_connection_name     = module.cloud_sql.instance_connection_name
  anthropic_api_key_secret_id   = module.shared.anthropic_api_key_secret_id
  session_password_secret_id    = module.shared.session_password_secret_id
  site_url                      = var.site_url
  min_instances                 = 0
  max_instances                 = 2

  depends_on = [module.cloud_sql]
}
