# 🔑 API Keys & Integrations Guide

This document provides step-by-step instructions on where and how to obtain all API keys, OAuth credentials, and third-party service tokens used across Sunil Khobragade's portfolio.

---

## 📋 Summary of Environment Variables

All environment variables must be placed in `.env` for local development, and in your hosting provider's dashboard (Cloudflare Pages, Vercel, or Netlify) for production deployments:

| Variable Name | Required? | Purpose | Where to Get |
|---|---|---|---|
| `PUBLIC_GROQ_API_KEY` | **Recommended** | Powers real-time streaming AI chatbot responses via Groq LPU | [Groq Console](https://console.groq.com/keys) |
| `PUBLIC_GROQ_MODEL` | Optional | Active conversational LLM (`openai/gpt-oss-120b`, `qwen/qwen3.8-27b`) | [Groq Docs](https://console.groq.com/docs/models) |
| `SITE_URL` | **Required in Prod** | Production base URL for sitemap, canonical links, OpenGraph, and RSS | Your domain (`https://sunilkhobragade.pages.dev`) |
| `PUBLIC_GOOGLE_CLIENT_ID` | Optional | OAuth Client ID for direct Google Calendar event insertion | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| `PUBLIC_GOOGLE_CALENDAR_API_KEY` | Optional | API Key for Google Calendar v3 services | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |

---

## 1. ⚡ Groq Cloud LPU API (AI Chatbot)

The **SK Agent** chatbot uses Groq's fast LPU inference engine to stream real-time conversational responses at 300+ tokens/sec.

### How to Get Your Free Groq API Key:
1. Visit **[https://console.groq.com/keys](https://console.groq.com/keys)** and create a free account or sign in with GitHub/Google.
2. Navigate to **API Keys** in the left sidebar.
3. Click **Create API Key**.
4. Give it a name (e.g., `SK-Portfolio-Chatbot`).
5. Copy the generated key starting with `gsk_...`.
6. Add it to your `.env` file:
   ```ini
   PUBLIC_GROQ_API_KEY=gsk_your_actual_key_here
   ```

### Recommended Conversational Models:
* `openai/gpt-oss-120b` (Default flagship 120B model on your Groq endpoint)
* `qwen/qwen3.8-27b` (High-speed multi-lingual reasoning model)
* `openai/gpt-oss-20b` (Lightweight instant response model)

Set your preferred model in `.env`:
```ini
PUBLIC_GROQ_MODEL=openai/gpt-oss-120b
```

> [!NOTE]
> If no API key is provided, the chatbot smoothly switches to its built-in client-side **Deterministic Knowledge Engine**, so visitors always receive accurate resume and project details even offline.

---

## 2. 📅 Google Calendar & Google Meet Integration

The **1:1 Consultation Booking Tool** (`/tools/appointment`) connects directly with Google Calendar to schedule video meetings with Sunil (`skhobragade993@gmail.com`).

### A. Zero-Configuration Mode (Default & Active)
No API key is required for default operation! When visitors select a slot and click **"Confirm on Google Calendar"**, the application dynamically builds an exact UTC ISO template link:
* **Event Name**: `1:1 Architecture Discovery - Sunil Khobragade & [Client Name]`
* **Start & End Time**: Calculated dynamically based on selected date and time slot (30 min duration).
* **Location**: Pre-configured with Google Meet.
* **Attendees**: Automatically adds `skhobragade993@gmail.com` and the client's email.
* **Agenda**: Embedded from client's input notes.

### B. Direct Google Calendar API v3 (Optional OAuth Setup)
If you wish to enable silent, direct calendar insertion via Google OAuth:
1. Go to the **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Create a new project named `SK-Portfolio`.
3. Go to **APIs & Services** $\rightarrow$ **Library**.
4. Search for **Google Calendar API** and click **Enable**.
5. Go to **APIs & Services** $\rightarrow$ **OAuth consent screen**:
   * User Type: **External**
   * App name: `SK Builds Consultation`
   * Scopes: Add `https://www.googleapis.com/auth/calendar.events`
6. Go to **Credentials** $\rightarrow$ **Create Credentials** $\rightarrow$ **OAuth client ID**:
   * Application type: **Web application**
   * Authorized JavaScript origins: `http://localhost:4321` and `https://sk-builds.vercel.app` (or your domain).
7. Copy the generated **Client ID** and paste into `.env`:
   ```ini
   PUBLIC_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   PUBLIC_GOOGLE_CALENDAR_API_KEY=your_google_api_key_here
   ```

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
SITE_URL=https://sk-builds.vercel.app
```
*(If using a custom domain like `https://sunilkhobragade.com`, update `SITE_URL` accordingly).*

---

## 4. 🚀 Adding Environment Variables to Cloudflare Pages / Vercel

### Cloudflare Pages:
1. Go to your **Cloudflare Dashboard** $\rightarrow$ **Workers & Pages**.
2. Select your portfolio project.
3. Click **Settings** $\rightarrow$ **Environment variables**.
4. Under **Production**, add:
   * `PUBLIC_GROQ_API_KEY` = `gsk_...`
   * `PUBLIC_GROQ_MODEL` = `openai/gpt-oss-120b`
   * `SITE_URL` = `https://your-domain.com`
5. Click **Save** and trigger a redeployment.

### Vercel:
1. Go to your **Vercel Project** $\rightarrow$ **Settings** $\rightarrow$ **Environment Variables**.
2. Add the same key-value pairs.
3. Redeploy your project.
