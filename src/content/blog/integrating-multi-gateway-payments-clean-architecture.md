---
title: "Integrating Multi-Gateway Payments with Clean Architecture"
description: "A pattern-driven approach to unifying Stripe, Razorpay, and PayPal with domain-driven design."
date: 2022-11-10
tags: ["Architecture", "TypeScript", "Payments", "Design Patterns"]
---

Building a payment integration that tightly couples your business logic to a single vendor SDK makes future migration or regional multi-gateway routing painful. Clean Architecture isolates vendor SDK nuances behind unified domain ports and adapters.

## The Strategy Pattern for Payment Gateways

Define a vendor-agnostic interface that accepts standardized domain value objects:

```typescript
export interface PaymentIntent {
  orderId: string;
  amountCents: number;
  currency: "USD" | "EUR" | "INR";
  customerEmail: string;
  metadata?: Record<string, string>;
}

export interface PaymentGatewayPort {
  createCharge(intent: PaymentIntent): Promise<{ transactionId: string; status: "SUCCESS" | "REQUIRES_ACTION" }>;
  refund(transactionId: string, amountCents?: number): Promise<{ refundId: string; status: "COMPLETED" }>;
  verifyWebhookSignature(rawBody: string, signatureHeader: string): boolean;
}
```

## Concrete Stripe Adapter Implementation

```typescript
import Stripe from "stripe";
import type { PaymentGatewayPort, PaymentIntent } from "./types";

export class StripeGatewayAdapter implements PaymentGatewayPort {
  private client: Stripe;

  constructor(apiKey: string) {
    this.client = new Stripe(apiKey, { apiVersion: "2023-10-16" });
  }

  async createCharge(intent: PaymentIntent) {
    const charge = await this.client.paymentIntents.create({
      amount: intent.amountCents,
      currency: intent.currency.toLowerCase(),
      receipt_email: intent.customerEmail,
      metadata: { orderId: intent.orderId, ...intent.metadata }
    });

    return {
      transactionId: charge.id,
      status: charge.status === "succeeded" ? "SUCCESS" : "REQUIRES_ACTION"
    };
  }

  async refund(transactionId: string, amountCents?: number) {
    const refund = await this.client.refunds.create({
      payment_intent: transactionId,
      amount: amountCents
    });
    return { refundId: refund.id, status: "COMPLETED" };
  }

  verifyWebhookSignature(rawBody: string, signature: string): boolean {
    try {
      this.client.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
      return true;
    } catch {
      return false;
    }
  }
}
```

## Key Architectural Benefits

1. **Testability**: Unit tests mock `PaymentGatewayPort` in memory without invoking external APIs.
2. **Dynamic Gateway Routing**: Switch payment providers based on currency, geography, or fee structure without changing checkout services.
3. **Webhook Idempotency**: Process webhook notifications through a unified idempotent ledger table.
