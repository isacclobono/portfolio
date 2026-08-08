export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  year: string;
  date: string;
  readTime: string;
  tags: string[];
  content: {
    intro: string;
    sections: {
      heading?: string;
      text?: string;
      code?: {
        lang: string;
        filename?: string;
        code: string;
      };
      table?: {
        headers: string[];
        rows: string[][];
      };
      bullets?: string[];
    }[];
  };
}

export const BLOGS: BlogPost[] = [
  {
    slug: "building-high-throughput-microservices-with-nodejs-and-redis",
    title: "Building High-Throughput Microservices with Node.js & Redis",
    summary: "How to design resilient Node.js services with Redis caching, pub/sub queues, and connection pooling.",
    year: "2025",
    date: "Jan 15, 2025",
    readTime: "3 min read",
    tags: ["Node.js", "Redis", "Microservices", "System Design"],
    content: {
      intro: "When scaling backend systems handling tens of thousands of requests per second, standard monolithic database queries quickly turn into severe bottlenecks. Here is an architectural blueprint using Node.js, Fastify, and Redis caching.",
      sections: [
        {
          heading: "Core Architecture Principles",
          text: "To ensure single-digit millisecond responses, we place Redis in front of the persistence layer using a Cache-Aside pattern combined with strict TTL invalidation strategies.",
          code: {
            lang: "typescript",
            filename: "src/services/cache.service.ts",
            code: `import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});

export async function getOrSetCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 300
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const freshData = await fetcher();
  await redis.setex(key, ttlSeconds, JSON.stringify(freshData));
  return freshData;
}`
          }
        },
        {
          heading: "Performance Comparison",
          table: {
            headers: ["Strategy", "P95 Latency", "Throughput (RPS)", "DB Load"],
            rows: [
              ["Direct DB Query", "180ms", "450 RPS", "92% CPU"],
              ["Redis Cache-Aside", "8ms", "14,200 RPS", "12% CPU"],
              ["Redis + Pipeline", "3ms", "28,500 RPS", "6% CPU"]
            ]
          }
        },
        {
          heading: "Key Takeaways",
          bullets: [
            "Always use connection pooling and keep-alive for HTTP/TCP sockets.",
            "Use Redis pipelines when executing batch reads or writes to eliminate round-trip network overhead.",
            "Set appropriate jitter on cache expiration timestamps to avoid the cache stampede problem."
          ]
        }
      ]
    }
  },
  {
    slug: "architecting-concurrency-safe-booking-systems",
    title: "Architecting Concurrency-Safe Booking Systems",
    summary: "Preventing double-booking race conditions using distributed locks and database transactions.",
    year: "2024",
    date: "Aug 20, 2024",
    readTime: "3 min read",
    tags: ["PostgreSQL", "Redis", "Concurrency", "Backend"],
    content: {
      intro: "In high-traffic scheduling and reservation platforms, multiple users frequently attempt to book the same slot at the exact same millisecond. Without strict concurrency controls, race conditions lead to catastrophic double bookings.",
      sections: [
        {
          heading: "Distributed Locking with Redlock",
          text: "Before committing a reservation to PostgreSQL, acquire an atomic distributed lock in Redis for the specific slot ID and provider ID.",
          code: {
            lang: "typescript",
            filename: "src/booking/lock.ts",
            code: `import Redlock from "redlock";
import { redis } from "../config/redis";

const redlock = new Redlock([redis], {
  retryCount: 3,
  retryDelay: 200,
  retryJitter: 50
});

export async function bookSlotSafe(slotId: string, userId: string) {
  const lockKey = \`locks:slot:\${slotId}\`;
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
}`
          }
        },
        {
          heading: "Isolation Levels & Trade-Offs",
          table: {
            headers: ["Isolation Level", "Dirty Reads", "Non-Repeatable Reads", "Phantom Reads"],
            rows: [
              ["Read Committed", "Prevented", "Allowed", "Allowed"],
              ["Repeatable Read", "Prevented", "Prevented", "Allowed"],
              ["Serializable", "Prevented", "Prevented", "Prevented"]
            ]
          }
        },
        {
          heading: "Summary",
          bullets: [
            "Combine distributed mutex locks with database transaction isolation.",
            "Use optimistic locking with version columns for low-contention scenarios.",
            "Always include automated expiration TTLs on locks to prevent deadlocks on worker crashes."
          ]
        }
      ]
    }
  },
  {
    slug: "zero-downtime-deployments-with-docker-and-github-actions",
    title: "Zero-Downtime CI/CD with Docker & GitHub Actions",
    summary: "Automating builds, security scanning, container packaging, and blue-green rollouts.",
    year: "2024",
    date: "Mar 10, 2024",
    readTime: "2 min read",
    tags: ["Docker", "CI/CD", "DevOps", "GitHub Actions"],
    content: {
      intro: "Manual deployments are slow, error-prone, and introduce unexpected downtime. A robust CI/CD pipeline ensures every commit is automatically tested, containerized, and deployed with zero user interruption.",
      sections: [
        {
          heading: "GitHub Actions Workflow Configuration",
          text: "Here is the production-tested workflow for multi-stage Docker builds and rolling container reloads behind Nginx reverse proxy.",
          code: {
            lang: "yaml",
            filename: ".github/workflows/deploy.yml",
            code: `name: Production Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build & Push Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: registry.digitalocean.com/app:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max`
          }
        },
        {
          heading: "Key Pipeline Steps",
          bullets: [
            "Automated linting and test execution before container builds.",
            "Multi-stage Docker builds to reduce image size from 800MB to under 90MB.",
            "Health check verification before routing production traffic."
          ]
        }
      ]
    }
  },
  {
    slug: "integrating-multi-gateway-payments-clean-architecture",
    title: "Integrating Multi-Gateway Payments (Stripe, Razorpay & PhonePe)",
    summary: "Designing a unified payment interface with webhook idempotency and automated reconciliation.",
    year: "2023",
    date: "Nov 12, 2023",
    readTime: "4 min read",
    tags: ["Stripe", "Razorpay", "Payments", "Architecture"],
    content: {
      intro: "Supporting international and local payment gateways requires an abstraction layer that standardizes order creation, webhook handling, and refund workflows across disparate provider APIs.",
      sections: [
        {
          heading: "The Payment Provider Interface",
          text: "By defining a polymorphic payment gateway interface, switching or adding new gateways (like PhonePe or Razorpay) requires zero changes to core business logic.",
          code: {
            lang: "typescript",
            filename: "src/payments/gateway.interface.ts",
            code: `export interface PaymentGateway {
  createOrder(amount: number, currency: string, receiptId: string): Promise<{ orderId: string; gatewayData: any }>;
  verifyWebhook(payload: any, signature: string): boolean;
  processRefund(paymentId: string, amount: number): Promise<boolean>;
}`
          }
        },
        {
          heading: "Webhook Idempotency",
          bullets: [
            "Store webhook event IDs in Redis or PostgreSQL with unique constraints.",
            "Always verify cryptographic signatures before parsing payload data.",
            "Respond with HTTP 200 immediately after queueing the processing event to avoid gateway timeout retries."
          ]
        }
      ]
    }
  }
];
