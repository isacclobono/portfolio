# 🚀 1-Click Deployment Guide

Deploy your Astro portfolio in seconds using **1-Click Web Buttons** or **1-Command Terminal Deployment**.

---

## 🔘 1-Click Deploy Buttons (Web)

Direct 1-Click Deploy buttons configured for your repository:

### ▲ Deploy to Vercel (1-Click)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/isacclobono/portfolio)

Click link directly: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/isacclobono/portfolio)

---

### ⚡ Deploy to Cloudflare Pages (1-Click)
[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/isacclobono/portfolio)

Click link directly: [Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/?url=https://github.com/isacclobono/portfolio)

---

## 💻 1-Command Terminal Deployment (Instant)

### Option A: 1-Command Vercel Deploy
```bash
npx -y vercel --prod
```

### Option B: 1-Command Cloudflare Pages Deploy
```bash
npm run build
npx -y wrangler pages deploy dist --project-name=sunil-portfolio
```

---

## 🐙 Push Future Updates to GitHub

```bash
git add .
git commit -m "update: latest improvements"
git push origin main
```
