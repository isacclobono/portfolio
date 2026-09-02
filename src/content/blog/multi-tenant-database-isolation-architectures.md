---
title: "Multi-Tenant Database Isolation: Row-Level Security vs Schema Partitioning"
description: "Architecting secure, compliant, and cost-effective multi-tenant SaaS data models in PostgreSQL."
date: 2024-10-15
tags: ["PostgreSQL", "SaaS", "Security", "Architecture"]
---

Choosing the right multi-tenancy model in SaaS engineering is a balance between infrastructure cost, operational overhead, and strict regulatory isolation (GDPR/HIPAA).

## Multi-Tenancy Strategy Comparison

| Strategy | Isolation Level | Infrastructure Cost | Operational Complexity | Backup/Restore Granularity |
| :--- | :--- | :--- | :--- | :--- |
| **Separate Databases** | Highest | Very High | High | Per Tenant |
| **Schema-per-Tenant** | Medium-High | Moderate | Moderate | Complex Migration Runs |
| **Shared Schema + RLS** | High (Engine enforced) | Lowest (Shared Pool) | Low | Global Database Backup |

## Implementing PostgreSQL Row-Level Security (RLS)

PostgreSQL Row-Level Security enforces data isolation directly at the database engine level, preventing accidental data leaks even if application code contains missing `WHERE tenant_id = ?` clauses.

```sql
-- 1. Enable RLS on Tenant Table
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 2. Create Security Policy reading current tenant context
CREATE POLICY tenant_isolation_policy ON documents
FOR ALL
USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::UUID)
WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::UUID);
```

## Node.js Session Middleware Context Injection

```typescript
import { Pool } from "pg";

const pool = new Pool();

export async function withTenantContext<T>(tenantId: string, fn: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    // Inject tenant ID into connection session variables
    await client.query("SET LOCAL app.current_tenant_id = $1", [tenantId]);
    return await fn(client);
  } finally {
    client.release();
  }
}
```

## Summary

- Use Row-Level Security with pooled database connections for standard B2B SaaS applications to maximize compute density.
- Isolate enterprise clients requiring dedicated encryption keys into dedicated PostgreSQL databases.
