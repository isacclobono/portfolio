---
title: "Architecting Concurrency-Safe Booking Systems"
description: "Preventing double-booking race conditions using distributed locks and database transactions."
date: 2024-08-20
tags: ["PostgreSQL", "Redis", "Concurrency", "Backend"]
---

In high-traffic scheduling and reservation platforms, multiple users frequently attempt to book the same slot at the exact same millisecond. Without strict concurrency controls, race conditions lead to catastrophic double bookings.

## Distributed Locking with Redlock

Before committing a reservation to PostgreSQL, acquire an atomic distributed lock in Redis for the specific slot ID and provider ID.

```typescript
import Redlock from "redlock";
import { redis } from "../config/redis";

const redlock = new Redlock([redis], {
  retryCount: 3,
  retryDelay: 200,
  retryJitter: 50
});

export async function bookSlotSafe(slotId: string, userId: string) {
  const lockKey = `locks:slot:${slotId}`;
  const lock = await redlock.acquire([lockKey], 5000); // 5s lock TTL

  try {
    return await db.transaction(async (trx) => {
      const slot = await trx("slots").where({ id: slotId, status: "AVAILABLE" }).first();
      if (!slot) throw new Error("Slot already booked");

      await trx("slots").where({ id: slotId }).update({ status: "BOOKED", userId });
      return { success: true, slotId };
    });
  } finally {
    await lock.release();
  }
}
```

## Isolation Levels & Trade-Offs

| Isolation Level | Dirty Reads | Non-Repeatable Reads | Phantom Reads |
| :--- | :--- | :--- | :--- |
| Read Committed | Prevented | Allowed | Allowed |
| Repeatable Read | Prevented | Prevented | Allowed |
| Serializable | Prevented | Prevented | Prevented |

## Summary

- Combine distributed mutex locks with database transaction isolation.
- Use optimistic locking with version columns for low-contention scenarios.
- Always include automated expiration TTLs on locks to prevent deadlocks on worker crashes.
