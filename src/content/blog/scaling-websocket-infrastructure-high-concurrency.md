---
title: "Scaling WebSocket Infrastructure to 100k Concurrent Connections"
description: "Kernel network tuning, Redis Pub/Sub adapter clustering, and heartbeat management."
date: 2024-02-14
tags: ["WebSockets", "Node.js", "Redis", "Real-Time"]
---

Maintaining hundreds of thousands of concurrent open WebSocket connections requires careful tuning of Linux kernel file descriptor limits, TCP buffer allocations, and distributed Pub/Sub fanout clustering.

## Redis Streams / Pub-Sub Adapter Architecture

When scaling WebSocket servers across multiple container nodes, a message sent to Node A must reach a subscriber connected to Node B. A distributed Pub/Sub broker handles cross-node broadcasting.

```typescript
import { WebSocketServer, WebSocket } from "ws";
import { createClient } from "redis";

const wss = new WebSocketServer({ port: 8080 });
const subClient = createClient({ url: process.env.REDIS_URL });
const pubClient = subClient.duplicate();

await subClient.connect();
await pubClient.connect();

const userSockets = new Map<string, WebSocket>();

wss.on("connection", (ws, req) => {
  const userId = req.headers["x-user-id"] as string;
  if (!userId) return ws.close(4001, "Unauthorized");

  userSockets.set(userId, ws);

  ws.on("close", () => {
    userSockets.delete(userId);
  });
});

// Subscribe to global message fanout channel
await subClient.subscribe("global:chat:events", (messageStr) => {
  const { recipientId, payload } = JSON.parse(messageStr);
  const targetSocket = userSockets.get(recipientId);

  if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
    targetSocket.send(JSON.stringify(payload));
  }
});
```

## Linux Kernel Network Tuning (`/etc/sysctl.conf`)

Default Linux kernel settings throttle TCP connection density. Apply these production optimizations:

```ini
# Increase maximum open file descriptors
fs.file-max = 2097152

# Increase system socket buffer sizes
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216

# Increase TCP connection backlog queue
net.core.somaxconn = 65535

# Fast recycle of TIME_WAIT sockets
net.ipv4.tcp_tw_reuse = 1
```

## Connection Health & Ping/Pong Heartbeats

```typescript
setInterval(() => {
  wss.clients.forEach((ws: any) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);
```

## Summary

- Set `ulimit -n 65535` in container entrypoints to prevent `EMFILE: too many open files`.
- Run active ping/pong heartbeats to cleanly reap dead mobile connections and free up server memory.
