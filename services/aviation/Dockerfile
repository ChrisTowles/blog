FROM node:26-bookworm-slim

ENV NODE_ENV=production \
    DUCKDB_EXTENSION_DIR=/opt/duckdb-extensions

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund --no-package-lock \
  && npm cache clean --force

# httpfs is baked in so a cold start never has to reach extensions.duckdb.org.
COPY src ./src
RUN mkdir -p "$DUCKDB_EXTENSION_DIR" \
  && node src/install-extensions.ts \
  && chown -R node:node "$DUCKDB_EXTENSION_DIR"

USER node
EXPOSE 8080
CMD ["node", "src/main.ts"]
