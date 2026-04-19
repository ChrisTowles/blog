resource "google_cloud_run_v2_service" "main" {
  name     = "mcp"
  location = var.region
  project  = var.project_id

  template {
    service_account = var.service_account_email

    containers {
      image = var.container_image

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = var.cpu_limit
          memory = var.memory_limit
        }
        cpu_idle          = true
        startup_cpu_boost = true
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

# Custom domain mapping. Cloud Run issues a managed TLS cert once the DNS
# record resolves, so the paired `cloudflare_record` must stay DNS-only (grey
# cloud) — proxied traffic breaks the managed-cert flow.
resource "google_cloud_run_domain_mapping" "custom" {
  count = var.custom_domain != "" ? 1 : 0

  name     = var.custom_domain
  location = var.region
  project  = var.project_id

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.main.name
  }
}
