billing_account_id = "015529-D0D3BB-5BEDEE"
host_project_id    = "blog-towles-production"
region             = "us-central1"

drift_check_service_account = "terraform-plan@blog-towles-production.iam.gserviceaccount.com"

# Expected spend: email at 50/90/100% and when the month is forecast to exceed it.
project_alerts = {
  "blog-towles-production" = 45
  "blog-towles-staging"    = 20
}

# Hard caps: disabling billing takes the site down, so keep these well above
# the alert amounts. Only for runaway spend.
project_caps = {
  "blog-towles-production" = 100
  # September 2026 was ~$80 before the scale-to-zero fix; 40 would trip this month.
  # Lower to 40 on 2026-10-01.
  "blog-towles-staging" = 120
}
