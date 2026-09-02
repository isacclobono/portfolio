# 🔑 API Keys & Integrations Guide

This document provides instructions on environment variables, secrets, and third-party service tokens used across Sunil Khobragade's portfolio.

---

## 📋 Summary of Environment Variables

All environment variables must be placed in `.env` for local development, and in your hosting provider's dashboard (Cloudflare Pages, Vercel, or Netlify) for production deployments:

| Variable Name | Required? | Purpose | Where to Get |
|---|---|---|---|
| `GROQ_API_KEY` | Optional | Powers real-time AI chatbot responses via secure backend `/api/chat` route | [Groq Console](https://console.groq.com/keys) |
| `GROQ_MODEL` | Optional | Active conversational LLM (`openai/gpt-oss-120b`, `qwen/qwen3.8-27b`, `llama-3.3-70b-versatile`) | [Groq Docs](https://console.groq.com/docs/models) |
| `SITE_URL` | **Required in Prod** | Production base URL for sitemap, canonical links, OpenGraph, and RSS | Your domain (`https://sunilkhobragade.pages.dev`) |

---

## 1. ⚡ Groq Cloud LPU API (AI Chatbot)

The **SK Agent** chatbot communicates via a private backend server route (`/api/chat`). **Your Groq API key is NEVER exposed to the frontend DOM, client bundle, or browser headers.**

### How to Get Your Free Groq API Key:
1. Visit **[https://console.groq.com/keys](https://console.groq.com/keys)** and create a free account or sign in with GitHub/Google.
2. Navigate to **API Keys** in the left sidebar.
3. Click **Create API Key**.
4. Give it a name (e.g., `SK-Portfolio-Chatbot`).
5. Copy the generated key starting with `gsk_...`.
6. Add it to your `.env` file without any `PUBLIC_` prefix:
   ```ini
   GROQ_API_KEY=gsk_your_actual_key_here
   GROQ_MODEL=openai/gpt-oss-120b
   ```

### Recommended Conversational Models:
* `openai/gpt-oss-120b` (Flagship 120B model on your Groq endpoint)
* `qwen/qwen3.8-27b` (High-speed multi-lingual reasoning model)
* `llama-3.3-70b-versatile` (State-of-the-art conversational model)
* `openai/gpt-oss-20b` (Lightweight instant response model)

> [!NOTE]
> If no API key is provided, the chatbot automatically uses its built-in client-side **Deterministic Knowledge Engine**, so visitors always receive instant, accurate answers about Sunil's experience and projects even offline.

---

## 2. 📅 Google Calendar & Google Meet Integration

The **1:1 Consultation Booking Tool** (`/tools/appointment`) connects directly with Google Calendar to schedule video meetings with Sunil (`skhobragade993@gmail.com`).

### 🛡️ 100% Privacy & Zero-Exposed Keys
**No API key or credentials are required or exposed to the client.** When visitors select a slot and click **"Confirm on Google Calendar"** or **"Download .ICS"**:
* **Direct Calendar Web Protocol**: The application dynamically builds a native RFC-compliant event URL directly to Google Calendar (`https://calendar.google.com/calendar/render?...`).
* **Event Name**: `1:1 Architecture Discovery - Sunil Khobragade & [Client Name]`
* **Start & End Time**: Calculated dynamically in UTC based on selected date & slot.
* **Location**: Pre-configured with Google Meet conferencing.
* **Attendees**: Automatically pre-fills `skhobragade993@gmail.com` and the client's email.
* **iCalendar Support**: Generates offline `.ics` files with valid RFC 5545 format for Apple Calendar, Outlook, and mobile devices.

---

## 3. 🌐 Domain & Production URL Setup (`SITE_URL`)

Astro uses `SITE_URL` during the static build step to generate:
* XML Sitemap: `https://your-domain.com/sitemap-index.xml`
* Robots.txt: `https://your-domain.com/robots.txt`
* LLMs Crawler Endpoint: `https://your-domain.com/llms.txt`
* Canonical URLs & Social OpenGraph Tags (`og:url`, `og:image`)
* RSS 2.0 Feed: `https://your-domain.com/rss.xml`

### How to Configure:
In your `.env` file or hosting environment variables:
```ini
SITE_URL=https://sunilkhobragade.pages.dev
```

---

## 4. 🚀 Adding Environment Variables to Cloudflare Pages / Vercel

### Cloudflare Pages:
1. Go to your **Cloudflare Dashboard** $\rightarrow$ **Workers & Pages**.
2. Select your portfolio project.
3. Click **Settings** $\rightarrow$ **Environment variables**.
4. Under **Production**, add:
   * `GROQ_API_KEY` = `gsk_...`
   * `GROQ_MODEL` = `openai/gpt-oss-120b`
   * `SITE_URL` = `https://sunilkhobragade.pages.dev`
5. Click **Save** and trigger a redeployment.

### Vercel:
1. Go to your **Vercel Project** $\rightarrow$ **Settings** $\rightarrow$ **Environment Variables**.
2. Add the same key-value pairs (`GROQ_API_KEY`, `GROQ_MODEL`, `SITE_URL`).
3. Redeploy your project.

