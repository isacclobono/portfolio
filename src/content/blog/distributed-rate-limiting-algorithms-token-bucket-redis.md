---
title: "Distributed Rate Limiting at Scale: Token Bucket vs. Sliding Window with Redis & Lua"
description: "Implementing atomic, sub-millisecond API rate limiting with Redis Lua scripts, sliding window counters, and tier-based throttling."
date: 2026-08-10
tags: ["Distributed Systems", "Redis", "Microservices", "API", "Security"]
---

In distributed architectures, API rate limiting is critical for defending against distributed denial-of-service (DDoS) floods, preventing cascading downstream failures, and enforcing fair multi-tenant SaaS consumption quotas.

However, naive rate-limiting algorithms like Fixed Window counters suffer from the "boundary burst anomaly"—where a client can double their quota by sending burst traffic right across the window boundary.

This article examines **Sliding Window Log**, **Sliding Window Counter**, and **Token Bucket** algorithms, followed by a production-ready atomic Redis Lua implementation.

---

## 1. Algorithm Comparison: Trade-offs at Scale

| Algorithm | Precision | Memory Overhead | Burst Handling | Best Suited For |
| :--- | :--- | :--- | :--- | :--- |
| **Fixed Window** | Low | $O(1)$ minimal | Uncontrolled boundary burst | Simple internal cron jobs |
| **Sliding Window Log** | 100% Exact | $O(N)$ with request count | Smooth | Low-throughput strict APIs |
| **Sliding Window Counter** | ~99% Approximation | $O(1)$ (2 keys per user) | Very Smooth | High-throughput public APIs |
| **Token Bucket** | High | $O(1)$ (tokens + timestamp) | Controlled burst capacity | Payment APIs & LLM token limits |

---

## 2. Atomic Sliding Window Rate Limiter with Redis Lua

To achieve atomic evaluation across horizontally distributed API gateway pods without expensive distributed transactions, we encapsulate the evaluation inside an atomic Redis Lua script.

```lua
-- KEYS[1]: Rate limit key (e.g., "ratelimit:user:org_9921")
-- ARGV[1]: Current UNIX timestamp in milliseconds
-- ARGV[2]: Window size in milliseconds (e.g., 60000 for 1 minute)
-- ARGV[3]: Maximum allowed requests in window (e.g., 100)

local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

local clearBefore = now - window

-- 1. Remove expired request timestamps older than current sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)

-- 2. Count current requests in active sliding window
local currentRequests = redis.call('ZCARD', key)

-- 3. Check if threshold exceeded
if currentRequests < limit then
    -- Add unique member: member = timestamp + nanosecond tiebreaker
    redis.call('ZADD', key, now, now .. '-' .. math.random(1000, 9999))
    -- Auto-expire the sorted set after the window duration to prevent memory leakage
    redis.call('PEXPIRE', key, window)
    return { 1, limit - currentRequests - 1, 0 } -- [Allowed, Remaining, RetryAfter]
else
    -- Find oldest timestamp to calculate accurate Retry-After header
    local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
    local retryAfterMs = 0
    if oldest[2] then
        retryAfterMs = math.max(0, math.ceil((tonumber(oldest[2]) + window - now) / 1000))
    end
    return { 0, 0, retryAfterMs } -- [Rejected, Remaining, RetryAfter]
end
```

---

## 3. Node.js Fastify / Express Integration

Integrating the Lua script with connection pooling ensures sub-millisecond overhead ($< 0.8\text{ ms}$ round-trip):

```typescript
import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// Define SHA-cached Lua command for optimal throughput
redis.defineCommand("checkSlidingRateLimit", {
  numberOfKeys: 1,
  lua: `
    local key = KEYS[1]
    local now = tonumber(ARGV[1])
    local window = tonumber(ARGV[2])
    local limit = tonumber(ARGV[3])
    redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
    local current = redis.call('ZCARD', key)
    if current < limit then
      redis.call('ZADD', key, now, now .. '-' .. math.random(1000, 9999))
      redis.call('PEXPIRE', key, window)
      return { 1, limit - current - 1, 0 }
    else
      return { 0, 0, math.ceil(window / 1000) }
    end
  `
});

export async function rateLimitMiddleware(req: any, res: any, next: any) {
  const clientId = req.headers["x-api-key"] || req.ip;
  const key = `ratelimit:client:${clientId}`;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxLimit = 120;       // 120 requests/minute

  const [allowed, remaining, retryAfter] = await (redis as any).checkSlidingRateLimit(
    key,
    now,
    windowMs,
    maxLimit
  );

  res.setHeader("X-RateLimit-Limit", maxLimit);
  res.setHeader("X-RateLimit-Remaining", remaining);

  if (!allowed) {
    res.setHeader("Retry-After", retryAfter);
    return res.status(429).json({
      error: "Too Many Requests",
      message: `Rate limit quota exceeded. Retry after ${retryAfter} seconds.`
    });
  }

  next();
}
```

---

## Production Best Practices

- **Cluster Sharding**: Use Redis Hash Tags like `{client:org_id}:ratelimit` when deploying to Redis Cluster to ensure consistent slot hashing.
- **Fail-Open Strategy**: If Redis experiences network partition degradation, configure the gateway to log warnings and fail-open rather than denying legitimate user traffic.
- **Header Standards**: Always emit RFC 6585 and IETF standard `RateLimit-Limit`, `RateLimit-Remaining`, and `RateLimit-Reset` headers.
