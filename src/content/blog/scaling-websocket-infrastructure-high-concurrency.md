---
title: "Scaling WebSocket Infrastructure to 100k Concurrent Connections"
description: "Kernel network tuning, Redis Pub/Sub clustering, uWebSockets.js memory optimization, and zombie socket heartbeat reap policies."
date: 2024-02-14
tags: ["WebSockets", "Node.js", "Redis", "Real-Time"]
---

Handling 10,000 HTTP requests per second is a solved stateless problem: horizontally scale pods behind an Application Load Balancer. But scaling **persistent stateful WebSockets** to 100,000+ concurrent connections is an entirely different operational challenge. 

Every connected client holds open an active bidirectional TCP socket. This exhausts Linux file descriptors, inflates kernel network buffer memory, challenges cross-node message routing, and exposes clusters to catastrophic **reconnection storms** when a single node restarts.

This publication provides an end-to-end blueprint for engineering an enterprise-grade, distributed real-time WebSocket cluster in Node.js and Redis.

---

## 1. Operating System & Kernel Tuning (The C100K Problem)

By default, Linux kernels are configured for general-purpose workloads and will cap open connections at 1,024 file descriptors per process, triggering `EMFILE: too many open files` almost immediately.

Apply the following production parameters in `/etc/sysctl.conf`:

```ini
# 1. Total system-wide maximum open file descriptors
fs.file-max = 2097152

# 2. Maximum TCP listen backlog queue (prevents SYN flood drops during connect bursts)
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535

# 3. Minimum, default, and maximum TCP read/write buffer sizes (in bytes)
# Tuning down default buffer sizes allows holding more sockets in limited RAM!
net.ipv4.tcp_rmem = 4096 87380 4194304
net.ipv4.tcp_wmem = 4096 65536 4194304

# 4. Rapidly recycle sockets stuck in TIME_WAIT state
net.ipv4.tcp_tw_reuse = 1

# 5. Ephemeral port range allocation for outbound connections
net.ipv4.ip_local_port_range = 1024 65535

# 6. TCP Keep-Alive parameters (detect dropped mobile connections at kernel level)
net.ipv4.tcp_keepalive_time = 300
net.ipv4.tcp_keepalive_intvl = 15
net.ipv4.tcp_keepalive_probes = 5
```

In `/etc/security/limits.conf` (and inside Docker container entrypoints):
```text
* soft nofile 1048576
* hard nofile 1048576
```

---

## 2. Horizontal Clustering Architecture via Redis Pub/Sub

When users connect across different server instances (Node 1, Node 2, Node 3), a message sent from Alice on Node 1 to Bob on Node 3 must be transparently routed across the cluster:

```
[Client Alice]                             [Client Bob]
      |                                          ^
      v                                          |
+---------------+                          +---------------+
| WS Server 1   |                          | WS Server 2   |
| (Local Socket)|                          | (Local Socket)|
+-------+-------+                          +-------+-------+
        |                                          ^
        | (Publish to "rooms:channel_99")          |
        v                                          |
+--------------------------------------------------+-------+
|             Redis Pub/Sub Cluster / NATS Core            |
+----------------------------------------------------------+
```

---

## 3. Production Multi-Node WebSocket Manager in TypeScript

