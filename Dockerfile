# Build stage - use Bun for faster dependency installation
FROM oven/bun:1.2 AS builder

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lock ./

# Copy package files for all workspaces
COPY packages/blog/package.json ./packages/blog/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY packages/blog ./packages/blog

# Build the application
WORKDIR /app/packages/blog
ENV NUXT_CONTENT_DATABASE=false
ENV NITRO_PRESET=node-server

# Use bun to run nuxt build
RUN cd /app && bun run nuxt build packages/blog

# Production stage - use Node for runtime stability
FROM node:24-slim AS runner

# Build metadata args, passed in during build time
ARG GIT_SHA=unknown
ARG BUILD_TAG=unknown

WORKDIR /app

# Install sharp for image optimization and pg for migrations
RUN npm install sharp pg

# Copy built application (includes migrate.mjs and migrations/ from Nitro hook)
COPY --from=builder /app/packages/blog/.output /app/.output

# Copy content directory for Nuxt Content (raw markdown files needed at runtime)
COPY --from=builder /app/packages/blog/content /app/content

# Copy entrypoint
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV GIT_SHA=$GIT_SHA
ENV BUILD_TAG=$BUILD_TAG

# Expose port
EXPOSE 3000

# Start the application
ENTRYPOINT ["/app/docker-entrypoint.sh"]
