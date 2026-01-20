# syntax=docker/dockerfile:1.4
# Enables BuildKit features like cache mounts (--mount=type=cache)
# which persist package downloads between builds

# Build stage - use Node with pnpm for dependency installation
FROM node:24-slim AS builder

# Install pnpm and build dependencies for native modules
RUN corepack enable pnpm && \
    apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Configure pnpm store location for BuildKit cache mount
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set working directory
WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package files for all workspaces
COPY packages/blog/package.json ./packages/blog/

# Install dependencies with cached pnpm store
# Cache mount persists /pnpm/store between builds - packages only download when lockfile changes
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source code
COPY packages/blog ./packages/blog

# Build the application
WORKDIR /app/packages/blog
ENV NUXT_CONTENT_DATABASE=false
ENV NITRO_PRESET=node-server

# Build the Nuxt application
RUN cd /app && pnpm --filter @chris-towles/blog exec nuxt build

# Production stage - use Node for runtime stability
FROM node:24-slim AS runner

# Define build-time arguments for ports
ARG UI_PORT

# Build metadata args, passed in during build time
ARG GIT_SHA=unknown
ARG BUILD_TAG=unknown


WORKDIR /app

# Install runtime deps with cached npm store
# Cache mount persists ~/.npm between builds - sharp/pg only download once
RUN --mount=type=cache,id=npm,target=/root/.npm npm install sharp pg

# Copy built application (includes migrate.mjs and migrations/ from Nitro hook)
COPY --from=builder /app/packages/blog/.output /app/.output

# Copy content directory for Nuxt Content (raw markdown files needed at runtime)
COPY --from=builder /app/packages/blog/content /app/content

# Copy entrypoint
COPY infra/container/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV UI_PORT=$UI_PORT
ENV GIT_SHA=$GIT_SHA
ENV BUILD_TAG=$BUILD_TAG

# Expose port
EXPOSE $UI_PORT

# Start the application
ENTRYPOINT ["/app/entrypoint.sh"]
