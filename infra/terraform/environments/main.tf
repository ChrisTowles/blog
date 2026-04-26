terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
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

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

module "shared" {
  source = "../modules/shared"

  project_id         = var.project_id
  region             = var.region
  environment_suffix = var.environment
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
  new_relic_otlp_headers_secret_id     = var.new_relic_enabled ? module.shared.new_relic_otlp_headers_secret_id : ""
  otel_service_name                    = "blog-${var.environment}"
  gcs_hmac_key_id_secret_id            = module.shared.gcs_hmac_key_id_secret_id
  gcs_hmac_secret_secret_id            = module.shared.gcs_hmac_secret_secret_id
  braintrust_project_name              = var.braintrust_project_name
  site_url                             = var.site_url
  min_instances                        = var.min_instances
  max_instances                        = var.max_instances
  additional_env_vars                  = { NUXT_PUBLIC_GTAG_ID = var.gtag_id }
  gcs_bucket_name                      = module.shared.media_bucket_name

  # MCP tools wiring — shared data bucket + rate limit + sandbox URL.
  mcp_data_bucket    = module.shared.mcp_data_bucket_name
  mcp_rate_limit_rpm = var.mcp_rate_limit_rpm
  mcp_sandbox_url    = var.mcp_sandbox_url

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

locals {
  mcp_host_subdomain = var.environment == "prod" ? "sandbox" : "stage-sandbox"
  mcp_host_fqdn      = "${local.mcp_host_subdomain}.towles.dev"
}

module "mcp_run" {
  source = "../modules/mcp-run"

  project_id            = var.project_id
  region                = var.region
  container_image       = var.mcp_container_image
  service_account_email = module.shared.service_account_email
  custom_domain         = local.mcp_host_fqdn

  depends_on = [module.shared]
}

data "cloudflare_zone" "towles" {
  name = "towles.dev"
}

resource "cloudflare_record" "mcp_host" {
  zone_id = data.cloudflare_zone.towles.id
  name    = local.mcp_host_subdomain
  type    = "CNAME"
  # `ghs.googlehosted.com` is the Cloud Run custom-domain CNAME target in
  # us-central1; the module exposes the exact records Cloud Run returned in
  # `domain_mapping_records`, but those can be unavailable on first apply,
  # so the static target is safer and matches what `chris.towles.dev` uses.
  content = "ghs.googlehosted.com"
  proxied = false # DNS-only so Cloud Run can issue its managed TLS cert
  ttl     = 300

  depends_on = [module.mcp_run]
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
