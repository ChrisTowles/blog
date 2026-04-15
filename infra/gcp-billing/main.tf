terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }

  backend "gcs" {
    prefix = "terraform/gcp-billing"
    # bucket set via -backend-config
  }
}

provider "google" {
  project = var.host_project_id
  region  = var.region
}

# ---- APIs on the host project ----
resource "google_project_service" "apis" {
  for_each = toset([
    "billingbudgets.googleapis.com",
    "cloudbilling.googleapis.com",
    "cloudfunctions.googleapis.com",
    "pubsub.googleapis.com",
    "cloudbuild.googleapis.com",
    "run.googleapis.com",
    "eventarc.googleapis.com",
    "bigquery.googleapis.com",
    "iam.googleapis.com",
    "cloudresourcemanager.googleapis.com",
  ])

  project                    = var.host_project_id
  service                    = each.key
  disable_dependent_services = false
  disable_on_destroy         = false
}
