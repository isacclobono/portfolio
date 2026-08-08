---
title: "Real-Time Appointment Booking System"
description: "Concurrency-safe scheduling platform with live slot availability, automated booking workflows, and multi-channel notifications."
date: 2024-02-10
demoUrl: "https://github.com/naman-mahi"
repoUrl: "https://github.com/naman-mahi/appointment-booking-system"
tags: ["Node.js", "Fastify", "React", "PostgreSQL", "Redis", "Twilio"]
metrics:
  - label: "Performance"
    score: 100
  - label: "Accessibility"
    score: 100
  - label: "Best Practices"
    score: 100
  - label: "SEO"
    score: 100
features:
  - "Dynamic provider calendar management with custom buffer times and holidays"
  - "Atomic slot reservations powered by Redis distributed mutex locks"
  - "Instant calendar invitations (Google Calendar, Apple iCal, Outlook)"
  - "Automated WhatsApp, SMS, and Email confirmation and reminder triggers"
  - "Customizable intake forms with validation and file upload support"
  - "Comprehensive audit trail for appointment rescheduling and cancellations"
techStack:
  - category: "Backend"
    technologies: "Node.js (Fastify), TypeScript"
  - category: "Frontend"
    technologies: "React, TailwindCSS, FullCalendar"
  - category: "Database & Locks"
    technologies: "PostgreSQL, Redis (Redlock algorithm)"
  - category: "Notifications"
    technologies: "Twilio API, SendGrid, ICS generator"
  - category: "Deployment"
    technologies: "Docker, Azure App Services, GitHub Actions"
---

A concurrency-safe reservation platform that completely eliminates double bookings during high-traffic registration windows using distributed mutex locking.

```typescript
import Redlock from "redlock";
import { redisClient } from "./redis";

const redlock = new Redlock([redisClient], {
  retryCount: 5,
  retryDelay: 150,
});

export async function reserveTimeSlot(slotId: string, customerId: string) {
  const resourceKey = `locks:slot:${slotId}`;
  const lock = await redlock.acquire([resourceKey], 4000);

  try {
    return await executeSlotBookingTransaction(slotId, customerId);
  } finally {
    await lock.release();
  }
}
```
