# Build stage
FROM node:24-slim AS builder

# Install build dependencies for native modules (better-sqlite3)
RUN apt-get update 
#&& apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy package files for all workspaces
COPY packages/blog/package.json ./packages/blog/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild better-sqlite3 native module
#RUN pnpm rebuild better-sqlite3

# Copy source code
COPY packages/blog ./packages/blog

# Build the application
WORKDIR /app/packages/blog
RUN pnpm run build

# Production stage
FROM node:24-slim AS runner

WORKDIR /app

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
