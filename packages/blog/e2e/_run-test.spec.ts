import { test } from '@playwright/test';

test('run workflow and check UI updates', async ({ context }) => {
  // Auth
  const authPage = await context.newPage();
  await authPage.request.post('/api/_dev/session', {
    data: {
      user: {
        id: 'run-test',
        email: 'run@test.com',
        name: 'Run Tester',
        avatar: '',
        username: 'runtester',
        provider: 'github',
        providerId: 'run-1',
      },
    },
  });

  // Seed + clone a template
  await authPage.request.post('/api/workflows/seed');
  const workflows = await (await authPage.request.get('/api/workflows')).json();
  // Find or create a non-template workflow
  let workflowId: string;
  const existing = workflows.find((w: { isTemplate: number }) => !w.isTemplate);
  if (existing) {
    workflowId = existing.id;
  } else {
    const template = workflows.find((w: { isTemplate: number }) => w.isTemplate);
    const cloneRes = await authPage.request.post(`/api/workflows/${template.id}/clone`);
    workflowId = (await cloneRes.json()).id;
  }
  console.log('Using workflow:', workflowId);
  await authPage.close();

  const page = await context.newPage();
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push('PAGE: ' + err.message));

  await page.goto(`/workflows/${workflowId}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.vue-flow', { timeout: 15000 });
  console.log('Canvas loaded');

  // Screenshot initial state
  await page.screenshot({ path: '/tmp/wf-01-initial.png' });

  // Click Run tab by its text
  const runTabButton = page.locator('button:has-text("Run")').first();
  await runTabButton.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/wf-02-run-tab.png' });

  // Check if Run Workflow button is visible
  const runBtn = page.getByRole('button', { name: /Run Workflow/i });
  const visible = await runBtn.isVisible({ timeout: 3000 }).catch(() => false);
  console.log('Run Workflow button visible:', visible);

  if (!visible) {
    // Debug: dump page text
    const text = await page.textContent('body');
    console.log('Page contains "Run Workflow":', text?.includes('Run Workflow'));
    console.log('Page contains "Run":', text?.includes('Run'));
    console.log('Errors:', consoleErrors.join(' | '));
    return;
  }

  // Click Run
  await runBtn.click();
  console.log('Run clicked');

  // Screenshot at 2s intervals for 20s
  for (let i = 1; i <= 10; i++) {
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `/tmp/wf-run-${String(i).padStart(2, '0')}.png` });

    // Check for execution log appearing
    const hasLog = await page
      .getByText('Execution Log')
      .isVisible()
      .catch(() => false);
    const hasRunning = await page
      .getByText('Running')
      .isVisible()
      .catch(() => false);
    const hasCompleted = await page
      .getByText('completed')
      .isVisible()
      .catch(() => false);
    console.log(`t=${i * 2}s: log=${hasLog} running=${hasRunning} completed=${hasCompleted}`);

    if (hasCompleted) break;
  }

  // Final screenshot
  await page.screenshot({ path: '/tmp/wf-run-final.png' });

  if (consoleErrors.length) {
    console.log('Console errors:', consoleErrors.join('\n'));
  }
});
