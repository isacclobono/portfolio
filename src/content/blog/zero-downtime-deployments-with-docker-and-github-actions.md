---
title: "Zero-Downtime Deployments with Docker and GitHub Actions"
description: "Blue-green container deployment workflows, automated health probes, zero-loss Nginx traffic switching, and rollback pipelines in CI/CD."
date: 2023-06-12
tags: ["Docker", "CI/CD", "DevOps", "GitHub Actions"]
---

Executing a standard `docker compose down && docker compose up -d` in production drops active HTTP connections, triggers 502 Bad Gateway errors for several seconds, and risks deploying a broken container that fails on boot. In mission-critical environments, every deployment must be completely imperceptible to users.

**Blue-Green Deployment** eliminates deployment downtime by provisioning a new container environment (Green) alongside the running environment (Blue). Traffic switches over via the reverse proxy only after the new container passes rigorous health probes. If anything fails, traffic never switches and the system remains 100% operational.

This guide provides an end-to-end implementation of an automated Blue-Green deployment pipeline using Docker Compose, Nginx, and GitHub Actions.

---

## 1. Architectural Topology: The Blue-Green Traffic Switch

```
                       [Incoming User Traffic]
                                  |
                                  v
                    +---------------------------+
                    | Nginx / Traefik Reverse   |
                    | Proxy (Port 80 / 443)     |
                    +-------------+-------------+
                                  |
            +---------------------+---------------------+
            | (Active: 100% Traffic)                    | (Idle: 0% Traffic)
            v                                           v
+-----------------------+                   +-----------------------+
| Blue Container        |                   | Green Container       |
| Port: 8081            |                   | Port: 8082            |
| (Current Production)  |                   | (Newly Deployed)      |
+-----------------------+                   +-----------+-----------+
                                                        |
                                                        | Probes: GET /health
                                                        v (Passes 5/5 Probes)
                                           [Nginx -s reload Switch!]
```

---

## 2. Docker Compose Blue-Green Configuration

Define identical parallel services bound to distinct internal loopback ports:

```yaml
# docker-compose.prod.yml
version: "3.8"

services:
  # Blue Environment
  app-blue:
    image: ghcr.io/org/app:${IMAGE_TAG:-latest}
    container_name: app-blue
    restart: always
    environment:
      - NODE_ENV=production
      - PORT=8080
    ports:
      - "127.0.0.1:8081:8080"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 5s
      timeout: 3s
      retries: 5

  # Green Environment
  app-green:
    image: ghcr.io/org/app:${IMAGE_TAG:-latest}
    container_name: app-green
    restart: always
    environment:
      - NODE_ENV=production
      - PORT=8080
    ports:
      - "127.0.0.1:8082:8080"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 5s
      timeout: 3s
      retries: 5
```

---

## 3. Automated Zero-Downtime Deployment Script (`deploy.sh`)

This script identifies the currently running container, spins up the idle color, verifies HTTP health endpoints, executes atomic Nginx reload, and reaps the legacy instance:

