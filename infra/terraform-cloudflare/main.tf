terraform {
  required_version = ">= 1.5"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    prefix = "terraform/cloudflare"
    # bucket set via -backend-config
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# Wrangler owns every Worker custom-domain record (chris, stage-chris, sandbox,
# stage-sandbox) and creates them on deploy, so this stack has no resources. The
# lookup keeps the stack honest: a plan fails if the token loses access to the zone.
# Add a record here only when it is not backed by a Worker route.
data "cloudflare_zone" "towles" {
  filter = {
    name = var.zone_name
  }
}
