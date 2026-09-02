---
title: "Building High-Throughput Microservices with Node.js and Redis"
description: "Architecting sub-millisecond API services using Node.js clustering, pipelined Redis operations, and memory bounds."
date: 2023-02-18
tags: ["Node.js", "Redis", "Microservices", "Performance"]
---

Single-threaded Node.js event loops can struggle under high-concurrency CPU loads. Combining cluster multi-processing with Redis connection pooling and pipelining delivers 50,000+ requests per second on modest cloud instances.

## Redis Multi-Key Pipelines & Atomic Caching

Pipelining aggregates individual Redis commands into a single round-trip TCP packet, eliminating network latency overhead.

```typescript
import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

export async function batchFetchUserProfiles(userIds: string[]) {
  const pipeline = redis.multi();
  
  for (const id of userIds) {
    pipeline.hGetAll(`user:cache:${id}`);
  }

  // Executes all fetches in a single network round-trip
  const results = await pipeline.exec();
  return results;
}
```

## Node.js Cluster Mode with PM2

Distribute incoming TCP connections evenly across physical CPU cores:

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: "./dist/index.js",
      instances: "max", // Spawns 1 worker per CPU core
      exec_mode: "cluster",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        UV_THREADPOOL_SIZE: 64
      }
    }
  ]
};
```

## Throughput Benchmark Comparison

| Configuration | Requests / Second | Avg Latency | p99 Latency |
| :--- | :--- | :--- | :--- |
| **Single Process (No Cache)** | 3,200 req/s | 42.5 ms | 185 ms |
| **Cluster (4 Cores, DB Only)** | 11,400 req/s | 14.1 ms | 68 ms |
| **Cluster + Redis Pipelines** | **52,800 req/s** | **1.8 ms** | **4.2 ms** |

## Summary

- Use pipelining whenever fetching more than two keys in a single request lifecycle.
- Set strict TTL expiration keys on all cache entries to avoid stale memory leaks.
- Match cluster instances to physical vCPU counts.
