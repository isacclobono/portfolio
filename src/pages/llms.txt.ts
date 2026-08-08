import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ? site.toString().replace(/\/$/, '') : 'https://sk-builds.vercel.app';

  const content = `# SK Builds (Sunil Khobragade)

> SK Builds is a web development and digital solutions initiative by Sunil Khobragade — Senior Full-Stack Developer & Solutions Architect with 6+ years of experience building fast, modern, accessible, and SEO-friendly web platforms, distributed systems, and robust APIs.

## Website & Core Links

- [SK Builds Homepage](${siteUrl}/): Main website, biography, skill overview, featured projects, career timeline, and contact information.
- [Projects](${siteUrl}/projects): Portfolio of production-grade systems, SaaS platforms, microservices architectures, and developer tools.
- [Work Experience](${siteUrl}/work): Comprehensive career timeline across senior full-stack roles, system design responsibilities, and technical achievements.
- [Blog & Technical Articles](${siteUrl}/blog): In-depth writeups on system architecture, database optimization, CI/CD, microservices, and modern web development.
- [Education & Certifications](${siteUrl}/education): Academic background in computer engineering, industry certifications, and continuous technical training.
- [Freelance Estimator & Booking Tools](${siteUrl}/tools): Interactive project cost & architecture estimator and Google Calendar consultation scheduler.

## Technical Expertise

- **Languages & Frameworks**: TypeScript, JavaScript (ESNext), Node.js, Express, Nest.js, Python, Django, FastAPI, PHP, Laravel, React, Next.js, Angular, Astro.
- **Databases & Caching**: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, DynamoDB.
- **Cloud & DevOps**: AWS (ECS, Lambda, S3, RDS, CloudFront), Microsoft Azure, Docker, Kubernetes, Terraform, GitHub Actions CI/CD, Nginx.
- **Architectures**: Microservices, Event-Driven Architecture, RESTful APIs, GraphQL, WebSockets, Message Queues (RabbitMQ, Kafka, AWS SQS).
- **AI & Integrations**: LLM Integrations, Google Cloud Vertex AI, Payment Gateways (Stripe, Razorpay, PhonePe), OAuth2/JWT Auth.

## Availability & Contact

- **Freelance Inquiries & Consulting**: Available for high-impact contract engineering, system architecture design, and full-stack development.
- **Email**: sunilkhobragade@proton.me
- **GitHub**: https://github.com/naman-mahi
- **LinkedIn**: https://linkedin.com/in/sunilkhobragade
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