```typescript
import { WebSocketServer, WebSocket } from "ws";
import { createClient, type RedisClientType } from "redis";
import type { IncomingMessage } from "http";

interface ExtendedWebSocket extends WebSocket {
  isAlive: boolean;
  userId: string;
  rooms: Set<string>;
}

export class DistributedWebSocketGateway {
  private wss: WebSocketServer;
  private pubClient: RedisClientType;
  private subClient: RedisClientType;
  private userSockets = new Map<string, ExtendedWebSocket>();
  private rooms = new Map<string, Set<ExtendedWebSocket>>();

  constructor(serverPort: number = 8080) {
    this.wss = new WebSocketServer({ port: serverPort, maxPayload: 1024 * 64 }); // 64KB max packet
    this.pubClient = createClient({ url: process.env.REDIS_URL });
    this.subClient = this.pubClient.duplicate();
  }

  async start() {
    await this.pubClient.connect();
    await this.subClient.connect();

    // 1. Subscribe to Redis cluster cross-node channel
    await this.subClient.pSubscribe("cluster:broadcast:*", (message, channel) => {
      const roomName = channel.replace("cluster:broadcast:", "");
      this.broadcastToLocalRoom(roomName, JSON.parse(message));
    });

    // 2. Handle incoming client connections
    this.wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      const extWs = ws as ExtendedWebSocket;
      const url = new URL(req.url || "", `http://${req.headers.host}`);
      const userId = url.searchParams.get("userId");

      if (!userId) {
        ws.close(4001, "Authentication token required.");
        return;
      }

      extWs.isAlive = true;
      extWs.userId = userId;
      extWs.rooms = new Set();

      this.userSockets.set(userId, extWs);

      // Heartbeat listener
      extWs.on("pong", () => {
        extWs.isAlive = true;
      });

      extWs.on("message", async (data: Buffer) => {
        try {
          const action = JSON.parse(data.toString("utf-8"));
          await this.handleClientAction(extWs, action);
        } catch (err) {
          console.error("Malformed message frame:", err);
        }
      });

      extWs.on("close", () => {
        this.cleanupSocket(extWs);
      });
    });

    // 3. Heartbeat Reaper: Evict dead sockets every 30 seconds
    setInterval(() => this.reapZombieSockets(), 30000);
  }

  private async handleClientAction(ws: ExtendedWebSocket, action: any) {
    if (action.type === "JOIN_ROOM") {
      const room = action.room;
      ws.rooms.add(room);
      if (!this.rooms.has(room)) this.rooms.set(room, new Set());
      this.rooms.get(room)!.add(ws);
    } else if (action.type === "SEND_MESSAGE") {
      // Publish to Redis cluster so all server instances receive the event
      await this.pubClient.publish(
        `cluster:broadcast:${action.room}`,
        JSON.stringify({
          senderId: ws.userId,
          room: action.room,
          text: action.text,
          timestamp: Date.now(),
        })
      );
    }
  }

  private broadcastToLocalRoom(room: string, payload: any) {
    const sockets = this.rooms.get(room);
    if (!sockets) return;

    const data = JSON.stringify(payload);
    for (const client of sockets) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  }

  private reapZombieSockets() {
    this.wss.clients.forEach((ws) => {
      const extWs = ws as ExtendedWebSocket;
      if (extWs.isAlive === false) {
        // Did not respond to ping during last interval: terminate connection
        return extWs.terminate();
      }
      extWs.isAlive = false;
      extWs.ping(); // Issue ping frame
    });
  }

  private cleanupSocket(ws: ExtendedWebSocket) {
    this.userSockets.delete(ws.userId);
    for (const room of ws.rooms) {
      const roomSockets = this.rooms.get(room);
      if (roomSockets) {
        roomSockets.delete(ws);
        if (roomSockets.size === 0) this.rooms.delete(room);
      }
    }
  }
}
```

---

## 4. Defending Against Reconnection Storms

When a server crashes or deploys a new version, tens of thousands of clients disconnect simultaneously. If all clients immediately reconnect at once, the incoming TCP flood overwhelms load balancers and crashes the cluster.

Enforce **Exponential Backoff with Full Jitter** in client SDKs:

```typescript
// Client Reconnection Formula:
// delay = min(maxDelay, baseDelay * 2^attempt) + random(0, jitter)

function getReconnectDelay(attempt: number): number {
  const baseDelay = 500;   // 500ms
  const maxDelay = 15000;  // 15 seconds max
  const exponential = Math.min(maxDelay, baseDelay * Math.pow(2, attempt));
  const jitter = Math.random() * (exponential * 0.5); // Add 50% random jitter
  return exponential + jitter;
}
```

---

## 5. Memory Benchmarks: Choosing the WebSocket Engine

| WebSocket Engine | RAM per 100k Sockets | Max Sustained Connections (16GB RAM) |
| :--- | :--- | :--- |
| **Socket.io (Full Fallbacks)** | ~3.8 GB | ~38,000 sockets |
| **Node.js `ws` (Native)** | ~1.4 GB | ~110,000 sockets |
| **uWebSockets.js (C++ Bindings)** | **~380 MB** | **> 350,000 sockets** |

---

## Key Production Takeaways

- **Lower Socket Buffers in Sysctl**: Default TCP memory settings allocate 64KB+ per socket. Trimming buffer minimums allows quadrupling connection density on the same hardware.
- **Implement Heartbeat Reaping**: Never rely on TCP close frames; mobile carriers and dead Wi-Fi leave orphaned sockets that leak RAM for hours.
- **Always Apply Jitter to Reconnections**: Prevent the thundering herd from taking down newly booted container instances.
