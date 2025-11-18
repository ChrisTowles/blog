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

# Install dependencies with cache mount
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

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

WORKDIR /app

# Install sharp for image optimization
RUN npm install sharp


# Copy built application from builder
COPY --from=builder /app/packages/blog/.output /app/.output

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
