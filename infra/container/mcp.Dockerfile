# syntax=docker/dockerfile:1.4
# MCP Apps (SEP-1865) iframe host service.
# Serves sandbox.html with per-request CSP plus the relay JS that bridges the
# blog (parent) and the untrusted inner iframe. Must live on a different origin
# from the blog to satisfy the SEP-1865 isolation requirement.

FROM node:24-slim AS builder
WORKDIR /build

COPY mcp/package.json ./
RUN --mount=type=cache,id=npm-mcp,target=/root/.npm npm install

COPY mcp ./
RUN npm run build

FROM node:24-slim
WORKDIR /app

ARG GIT_SHA=unknown
ARG BUILD_TAG=unknown
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV GIT_SHA=$GIT_SHA
ENV BUILD_TAG=$BUILD_TAG

COPY --from=builder /build/dist/server.mjs ./
COPY --from=builder /build/sandbox.html /build/sandbox.js /build/relay.js /build/index.html ./

EXPOSE 8080
CMD ["node", "server.mjs"]
