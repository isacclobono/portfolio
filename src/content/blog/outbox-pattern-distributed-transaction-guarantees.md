---
title: "The Transactional Outbox Pattern: Dual-Write Guarantees in Microservices"
description: "Eliminating dual-write data inconsistencies between SQL databases and message brokers using PostgreSQL ACID transactions and Debezium CDC."
date: 2023-10-25
tags: ["Architecture", "PostgreSQL", "Kafka", "Distributed Systems"]
---

In distributed systems, updating a relational database and publishing an event to a message broker (Kafka, RabbitMQ, or AWS SQS) within the same user operation is known as a **Dual-Write**. 

Because modern cloud databases and message brokers do not participate in a single distributed transaction, dual-writes inevitably fail:

```
[Scenario A: Ghost Event]
1. Publish event to Kafka ---> SUCCESS (Message in broker)
2. Commit DB Transaction  ---> FAILED  (DB Rolls back!)
Result: Downstream services process an order that does not exist in the DB!

[Scenario B: Lost Event]
1. Commit DB Transaction  ---> SUCCESS (Order created in DB)
2. Publish event to Kafka ---> FAILED  (Network blip / Broker timeout)
Result: Customer was charged, but shipping/inventory was never notified!
```

Two-Phase Commit (2PC / XA transactions) is notoriously slow, brittle, and unsupported by modern event brokers. The **Transactional Outbox Pattern** provides guaranteed **at-least-once message delivery** while maintaining local ACID transaction isolation.

---

## 1. Architectural Mechanics of the Transactional Outbox

Instead of writing to the broker directly, the service writes the event into an `outbox` table in the **exact same database transaction** that modifies the domain entity:

```
+-----------------------------------------------------------+
|               Primary Database (PostgreSQL)               |
|                                                           |
|  BEGIN TRANSACTION;                                       |
|  1. INSERT INTO orders (...) VALUES (...);                |
|  2. INSERT INTO outbox_events (aggregate_id, payload...); |
|  COMMIT; (100% Atomic: Both succeed or both roll back)    |
+-----------------------------------------------------------+
                             |
                   Relay Worker Dispatch
             (Option A: Polling Relay Worker)
             (Option B: Log-based Debezium CDC)
                             |
                             v
           +-----------------------------------+
           | Message Broker (Kafka / RabbitMQ) |
           +-----------------------------------+
```

---

## 2. PostgreSQL Outbox Schema & Atomic Domain Mutation

```sql
-- 1. High-Performance Outbox Table Schema
CREATE TABLE outbox_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aggregate_type VARCHAR(64) NOT NULL,
  aggregate_id VARCHAR(128) NOT NULL,
  event_type VARCHAR(128) NOT NULL,
  payload JSONB NOT NULL,
  headers JSONB DEFAULT '{}'::jsonb,
  status VARCHAR(24) NOT NULL DEFAULT 'PENDING',
  retry_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Partial index allows sub-millisecond retrieval of unpublished events
CREATE INDEX idx_outbox_pending
ON outbox_events (created_at ASC)
WHERE status = 'PENDING';
```

### Writing Domain State & Outbox Event Atomically

```typescript
import { pool } from "../config/db";

interface CreateOrderInput {
  customerId: string;
  totalCents: number;
  items: Array<{ sku: string; quantity: number }>;
}

export async function createOrder(input: CreateOrderInput) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN;");

    // Step 1: Insert Domain Entity
    const orderRes = await client.query(
      `INSERT INTO orders (customer_id, total_cents, status) 
       VALUES ($1, $2, 'PENDING') 
       RETURNING id, customer_id, total_cents, status, created_at;`,
      [input.customerId, input.totalCents]
    );
    const order = orderRes.rows[0];

    // Step 2: Insert Outbox Event in the SAME ACID transaction
    const eventPayload = {
      orderId: order.id,
      customerId: order.customer_id,
      totalCents: order.total_cents,
      items: input.items,
      occurredAt: new Date().toISOString(),
    };

    await client.query(
      `INSERT INTO outbox_events (aggregate_type, aggregate_id, event_type, payload)
       VALUES ('ORDER', $1, 'OrderCreated', $2);`,
      [order.id, JSON.stringify(eventPayload)]
    );

    // Step 3: Commit. If DB fails here, zero records are stored.
    await client.query("COMMIT;");
    return order;
  } catch (error) {
    await client.query("ROLLBACK;");
    throw error;
  } finally {
    client.release();
  }
}
```

