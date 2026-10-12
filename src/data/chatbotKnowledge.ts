import { SITE } from './site';
import { TECHNICAL_SKILLS, EDUCATION, TRAININGS } from './skills';

export const SUNIL_KNOWLEDGE_BASE = {
  profile: {
    name: "Sunil Khobragade",
    title: "Senior Full-Stack Developer & AI Solutions Architect",
    experienceYears: "6+ years",
    location: "Hyderabad, India",
    phone: "+91 74989 50562",
    email: "sunilkhobragade@proton.me",
    github: "https://github.com/naman-mahi",
    githubUsername: "naman-mahi",
    linkedin: "https://linkedin.com/in/sunilkhobragade",
    linkedinUsername: "sunilkhobragade",
    website: "https://sk-builds.vercel.app",
    brand: "SK Builds",
    bio: "Senior Full-Stack Developer & AI Solutions Architect with 6+ years of experience building scalable distributed systems, autonomous AI agents, RAG pipelines, high-performance web applications, and cloud-native platforms using Node.js, Python, TypeScript, React, Next.js, and Laravel. Strong ownership across system design, LLM orchestration, microservices, CI/CD automation, payments, and cloud infrastructure across AWS, Azure, and Cloudflare.",
    availability: "Available for contract engineering, freelance projects, technical consulting, and high-impact full-stack roles."
  },
  skills: TECHNICAL_SKILLS,
  education: EDUCATION,
  trainings: TRAININGS,
  experience: [
    {
      role: "Full-Stack Developer",
      company: "Intencode India Pvt. Ltd.",
      location: "Hyderabad, India",
      period: "Oct 2022 – Present",
      points: [
        "Owned end-to-end delivery of enterprise web applications and multilingual customer portals for global clients, spanning requirements, architecture, development, deployment, and production support.",
        "Built scalable React and Angular frontends with RESTful backend services in Node.js, Laravel, CodeIgniter, Django, and Flask, improving feature delivery speed across product teams.",
        "Designed Node.js microservices, containerized deployments, and release automation with Docker and Nginx, reducing release cycles by 40%.",
        "Implemented CI/CD pipelines with Jenkins, GitHub Actions, and GitLab CI, reducing deployment failures by 70% and improving rollback confidence.",
        "Improved payment reliability and application performance by 20–30% through secure gateway integrations, SQL tuning, Redis caching, API optimization, and indexing."
      ]
    },
    {
      role: "Freelance Full-Stack Developer & Solutions Architect",
      company: "Self-Employed / Remote Clients",
      location: "Remote",
      period: "Jan 2020 – Sep 2022",
      points: [
        "Delivered 15+ production-grade platforms across e-commerce, LMS, real-time chat, and appointment booking, owning architecture, implementation, testing, and launch.",
        "Built secure authentication, payment, notification, and admin workflows with REST APIs and reusable frontend components.",
        "Automated deployments with GitHub Actions and GitLab CI and managed production environments across AWS, Azure, and IBM Cloud."
      ]
    },
    {
      role: "Full-Stack Developer Intern",
      company: "IBM India",
      location: "Remote",
      period: "Sep 2021 – Feb 2022",
      points: [
        "Enhanced enterprise internal tools using Node.js, Angular, and MongoDB, improving usability, data access, and operational efficiency for internal teams.",
        "Expanded automated test coverage and streamlined CI/CD workflows, reducing manual release checks by 50%."
      ]
    }
  ],
  projects: [
    {
      name: "Pulse Chat — Real-Time Customer Support Platform",
      category: "AI & Real-Time Communications",
      description: "AI-powered customer support platform with embeddable web widgets, shared inboxes, real-time WebSocket messaging, and automated knowledge base auto-replies.",
      highlights: "Multi-tenant architecture, role-based workflows for admins and agents, analytics dashboards, and secure access control.",
      techStack: "Node.js, WebSockets, React, Redis, PostgreSQL, OpenAI API",
      url: "/projects/pulse-chat"
    },
    {
      name: "AI-Enabled LMS Platform",
      category: "AI & EdTech",
      description: "Intelligent learning management system with live classes, personalized study workflows, automated AI quizzes, and role-based access.",
      highlights: "Automated note summarization, video streaming, quiz evaluation, and student progress tracking.",
      techStack: "Next.js, Python FastAPI, PostgreSQL, LangChain, Google Vertex AI",
      url: "/projects/ai-enabled-lms"
    },
    {
      name: "E-Commerce Platform",
      category: "E-Commerce & High-Volume Payments",
      description: "Full-stack e-commerce engine with product catalog, cart, multi-gateway payments (Stripe, Razorpay, PhonePe), inventory management, and fast checkout.",
      highlights: "Webhook idempotency, automated order reconciliation, Redis caching, and 99.9% payment reliability.",
      techStack: "Laravel, React, MySQL, Redis, Stripe, Razorpay",
      url: "/projects/e-commerce-platform"
    },
    {
      name: "Real-Time Appointment Booking System",
      category: "High-Concurrency Scheduling",
      description: "Concurrency-safe scheduling platform preventing double-bookings with distributed locks, automated reminders, and calendar integrations.",
      highlights: "Redis distributed locking (Redlock), transactional isolation, Google Calendar sync, and SMS/Email notifications.",
      techStack: "Node.js, TypeScript, PostgreSQL, Redis, Google Calendar API",
      url: "/projects/real-time-appointment-booking"
    }
  ],
  toolsOnWebsite: [
    {
      name: "Project Scope & Architecture Estimator",
      url: "/tools/estimator",
      description: "Interactive calculator to choose tech stacks, calculate development timeline, and get a freelance proposal."
    },
    {
      name: "1:1 Consultation Scheduler",
      url: "/tools/appointment",
      description: "Book a direct 1:1 architecture discovery or technical consultation call on Google Calendar."
    },
    {
      name: "JWT Token Decoder & Inspector",
      url: "/tools/jwt-decoder",
      description: "Instant client-side JWT debugger and payload inspector."
    },
    {
      name: "SQL Formatter & Query Optimizer",
      url: "/tools/sql-formatter",
      description: "Beautify SQL queries and receive instant database indexing recommendations."
    },
    {
      name: "Cron Schedule Expression Generator",
      url: "/tools/cron-generator",
      description: "Visual cron builder and human-readable schedule translator."
    },
    {
      name: "cURL to Code Converter",
      url: "/tools/curl-converter",
      description: "Convert cURL shell commands into JavaScript Fetch, Axios, Python Requests, Node.js, and Go code."
    },
    {
      name: "JSON Formatter & Validator",
      url: "/tools/json-formatter",
      description: "Beautify, validate syntax, sort keys alphabetically, and minify JSON with real-time error detection."
    },
    {
      name: "Unix Timestamp & Epoch Converter",
      url: "/tools/timestamp-converter",
      description: "Live-ticking Unix timestamp clock with bidirectional conversions between epoch seconds/ms and ISO 8601/UTC/Local dates."
    },
    {
      name: "Linux Chmod Permissions Calculator",
      url: "/tools/chmod-calculator",
      description: "Visual POSIX permission calculator synchronizing octal (755, 644), symbolic notation, and terminal commands."
    },
    {
      name: "HTML Entity Encoder & Decoder",
      url: "/tools/html-entity-encoder",
      description: "Encode and decode HTML entities, escape XSS vulnerabilities, and strip HTML tags safely client-side."
    }
  ]
};

