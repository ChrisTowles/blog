#!/bin/bash

# Nuxt 4 Project Initialization Script
# Creates a new Nuxt 4 project with best practices configuration

set -e

echo "🚀 Nuxt 4 Project Initializer"
echo "=============================="

# Get project name
read -p "Enter project name: " PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
    echo "❌ Project name is required"
    exit 1
fi

# Create Nuxt project
echo "📦 Creating Nuxt 4 project..."
npx nuxi@latest init "$PROJECT_NAME"

cd "$PROJECT_NAME"

# Install additional dependencies
echo "📦 Installing production dependencies..."
npm install @nuxt/ui @nuxt/image @nuxt/fonts @nuxthub/core

echo "📦 Installing dev dependencies..."
npm install -D @nuxt/test-utils vitest @vue/test-utils happy-dom nitro-cloudflare-dev

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p app/components
mkdir -p app/composables
mkdir -p app/layouts
mkdir -p app/middleware
mkdir -p app/pages
mkdir -p app/plugins
mkdir -p app/utils
mkdir -p server/api
mkdir -p server/middleware
mkdir -p server/utils
mkdir -p server/database
mkdir -p tests/components
mkdir -p tests/composables
mkdir -p tests/server

# Create vitest.config.ts
echo "⚙️ Creating vitest.config.ts..."
cat > vitest.config.ts << 'EOF'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom'
      }
    }
  }
})
EOF

# Create wrangler.toml
echo "⚙️ Creating wrangler.toml..."
cat > wrangler.toml << EOF
name = "$PROJECT_NAME"
main = ".output/server/index.mjs"
compatibility_date = "2024-09-19"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = ".output/public"

# Add your bindings here
# [[d1_databases]]
# binding = "DB"
# database_name = "my-database"
# database_id = "your-database-id"

# [[kv_namespaces]]
# binding = "KV"
# id = "your-kv-id"

[vars]
# Add public environment variables here
EOF

# Create .dev.vars template
echo "⚙️ Creating .dev.vars template..."
cat > .dev.vars << 'EOF'
# Local development secrets
# Copy this file and add your values
# API_SECRET=your-secret
# DATABASE_URL=your-db-url
EOF

# Update .gitignore
echo "⚙️ Updating .gitignore..."
cat >> .gitignore << 'EOF'

# Local dev secrets
.dev.vars

# Wrangler
.wrangler/

# Test coverage
coverage/
EOF

# Update package.json scripts
echo "⚙️ Updating package.json scripts..."
npm pkg set scripts.test="vitest run"
npm pkg set scripts.test:watch="vitest"
npm pkg set scripts.test:ui="vitest --ui"
npm pkg set scripts.test:coverage="vitest run --coverage"
npm pkg set scripts.deploy="npm run build && wrangler pages deploy .output/public"

echo ""
echo "✅ Nuxt 4 project created successfully!"
echo ""
echo "Next steps:"
echo "  cd $PROJECT_NAME"
echo "  npm run dev"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run test         - Run tests"
echo "  npm run test:watch   - Run tests in watch mode"
echo "  npm run deploy       - Deploy to Cloudflare Pages"
EOF
