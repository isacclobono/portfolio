---
title: "The Transactional Outbox Pattern: Dual-Write Guarantees in Microservices"
description: "Eliminating dual-write data inconsistencies between SQL databases and message brokers."
date: 2023-10-25
tags: ["Architecture", "PostgreSQL", "Kafka", "Distributed Systems"]
---

When a service saves an entity to a database and simultaneously emits an event to a message broker, a network failure or process crash between those two operations causes permanent data drift (the **Dual-Write Problem**). The Transactional Outbox Pattern solves this with database-level ACID atomicity.

## The Architecture Pattern

1. Within a single database transaction, write both the domain entity and an event record into an `outbox` table.
2. A background polling worker (or CDC stream like Debezium) reads unpublished outbox rows, emits them to the message broker, and marks them as `PUBLISHED`.

```typescript
import { db } from "../config/database";

export async function createOrderWithOutbox(orderData: any) {
  return await db.transaction(async (trx) => {
    // 1. Insert primary business domain entity
    const [order] = await trx("orders").insert(orderData).returning("*");

    // 2. Atomically insert outbox event in the SAME transaction
    await trx("outbox_events").insert({
      aggregate_type: "ORDER",
      aggregate_id: order.id,
      event_type: "ORDER_CREATED",
      payload: JSON.stringify(order),
      status: "PENDING"
    });

    return order;
  });
}
```

## Outbox Relay Worker Implementation

```typescript
import { db } from "../config/database";
import { eventBus } from "../config/eventBus";

export async function pollAndRelayOutbox() {
  const pendingEvents = await db("outbox_events")
    .where({ status: "PENDING" })
    .orderBy("created_at", "asc")
    .limit(100)
    .forUpdate()
    .skipLocked(); // Prevents lock contention across parallel relay workers

  for (const event of pendingEvents) {
    try {
      await eventBus.publish(event.event_type, JSON.parse(event.payload));
      await db("outbox_events")
        .where({ id: event.id })
        .update({ status: "PUBLISHED", published_at: new Date() });
    } catch (err) {
      console.error(`Failed to publish event ${event.id}`, err);
    }
  }
}
```

## Outbox vs. Direct Publishing

| Dimension | Direct Publishing | Transactional Outbox |
| :--- | :--- | :--- |
| **Atomicity** | ❌ None (Dual-write risk) | ✅ 100% Guaranteed via DB Transaction |
| **Crash Resilience** | ❌ Lost messages on broker outage | ✅ Events safely persisted in DB until broker recovers |
| **Ordering Guarantees** | ⚠️ Can emit out of order on retries | ✅ Strictly ordered by DB timestamp & sequence |

## Summary

- Use `FOR UPDATE SKIP LOCKED` on PostgreSQL to scale outbox relay workers horizontally without race conditions.
- Implement downstream idempotent consumers to handle at-least-once delivery semantics safely.
