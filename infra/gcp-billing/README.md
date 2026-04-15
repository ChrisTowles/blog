# GCP billing: spend cap + BigQuery export

Hard kill-switch for every project on billing account `015529-D0D3BB-5BEDEE`, plus a
BigQuery billing export so you can actually see what each project costs.

## How it works

```
Cloud Billing budget (per project)
        │  (threshold crossed)
        ▼
Pub/Sub topic: billing-cap-alerts
        │  (messagePublished)
        ▼
Cloud Function: billing-kill-switch
        │  costAmount >= budgetAmount ?
        ▼
cloudbilling.projects.updateBillingInfo(project, billingAccountName="")
        │
        ▼
Billing disabled on that project. Most services stop within minutes.
```

- **One budget per project.** The budget's `displayName` is `spend-cap-<project_id>`; the
  function parses that to know which project to disable billing on. Blast radius is limited
  to the project that tripped.
- **Shared topic + function.** All budgets publish to the same topic; the single function
  fans out by display name.
- **Idempotent.** If billing is already off on a project, the function logs and exits.

## Files

| File                 | Purpose                                                            |
| -------------------- | ------------------------------------------------------------------ |
| `main.tf`            | Provider, backend, API enablement                                  |
| `variables.tf`       | Input variables                                                    |
| `terraform.tfvars`   | Billing account + host project + `project_caps` map                |
| `backend.tfvars`     | GCS backend bucket                                                 |
| `bigquery_export.tf` | BigQuery dataset for billing export                                |
| `pubsub_function.tf` | Pub/Sub topic, service account, Cloud Function                     |
| `budgets.tf`         | Per-project `google_billing_budget` (for_each over `project_caps`) |
| `outputs.tf`         | Topic, function, dataset names                                     |
| `function/`          | Node.js 20 Cloud Function source                                   |

## Phased rollout

The `project_caps` variable defaults to `{}`, so you can apply the infra **without any
budgets** and leave the kill-switch armed-but-inert until you have spend data.

### Phase 1 — Infra + BigQuery export (now)

```bash
cd infra/gcp-billing
terraform init -backend-config=backend.tfvars
terraform validate
terraform plan  -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

After apply, **enable the BigQuery export manually** (Terraform can't do this — there's
no GCP provider resource for the export itself):

1. Open <https://console.cloud.google.com/billing/015529-D0D3BB-5BEDEE/export>
2. Under **BigQuery export**, click **Edit settings** next to _Standard usage cost_.
3. Project: `blog-towles-production` · Dataset: `billing_export` · Click **Save**.
4. Repeat for **Detailed usage cost** if you want per-SKU granularity.

Data starts landing within ~24h. Query it:

```sql
SELECT project.id, SUM(cost) AS cost
FROM `blog-towles-production.billing_export.gcp_billing_export_v1_015529_D0D3BB_5BEDEE`
WHERE invoice.month = FORMAT_DATE('%Y%m', CURRENT_DATE())
GROUP BY project.id
ORDER BY cost DESC;
```

### Phase 2 — Flip on the caps (later)

Edit `terraform.tfvars` and set real numbers:

```hcl
project_caps = {
  "blog-towles-production"     = 50
  "blog-towles-staging"        = 15
  "blog-chris-towles"          = 15
  "jarvis-home-487516"         = 10
  "progression-labs-stage"     = 10
  "gen-lang-client-0238175572" = 10
}
```

Then:

```bash
terraform apply -var-file=terraform.tfvars
```

## Testing the kill-switch without waiting for real spend

Publish a synthetic budget notification to the topic. Substitute the project you want
to target:

```bash
PROJECT_ID=jarvis-home-487516
HOST=blog-towles-production

# Mimics the schema 1.0 budget-alert payload.
PAYLOAD=$(cat <<JSON
{
  "budgetDisplayName": "spend-cap-${PROJECT_ID}",
  "alertThresholdExceeded": 1.0,
  "costAmount": 999.99,
  "budgetAmount": 10.00,
  "budgetAmountType": "SPECIFIED_AMOUNT",
  "currencyCode": "USD"
}
JSON
)

gcloud pubsub topics publish billing-cap-alerts \
  --project="${HOST}" \
  --message="${PAYLOAD}"
```

**Warning:** this will actually disable billing on the named project. To do a dry-run
without tripping, target a display name that does not start with `spend-cap-` — the
function will log-and-exit.

```bash
gcloud pubsub topics publish billing-cap-alerts \
  --project="${HOST}" \
  --message='{"budgetDisplayName":"dry-run","costAmount":1,"budgetAmount":0}'

# Check logs:
gcloud functions logs read billing-kill-switch \
  --project="${HOST}" --region=us-central1 --gen2 --limit=50
```

## Re-enabling billing after the switch trips

There is no automated "turn it back on" flow — that's the point. You do it by hand:

```bash
PROJECT_ID=jarvis-home-487516

gcloud billing projects link "${PROJECT_ID}" \
  --billing-account=015529-D0D3BB-5BEDEE
```

Or in the console: **Billing → Account Management → Link a billing account → select
`015529-D0D3BB-5BEDEE`**.

Before re-linking, figure out _why_ it tripped — check the BigQuery export or the
Billing Reports console, filtered to the affected project. Otherwise you'll just burn
through the cap again.

## Required permissions (running `terraform apply`)

The applying user (you) needs, in addition to normal project-edit rights on
`blog-towles-production`:

- `roles/billing.admin` on billing account `015529-D0D3BB-5BEDEE` — to grant
  `roles/billing.projectManager` to the function SA and to create budgets.
- `roles/resourcemanager.projectIamAdmin` on each capped project (only relevant if
  `roles/billing.admin` isn't already enough).

The function's runtime SA (`billing-kill-switch@…`) is granted only
`roles/billing.projectManager` on the billing account — the minimum needed to call
`updateBillingInfo(billingAccountName="")`.

## Out of scope

- Per-service quotas (use `compute.googleapis.com/quotas` or `serviceusage` for that).
- Cost anomaly detection.
- Automated re-enable flow (intentionally manual).
