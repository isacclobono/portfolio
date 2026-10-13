# Sunil Khobragade — Developer Portfolio & Freelancing Platform

A high-performance, minimalist portfolio and developer toolkit built with **Astro**, **Tailwind CSS**, and modern SEO best practices.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/naman-mahi/sunil_khobragade_portfolio)
[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/naman-mahi/sunil_khobragade_portfolio)

---

## ⚡ 1-Click & 1-Command Deployment

- **Deploy on Cloudflare Pages**: [Click here to deploy](https://deploy.workers.cloudflare.com/?url=https://github.com/naman-mahi/sunil_khobragade_portfolio)
- **Deploy on Vercel**: [Click here to deploy](https://vercel.com/new/clone?repository-url=https://github.com/naman-mahi/sunil_khobragade_portfolio)

### Instant Terminal Deployment (Cloudflare Pages)
```bash
npm run build
npx -y wrangler pages deploy dist --project-name=sunil-portfolio
```

### Instant Terminal Deployment (Vercel)
```bash
npx -y vercel --prod
```

---

## 🔐 Environment Variables

For Cloudflare Pages, configure the following secrets in **Settings > Environment variables**:

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | API Key for AI Assistant (`/api/chat`) |
| `GROQ_MODEL` | Optional model override (Default: `llama-3.3-70b-versatile`) |
| `CALENDLY_API_TOKEN` | Optional Personal Access Token for live Calendly booking proxy |

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build & verification
npm run build
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full detailed instructions.