```bash
#!/usr/bin/env bash
set -euo pipefail

APP_NAME="app"
COMPOSE_FILE="docker-compose.prod.yml"
UPSTREAM_CONF="/etc/nginx/conf.d/upstream.conf"

# 1. Determine currently active color
if docker ps --format '{{.Names}}' | grep -q "${APP_NAME}-blue"; then
  ACTIVE_COLOR="blue"
  IDLE_COLOR="green"
  IDLE_PORT=8082
else
  ACTIVE_COLOR="green"
  IDLE_COLOR="blue"
  IDLE_PORT=8081
fi

echo "==> Active environment: ${ACTIVE_COLOR}. Deploying to: ${IDLE_COLOR} on port ${IDLE_PORT}..."

# 2. Pull and start idle container
docker compose -f "${COMPOSE_FILE}" pull "${APP_NAME}-${IDLE_COLOR}"
docker compose -f "${COMPOSE_FILE}" up -d --no-deps "${APP_NAME}-${IDLE_COLOR}"

# 3. Health Check Polling Loop (Max 45 seconds)
echo "==> Polling health endpoint on http://127.0.0.1:${IDLE_PORT}/health..."
MAX_ATTEMPTS=15
ATTEMPT=1
IS_HEALTHY=0

while [ "${ATTEMPT}" -le "${MAX_ATTEMPTS}" ]; do
  if curl -sf -o /dev/null "http://127.0.0.1:${IDLE_PORT}/health"; then
    echo "==> ${IDLE_COLOR} passed health checks on attempt ${ATTEMPT}!"
    IS_HEALTHY=1
    break
  fi
  echo "    Attempt ${ATTEMPT}/${MAX_ATTEMPTS} failed. Waiting 3 seconds..."
  sleep 3
  ATTEMPT=$((ATTEMPT + 1))
done

# 4. Abort if health checks failed
if [ "${IS_HEALTHY}" -eq 0 ]; then
  echo "❌ CRITICAL: ${IDLE_COLOR} failed health probes! Aborting deployment and tearing down candidate..."
  docker compose -f "${COMPOSE_FILE}" stop "${APP_NAME}-${IDLE_COLOR}"
  docker compose -f "${COMPOSE_FILE}" rm -f "${APP_NAME}-${IDLE_COLOR}"
  exit 1
fi

# 5. Atomic Nginx Traffic Switch
echo "==> Switching Nginx traffic to ${IDLE_COLOR} (Port ${IDLE_PORT})..."
cat <<EOF > "${UPSTREAM_CONF}"
upstream backend_app {
    server 127.0.0.1:${IDLE_PORT} max_fails=3 fail_timeout=10s;
    keepalive 32;
}
EOF

# Nginx -s reload executes zero-loss worker handoff
nginx -t && nginx -s reload

echo "==> Traffic successfully routed to ${IDLE_COLOR}."

# 6. Graceful Drain Period before stopping old container
echo "==> Waiting 15s to allow in-flight connections on ${ACTIVE_COLOR} to complete..."
sleep 15

echo "==> Stopping legacy ${ACTIVE_COLOR} container..."
docker compose -f "${COMPOSE_FILE}" stop "${APP_NAME}-${ACTIVE_COLOR}"
docker compose -f "${COMPOSE_FILE}" rm -f "${APP_NAME}-${ACTIVE_COLOR}"

echo "🎉 Deployment successfully completed! Active color is now ${IDLE_COLOR}."
```

---

## 4. GitHub Actions CI/CD Pipeline

A hardened production pipeline building multi-stage Docker images with Buildx caching and deploying via SSH:

```yaml
name: Production Deployment Pipeline

on:
  push:
    branches: [main]

concurrency:
  group: production-deployment
  cancel-in-progress: false

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:${{ github.sha }}
            ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Execute Blue-Green Rollout via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.PROD_SERVER_IP }}
          username: ${{ secrets.PROD_SERVER_USER }}
          key: ${{ secrets.PROD_SSH_PRIVATE_KEY }}
          envs: GITHUB_SHA
          script: |
            export IMAGE_TAG=${{ github.sha }}
            cd /opt/application
            chmod +x ./deploy.sh
            ./deploy.sh
```

---

## 5. The Expand and Contract Pattern for Database Migrations

Code can switch instantaneously via Nginx, but database tables cannot. If a new version deletes a column that the old version still reads, zero-downtime breaks.

Always follow the **Expand and Contract Pattern**:

```
[Phase 1: Expand (Deploy v1.1)]
Add new optional column "phone_number". Both v1.0 and v1.1 function simultaneously.

[Phase 2: Migrate (Background Job)]
Backfill data from old fields to new fields asynchronously.

[Phase 3: Contract (Deploy v1.2)]
Application code stops reading legacy columns. Drop legacy column in subsequent migration.
```

---

## Key Production Takeaways

- **Never restart in place**: An in-place restart drops open TCP sockets; always maintain parallel Blue and Green instances.
- **Probe `/health` before traffic flip**: Ensure external dependencies (Redis, PostgreSQL) are reachable before exposing the container to user traffic.
- **Grant Grace Periods on Shutdown**: Give old containers 15–30 seconds of drain time to finish in-flight transactions before issuing `docker stop`.
