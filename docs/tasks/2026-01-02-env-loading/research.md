# Research: Centralized .env Loading for Monorepo

## Problem

Multiple scripts need environment variables:

- `nuxt dev` - needs all vars
- `drizzle-kit generate/migrate` - needs DATABASE_URL
- `vitest` - needs all vars
- `playwright` - needs UI_PORT
- Build scripts - need various vars

Currently only vitest explicitly loads .env (via dotenv + find-config).

## Codebase Analysis

### Current State

| Component            | Env Vars Needed                    | Current Loading                      |
| -------------------- | ---------------------------------- | ------------------------------------ |
| nuxt.config.ts       | ANTHROPIC_API_KEY, AWS_REGION, etc | process.env (Nuxt auto-loads in dev) |
| drizzle.config.ts    | DATABASE_URL                       | process.env (no loader)              |
| vitest.config.ts     | All                                | dotenv + find-config                 |
| playwright.config.ts | UI_PORT                            | process.env (no loader)              |
| scripts/build.ts     | UI_PORT                            | process.env (no loader)              |
| scripts/migrate.ts   | DATABASE_URL                       | process.env (no loader)              |

### .env Files

- `.env.example` at root - template
- `.env` at packages/blog/ - actual values (tracked)

### Dependencies Already Installed

- `dotenv` v17.2.3 (root devDep)
- `find-config` v1.0.0 (blog dep)

## Expert Recommendations

### Option 1: Node.js 20+ Native `--env-file` Flag

**Pros:**

- Zero dependencies
- Native Node.js support
- Can chain multiple files: `--env-file=.env --env-file=.env.local`
- `--env-file-if-exists` for optional files

**Cons:**

- Verbose in package.json scripts
- Need to specify path from each package location
- Requires Node 20.6+

**Usage:**

```json
"dev": "node --env-file=../../.env nuxt dev"
```

Sources:

- [Infisical: Should You Still Use dotenv in 2025?](https://infisical.com/blog/stop-using-dotenv-in-nodejs-v20.6.0+)
- [Node.js Docs: How to read environment variables](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)

### Option 2: `dotenv-mono` Package

**Pros:**

- Auto-walks parent directories to find .env
- Drop-in replacement for dotenv
- Priority-based file loading
- CLI preload: `node -r dotenv-mono/load script.js`

**Cons:**

- Another dependency
- Less control over which file loads

**Usage:**

```json
"dev": "node -r dotenv-mono/load nuxt dev"
```

Sources:

- [dotenv-mono npm](https://www.npmjs.com/package/dotenv-mono)
- [GitHub: dotenv-mono](https://github.com/marcocesarato/dotenv-mono)

### Option 3: Nuxt's Built-in Handling + dotenv in Configs

**Pros:**

- Nuxt auto-loads .env in dev/build/generate
- Minimal changes needed
- Framework-native

**Cons:**

- Only works for Nuxt commands
- Drizzle-kit runs outside Nuxt, still needs manual loading
- Inconsistent approach across tools

Sources:

- [Nuxt Docs: .env](https://nuxt.com/docs/4.x/directory-structure/env)
- [Nuxt Docs: Runtime Config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

### Option 4: Wrapper Script at Root

Create a preload script that all other scripts use.

**Pros:**

- Single source of truth
- Can add validation
- Works with any tool

**Cons:**

- Adds complexity
- Need to update all scripts

### Drizzle-Kit Specific

Drizzle-kit now has built-in dotenv support, but for custom paths or monorepo roots, explicit loading is needed:

```typescript
// drizzle.config.ts
import { config } from 'dotenv';
import findConfig from 'find-config';

config({ path: findConfig('.env') });
```

Sources:

- [Drizzle-Kit dotenv support discussion](https://github.com/drizzle-team/drizzle-orm/discussions/3405)
- [Drizzle config file docs](https://orm.drizzle.team/docs/drizzle-config-file)

## Recommended Approach

**Use Node.js native `--env-file` with a root-level preload pattern:**

1. **Move .env to monorepo root** (already have .env.example there)

2. **For npm scripts**: Use `--env-file` flag pointing to root

   ```json
   "dev": "node --env-file=../../.env ./node_modules/nuxi/bin/nuxi.mjs dev"
   ```

3. **For config files** (drizzle.config.ts, etc.): Use find-config pattern

   ```typescript
   import { config } from 'dotenv';
   import findConfig from 'find-config';
   config({ path: findConfig('.env') });
   ```

4. **Keep vitest as-is** - already uses find-config pattern

### Why This Approach?

- **No new dependencies** - uses Node.js native feature + already-installed packages
- **Works everywhere** - scripts, configs, tests all covered
- **Single .env location** - root of monorepo
- **Consistent pattern** - find-config walks up to find .env

### Alternative: dotenv-mono

If the `--env-file` approach becomes too verbose, switch to dotenv-mono:

```bash
pnpm add -D dotenv-mono -w
```

Then all scripts become:

```json
"dev": "node -r dotenv-mono/load nuxt dev"
```

## Files to Update

1. Move `packages/blog/.env` to root `.env`
2. Update `drizzle.config.ts` - add find-config loading
3. Update `playwright.config.ts` - add find-config loading (if needed)
4. Update package.json scripts for drizzle-kit commands
5. Keep vitest.config.ts as-is (already works)
6. Nuxt dev/build commands may not need changes (auto-loads)
