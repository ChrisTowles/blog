# Blog

Personal blog/website - Vue/Nuxt monorepo + AI playground.



## Project Structure

```
packages/
├── blog/           # Main Nuxt 4 and Nuxt UI application (content/, server/database/)
├── slides/         # Slidev presentations
infra/              # infrastructure
    container/       # block docker files
    aws_cloudformation/ # AWS Bedrock and IAM
    teerraform/         # GCP Cloud Run and Cloud SQL
```

## Commands

```bash
pnpm dev          # Dev server (with remote storage)
pnpm build        # Build all packages
pnpm test         # Vitest
pnpm lint         # ESLint
pnpm typecheck    # TypeScript checks
```

## References

- [GCP: Hosting](docs/hosting.md)
- [Worktree Development](scripts/worktree.ts) - `./scripts/worktree.ts create <issue#>`
- [Terraform Details](infra/terraform/README.md)
