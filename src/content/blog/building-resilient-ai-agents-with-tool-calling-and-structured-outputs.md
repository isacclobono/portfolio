---
title: "Building Resilient AI Agents with Function Calling & Structured JSON Schemas"
description: "Designing fail-safe LLM tool orchestration, Pydantic/Zod schema validation, self-correcting error loops, and deterministic execution."
date: 2026-09-15
tags: ["AI", "LLM", "Agent", "TypeScript", "Python"]
---

While simple prompt engineering works for conversational demos, production autonomous agents require deterministic execution guarantees. When an LLM interacts with database transactions, financial microservices, or external APIs, returning unvalidated free-text or malformed JSON produces catastrophic runtime failures.

This architectural guide covers how to design fault-tolerant agent execution loops using native function calling, strict schema enforcement, and self-healing validation retry loops.

---

## 1. The Strict JSON Schema Enforcement Layer

Modern inference engines (such as OpenAI, Groq, and Gemini) support constrained decoding via JSON Schema grammar constraints. By passing strict JSON schema definitions directly into the model's sampling engine, invalid tokens are eliminated at generation time.

```typescript
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// 1. Define strictly typed operational parameters
export const DatabaseQueryToolSchema = z.object({
  queryName: z.enum(["fetch_customer_orders", "check_inventory_levels", "calculate_order_tax"]),
  parameters: z.object({
    customerId: z.string().uuid().optional(),
    skuList: z.array(z.string().min(3)).optional(),
    countryCode: z.string().length(2).default("US"),
  }),
  dryRun: z.boolean().default(false),
  maxRows: z.number().int().min(1).max(100).default(25),
});

export type DatabaseQueryToolParams = z.infer<typeof DatabaseQueryToolSchema>;

// 2. Export strict JSON Schema specification for LLM tool declaration
export const databaseToolDefinition = {
  name: "execute_database_query",
  description: "Executes parameterized read-only analytics queries against PostgreSQL with strict validation.",
  parameters: zodToJsonSchema(DatabaseQueryToolSchema, { target: "openAi" }),
};
```

---

## 2. Self-Healing Agent Loop with Error Reflection

Even with structured output grammars, tool invocation can fail due to domain constraint violations (e.g., entity not found, lock timeout, rate limit). A resilient agent loop feeds the runtime error context directly back into the LLM context window for dynamic reflection and remediation.

```typescript
interface AgentMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
  tool_call_id?: string;
}

export async function executeAgentLoop(
  initialPrompt: string,
  maxIterations: number = 5
): Promise<string> {
  const history: AgentMessage[] = [
    {
      role: "system",
      content: "You are an autonomous operations engineer. Always use provided tools. If a tool call fails, analyze the error message and adjust your parameters accordingly."
    },
    { role: "user", content: initialPrompt }
  ];

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // Invoke LLM with current conversation stack
    const response = await callInferenceEngine(history, [databaseToolDefinition]);

    if (!response.tool_calls || response.tool_calls.length === 0) {
      // Completed terminal answer
      return response.content;
    }

    // Process parallel tool executions
    for (const toolCall of response.tool_calls) {
      try {
        const rawArgs = JSON.parse(toolCall.function.arguments);
        
        // Step 1: Validate payload schema
        const validatedArgs = DatabaseQueryToolSchema.parse(rawArgs);
        
        // Step 2: Execute sandboxed tool handler
        const toolResult = await handleDatabaseTool(validatedArgs);

        history.push({
          role: "tool",
          tool_call_id: toolCall.id,
          name: toolCall.function.name,
          content: JSON.stringify({ status: "success", data: toolResult })
        });
      } catch (err: any) {
        // Step 3: Self-healing error injection
        history.push({
          role: "tool",
          tool_call_id: toolCall.id,
          name: toolCall.function.name,
          content: JSON.stringify({
            status: "error",
            errorType: err.name,
            message: err.message,
            hint: "Check argument formats and verify parameter constraints before retrying."
          })
        });
      }
    }
  }

  throw new Error(`Agent exceeded maximum execution iterations (${maxIterations}).`);
}
```

---

## 3. Sandboxing & Blast Radius Isolation

Never allow an LLM tool to execute raw arbitrary SQL or shell commands. Adhere to the following architectural guardrails:

1. **Pre-Authorized Whitelist Handlers**: Tool parameters must map to pre-compiled parameterized queries or domain service routines.
2. **Read-Only Database Replicas**: Direct query tools must connect exclusively to read replicas with restricted credentials.
3. **Idempotency Keys**: Any state-mutating tool must generate a deterministic idempotency key derived from the message lineage ID to prevent duplicate executions.

---

## Key Takeaways

- **Constrained Decoding**: Use Zod / Pydantic schemas compiled into JSON Schema specifications to eliminate syntax hallucination.
- **Reflection Loops**: Don't terminate on tool failure; provide structured error feedback to let the agent auto-correct.
- **Strict Guardrails**: Enforce bounded iterations, strict timeouts, and read-replica execution environments.
