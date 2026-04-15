# Per-project Cloud Billing budgets. One budget per entry in var.project_caps.
# The budget's displayName encodes the project_id so the kill-switch function
# knows which project to disable billing on when the cap is hit.

# Look up the project number for each capped project (the budget_filter API
# requires "projects/<number>", not "projects/<id>").
data "google_project" "capped" {
  for_each   = var.project_caps
  project_id = each.key
}

resource "google_billing_budget" "project_cap" {
  for_each = var.project_caps

  billing_account = var.billing_account_id
  display_name    = "spend-cap-${each.key}"

  budget_filter {
    projects               = ["projects/${data.google_project.capped[each.key].number}"]
    credit_types_treatment = "INCLUDE_ALL_CREDITS"
  }

  amount {
    specified_amount {
      currency_code = "USD"
      units         = tostring(each.value)
    }
  }

  threshold_rules {
    threshold_percent = 0.5
    spend_basis       = "CURRENT_SPEND"
  }
  threshold_rules {
    threshold_percent = 0.9
    spend_basis       = "CURRENT_SPEND"
  }
  threshold_rules {
    threshold_percent = 1.0
    spend_basis       = "CURRENT_SPEND"
  }

  all_updates_rule {
    pubsub_topic                   = google_pubsub_topic.billing_alerts.id
    disable_default_iam_recipients = false
    schema_version                 = "1.0"
  }

  depends_on = [google_project_service.apis]
}
