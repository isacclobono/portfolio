# 🚀 Deployment & SEO Architecture Guide

This guide covers building the production bundle, configuring zero-downtime deployments on Cloudflare Pages or Vercel, and maintaining a 100/100 Core Web Vitals score.

---

## 🛠️ Build Commands

```bash
# 1. Start local development server in background
astro dev --background

# 2. Check dev server status & logs
astro dev status
astro dev logs

# 3. Stop background dev server
astro dev stop

# 4. Compile full static production bundle
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 🌐 1. Deploying to Cloudflare Pages

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete portfolio optimizations and AI chatbot"
   git push origin main
   ```
2. In Cloudflare Dashboard $\rightarrow$ **Workers & Pages** $\rightarrow$ **Create Application** $\rightarrow$ **Pages** $\rightarrow$ **Connect to Git**.
3. Set the build settings:
   * **Framework preset**: `Astro`
   * **Build command**: `npm run build`
   * **Build output directory**: `dist`
   * **Node.js Version**: `22.x` (or `20.x`)
4. Add Environment Variables (Optional):
   * `GROQ_API_KEY`: `gsk_...`
   * `GROQ_MODEL`: `openai/gpt-oss-120b`
   * `SITE_URL`: `https://sunilkhobragade.pages.dev`
5. Click **Save and Deploy**.

---

## 📈 2. SEO & Schema.org Architecture

The portfolio implements full technical SEO and social graph metadata in [`src/components/SEO.astro`](file:///d:/DEVELOPMENT/sunil_khobragade_portfolio/src/components/SEO.astro):

### Implemented Standards:
* **Canonical URLs**: Automatically generated from `SITE_URL` and page pathname.
* **OpenGraph & Twitter Card**: High-resolution vector social preview image (`/og-image.svg`).
* **Schema.org JSON-LD Graph**:
  * `WebSite` & `WebPage` structured entities.
  * `Person` entity (Sunil Khobragade, job title, social profiles, skills).
  * `ProfessionalService` entity (SK Builds consulting services).
  * `BlogPosting` structured data on all `/blog/*` articles.
  * `BreadcrumbList` hierarchy on all subpages.
* **Crawler Endpoints & PWA**:
  * **Sitemap**: `/sitemap-index.xml` & `/sitemap.xml` (dynamic endpoints).
  * **Robots.txt**: Dynamic endpoint at `/robots.txt`.
  * **AI Crawler Context**: Dynamic endpoint at `/llms.txt` for AI search crawlers.
  * **RSS 2.0**: Dynamic feed at `/rss.xml` for blog subscribers.
  * **PWA Manifest & Service Worker**: `/site.webmanifest`, `/manifest.json`, and `/sw.js` with offline caching for desktop/mobile installability.

---

## ⚡ 3. 100/100 Core Web Vitals Optimization

The site is engineered for maximum performance:
1. **Zero Client-Side Framework Bloat**: Pure static HTML generation with lightweight vanilla JavaScript for interactive components.
2. **Self-Hosted Local Fonts**: Typography is served directly via `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono` without blocking third-party network requests.
3. **SVG Social Cards & Icons**: Lightweight vector graphics ensure zero image weight penalties.
4. **Fast First Contentful Paint (FCP)**: Sub-second render times globally on edge CDN.
