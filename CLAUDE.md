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
    terraform/          # GCP Cloud Run and Cloud SQL
```

## Commands

```bash
pnpm dev          # Dev server (with remote storage)
pnpm build        # Build all packages
pnpm test         # Vitest
pnpm lint         # oxlint
pnpm typecheck    # TypeScript checks
pnpm gcp:prod:deploy   # Build container + deploy to GCP prod (needs terraform & gcloud)
pnpm gcp:staging:deploy # Build container + deploy to GCP staging
```

## Printable Worksheets

HTML sources in `packages/blog/public/downloads/kids/`. Generate PDFs:

```bash
cd packages/blog/public/downloads/kids
for f in *.html; do google-chrome --headless=new --print-to-pdf="${f%.html}.pdf" --print-to-pdf-no-header --no-pdf-header-footer --disable-gpu "$f"; done
```

Hero image screenshots (use CLI, not DevTools — avoids dark mode issues):

```bash
google-chrome --headless=new --screenshot=output.png --window-size=1200,800 --default-background-color=ffffffff file.html
```

## Pre-commit Hooks

- Image compression requires `pngquant` (`sudo apt-get install pngquant`)

## References

- [GCP: Hosting](docs/hosting.md)
- [Worktree Development](scripts/worktree.ts) - `./scripts/worktree.ts create <issue#>`
- [Terraform Details](infra/terraform/README.md)
