export interface Project {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  tags: string[];
  description: string;
  overview: string[];
  features: string[];
  techStack: { category: string; technologies: string }[];
  metrics?: { label: string; score: number }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "pulse-chat",
    title: "Pulse Chat",
    summary: "AI-powered customer support platform with real-time messaging, embeddable widgets, and automated knowledge base replies.",
    date: "Jan 2025",
    readTime: "3 min read",
    demoUrl: "https://github.com/naman-mahi",
    repoUrl: "https://github.com/naman-mahi/pulse-chat",
    featured: true,
    tags: ["Node.js", "React", "WebSockets", "Redis", "MongoDB", "AI"],
    description: "Pulse Chat is a high-performance, real-time customer support platform designed for modern SaaS businesses. It brings multi-channel customer communications into a unified workspace, powered by AI-driven auto-responses and smart routing.",
    overview: [
      "Built an AI-powered customer support platform with embeddable web widgets, shared inboxes, real-time messaging, and knowledge base auto replies.",
      "Implemented role-based workflows for admins, managers, agents, and customers with widget customization, analytics dashboards, and secure access control.",
      "Engineered WebSocket clustering backed by Redis pub/sub to support high concurrency and zero-lag live messaging across thousands of active sessions."
    ],
    features: [
      "Embeddable lightweight JavaScript chat widget for any website",
      "Real-time bidirectional messaging via WebSockets & Redis Pub/Sub",
      "AI-driven instant answer engine using Vector Search & LLMs",
      "Role-Based Access Control (RBAC) for Admins, Managers, and Agents",
      "Shared omnichannel team inbox with live agent typing indicators",
      "Real-time analytics dashboard with response time and CSAT metrics",
      "JWT-based secure authentication and webhook integrations"
    ],
    techStack: [
      { category: "Frontend", technologies: "React, TypeScript, TailwindCSS, Vite" },
      { category: "Backend", technologies: "Node.js, Express, Fastify, Socket.io" },
      { category: "Database & Cache", technologies: "MongoDB, Redis (Pub/Sub & Caching)" },
      { category: "AI & Search", technologies: "Google Vertex AI, OpenAI APIs, Vector Embeddings" },
      { category: "Infrastructure", technologies: "Docker, Nginx, AWS ECS, Cloudflare" }
    ],
    metrics: [
      { label: "Performance", score: 100 },
      { label: "Accessibility", score: 100 },
      { label: "Best Practices", score: 100 },
      { label: "SEO", score: 100 }
    ]
  },
  {
    slug: "ai-enabled-lms",
    title: "AI-Enabled LMS",
    summary: "Intelligent learning platform with live classes, recorded sessions, personalized study workflows, and role-based access.",
    date: "Sep 2024",
    readTime: "4 min read",
    demoUrl: "https://github.com/naman-mahi",
    repoUrl: "https://github.com/naman-mahi/ai-enabled-lms",
    featured: true,
    tags: ["Next.js", "Node.js", "Python", "Vertex AI", "PostgreSQL", "Docker"],
    description: "An enterprise-grade learning management system equipped with AI tutoring, personalized student assessment generators, live video integration, and comprehensive course progression analytics.",
    overview: [
      "Engineered an AI-enabled learning platform with live classes, recorded sessions, personalized workflows, scalable APIs, and role-based access.",
      "Integrated Google Cloud Vertex AI to auto-generate quizzes, summarize lecture transcripts, and offer 24/7 intelligent study assistance.",
      "Designed a robust role-based dashboard for instructors, students, and institutional administrators."
    ],
    features: [
      "AI-powered study assistant for instant doubt clearing and summarization",
      "Live interactive classroom integration with WebRTC and recording storage",
      "Dynamic quiz generator with automated grading and feedback loops",
      "Granular role-based permissions (Superadmin, Instructor, Student)",
      "Progress tracking, video timestamp bookmarking, and certification generation",
      "Scalable media streaming with cloud CDN caching"
    ],
    techStack: [
      { category: "Frontend", technologies: "Next.js 14 (App Router), React, TailwindCSS" },
      { category: "Backend", technologies: "Node.js, Python (Django), RESTful APIs" },
      { category: "Database", technologies: "PostgreSQL, Prisma ORM, Redis" },
      { category: "Cloud & AI", technologies: "Google Cloud, Vertex AI, AWS S3, CloudFront" },
      { category: "DevOps", technologies: "Docker, GitHub Actions, Nginx" }
    ],
    metrics: [
      { label: "Performance", score: 99 },
      { label: "Accessibility", score: 100 },
      { label: "Best Practices", score: 100 },
      { label: "SEO", score: 100 }
    ]
  },
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    summary: "Full-stack e-commerce engine with inventory management, multi-gateway payments, and high-conversion checkout flows.",
    date: "Jun 2024",
    readTime: "3 min read",
    demoUrl: "https://github.com/naman-mahi",
    repoUrl: "https://github.com/naman-mahi/ecommerce-platform",
    featured: true,
    tags: ["Laravel", "React", "MySQL", "Redis", "Stripe", "Razorpay"],
    description: "A robust, high-conversion e-commerce platform built to handle heavy catalog queries and lightning-fast checkout experiences with resilient payment gateway fallbacks.",
    overview: [
      "Launched a full-stack e-commerce platform with catalog, cart, secure checkout, order management, payment integration, and optimized transaction flows.",
      "Built multi-gateway payment processing supporting Stripe, Razorpay, and PhonePe with automated webhook reconciliation.",
      "Optimized SQL indexing and introduced Redis product caching, decreasing product page load latency by 45%."
    ],
    features: [
      "Lightning-fast product search, multi-faceted filtering, and sorting",
      "Optimistic cart state management with persistent sessions",
      "Seamless multi-gateway payment integrations (Stripe, Razorpay, PhonePe)",
      "Automated tax, shipping calculation, and discount coupon engine",
      "Comprehensive merchant admin portal for inventory and order dispatch",
      "Automated transactional email notifications and PDF invoice generation"
    ],
    techStack: [
      { category: "Backend", technologies: "PHP (Laravel 10), REST APIs, Queue Workers" },
      { category: "Frontend", technologies: "React, Inertia.js / Next.js, TailwindCSS" },
      { category: "Database", technologies: "MySQL 8.0, Redis Cache & Queues" },
      { category: "Payments", technologies: "Stripe API, Razorpay Webhooks, PhonePe PG" },
      { category: "Infrastructure", technologies: "AWS EC2, RDS, S3, Docker, GitLab CI" }
    ],
    metrics: [
      { label: "Performance", score: 100 },
      { label: "Accessibility", score: 98 },
      { label: "Best Practices", score: 100 },
      { label: "SEO", score: 100 }
    ]
  },
  {
    slug: "real-time-appointment-booking",
    title: "Real-Time Appointment Booking System",
    summary: "Concurrency-safe scheduling platform with live slot availability, automated booking workflows, and multi-channel notifications.",
    date: "Feb 2024",
    readTime: "3 min read",
    demoUrl: "https://github.com/naman-mahi",
    repoUrl: "https://github.com/naman-mahi/appointment-booking-system",
    featured: false,
    tags: ["Node.js", "Fastify", "React", "PostgreSQL", "Redis", "Twilio"],
    description: "A concurrency-safe scheduling and appointment booking system that prevents double-booking race conditions during high-volume reservation surges.",
    overview: [
      "Developed a real-time scheduling platform with concurrency-safe APIs, slot availability, booking workflows, reminders, and notification features.",
      "Used Redis distributed locks (Redlock) and PostgreSQL isolation levels to guarantee zero double bookings during concurrent checkout attempts.",
      "Configured automated multi-channel reminders via SMS (Twilio) and email (SendGrid) with calendar (.ics) sync."
    ],
    features: [
      "Dynamic provider calendar management with custom buffer times and holidays",
      "Atomic slot reservations powered by Redis distributed mutex locks",
      "Instant calendar invitations (Google Calendar, Apple iCal, Outlook)",
      "Automated WhatsApp, SMS, and Email confirmation and reminder triggers",
      "Customizable intake forms with validation and file upload support",
      "Comprehensive audit trail for appointment rescheduling and cancellations"
    ],
    techStack: [
      { category: "Backend", technologies: "Node.js (Fastify), TypeScript" },
      { category: "Frontend", technologies: "React, TailwindCSS, FullCalendar" },
      { category: "Database & Locks", technologies: "PostgreSQL, Redis (Redlock algorithm)" },
      { category: "Notifications", technologies: "Twilio API, SendGrid, ICS generator" },
      { category: "Deployment", technologies: "Docker, Azure App Services, GitHub Actions" }
    ],
    metrics: [
      { label: "Performance", score: 100 },
      { label: "Accessibility", score: 100 },
      { label: "Best Practices", score: 100 },
      { label: "SEO", score: 100 }
    ]
  }
];
