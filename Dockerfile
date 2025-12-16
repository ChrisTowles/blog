# Build stage
FROM node:24-slim AS builder

# Install build dependencies for native modules (better-sqlite3)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./

# Copy package files for all workspaces
COPY packages/blog/package.json ./packages/blog/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code first (needed before building better-sqlite3 and nuxt)
COPY packages/blog ./packages/blog

# Build better-sqlite3 native module directly
RUN cd /app/node_modules/.pnpm/better-sqlite3@12.4.1/node_modules/better-sqlite3 && \
    npm run build-release

# Build the application
WORKDIR /app/packages/blog
ENV NUXT_CONTENT_DATABASE=false
ENV NITRO_PRESET=node-server
# Remove routeRules prerender for Docker build
RUN sed -i '/routeRules:/,/},/s/^/\/\/ /' nuxt.config.ts
# Use pnpm exec to run nuxt with proper module resolution
RUN cd /app && pnpm exec nuxt build packages/blog

# Production stage
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
