---
title: "Zero-Downtime Deployments with Docker and GitHub Actions"
description: "Blue-green container deployment workflows, automated health probes, and rollback pipelines."
date: 2023-06-12
tags: ["Docker", "CI/CD", "DevOps", "GitHub Actions"]
---

Deploying application updates directly to running production containers risks dropping in-flight HTTP requests and causing brief service outages. Blue-green deployment pipelines guarantee seamless zero-downtime rollouts.

## Blue-Green Container Deployment Script

```bash
#!/bin/bash
set -e

APP_NAME="sk-api"
ACTIVE_COLOR=$(docker ps --filter "name=${APP_NAME}" --format "{{.Names}}" | grep -o 'blue\|green' | head -n 1 || echo "green")

if [ "$ACTIVE_COLOR" = "blue" ]; then
  NEW_COLOR="green"
  NEW_PORT=8082
  OLD_PORT=8081
else
  NEW_COLOR="blue"
  NEW_PORT=8081
  OLD_PORT=8082
fi

echo "Deploying ${NEW_COLOR} container on port ${NEW_PORT}..."
docker compose up -d --no-deps --build "${APP_NAME}-${NEW_COLOR}"

# Health check polling before switching reverse proxy traffic
for i in {1..30}; do
  if curl -s -f "http://localhost:${NEW_PORT}/health" > /dev/null; then
    echo "${NEW_COLOR} is healthy. Switching Nginx traffic..."
    sed -i "s/proxy_pass http:\/\/127.0.0.1:${OLD_PORT}/proxy_pass http:\/\/127.0.0.1:${NEW_PORT}/g" /etc/nginx/conf.d/api.conf
    nginx -s reload
    echo "Stopping legacy ${ACTIVE_COLOR} container..."
    docker stop "${APP_NAME}-${ACTIVE_COLOR}" || true
    exit 0
  fi
  sleep 1
done

echo "Health check failed on ${NEW_COLOR}. Aborting deployment!"
docker stop "${APP_NAME}-${NEW_COLOR}"
exit 1
```

## GitHub Actions Continuous Delivery Pipeline

```yaml
name: Production CD

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build & Test
        run: |
          npm ci
          npm test
          npm run build
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: deploy
          key: ${{ secrets.PROD_SSH_KEY }}
          script: /opt/scripts/deploy-blue-green.sh
```

## Summary

- Never reload Nginx or reverse proxies until new containers pass active `/health` HTTP probes.
- Maintain immutable container image tags (`git-sha`) for 1-click instant rollbacks.
- Store sensitive configuration variables exclusively in encrypted secret managers.
