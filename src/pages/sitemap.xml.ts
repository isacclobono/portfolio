import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

const pages = [
  '',
  '/work',
  '/projects',
  '/projects/pulse-chat',
  '/projects/ai-enabled-lms',
  '/projects/e-commerce-platform',
  '/projects/real-time-appointment-booking',
  '/blog',
  '/blog/designing-event-driven-microservices-rabbitmq-nodejs',
  '/blog/optimizing-postgresql-queries-high-volume-systems',
  '/blog/integrating-multi-gateway-payments-clean-architecture',
  '/blog/building-high-throughput-microservices-with-nodejs-and-redis',
  '/blog/zero-downtime-deployments-with-docker-and-github-actions',
  '/blog/outbox-pattern-distributed-transaction-guarantees',
  '/blog/scaling-websocket-infrastructure-high-concurrency',
  '/blog/architecting-concurrency-safe-booking-systems',
  '/blog/multi-tenant-database-isolation-architectures',
  '/blog/production-rag-pipelines-pgvector-postgresql',
  '/blog/autonomous-multi-agent-orchestration-langgraph',
  '/blog/low-latency-edge-computing-cloudflare-astro',
  '/blog/ultra-fast-llm-inference-groq-lpu-streaming',
  '/blog/zero-js-baseline-web-applications-astro-5',
  '/education',
  '/tools',
  '/tools/estimator',
  '/tools/appointment',
  '/tools/jwt-decoder',
  '/tools/sql-formatter',
  '/tools/cron-generator',
  '/status',
  '/changelog',
  '/tech-stack',
  '/uses',
  '/privacy',
  '/terms',
  '/401',
  '/403',
  '/404',
  '/500',
  '/503'
];

export const GET: APIRoute = async () => {
  const baseUrl = (import.meta.env.SITE_URL || SITE.URL || 'https://sunilkhobragade.pages.dev').replace(/\/$/, '');
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${path === '' || path === '/status' || path === '/changelog' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '' ? '1.0' : path.startsWith('/projects') || path.startsWith('/tools') ? '0.8' : '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
