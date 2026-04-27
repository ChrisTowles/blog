environment             = "staging"
project_id              = "blog-towles-staging"
container_image         = "us-central1-docker.pkg.dev/blog-towles-staging/containers/blog:latest"
mcp_container_image     = "us-central1-docker.pkg.dev/blog-towles-staging/containers/mcp:latest"
site_url                = "https://stage-chris.towles.dev/"
braintrust_project_name = "blog-stage"
gtag_id                 = "G-KNKR69G927"
deletion_protection     = false

# Staging scales to zero — traffic is low enough that cold starts are fine
# here. Prod keeps min_instances=1 for the MCP aviation demo pre-warm path.
min_instances   = 0
mcp_sandbox_url = "https://stage-sandbox.towles.dev/sandbox.html"

# New Relic OTLP drain — secret `new-relic-otlp-headers` must already exist.
new_relic_enabled = true
