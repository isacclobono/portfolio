import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = (site ? site.toString() : SITE.URL || 'https://sunilkhobragade.pages.dev').replace(/\/$/, '');
  const siteOrigin = new URL(base).origin;

  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Disallow internal error status pages and API routes
Disallow: /api/
Disallow: /401
Disallow: /403
Disallow: /404
Disallow: /500
Disallow: /503

# Sitemaps & Host
Sitemap: ${base}/sitemap-index.xml
Sitemap: ${base}/sitemap.xml
Host: ${siteOrigin}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
