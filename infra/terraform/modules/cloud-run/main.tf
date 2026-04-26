resource "google_cloud_run_v2_service" "main" {
  name     = "blog"
  location = var.region
  project  = var.project_id

  template {
    service_account = var.service_account_email
    # MCP aviation demo: 300s lets the LLM → DuckDB → iframe handshake finish
    # even on cold-start (plan Key Decisions line 123). Attribute previously
    # absent; added explicitly per plan line 620.
    timeout = var.request_timeout
    # Route same-client requests to the same instance to reduce the
    # Mcp-Session-Id-across-instances risk (plan Key Decisions line 124).
    session_affinity = var.session_affinity

    containers {
      image = var.container_image

      ports {
        container_port = 3000
      }

      resources {
        limits = {
          cpu    = var.cpu_limit
          memory = var.memory_limit
        }
        # Request-based billing: CPU throttled between requests. Cuts idle-instance
        # spend on min_instances=1 prod; startup_cpu_boost still covers the first
        # request after idle so latency stays bounded.
        cpu_idle          = true
        startup_cpu_boost = true
      }

      env {
        name  = "NODE_ENV"
        value = can(regex("production", var.project_id)) ? "production" : "staging"
      }

      env {
        name  = "NUXT_PUBLIC_SITE_URL"
        value = var.site_url
      }

      env {
        name  = "BRAINTRUST_PROJECT_NAME"
        value = var.braintrust_project_name
      }

      dynamic "env" {
        for_each = var.database_connection_secret_id != "" ? [1] : []
        content {
          name = "DATABASE_URL"
          value_source {
            secret_key_ref {
              secret  = var.database_connection_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.anthropic_api_key_secret_id != "" ? [1] : []
        content {
          name = "ANTHROPIC_API_KEY"
          value_source {
            secret_key_ref {
              secret  = var.anthropic_api_key_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.session_password_secret_id != "" ? [1] : []
        content {
          name = "NUXT_SESSION_PASSWORD"
          value_source {
            secret_key_ref {
              secret  = var.session_password_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.aws_access_key_id_secret_id != "" ? [1] : []
        content {
          name = "AWS_ACCESS_KEY_ID"
          value_source {
            secret_key_ref {
              secret  = var.aws_access_key_id_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.aws_secret_access_key_secret_id != "" ? [1] : []
        content {
          name = "AWS_SECRET_ACCESS_KEY"
          value_source {
            secret_key_ref {
              secret  = var.aws_secret_access_key_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.github_oauth_client_id_secret_id != "" ? [1] : []
        content {
          name = "NUXT_OAUTH_GITHUB_CLIENT_ID"
          value_source {
            secret_key_ref {
              secret  = var.github_oauth_client_id_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.github_oauth_client_secret_secret_id != "" ? [1] : []
        content {
          name = "NUXT_OAUTH_GITHUB_CLIENT_SECRET"
          value_source {
            secret_key_ref {
              secret  = var.github_oauth_client_secret_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.google_oauth_client_id_secret_id != "" ? [1] : []
        content {
          name = "NUXT_OAUTH_GOOGLE_CLIENT_ID"
          value_source {
            secret_key_ref {
              secret  = var.google_oauth_client_id_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.google_oauth_client_secret_secret_id != "" ? [1] : []
        content {
          name = "NUXT_OAUTH_GOOGLE_CLIENT_SECRET"
          value_source {
            secret_key_ref {
              secret  = var.google_oauth_client_secret_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.braintrust_api_key_secret_id != "" ? [1] : []
        content {
          name = "BRAINTRUST_API_KEY"
          value_source {
            secret_key_ref {
              secret  = var.braintrust_api_key_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.nuxt_og_image_secret_secret_id != "" ? [1] : []
        content {
          name = "NUXT_OG_IMAGE_SECRET"
          value_source {
            secret_key_ref {
              secret  = var.nuxt_og_image_secret_secret_id
              version = "latest"
            }
          }
        }
      }

      # GCS HMAC credentials for DuckDB httpfs → aviation bucket (private).
      dynamic "env" {
        for_each = var.gcs_hmac_key_id_secret_id != "" ? [1] : []
        content {
          name = "GCS_HMAC_KEY_ID"
          value_source {
            secret_key_ref {
              secret  = var.gcs_hmac_key_id_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.gcs_hmac_secret_secret_id != "" ? [1] : []
        content {
          name = "GCS_HMAC_SECRET"
          value_source {
            secret_key_ref {
              secret  = var.gcs_hmac_secret_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.additional_env_vars
        content {
          name  = env.key
          value = env.value
        }
      }

      dynamic "env" {
        for_each = var.gcs_bucket_name != "" ? [1] : []
        content {
          name  = "GCS_BUCKET_NAME"
          value = var.gcs_bucket_name
        }
      }

      # MCP tools env vars — shared data bucket (aviation Parquet lives under aviation/).
      dynamic "env" {
        for_each = var.mcp_data_bucket != "" ? [1] : []
        content {
          name  = "MCP_DATA_BUCKET"
          value = var.mcp_data_bucket
        }
      }

      env {
        name  = "MCP_RATE_LIMIT_RPM"
        value = tostring(var.mcp_rate_limit_rpm)
      }

      dynamic "env" {
        for_each = var.mcp_sandbox_url != "" ? [1] : []
        content {
          name  = "NUXT_PUBLIC_MCP_SANDBOX_URL"
          value = var.mcp_sandbox_url
        }
      }

      # OpenTelemetry OTLP — New Relic free-tier ingest via evlog/otlp drain.
      # Drain is a no-op when OTEL_EXPORTER_OTLP_ENDPOINT is unset.
      dynamic "env" {
        for_each = var.new_relic_otlp_headers_secret_id != "" && var.otlp_endpoint != "" ? [1] : []
        content {
          name  = "OTEL_EXPORTER_OTLP_ENDPOINT"
          value = var.otlp_endpoint
        }
      }

      dynamic "env" {
        for_each = var.new_relic_otlp_headers_secret_id != "" ? [1] : []
        content {
          name = "OTEL_EXPORTER_OTLP_HEADERS"
          value_source {
            secret_key_ref {
              secret  = var.new_relic_otlp_headers_secret_id
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = var.otel_service_name != "" ? [1] : []
        content {
          name  = "OTEL_SERVICE_NAME"
          value = var.otel_service_name
        }
      }

      env {
        name  = "AVIATION_DUCKDB_MEMORY_LIMIT"
        value = var.aviation_duckdb_memory_limit
      }

      env {
        name  = "AVIATION_DUCKDB_THREADS"
        value = var.aviation_duckdb_threads
      }

      dynamic "volume_mounts" {
        for_each = var.cloud_sql_connection_name != "" ? [1] : []
        content {
          name       = "cloudsql"
          mount_path = "/cloudsql"
        }
      }
    }

    dynamic "volumes" {
      for_each = var.cloud_sql_connection_name != "" ? [1] : []
      content {
        name = "cloudsql"
        cloud_sql_instance {
          instances = [var.cloud_sql_connection_name]
        }
      }
    }

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

resource "google_cloud_run_service_iam_member" "public_access" {
  count = var.allow_public_access ? 1 : 0

  service  = google_cloud_run_v2_service.main.name
  location = google_cloud_run_v2_service.main.location
  project  = var.project_id
  role     = "roles/run.invoker"
  member   = "allUsers"
}