---

## 3. High-Concurrency Polling Relay with `FOR UPDATE SKIP LOCKED`

To run multiple outbox relay worker instances concurrently without duplicate processing or lock contention, use PostgreSQL's `SKIP LOCKED`:

```typescript
import { pool } from "../config/db";
import { kafkaProducer } from "../config/kafka";

export async function processOutboxBatch(batchSize: number = 50): Promise<number> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN;");

    // Lock up to batchSize pending rows, skipping rows already locked by other worker pods!
    const queryResult = await client.query(
      `SELECT id, aggregate_id, event_type, payload
       FROM outbox_events
       WHERE status = 'PENDING'
       ORDER BY created_at ASC
       LIMIT $1
       FOR UPDATE SKIP LOCKED;`,
      [batchSize]
    );

    const events = queryResult.rows;
    if (events.length === 0) {
      await client.query("ROLLBACK;");
      return 0;
    }

    // Publish batch to Kafka topic
    for (const event of events) {
      await kafkaProducer.send({
        topic: "order-lifecycle-events",
        messages: [
          {
            key: event.aggregate_id, // Guarantees in-order delivery per order
            value: JSON.stringify(event.payload),
            headers: {
              eventType: event.event_type,
              outboxId: event.id,
            }
          }
        ]
      });
    }

    // Mark as PUBLISHED
    const eventIds = events.map((e) => e.id);
    await client.query(
      `UPDATE outbox_events 
       SET status = 'PUBLISHED', published_at = NOW() 
       WHERE id = ANY($1::uuid[]);`,
      [eventIds]
    );

    await client.query("COMMIT;");
    return events.length;
  } catch (error) {
    await client.query("ROLLBACK;");
    console.error("Outbox relay batch failed:", error);
    throw error;
  } finally {
    client.release();
  }
}
```

---

## 4. Log-Based CDC: The Ultra-High Scale Alternative

When throughput exceeds 10,000 writes/second, database polling creates I/O contention. **Debezium** captures outbox events directly from the PostgreSQL Write-Ahead Log (WAL) using logical decoding:

| Feature | Polling Publisher (`SKIP LOCKED`) | Log-Based CDC (Debezium) |
| :--- | :--- | :--- |
| **Throughput Capacity** | ~2,000–5,000 events/sec | **50,000+ events/sec** |
| **Database Overhead** | Modest CPU for periodic SELECTs | **Near-zero (Reads WAL directly)** |
| **End-to-End Latency** | 500ms–2000ms (poll interval) | **< 30ms** |
| **Infrastructure Need** | Standard Node.js background worker | Kafka Connect + Debezium cluster |

---

## 5. Idempotent Consumer Design (Handling At-Least-Once Delivery)

Because outbox relay workers may crash after publishing but before updating the database, downstream consumers **must be idempotent**. Track processed message IDs:

```sql
CREATE TABLE processed_events (
  event_id UUID PRIMARY KEY,
  consumer_name VARCHAR(64) NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

```typescript
export async function handleConsumerMessage(eventId: string, messageBody: any) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN;");

    // Atomically insert processed event marker
    const insertRes = await client.query(
      `INSERT INTO processed_events (event_id, consumer_name) 
       VALUES ($1, 'inventory-service') 
       ON CONFLICT (event_id) DO NOTHING;`,
      [eventId]
    );

    // If duplicate event received, ignore immediately!
    if (insertRes.rowCount === 0) {
      await client.query("COMMIT;");
      return; // Duplicate safely skipped
    }

    // Execute business update
    await updateInventoryStock(messageBody);

    await client.query("COMMIT;");
  } catch (err) {
    await client.query("ROLLBACK;");
    throw err;
  } finally {
    client.release();
  }
}
```

---

## Summary

- **Never dual-write**: Any direct publish to Kafka alongside a database commit will inevitably result in lost or ghost records.
- **Transactional Outbox guarantees atomicity**: Persisting the outbox row in the same transaction guarantees domain consistency.
- **Pair with Idempotent Consumers**: At-least-once delivery requires deduplication on the consumer side.
