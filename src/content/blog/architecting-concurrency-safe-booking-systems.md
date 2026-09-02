---
title: "Architecting Concurrency-Safe Booking Systems with Distributed Mutexes"
description: "Preventing double-booking race conditions in high-throughput reservation engines using Redlock, PostgreSQL isolation, and optimistic locking."
date: 2024-06-20
tags: ["PostgreSQL", "Redis", "Concurrency", "Distributed Systems"]
---

In high-concurrency reservation engines—such as medical appointments, airline seating, or live event ticketing—thousands of concurrent users often attempt to reserve the exact same inventory slot in the same millisecond. Without robust concurrency safeguards, race conditions lead to catastrophic double-booking anomalies, chargebacks, and corrupted business state.

This article details a battle-tested three-tier concurrency architecture designed to process high contention reservation requests safely and predictably.

---

## 1. The Anatomy of a Booking Race Condition

Consider two concurrent HTTP requests ($R_1$ and $R_2$) executing against a naive booking endpoint:

1. **$R_1$ reads slot status**: `SELECT status FROM slots WHERE id = 'slot-101'` $\rightarrow$ Returns `AVAILABLE`.
2. **$R_2$ reads slot status**: `SELECT status FROM slots WHERE id = 'slot-101'` $\rightarrow$ Returns `AVAILABLE`.
3. **$R_1$ processes payment & updates slot**: `UPDATE slots SET status = 'BOOKED', user_id = 'user-A' WHERE id = 'slot-101'`.
4. **$R_2$ overwrites slot**: `UPDATE slots SET status = 'BOOKED', user_id = 'user-B' WHERE id = 'slot-101'`.

Both users receive a success confirmation, yet only one physical seat exists.

---

## 2. Distributed Locking with Redlock (Redis)

To protect slot reservation logic across horizontally scaled microservice instances, acquire a distributed mutex lock in Redis before entering the critical database transaction.

```typescript
import Redlock from "redlock";
import { redisClient } from "../config/redis";
import { db } from "../config/database";

// Configure Redlock with low drift factor and exponential jitter
const redlock = new Redlock([redisClient], {
  driftFactor: 0.01,
  retryCount: 4,
  retryDelay: 150,     // 150ms retry interval
  retryJitter: 40      // 40ms jitter to prevent thundering herds
});

export async function reserveAppointmentSlot(slotId: string, attendeeId: string) {
  const lockResource = `locks:appointment:slot:${slotId}`;
  const lockTTL = 4000; // 4 seconds TTL prevents deadlocks if worker crashes

  let lock;
  try {
    lock = await redlock.acquire([lockResource], lockTTL);
  } catch (err) {
    throw new Error("Slot is currently being processed by another user. Please retry shortly.");
  }

  try {
    // Critical Section: Execute ACID transaction with Row-Level Lock
    return await db.transaction(async (trx) => {
      const slot = await trx("appointment_slots")
        .where({ id: slotId })
        .forUpdate() // Acquires exclusive PostgreSQL row lock
        .first();

      if (!slot) {
        throw new Error("Appointment slot not found.");
      }

      if (slot.status !== "AVAILABLE") {
        throw new Error("Appointment slot has already been reserved.");
      }

      // Atomically transition slot state
      await trx("appointment_slots")
        .where({ id: slotId })
        .update({
          status: "RESERVED",
          attendee_id: attendeeId,
          reserved_at: new Date(),
          version: slot.version + 1
        });

      return {
        success: true,
        slotId,
        attendeeId,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15-minute checkout window
      };
    });
  } finally {
    // Release distributed lock safely
    await lock.release().catch((err) => {
      console.warn("Distributed lock already expired or auto-released:", err);
    });
  }
}
```

---

## 3. Database Isolation Levels & Anomaly Protection

PostgreSQL offers three transaction isolation levels. Choosing the correct level is vital to balancing transaction throughput against serialization anomalies.

| Isolation Level | Dirty Reads | Non-Repeatable Reads | Phantom Reads | Serialization Failure Rate |
| :--- | :--- | :--- | :--- | :--- |
| **Read Committed** (Default) | Prevented | Allowed | Allowed | Low (0%) |
| **Repeatable Read** | Prevented | Prevented | Prevented (in PG) | Medium (~3-8% under contention) |
| **Serializable** | Prevented | Prevented | Prevented | High (Requires retry loop) |

For reservation engines, pairing **Read Committed** with explicit `SELECT ... FOR UPDATE` row locks provides strict serialized isolation on the hot row without incurring the high retry overhead of global `SERIALIZABLE` mode.

---

## 4. Optimistic vs. Pessimistic Concurrency

```sql
-- Optimistic Locking Pattern (Version Column Check)
UPDATE appointment_slots
SET status = 'BOOKED',
    attendee_id = 'user-123',
    version = version + 1
WHERE id = 'slot-101'
  AND status = 'AVAILABLE'
  AND version = 3; -- Fails cleanly (0 rows updated) if another worker committed first
```

* **Use Optimistic Locking** when contention probability is $< 5\%$ (e.g., general inventory updates).
* **Use Pessimistic Locking + Redlock** when contention is high (e.g., flash sales or popular consultation calendar releases).

---

## Key Architectural Principles

1. **Defense in Depth**: Combine edge rate limiting, distributed Redis mutexes, and database row-level locking.
2. **Explicit Lock TTLs**: Never acquire an unbounded distributed lock without an automated expiry TTL.
3. **Idempotency Keys**: Accept client-provided `Idempotency-Key` headers on booking requests to eliminate duplicate charges on network retries.
