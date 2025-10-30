# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a personal blog and website built in Vue with:

- **Nuxt** with Nuxt UI Pro
- **NuxtHub** for Cloudflare Workers deployment
- **Vitest** for testing
- **pnpm** workspace monorepo structure

The main application is in `packages/blog/` with the blog content directory sorted in markdown at `packages/blog/content/`.


- [Code Style](docs/code-style.md) for coding conventions and best practices.
- [Tech Stack](docs/tech-stack.md) for repo technology choices.





## Running Slides for Talks

Slides for talks made with `slidev`. They are in `packages/slides/`. Use `pnpm run slides:upgrade` to start the slide server locally.