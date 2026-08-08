# 🚀 1-Click Deployment Guide

Deploy your Astro portfolio in seconds using **1-Click Web Buttons** or **1-Command Terminal Deployment**.

---

## 🔘 1-Click Deploy Buttons (Web)

Once your code is pushed to GitHub, you (or anyone) can deploy with a single click:

### ▲ Deploy to Vercel (1-Click)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/<YOUR_GITHUB_USERNAME>/astro-portfolio)

*URL Format*:
```
https://vercel.com/new/clone?repository-url=https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>
```

---

### ⚡ Deploy to Cloudflare Pages (1-Click)
[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/<YOUR_GITHUB_USERNAME>/astro-portfolio)

*URL Format*:
```
https://deploy.workers.cloudflare.com/?url=https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>
```

---

## 💻 1-Command Terminal Deployment (No GitHub Required)

You can also deploy directly from your local terminal in **one command**!

### Option A: 1-Command Vercel Deploy
Run this in your project terminal:

```bash
npx -y vercel --prod
```
- Prompts you to log in to Vercel (one time).
- Automatically builds and deploys your site to production in ~30 seconds!

---

### Option B: 1-Command Cloudflare Pages Deploy
Run these two commands:

```bash
# 1. Build project
npm run build

# 2. Deploy dist folder directly to Cloudflare
npx -y wrangler pages deploy dist --project-name=sunil-portfolio
```
- Logs you in to Cloudflare.
- Uploads the static bundle directly to Cloudflare's global edge network.

---

## 🐙 Step-by-Step GitHub Git Push (For Automated CI/CD)

```bash
# 1. Stage and commit all changes
git add .
git commit -m "feat: portfolio ready for deployment"

# 2. Set main branch & add remote
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/astro-portfolio.git

# 3. Push to GitHub
git push -u origin main
```
Once pushed, every future `git push` will trigger an automated deployment on Vercel and Cloudflare Pages automatically!
