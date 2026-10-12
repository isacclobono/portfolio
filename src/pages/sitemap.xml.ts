import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

// Canonical, crawlable production routes (Strictly excludes error pages & API endpoints)
const routes = [
  // Core Hubs & Pages
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/work', changefreq: 'weekly', priority: '0.8' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/tools', changefreq: 'daily', priority: '0.9' },
  { path: '/tech-stack', changefreq: 'weekly', priority: '0.8' },
  { path: '/education', changefreq: 'monthly', priority: '0.7' },
  { path: '/changelog', changefreq: 'weekly', priority: '0.75' },
  { path: '/download', changefreq: 'weekly', priority: '0.85' },
  { path: '/status', changefreq: 'hourly', priority: '0.7' },
  { path: '/uses', changefreq: 'monthly', priority: '0.6' },
  { path: '/faq', changefreq: 'weekly', priority: '0.85' },
  { path: '/privacy', changefreq: 'monthly', priority: '0.5' },
  { path: '/terms', changefreq: 'monthly', priority: '0.5' },

  // Featured Engineering Projects
  { path: '/projects/pulse-chat', changefreq: 'weekly', priority: '0.85' },
  { path: '/projects/ai-enabled-lms', changefreq: 'weekly', priority: '0.85' },
  { path: '/projects/e-commerce-platform', changefreq: 'weekly', priority: '0.85' },
  { path: '/projects/real-time-appointment-booking', changefreq: 'weekly', priority: '0.85' },

  // 19 In-Depth Architecture Blog Articles
  { path: '/blog/autonomous-multi-agent-orchestration-langgraph', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/architecting-concurrency-safe-booking-systems', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/building-high-throughput-microservices-with-nodejs-and-redis', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/designing-event-driven-microservices-rabbitmq-nodejs', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/integrating-multi-gateway-payments-clean-architecture', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/low-latency-edge-computing-cloudflare-astro', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/multi-tenant-database-isolation-architectures', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/optimizing-postgresql-queries-high-volume-systems', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/outbox-pattern-distributed-transaction-guarantees', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/production-rag-pipelines-pgvector-postgresql', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/scaling-websocket-infrastructure-high-concurrency', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/ultra-fast-llm-inference-groq-lpu-streaming', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/zero-downtime-deployments-with-docker-and-github-actions', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/zero-js-baseline-web-applications-astro-5', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/building-resilient-ai-agents-with-tool-calling-and-structured-outputs', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/distributed-rate-limiting-algorithms-token-bucket-redis', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/postgresql-table-partitioning-and-cdc-streaming-debezium', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/passkeys-and-webauthn-implementation-clean-architecture', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog/kubernetes-canary-deployments-with-istio-and-prometheus', changefreq: 'monthly', priority: '0.8' },

  // Full Suite of 20 Developer Utility Tools
  { path: '/tools/estimator', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/appointment', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/curl-converter', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/json-formatter', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/timestamp-converter', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/chmod-calculator', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/html-entity-encoder', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/json-to-ts', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/regex-tester', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/base64-encoder', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/uuid-generator', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/diff-viewer', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/markdown-editor', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/box-shadow-generator', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/color-contrast', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/url-parser', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/svg-optimizer', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/sql-formatter', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/jwt-decoder', changefreq: 'weekly', priority: '0.85' },
  { path: '/tools/cron-generator', changefreq: 'weekly', priority: '0.85' },
];

export const GET: APIRoute = async () => {
  const baseUrl = (import.meta.env.SITE_URL || SITE.URL || 'https://sunilkhobragade.pages.dev').replace(/\/$/, '');
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (item) => `  <url>
    <loc>${baseUrl}${item.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
