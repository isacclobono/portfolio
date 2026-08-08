---
title: "Integrating Multi-Gateway Payments (Stripe, Razorpay & PhonePe)"
description: "Designing a unified payment interface with webhook idempotency and automated reconciliation."
date: 2023-11-12
tags: ["Stripe", "Razorpay", "Payments", "Architecture"]
---

Supporting international and local payment gateways requires an abstraction layer that standardizes order creation, webhook handling, and refund workflows across disparate provider APIs.

## The Payment Provider Interface

By defining a polymorphic payment gateway interface, switching or adding new gateways (like PhonePe or Razorpay) requires zero changes to core business logic.

```typescript
export interface PaymentGateway {
  createOrder(amount: number, currency: string, receiptId: string): Promise<{
    orderId: string;
    gatewayData: Record<string, any>;
  }>;
  verifyWebhook(payload: any, signature: string): boolean;
  processRefund(paymentId: string, amount: number): Promise<boolean>;
}
```

## Webhook Idempotency

- Store webhook event IDs in Redis or PostgreSQL with unique constraints.
- Always verify cryptographic signatures before parsing payload data.
- Respond with HTTP 200 immediately after queueing the processing event to avoid gateway timeout retries.
