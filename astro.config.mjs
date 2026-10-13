import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Dynamically detect and validate domain across different deployment platforms (Vercel, Cloudflare Pages, Netlify, or custom env)
function getSiteUrl() {
  const candidates = [
    process.env.SITE_URL,
    process.env.CF_PAGES_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    process.env.URL, // Netlify
  ];

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== 'string') continue;
    let trimmed = candidate.trim();
    if (!trimmed || trimmed === 'undefined' || trimmed === 'null') continue;

    // Auto-prefix protocol if missing (e.g. "portfolio.pages.dev" -> "https://portfolio.pages.dev")
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${trimmed}`;
    }

    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        // Ensure valid hostname with dot or localhost
        if (parsed.hostname && (parsed.hostname.includes('.') || parsed.hostname === 'localhost')) {
          return parsed.origin;
        }
      }
    } catch {
      // Invalid URL candidate, proceed to next candidate
    }
  }

  return 'https://sunilkhobragade.pages.dev';
}

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  compressHTML: true,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/401') && !page.includes('/403') && !page.includes('/500') && !page.includes('/503')
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'esbuild',
      cssMinify: true,
      modulePreload: false,
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  }
});
