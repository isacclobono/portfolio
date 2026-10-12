---
title: "Integrating Multi-Gateway Payments with Clean Architecture"
description: "A pattern-driven approach to unifying Stripe, Razorpay, and PhonePe with Ports and Adapters, dynamic gateway routing, and webhook idempotency."
date: 2022-11-10
tags: ["Architecture", "TypeScript", "Payments", "Design Patterns"]
---

In modern fintech and global e-commerce applications, coupling domain checkout logic directly to a single vendor SDK (such as `stripe-node`) is an architectural liability. 

When your business expands internationally, payment preferences diverge: Indian customers require UPI / Razorpay / PhonePe; European buyers prefer SEPA and iDEAL; North American customers expect Apple Pay and credit card rails via Stripe. Furthermore, if a payment gateway experiences an unexpected regional outage, hardcoded integrations freeze revenue immediately.

Applying **Hexagonal Architecture (Ports and Adapters)** decouples core financial domain rules from vendor API idiosyncrasies, enabling seamless multi-gateway switching, automated fallback routing, and unified webhook reconciliation.

---

## 1. Hexagonal Architecture Topology

```
+-------------------------------------------------------------------+
|                        Core Domain Core                           |
|  Order Lifecycle, Invoicing, Ledger Accounting, Fulfillment       |
|                                                                   |
|                      [PaymentGatewayPort]                         |
|                         (Pure Interface)                          |
+---------------------------------+---------------------------------+
                                  | (Implements)
        +-------------------------+-------------------------+
        |                                                   |
        v                                                   v
+-------------------------------+   +-------------------------------+
|     StripeGatewayAdapter      |   |    RazorpayGatewayAdapter     |
| (Stripe SDK + Webhook Parser) |   | (Razorpay SDK + HMAC Parser)  |
+-------------------------------+   +-------------------------------+
```

---

## 2. Defining the Vendor-Agnostic Domain Port

The domain layer defines only what it needs, strictly using domain value objects:

```typescript
export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR";

export interface PaymentIntentPayload {
  orderId: string;
  customerId: string;
  customerEmail: string;
  amountCents: number;
  currency: CurrencyCode;
  metadata?: Record<string, string>;
}

export interface ChargeResult {
  transactionId: string;
  gateway: "STRIPE" | "RAZORPAY" | "PHONEPE";
  status: "SUCCESS" | "REQUIRES_ACTION" | "FAILED";
  clientSecret?: string; // For frontend SDK checkout mounting
  redirectUrl?: string;
}

export interface WebhookEventPayload {
  eventId: string;
  eventType: "PAYMENT_SUCCEEDED" | "PAYMENT_FAILED" | "REFUND_PROCESSED";
  orderId: string;
  transactionId: string;
  amountCents: number;
  rawPayload: Record<string, any>;
}

export interface PaymentGatewayPort {
  readonly gatewayName: "STRIPE" | "RAZORPAY" | "PHONEPE";
  createCharge(intent: PaymentIntentPayload): Promise<ChargeResult>;
  processRefund(transactionId: string, amountCents?: number): Promise<{ refundId: string; status: "COMPLETED" | "PENDING" }>;
  verifyAndParseWebhook(rawBody: string, headers: Record<string, string>): WebhookEventPayload | null;
}
```

---

## 3. Concrete Adapters: Stripe & Razorpay

### A. Stripe Gateway Adapter

