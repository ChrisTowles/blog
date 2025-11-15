resource "google_sql_database_instance" "main" {
  name             = "${var.environment}-${var.project_id}-db"
  database_version = var.database_version
  region           = var.region
  project          = var.project_id

  settings {
    tier              = var.tier
    availability_type = var.availability_type
    disk_size         = var.disk_size
    disk_type         = "PD_SSD"

    backup_configuration {
      enabled                        = var.backup_enabled
      point_in_time_recovery_enabled = var.point_in_time_recovery_enabled
      start_time                     = "03:00"
      transaction_log_retention_days = 7
    }

    ip_configuration {
      ipv4_enabled = true
      require_ssl  = true
      ssl_mode     = "TRUSTED_CLIENT_CERTIFICATE_REQUIRED"

      # Restrict to Cloud Run service accounts via IAM, not IP allowlist
    }

    maintenance_window {
      day          = 7 # Sunday
      hour         = 3
      update_track = "stable"
    }
  }

  deletion_protection = var.deletion_protection
}

resource "google_sql_database" "database" {
  name     = var.database_name
  instance = google_sql_database_instance.main.name
  project  = var.project_id
}

resource "google_sql_user" "user" {
  name     = var.database_user
  instance = google_sql_database_instance.main.name
  password = var.database_password
  project  = var.project_id
}

resource "google_secret_manager_secret" "db_connection_string" {
  secret_id = "${var.environment}-db-connection-string"
  project   = var.project_id

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "db_connection_string" {
  secret = google_secret_manager_secret.db_connection_string.id
  secret_data = "postgresql://${google_sql_user.user.name}:${var.database_password}@${google_sql_database_instance.main.public_ip_address}:5432/${google_sql_database.database.name}?host=/cloudsql/${google_sql_database_instance.main.connection_name}"
}

# Alternative: Store connection name for Cloud SQL Proxy
resource "google_secret_manager_secret" "db_connection_name" {
  secret_id = "${var.environment}-db-connection-name"
  project   = var.project_id

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "db_connection_name" {
  secret      = google_secret_manager_secret.db_connection_name.id
  secret_data = google_sql_database_instance.main.connection_name
}
