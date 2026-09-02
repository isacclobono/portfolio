---
title: "Optimizing PostgreSQL Queries for High-Volume Monoliths"
description: "Techniques for eliminating sequential scans, mastering partial indexes, and debugging EXPLAIN ANALYZE traces."
date: 2022-07-20
tags: ["PostgreSQL", "Database", "Performance", "SQL"]
---

As transactional monoliths scale beyond hundreds of thousands of daily records, unoptimized queries quickly exhaust connection pools and peg CPU utilization at 100%. Tuning PostgreSQL query plans requires deep inspection of index strategies.

## Dissecting EXPLAIN (ANALYZE, BUFFERS)

Before adding speculative indexes, analyze disk block reads versus memory cache hits:

```sql
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT id, user_id, amount_cents, status, created_at
FROM transactions
WHERE status = 'PENDING'
  AND created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC
LIMIT 50;
```

## Mastering Partial and Composite Indexes

Rather than indexing entire tables, **partial indexes** dramatically reduce index tree size and speed up write operations:

```sql
-- Partial Index: Only indexes records requiring active polling
CREATE INDEX CONCURRENTLY idx_transactions_pending_recent
ON transactions (created_at DESC)
WHERE status = 'PENDING';

-- Composite Covering Index: Eliminates Heap Fetches completely
CREATE INDEX CONCURRENTLY idx_users_email_active
ON users (email)
INCLUDE (id, role, password_hash)
WHERE is_deleted = false;
```

## Performance Benchmark Comparison

| Query Technique | Rows Scanned | Execution Time | Buffer Shared Hits |
| :--- | :--- | :--- | :--- |
| **Sequential Scan (No Index)** | 1,450,000 | 382.4 ms | 12,420 |
| **B-Tree Full Index** | 4,200 | 18.2 ms | 340 |
| **Partial Covering Index** | 50 | **0.84 ms** | **14** |

## Best Practices

- Always use `CREATE INDEX CONCURRENTLY` in production to prevent exclusive table locks.
- Utilize `INCLUDE` columns for index-only scans on hot lookup paths.
- Periodically vacuum and reindex bloated tables with `pg_repack`.
