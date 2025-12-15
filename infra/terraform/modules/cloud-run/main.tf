resource "google_cloud_run_v2_service" "main" {
  name     = "blog"
  location = var.region
  project  = var.project_id

  template {
    service_account = var.service_account_email

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
          name = "NUXT_ANTHROPIC_API_KEY"
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
        for_each = var.additional_env_vars
        content {
          name  = env.key
          value = env.value
        }
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
