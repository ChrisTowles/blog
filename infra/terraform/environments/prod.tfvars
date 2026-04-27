environment             = "prod"
project_id              = "blog-towles-production"
container_image         = "us-central1-docker.pkg.dev/blog-towles-production/containers/blog:latest"
mcp_container_image     = "us-central1-docker.pkg.dev/blog-towles-production/containers/mcp:latest"
site_url                = "https://chris.towles.dev"
braintrust_project_name = "blog-prod"
gtag_id                 = "G-PH525YF11W"
deletion_protection     = false

# MCP aviation demo (plan Unit 7).
min_instances   = 1
mcp_sandbox_url = "https://sandbox.towles.dev/sandbox.html"

# New Relic OTLP drain — secret `new-relic-otlp-headers` exists in
# blog-towles-production Secret Manager (created 2026-04-27).
new_relic_enabled = true
