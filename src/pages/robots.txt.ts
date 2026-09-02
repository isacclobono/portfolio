import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

const getRobotsTxt = (sitemapURL: URL, siteOrigin: string) => `User-agent: *
Allow: /

# Sitemaps & Host
Sitemap: ${sitemapURL.href}
Host: ${siteOrigin}
`;

export const GET: APIRoute = ({ site }) => {
  const base = site ? site.toString() : SITE.URL;
  const siteOrigin = new URL(base).origin;
  const sitemapURL = new URL('sitemap-index.xml', base);

  return new Response(getRobotsTxt(sitemapURL, siteOrigin), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

