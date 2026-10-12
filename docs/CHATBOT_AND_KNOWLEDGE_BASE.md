# 🤖 SK Agent AI Chatbot & Knowledge Base Guide

This guide explains the architecture of the **SK Agent** conversational assistant, how to update the underlying knowledge base, how the dual-engine fallback operates, and how to customize the chat UI.

---

## 🏗️ Architecture Overview

The **SK Agent** AI assistant combines high-performance streaming LLM generation with a deterministic local knowledge engine and persistent client-side storage:

```
                  ┌─────────────────────────────────────┐
                  │          Visitor Query              │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │    Is GROQ_API_KEY set on server?   │
                  └──────────┬───────────────┬──────────┘
                             │               │
                        YES  │               │ NO / Offline
                             ▼               ▼
            ┌────────────────────────┐  ┌────────────────────────┐
            │  Live Groq LPU LLM     │  │  Deterministic Engine  │
            │  (openai/gpt-oss-120b) │  │  (Instant Semantic    │
            │  Word-by-word Stream   │  │   Keyword Matching)    │
            └────────────┬───────────┘  └────────────┬───────────┘
                         │                           │
                         └─────────────┬─────────────┘
                                       │
                                       ▼
                  ┌─────────────────────────────────────┐
                  │    Clean Markdown Formatter         │
                  │    (Links, Bold, Code, Lists)       │
                  └────────────────────┬────────────────┘
                                       │
                                       ▼
                  ┌─────────────────────────────────────┐
                  │    IndexedDB Storage & WhatsApp UI  │
                  │    (SK_Portfolio_ChatDB)            │
                  └─────────────────────────────────────┘
```

---

## 📚 1. Updating Sunil's Knowledge Base

All resume facts, project summaries, tech stack details, career history, education, and contact links reside in a single centralized file:

👉 **[`src/data/chatbotKnowledge.ts`](file:///d:/DEVELOPMENT/sunil_khobragade_portfolio/src/data/chatbotKnowledge.ts)**

### What is stored inside:
1. **`SUNIL_KNOWLEDGE_BASE`**: Structured JSON object holding profile details, contact phone (`+91 74989 50562`), email (`x.kksunil@gmail.com`), links, work history at *Intencode India*, *Freelance*, and *IBM India*, education, and tools.
2. **`CHATBOT_SYSTEM_PROMPT`**: The foundational prompt injected into the LLM context.

### How to Add New Skills or Projects:
Open `src/data/chatbotKnowledge.ts` and add your updates under the appropriate section:

```typescript
### Selected Projects:
- **My New Project**: Description of project and link (/projects/my-new-project).
```

Once saved, both the **Groq LLM engine** and the **Offline Semantic Engine** immediately inherit the updated data!

---

## 🎛️ 2. Chatbot UI Customization & Features

The chatbot component is located in [`src/components/Chatbot.astro`](file:///d:/DEVELOPMENT/sunil_khobragade_portfolio/src/components/Chatbot.astro).

### Key Features Implemented:
* **WhatsApp Left/Right Bubbles**:
  * **User (Right)**: Right-aligned bubble with delivery checkmarks and local time (`2:22 AM ✓✓`).
  * **SK Agent (Left)**: Left-aligned bubble with local delivery time.
* **Compact 12.5px Typography**: Tight, modern chat app layout with `1.45` line-height.
* **Developer Copilot**: Capable of writing code snippets, explaining system architectures, and solving technical problems.
* **Window Resizing**:
  * Click the **Expand (`⤢`)** button in the header for a large 640×700px workstation view.
  * Drag the **top-left corner handle** to resize dynamically.
  * Resized dimensions are remembered across visits in `localStorage` (`sk_chat_w`, `sk_chat_h`).
* **IndexedDB Local Storage (`SK_Portfolio_ChatDB`)**:
  * Conversations are automatically saved in the browser's IndexedDB.
  * Navigating between pages or refreshing restores previous message history.
  * Clicking **"Clear Conversation"** wipes the database cleanly.
* **System Dark/Light Theme Synchronization**:
  * Dynamically reacts to `@media (prefers-color-scheme: dark)` and live OS theme changes.
