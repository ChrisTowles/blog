environment             = "staging"
project_id              = "blog-towles-staging"
container_image         = "us-central1-docker.pkg.dev/blog-towles-staging/containers/blog:latest"
site_url                = "https://stage-chris.towles.dev/"
braintrust_project_name = "blog-stage"
gtag_id                 = "G-KNKR69G927"
deletion_protection     = false

# MCP aviation demo (plan Unit 7). min_instances=1 is set in the variable
# default-stanza below because the module default is still 0; staging needs
# the same cold-start posture as prod to exercise the pre-warm path.
min_instances    = 1
mcp_sandbox_url  = "https://sandbox.towles.dev/sandbox.html"
mcp_demo_enabled = true
