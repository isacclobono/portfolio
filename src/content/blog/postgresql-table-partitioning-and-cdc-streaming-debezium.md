---
title: "Scaling High-Throughput PostgreSQL: Declarative Partitioning & Real-Time CDC with Debezium"
description: "Managing terabyte-scale time-series tables with declarative range partitioning, zero-downtime partition pruning, and Kafka CDC pipelines."
date: 2026-07-05
tags: ["PostgreSQL", "Database", "Kafka", "CDC", "Microservices"]
---

When relational tables exceed 50–100 million rows, standard B-Tree index maintenance degrades write throughput, `VACUUM` operations consume excessive I/O, and analytics queries trigger painful full sequential table scans.

To sustain 10,000+ writes per second while maintaining sub-millisecond point lookups and streaming downstream events in real time, high-throughput architectures pair **PostgreSQL Declarative Table Partitioning** with **Change Data Capture (CDC) via Debezium and Apache Kafka**.

---

## 1. Declarative Range Partitioning by Timestamp

PostgreSQL 14+ provides native declarative partitioning with query planner partition pruning. Partition pruning allows the SQL engine to skip scanning partitions that fall outside query `WHERE` boundary clauses entirely.

```sql
-- 1. Create root partitioned table (Audit Event Log)
CREATE TABLE system_audit_events (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  event_type VARCHAR(64) NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- 2. Create monthly partitions with dedicated storage parameters
CREATE TABLE system_audit_events_2026_07 
PARTITION OF system_audit_events
FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-08-01 00:00:00+00');

CREATE TABLE system_audit_events_2026_08 
PARTITION OF system_audit_events
FOR VALUES FROM ('2026-08-01 00:00:00+00') TO ('2026-09-01 00:00:00+00');

-- 3. Local indexes per partition (automatically inherited)
CREATE INDEX idx_audit_tenant_created 
ON system_audit_events (tenant_id, created_at DESC);
```

### Verifying Partition Pruning in EXPLAIN ANALYZE

```sql
EXPLAIN (ANALYZE, COSTS OFF)
SELECT * FROM system_audit_events
WHERE tenant_id = '550e8400-e29b-41d4-a716-446655440000'
  AND created_at >= '2026-07-15 00:00:00+00'
  AND created_at <  '2026-07-20 00:00:00+00';
```

Result:
```text
Append (actual time=0.042..0.055 rows=14 loops=1)
  ->  Index Scan using system_audit_events_2026_07_tenant_id_created_at_idx on system_audit_events_2026_07 (actual time=0.041..0.052 rows=14 loops=1)
        Index Cond: ((tenant_id = '...'::uuid) AND (created_at >= '...'::timestamptz) AND (created_at < '...'::timestamptz))
```
*(Notice: Partitions for 2026_08 and subsequent months are completely excluded with 0 I/O penalty.)*

---

## 2. Zero-Impact Event Streaming with Debezium CDC

Polling the database (`SELECT * FROM table WHERE updated_at > last_sync`) creates indexing debt and locks rows. Change Data Capture reads the PostgreSQL **Write-Ahead Log (WAL)** via logical decoding (`pgoutput`), producing zero query load on the database engine.

### PostgreSQL Logical Replication Configuration

In `postgresql.conf`:
```ini
wal_level = logical
max_replication_slots = 10
max_wal_senders = 10
```

### Debezium Kafka Connector JSON Configuration

```json
{
  "name": "pg-audit-events-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "plugin.name": "pgoutput",
    "database.hostname": "postgres-primary.internal",
    "database.port": "5432",
    "database.user": "debezium_cdc",
    "database.password": "${file:/secrets/db:cdc_pass}",
    "database.dbname": "production_core",
    "database.server.name": "prod_db",
    "table.include.list": "public.system_audit_events.*",
    "publication.autocreate.mode": "filtered",
    "tombstones.on.delete": "true",
    "decimal.handling.mode": "double"
  }
}
```

---

## 3. Automated Partition Maintenance Routine

Instead of manual DDL scripts, execute an automated rolling partition maintenance function running on a weekly cron:

```sql
CREATE OR REPLACE PROCEDURE create_next_month_partition()
LANGUAGE plpgsql AS $$
DECLARE
  next_month_start TIMESTAMPTZ := date_trunc('month', NOW() + INTERVAL '1 month');
  next_month_end   TIMESTAMPTZ := date_trunc('month', NOW() + INTERVAL '2 month');
  partition_name   TEXT := 'system_audit_events_' || to_char(next_month_start, 'YYYY_MM');
BEGIN
  EXECUTE format(
    'CREATE TABLE IF NOT EXISTS %I PARTITION OF system_audit_events FOR VALUES FROM (%L) TO (%L);',
    partition_name, next_month_start, next_month_end
  );
END;
$$;
```

---

## Architectural Summary

- **Declarative Partitioning**: Dramatically reduces index working-set size to fit in RAM and allows instant data purging via `DROP TABLE partition_name` instead of expensive row deletes.
- **Debezium CDC**: Emits event streams directly from PostgreSQL WAL logs into Kafka topics with sub-10ms latency and guaranteed ordering without polling queries.