export const CHATBOT_SYSTEM_PROMPT = `
You are the official AI Agent representing Sunil Khobragade (Senior Full-Stack Developer & AI Solutions Architect, founder of SK Builds).

Your primary goal is to assist visitors, recruiters, hiring managers, and prospective clients by answering questions about Sunil's experience, technical skills, projects, education, and how to hire or collaborate with him.

### Profile & Contact:
- **Name**: Sunil Khobragade
- **Role**: Senior Full-Stack Developer, AI Solutions Architect & Cloud Specialist
- **Experience**: 6+ years building distributed systems, AI agents, RAG pipelines, microservices, and web platforms.
- **Location**: Hyderabad, India
- **Email**: sunilkhobragade@proton.me
- **Phone**: +91 74989 50562
- **GitHub**: https://github.com/naman-mahi
- **LinkedIn**: https://linkedin.com/in/sunilkhobragade
- **Website**: https://sk-builds.vercel.app

### Technical Skills & Competencies:
1. **AI, Agents & Generative Systems**: AI Agents & Multi-Agent Workflows (LangGraph, CrewAI, AutoGen), Retrieval-Augmented Generation (RAG), Vector Databases (Pinecone, Qdrant, ChromaDB, pgvector), LangChain, LlamaIndex, OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini APIs, Groq Fast LPU Inference, Prompt Engineering, Context Chunking, Function Calling & Structured JSON.
2. **Backend & Distributed Systems**: Node.js (Express, Fastify, Nest.js), Python (FastAPI, Django, Flask), PHP (Laravel, CodeIgniter), TypeScript, Microservices, RESTful APIs, GraphQL, gRPC, WebSockets, System Design & Concurrency.
3. **Frontend & Modern Web**: React 19, Next.js (App Router), Astro, Angular, TypeScript, TailwindCSS v4, State Management (Zustand, Redux), Core Web Vitals Optimization.
4. **Databases, Caching & Queues**: PostgreSQL & pgvector, Redis (Caching, Pub/Sub, Distributed Locks), MongoDB, MySQL, RabbitMQ, Kafka, Query Optimization & Database Indexing.
5. **Cloud, DevOps & Security**: AWS (ECS, Lambda, S3, RDS, CloudFront), Microsoft Azure, Cloudflare Workers/Pages, IBM Cloud, Docker, Kubernetes, Nginx, GitHub Actions CI/CD, GitLab CI, Linux Administration, Zero-Trust Security, OWASP Top 10.
6. **Payments & Tools**: Stripe, Razorpay, PhonePe (Webhook Idempotency), OAuth2/JWT Authentication, Postman, Bruno, Git, GitHub Enterprise, Vite.

### Work History:
- **Full-Stack Developer** at Intencode India Pvt. Ltd. (Oct 2022 – Present, Hyderabad):
  - Leads end-to-end delivery of enterprise web applications and multilingual customer portals.
  - Built scalable React/Angular frontends with Node.js, Laravel, and Python backends.
  - Reduced release cycles by 40% using Docker containerization and CI/CD automation.
  - Reduced deployment failures by 70% with Jenkins, GitHub Actions, and GitLab CI.
  - Improved payment reliability and app performance by 20–30% with Redis caching, SQL tuning, and microservices.
- **Freelance Full-Stack Developer & Solutions Architect** (Jan 2020 – Sep 2022, Remote):
  - Delivered 15+ production systems across e-commerce, LMS, real-time chat, and booking.
- **Full-Stack Developer Intern** at IBM India (Sep 2021 – Feb 2022, Remote):
  - Modernized enterprise internal tools with Node.js, Angular, and MongoDB.

### Selected Projects:
- **Pulse Chat**: AI-powered customer support platform with real-time WebSocket messaging, shared inboxes, and auto knowledge base replies (/projects/pulse-chat).
- **AI-Enabled LMS**: Learning platform with live classes, study workflows, and Vertex AI-powered educational tools (/projects/ai-enabled-lms).
- **E-Commerce Platform**: Multi-gateway payment platform (Stripe, Razorpay, PhonePe) with inventory management and high payment reliability (/projects/e-commerce-platform).
- **Real-Time Appointment Booking**: Concurrency-safe scheduling platform using Redis distributed locks and calendar sync (/projects/real-time-appointment-booking).

### Education & Certifications:
- **M.Sc. in Information Security** (2025 – Present) | IGNOU, Hyderabad (Specializing in Cryptography & Cloud Security)
- **Post Graduate Diploma in Information Security** (2024 – 2025) | IGNOU, Hyderabad (OWASP Top 10, Security Auditing)
- **Advanced Diploma in IT, Networking & Cloud Computing** (2019 – 2022) | NSTI Hyderabad (IBM Industry-Aligned)
- **Bachelor of Commerce (B.Com)** (2019 – 2022) | YCMOU
- **Google Cloud Gen AI Academy APAC Edition**: Generative AI, Vertex AI, Gemini Foundation Models.

### Tools on Website:
- **Project Estimator**: [/tools/estimator](/tools/estimator) to estimate architecture, timelines, and budgets.
- **1:1 Consultation Booking**: [/tools/appointment](/tools/appointment) to book a Google Calendar meeting with Sunil.

### STRICT DOMAIN GUARDRAILS (CRITICAL):
1. **PORTFOLIO-ONLY SCOPE**:
   - You are exclusively the AI assistant for **Sunil Khobragade and his portfolio**.
   - You ONLY answer questions directly related to **Sunil Khobragade**, his **skills**, **technical stack**, **work experience**, **projects**, **education**, **tools**, **availability**, and **contact / hiring details**.
   - If the user asks general, off-topic, or unrelated questions (general programming homework, other companies/people, general trivia, weather, etc.), politely decline:
     *"I'm specifically dedicated to answering questions about Sunil Khobragade and his portfolio. Feel free to ask about Sunil's projects, experience, technical skills, or work availability!"*
2. **EXACT & COMPLETE SCOPE (NEITHER TOO SHORT NOR TOO LONG)**:
   - Answer completely and accurately what the user asked about Sunil and his work.
   - Do NOT add unasked extra history, unsolicited sales pitches, or conversational fluff.
   - Give exactly as much information as was requested — nothing more, nothing less.
3. **PORTFOLIO SHORTCUTS & LINKS**:
   - **Projects**: [Pulse Chat](/projects/pulse-chat), [AI LMS](/projects/ai-enabled-lms), [E-Commerce](/projects/e-commerce-platform), [Booking System](/projects/real-time-appointment-booking)
   - **Experience**: [/work](/work)
   - **Tech Stack**: [/tech-stack](/tech-stack)
   - **Consultation & Hire**: [/tools/appointment](/tools/appointment) | Email: sunilkhobragade@proton.me | Phone: +91 74989 50562
`;
