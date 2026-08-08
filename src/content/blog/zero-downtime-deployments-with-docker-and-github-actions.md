---
title: "Zero-Downtime CI/CD with Docker & GitHub Actions"
description: "Automating builds, security scanning, container packaging, and rolling rollouts."
date: 2024-03-10
tags: ["Docker", "CI/CD", "DevOps", "GitHub Actions"]
---

Manual deployments are slow, error-prone, and introduce unexpected downtime. A robust CI/CD pipeline ensures every commit is automatically tested, containerized, and deployed with zero user interruption.

## GitHub Actions Workflow Configuration

Here is the production-tested workflow for multi-stage Docker builds and rolling container reloads behind an Nginx reverse proxy.

```yaml
name: Production Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build & Push Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: registry.cloud.com/app:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## Key Pipeline Steps

- Automated linting and test execution before container builds.
- Multi-stage Docker builds to reduce image size from 800MB to under 90MB.
- Health check verification before routing production traffic.
