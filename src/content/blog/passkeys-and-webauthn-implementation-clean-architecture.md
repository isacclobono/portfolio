---
title: "Passwordless Authentication with Passkeys and WebAuthn: Complete Implementation Blueprint"
description: "Architecting biometric, phishing-resistant authentication using FIDO2 WebAuthn ceremony flows, hardware keys, and Node.js."
date: 2026-05-28
tags: ["Security", "WebAuthn", "Node.js", "Authentication", "Web"]
---

Passwords remain the primary vulnerability vector in modern web applications, subject to credential stuffing, database breaches, and social engineering phishing. 

Passkeys—built on the **FIDO2 / WebAuthn** open cryptographic standards—replace shared secrets with asymmetric public-key cryptography. Public keys are stored on the server, while private keys never leave the user's secure hardware enclave (Apple TouchID/FaceID, Windows Hello, Android Biometrics, or YubiKeys).

This guide walks through implementing a complete WebAuthn registration and authentication ceremony flow using Node.js TypeScript and modern browser APIs.

---

## 1. The Asymmetric Cryptographic Ceremony

```
+---------------+           +-------------------+           +-------------------+
| User Device   |           |  Frontend (Client)|           | Backend API / DB  |
+---------------+           +-------------------+           +-------------------+
        |                             |                               |
        |                             |--- 1. POST /auth/register --->|
        |                             |<-- 2. Return Challenge JSON --|
        |                             |                               |
        |<-- 3. navigator.credentials |                               |
        |       .create({ options }) -|                               |
        |                             |                               |
        | (TouchID / FaceID Prompt)   |                               |
        | Generates Keypair in Enclave|                               |
        | Signs Challenge             |                               |
        |                             |                               |
        |--- 4. Attestation Object -->|                               |
        |                             |--- 5. POST /auth/verify ----->|
        |                             |    (Verify Signature & Save)  |
        |                             |<-- 6. Issue Session JWT ------|
```

---

## 2. Server-Side Registration Challenge (Node.js)

Using `@simplewebauthn/server`:

```typescript
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  type VerifiedRegistrationResponse,
} from "@simplewebauthn/server";
import { db } from "../db";

// Step 1: Generate Registration Options for the browser
export async function getPasskeyRegistrationOptions(userId: string, userEmail: string) {
  const existingCredentials = await db.passkeyCredentials.findMany({
    where: { userId }
  });

  const options = await generateRegistrationOptions({
    rpName: "SK Builds Platform",
    rpID: "sunilkhobragade.pages.dev",
    userID: Buffer.from(userId),
    userName: userEmail,
    attestationType: "none",
    excludeCredentials: existingCredentials.map((cred) => ({
      id: Buffer.from(cred.credentialId, "base64url"),
      type: "public-key",
      transports: cred.transports,
    })),
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
  });

  // Store temporary challenge in Redis session with 5-minute TTL
  await redis.setex(`passkey_reg_challenge:${userId}`, 300, options.challenge);

  return options;
}

// Step 2: Verify Cryptographic Proof & Store Public Key
export async function verifyPasskeyRegistration(userId: string, clientResponse: any) {
  const expectedChallenge = await redis.get(`passkey_reg_challenge:${userId}`);
  if (!expectedChallenge) throw new Error("Registration ceremony expired or missing challenge.");

  const verification: VerifiedRegistrationResponse = await verifyRegistrationResponse({
    response: clientResponse,
    expectedChallenge,
    expectedOrigin: "https://sunilkhobragade.pages.dev",
    expectedRPID: "sunilkhobragade.pages.dev",
  });

  if (verification.verified && verification.registrationInfo) {
    const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;

    // Persist verified credential public key into PostgreSQL
    await db.passkeyCredentials.create({
      data: {
        userId,
        credentialId: Buffer.from(credential.id).toString("base64url"),
        publicKey: Buffer.from(credential.publicKey),
        counter: credential.counter,
        deviceType: credentialDeviceType,
        backedUp: credentialBackedUp,
        transports: clientResponse.response.transports || [],
      }
    });

    await redis.del(`passkey_reg_challenge:${userId}`);
    return { success: true };
  }

  throw new Error("Passkey cryptographic verification failed.");
}
```

---

## 3. Client-Side Ceremony Execution (Vanilla JavaScript)

```typescript
import { startRegistration } from "@simplewebauthn/browser";

export async function handleRegisterPasskey(userId: string, email: string) {
  // 1. Fetch challenge from API
  const optionsRes = await fetch(`/api/auth/passkey/register-options?userId=${userId}&email=${email}`);
  const options = await optionsRes.json();

  try {
    // 2. Invoke native hardware authenticator modal (TouchID / FaceID)
    const attestationResponse = await startRegistration({ optionsJSON: options });

    // 3. Send response back to server for cryptographic signature verification
    const verifyRes = await fetch("/api/auth/passkey/register-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, response: attestationResponse }),
    });

    const result = await verifyRes.json();
    if (result.success) {
      alert("Passkey registered successfully! You can now log in biometrically.");
    }
  } catch (error: any) {
    console.error("Passkey registration cancelled or failed:", error.message);
  }
}
```

---

## Security Guarantees of Passkeys

1. **Phishing Resistance**: The browser binds the cryptographic signature directly to the `rpID` (Origin domain). Fake phishing domains cannot forge signatures for `sunilkhobragade.pages.dev`.
2. **Zero Server Credential Leakage**: Because the server holds only public keys, a compromised database exposes zero secrets that an attacker can reuse.
3. **Replay Attack Defense**: Every authentication ceremony uses a one-time cryptographic challenge with strict expiry counters.
