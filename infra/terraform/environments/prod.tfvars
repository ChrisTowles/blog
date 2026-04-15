environment             = "prod"
project_id              = "blog-towles-production"
container_image         = "us-central1-docker.pkg.dev/blog-towles-production/containers/blog:latest"
site_url                = "https://chris.towles.dev"
braintrust_project_name = "blog-prod"
gtag_id                 = "G-PH525YF11W"
deletion_protection     = false

# MCP aviation demo (plan Unit 7). Prod keeps `mcp_demo_enabled = false` until
# launch day per Operational/Rollout notes (plan line 851).
min_instances    = 1
mcp_sandbox_url  = "https://sandbox.towles.dev/sandbox.html"
mcp_demo_enabled = false