```typescript
import Stripe from "stripe";
import type { PaymentGatewayPort, PaymentIntentPayload, ChargeResult, WebhookEventPayload } from "./payment-types";

export class StripeGatewayAdapter implements PaymentGatewayPort {
  readonly gatewayName = "STRIPE" as const;
  private stripe: Stripe;
  private webhookSecret: string;

  constructor(apiKey: string, webhookSecret: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: "2024-06-20" });
    this.webhookSecret = webhookSecret;
  }

  async createCharge(intent: PaymentIntentPayload): Promise<ChargeResult> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: intent.amountCents,
      currency: intent.currency.toLowerCase(),
      receipt_email: intent.customerEmail,
      metadata: { orderId: intent.orderId, ...intent.metadata },
      automatic_payment_methods: { enabled: true },
    });

    return {
      transactionId: paymentIntent.id,
      gateway: this.gatewayName,
      status: paymentIntent.status === "succeeded" ? "SUCCESS" : "REQUIRES_ACTION",
      clientSecret: paymentIntent.client_secret || undefined,
    };
  }

  async processRefund(transactionId: string, amountCents?: number) {
    const refund = await this.stripe.refunds.create({
      payment_intent: transactionId,
      amount: amountCents,
    });
    return {
      refundId: refund.id,
      status: refund.status === "succeeded" ? "COMPLETED" : "PENDING",
    };
  }

  verifyAndParseWebhook(rawBody: string, headers: Record<string, string>): WebhookEventPayload | null {
    const sig = headers["stripe-signature"];
    if (!sig) return null;

    try {
      const event = this.stripe.webhooks.constructEvent(rawBody, sig, this.webhookSecret);
      if (event.type === "payment_intent.succeeded") {
        const pi = event.data.object as Stripe.PaymentIntent;
        return {
          eventId: event.id,
          eventType: "PAYMENT_SUCCEEDED",
          orderId: pi.metadata.orderId,
          transactionId: pi.id,
          amountCents: pi.amount,
          rawPayload: event,
        };
      }
      return null;
    } catch {
      return null;
    }
  }
}
```

---

## 4. Dynamic Gateway Router (Smart Routing)

Route transactions dynamically based on geography, payment method fees, or real-time gateway health:

```typescript
export class PaymentRouterService {
  private adapters: Map<string, PaymentGatewayPort> = new Map();

  registerAdapter(adapter: PaymentGatewayPort) {
    this.adapters.set(adapter.gatewayName, adapter);
  }

  selectGateway(intent: PaymentIntentPayload): PaymentGatewayPort {
    // 1. Regional optimization: Route INR transactions to domestic Indian rails
    if (intent.currency === "INR" && this.adapters.has("RAZORPAY")) {
      return this.adapters.get("RAZORPAY")!;
    }

    // 2. Default international gateway: Stripe
    if (this.adapters.has("STRIPE")) {
      return this.adapters.get("STRIPE")!;
    }

    throw new Error("No operational payment gateway configured for currency: " + intent.currency);
  }
}
```

---

## 5. Webhook Idempotency: Defending Against Duplicate Charges

Payment gateways aggressively retry webhooks until receiving a `200 OK`. If your endpoint processes an order twice, inventory is depleted twice or customers receive duplicate receipt emails.

Store processed webhook event IDs in an atomic PostgreSQL ledger:

```sql
CREATE TABLE webhook_idempotency_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id VARCHAR(128) NOT NULL,
  gateway VARCHAR(32) NOT NULL,
  order_id VARCHAR(128) NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_gateway_event UNIQUE (gateway, event_id)
);
```

```typescript
export async function processWebhookSafely(event: WebhookEventPayload, db: any) {
  return await db.transaction(async (trx: any) => {
    // Atomically claim lock on the webhook event ID
    const insert = await trx.raw(
      `INSERT INTO webhook_idempotency_ledger (event_id, gateway, order_id)
       VALUES (?, ?, ?)
       ON CONFLICT (gateway, event_id) DO NOTHING
       RETURNING id;`,
      [event.eventId, "STRIPE", event.orderId]
    );

    // If duplicate event already processed, exit immediately with 200 OK!
    if (insert.rows.length === 0) {
      return { duplicate: true };
    }

    // Fulfill business order
    await trx("orders")
      .where({ id: event.orderId })
      .update({ status: "PAID", transaction_id: event.transactionId, paid_at: new Date() });

    return { duplicate: false };
  });
}
```

---

## Key Production Takeaways

- **Isolate Vendor Types**: Never expose `Stripe.PaymentIntent` or Razorpay objects to your controllers or database models. Standardize on domain value objects.
- **Enforce Webhook Idempotency**: Webhook deliveries operate under at-least-once semantics; without a unique idempotency constraint, duplicate fulfillment is guaranteed.
- **Unit Test in Memory**: By mocking `PaymentGatewayPort`, checkout business suites test in milliseconds with zero network requests or third-party test keys.
