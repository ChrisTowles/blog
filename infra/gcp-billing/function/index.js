const functions = require('@google-cloud/functions-framework');
const { google } = require('googleapis');

const PROJECT_PREFIX = 'projects/';
const DISPLAY_NAME_PREFIX = 'spend-cap-';

// Allowlist of project IDs this function is permitted to disable billing on.
// Set by Terraform from var.project_caps. Comma-separated. Empty/unset means
// no project is allowed — the kill-switch is effectively disabled at the
// function layer until Terraform arms it.
const ALLOWED_PROJECTS = new Set(
  (process.env.ALLOWED_PROJECTS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
);

// Pub/Sub event handler for 2nd-gen Cloud Functions (CloudEvents).
// Budget notification payload:
//   {
//     "budgetDisplayName": "spend-cap-<project_id>",
//     "alertThresholdExceeded": 1.0,
//     "costAmount": 12.34,
//     "budgetAmount": 10.0,
//     "budgetAmountType": "SPECIFIED_AMOUNT",
//     "currencyCode": "USD"
//   }
functions.cloudEvent('killSwitch', async (cloudEvent) => {
  const rawData = cloudEvent?.data?.message?.data;
  if (!rawData) {
    console.log('No Pub/Sub message payload; ignoring');
    return;
  }

  const payload = JSON.parse(Buffer.from(rawData, 'base64').toString('utf-8'));
  console.log('Budget notification:', JSON.stringify(payload));

  const { budgetDisplayName, costAmount, budgetAmount } = payload;

  if (!budgetDisplayName || !budgetDisplayName.startsWith(DISPLAY_NAME_PREFIX)) {
    console.log(
      `Ignoring: budgetDisplayName "${budgetDisplayName}" does not match ${DISPLAY_NAME_PREFIX}<project>`,
    );
    return;
  }

  if (typeof costAmount !== 'number' || typeof budgetAmount !== 'number') {
    console.log('Ignoring: costAmount/budgetAmount missing or non-numeric');
    return;
  }

  if (costAmount < budgetAmount) {
    console.log(`Below cap (cost=${costAmount} < budget=${budgetAmount}); no action`);
    return;
  }

  const projectId = budgetDisplayName.slice(DISPLAY_NAME_PREFIX.length);

  if (!ALLOWED_PROJECTS.has(projectId)) {
    console.log(`Refusing: projectId "${projectId}" not in ALLOWED_PROJECTS allowlist`);
    return;
  }

  const projectName = `${PROJECT_PREFIX}${projectId}`;

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-billing'],
  });
  const billing = google.cloudbilling({ version: 'v1', auth });

  // Idempotency: if billing is already disabled, exit cleanly.
  const current = await billing.projects.getBillingInfo({ name: projectName });
  if (current.data.billingEnabled !== true) {
    console.log(`Billing already disabled on ${projectId}; exiting idempotently`);
    return;
  }

  console.log(`Disabling billing on ${projectId} (cost=${costAmount} >= budget=${budgetAmount})`);

  const result = await billing.projects.updateBillingInfo({
    name: projectName,
    requestBody: { billingAccountName: '' },
  });

  console.log(`Billing disabled. New state: ${JSON.stringify(result.data)}`);
});
