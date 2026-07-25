#!/usr/bin/env -S pnpx tsx
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { consola } from 'consola';
import { defineCommand, runMain } from 'citty';

/**
 * Store an Anthropic API key as the ANTHROPIC_API_KEY repo secret, so the E2E
 * job in .github/workflows/test.yml can run the chat, loan and aviation specs.
 *
 * This script deliberately does NOT create the key. The Admin API has no
 * create endpoint — `/v1/organizations/api_keys` supports list, get, and
 * update (name/status) only, and the Admin API FAQ states plainly that "new
 * API keys can only be created through the Claude Console for security
 * reasons." Create it there first, then run this.
 *
 * The key is read from a hidden prompt and handed to `gh` over stdin rather
 * than as an argv flag, so it never lands in shell history or in the process
 * list where any other user on the box could read it.
 */

const REPO = 'ChrisTowles/blog';
const SECRET_NAME = 'ANTHROPIC_API_KEY';
const CONSOLE_URL = 'https://console.anthropic.com/settings/keys';

/** Read a line without echoing it to the terminal. */
function promptHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const output = rl.output as NodeJS.WriteStream & { muted?: boolean };

    output.muted = false;
    // readline writes each keystroke back to the terminal; swallow them while
    // muted so the key never appears on screen or in a scrollback buffer.
    const write = output.write.bind(output);
    output.write = ((chunk: string, ...rest: unknown[]) =>
      output.muted ? true : write(chunk, ...(rest as []))) as typeof output.write;

    rl.question(question, (answer) => {
      output.muted = false;
      output.write = write;
      rl.close();
      process.stdout.write('\n');
      resolve(answer.trim());
    });
    output.muted = true;
  });
}

function requireCommand(name: string, hint: string): void {
  // Invoked directly rather than via `command -v` under a shell: passing args
  // with `shell: true` trips Node's DEP0190 deprecation warning.
  const probe = spawnSync(name, ['--version'], { stdio: 'ignore' });
  if (probe.error || probe.status !== 0) {
    consola.error(`\`${name}\` is not on PATH. ${hint}`);
    process.exit(1);
  }
}

/**
 * Confirm the key actually works before storing it — a typo'd or revoked key
 * stored as a secret fails later, in CI, as a confusing test failure.
 */
async function verifyKey(apiKey: string): Promise<boolean> {
  const response = await fetch('https://api.anthropic.com/v1/models?limit=1', {
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
  });

  if (response.ok) return true;

  if (response.status === 401) {
    consola.error('The API rejected that key (401). Check it was copied in full.');
  } else {
    consola.error(`Unexpected response verifying the key: HTTP ${response.status}`);
  }
  return false;
}

const main = defineCommand({
  meta: {
    name: 'setup-ci-anthropic-key',
    description: 'Store an Anthropic API key as the ANTHROPIC_API_KEY GitHub secret',
  },
  async run() {
    requireCommand('gh', 'Install the GitHub CLI: https://cli.github.com');

    if (spawnSync('gh', ['auth', 'status'], { stdio: 'ignore' }).status !== 0) {
      consola.error('gh is not authenticated. Run `gh auth login` first.');
      process.exit(1);
    }

    consola.box(
      `This does NOT create the key — the Anthropic Admin API has no create\n` +
        `endpoint, so keys are Console-only.\n\n` +
        `1. Open ${CONSOLE_URL}\n` +
        `2. Create Key, name it "BLOG_CI"\n` +
        `3. Paste it below (input is hidden)`,
    );

    const apiKey = await promptHidden('Anthropic API key: ');

    if (!apiKey) {
      consola.error('No key entered; nothing to do.');
      process.exit(1);
    }
    if (!apiKey.startsWith('sk-ant-')) {
      consola.error('That does not look like an Anthropic key (expected an sk-ant- prefix).');
      process.exit(1);
    }

    consola.start('Verifying the key against the Anthropic API...');
    if (!(await verifyKey(apiKey))) process.exit(1);
    consola.success('Key is valid.');

    consola.start(`Storing it as ${SECRET_NAME} on ${REPO}...`);
    // Passed over stdin, not as --body, so the key stays out of argv.
    const set = spawnSync('gh', ['secret', 'set', SECRET_NAME, '--repo', REPO], {
      input: apiKey,
      stdio: ['pipe', 'inherit', 'inherit'],
    });
    if (set.status !== 0) {
      consola.error('gh secret set failed.');
      process.exit(1);
    }

    const list = spawnSync('gh', ['secret', 'list', '--repo', REPO], { encoding: 'utf-8' });
    if (!list.stdout?.includes(SECRET_NAME)) {
      consola.error(`${SECRET_NAME} is not showing up in \`gh secret list\`.`);
      process.exit(1);
    }

    consola.success(`${SECRET_NAME} is set on ${REPO}.`);
    consola.info('Re-run the E2E job on any open PR to pick it up.');
  },
});

runMain(main);
