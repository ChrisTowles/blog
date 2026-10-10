# Cloudflare DNS stack

Terraform (Cloudflare provider v5) for the `towles.dev` zone. It manages no resources today: Wrangler creates the Worker custom-domain records (`chris`, `stage-chris`, `sandbox`, `stage-sandbox`) on deploy, and Terraform must not also own them. The stack reads the zone so a plan fails if the token loses access. Add a record here only when it is not backed by a Worker route.

State: GCS bucket `blog-towles-production-tfstate`, prefix `terraform/cloudflare`. The bucket dies with the GCP project, so move the state at decommission (see `docs/cloudflare-cutover.md`).

```bash
export TF_VAR_cloudflare_api_token=...   # Zone:Read + Zone:DNS:Edit on towles.dev
terraform init -backend-config=backend.tfvars
terraform plan -var-file=terraform.tfvars
```

Validate without credentials: `terraform init -backend=false && terraform validate`. Applied by hand; `terraform-drift.yml` plans it weekly.
