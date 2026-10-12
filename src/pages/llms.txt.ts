import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = (site ? site.toString() : SITE.URL).replace(/\/$/, '');

  const content = `# SK Builds (Sunil Khobragade)

> SK Builds is a web development and digital solutions initiative by Sunil Khobragade — Senior Full-Stack Developer & Solutions Architect with 6+ years of experience building fast, modern, accessible, and SEO-friendly web platforms, distributed systems, and robust APIs.

## Website & Core Links

- [SK Builds Homepage](${siteUrl}/): Main website, biography, skill overview, featured projects, career timeline, and contact information.
- [Projects](${siteUrl}/projects): Portfolio of production-grade systems, SaaS platforms, microservices architectures, and developer tools.
- [Work Experience](${siteUrl}/work): Comprehensive career timeline across senior full-stack roles, system design responsibilities, and technical achievements.
- [Blog & Technical Articles](${siteUrl}/blog): In-depth writeups on system architecture, database optimization, CI/CD, microservices, and modern web development.
- [Education & Certifications](${siteUrl}/education): Academic background in computer engineering, industry certifications, and continuous technical training.
- [Freelance Estimator & Booking Tools](${siteUrl}/tools): Interactive project cost & architecture estimator and Google Calendar consultation scheduler.
- [RSS Feed](${siteUrl}/rss.xml): Syndication feed for latest technical blog articles and architectural case studies.
- [XML Sitemap](${siteUrl}/sitemap-index.xml): Full XML sitemap index for search crawlers.

## Technical Expertise

- **AI, Agents & Generative Systems**: AI Agents & Multi-Agent Workflows (LangGraph, CrewAI, AutoGen), Retrieval-Augmented Generation (RAG), Vector Databases (Pinecone, Qdrant, pgvector), LangChain & LlamaIndex, OpenAI/Claude/Gemini APIs, Groq Fast LPU Inference, Prompt Engineering, Semantic Search, Function Calling & Structured JSON.
- **Languages & Frameworks**: TypeScript, JavaScript (ESNext), Node.js, Express, Fastify, Nest.js, Python, FastAPI, Django, PHP, Laravel, React, Next.js, Angular, Astro, TailwindCSS.
- **Databases & Caching**: PostgreSQL & pgvector, Redis (Caching, Pub/Sub, Queues, Distributed Locks), MongoDB, MySQL, Elasticsearch, DynamoDB.
- **Cloud & DevOps**: AWS (ECS, Lambda, S3, RDS, CloudFront), Microsoft Azure, Cloudflare Workers/Pages, Docker, Kubernetes, GitHub Actions CI/CD, Nginx, Linux.
- **Architectures**: Microservices, Event-Driven Architecture, RESTful APIs, GraphQL, gRPC, WebSockets, Message Queues (RabbitMQ, Kafka, AWS SQS).
- **Payments & Security**: Payment Gateways (Stripe, Razorpay, PhonePe with Webhook Idempotency), OAuth2/JWT Authentication, Zero-Trust Architecture, OWASP Top 10.

## Availability & Contact

- **Freelance Inquiries & Consulting**: Available for high-impact contract engineering, system architecture design, and full-stack development.
- **Email**: x.kksunil@gmail.com
- **GitHub**: https://github.com/naman-mahi
- **LinkedIn**: https://linkedin.com/in/sunilkhobragade
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
