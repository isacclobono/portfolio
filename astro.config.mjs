import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Dynamically detect domain across different deployment platforms (Vercel, Cloudflare Pages, Netlify, or custom env)
function getSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.CF_PAGES_URL) return process.env.CF_PAGES_URL;
  if (process.env.URL) return process.env.URL; // Netlify
  return 'https://sk-builds.vercel.app';
}

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  }
});
