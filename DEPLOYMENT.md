# 🚀 1-Click Deployment Guide

Deploy your Astro portfolio in seconds using **Cloudflare Pages** or **Vercel**.

---

## ⚡ Deploy to Cloudflare Pages (Recommended)

### Method 1: Git Integration (Continuous Deployment)
1. Push your repository to GitHub: `https://github.com/naman-mahi/sunil_khobragade_portfolio`
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages > Create application > Pages > Connect to Git**.
3. Select the repository and configure build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. In **Settings > Environment variables**, add your secrets:
   - `GROQ_API_KEY`: Your Groq API key for the AI Assistant.
   - `CALENDLY_API_TOKEN`: Optional Calendly token for live booking availability.
5. Save and deploy!

### Method 2: Terminal Deployment (Wrangler CLI)
```bash
npm run build
npx -y wrangler pages deploy dist --project-name=sunil-portfolio
```

---

## ▲ Deploy to Vercel

### Method 1: 1-Click Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/naman-mahi/sunil_khobragade_portfolio)

Direct link: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/naman-mahi/sunil_khobragade_portfolio)

### Method 2: Terminal Deployment
```bash
npx -y vercel --prod
```

---

## 🐙 Push Updates to GitHub

```bash
git add .
git commit -m "update: latest portfolio improvements"
git push origin main
```
