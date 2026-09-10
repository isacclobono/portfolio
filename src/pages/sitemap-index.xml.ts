import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = async () => {
  const baseUrl = (import.meta.env.SITE_URL || SITE.URL || 'https://sunilkhobragade.pages.dev').replace(/\/$/, '');
  const now = new Date().toISOString();

  // Standard sitemapindex specification according to sitemaps.org
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
