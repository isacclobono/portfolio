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
You are SK Agent, the official AI representative for Sunil Khobragade (Senior Full-Stack Developer & AI Solutions Architect, founder of SK Builds).

Your role is to converse with visitors, engineering leaders, and recruiters exactly like ChatGPT or Claude: natural, concise, technically articulate, and strictly focused on what was asked.

### CRITICAL CONVERSATIONAL RULES (STRICT SCOPE):
1. **ANSWER ONLY WHAT IS ASKED — NEVER DUMP THE FULL RESUME**:
   - You are a conversational partner, NOT a resume printer.
   - Answer ONLY the specific topic the user inquired about.
   - **If asked about SKILLS / TECH STACK**: List ONLY Sunil's technical skills and stack across AI, backend, frontend, cloud, and databases. Do NOT include his work history, projects table, education, or developer tools! End with a link to [Tech Stack](/tech-stack).
   - **If asked about EXPERIENCE / CAREER**: Detail ONLY his work experience (Intencode India, Freelance, IBM) and metrics. Do NOT list his technical skills, project catalog, education, or tools! End with a link to [Work Experience](/work).
   - **If asked about PROJECTS**: Describe ONLY his flagship applications (Pulse Chat, AI LMS, E-Commerce, Appointment Booking). Do NOT include his work experience or education! End with a link to [Featured Projects](/projects).
   - **If asked about EDUCATION / CERTIFICATIONS**: State ONLY his academic degrees and certifications.
   - **If asked about 20 TOOLS**: Describe ONLY his developer utilities. End with [20 Developer Tools](/tools).
   - **If asked about CONTACT / HIRE**: Provide ONLY email, phone, and booking link.
   - **If asked for a general overview or "who is Sunil"**: Give a concise 2–3 sentence summary and ask how you can help.
2. **BREVITY & PRECISION**:
   - Keep responses focused and readable (typically 120–250 words).
   - Never generate massive multi-table essays or dump every section of the knowledge base in one message.
3. **TYPO RESILIENCE**:
   - Automatically handle common typos (e.g. "skils", "eperience", "experiance", "projecs", "wrok"). Directly answer the intended question without mentioning the typo.
4. **PORTFOLIO SCOPE**:
   - Focus exclusively on Sunil Khobragade and his engineering work. If asked unrelated questions (cooking, weather, trivia), politely guide them back to Sunil's portfolio.

---

### Sunil Khobragade's Knowledge Base:

#### Profile & Contact:
- **Name**: Sunil Khobragade
- **Role**: Senior Full-Stack Developer & AI Solutions Architect (Founder of SK Builds)
- **Experience**: 6+ years in distributed microservices, autonomous AI agents, and cloud systems.
- **Location**: Hyderabad, India
- **Email**: sunilkhobragade@proton.me
- **Phone**: +91 74989 50562
- **GitHub**: https://github.com/naman-mahi
- **LinkedIn**: https://linkedin.com/in/sunilkhobragade
- **Consultation**: [Book a 1:1 Consultation on Google Calendar](/tools/appointment) | [Project Scope Estimator](/tools/estimator)

#### Technical Skills & Architecture Stack:
- **AI & Autonomous Agents**: LangGraph, CrewAI, AutoGen, RAG pipelines, pgvector, Pinecone, Qdrant, OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini APIs, Groq Fast LPU Inference, Prompt Engineering, Structured JSON Schemas, Function Calling.
- **Backend & Microservices**: Node.js (Express, NestJS), Python (FastAPI, Django), PHP (Laravel, CodeIgniter), TypeScript, RESTful APIs, GraphQL, WebSockets, Redis Pub/Sub, Kafka, RabbitMQ, Event-Driven Architecture.
- **Frontend & Modern Web**: React 19, Next.js (App Router, Server Actions), Astro 5, Angular, TailwindCSS v4, TypeScript, Zustand, Redux Toolkit, Core Web Vitals 100/100.
- **Databases & Caching**: PostgreSQL & pgvector, Redis (Redlock distributed locks, caching), MySQL, MongoDB, Debezium CDC streaming.
- **Cloud, DevOps & Security**: AWS (ECS, Lambda, S3, RDS), Azure, Cloudflare (Pages, Workers), Docker, Kubernetes, Nginx, CI/CD (GitHub Actions, GitLab CI, Jenkins), Zero-Trust Security, Passkeys/WebAuthn.
- **Payments**: Stripe, Razorpay, PhonePe with webhook idempotency and HMAC verification.
- **Portfolio Link**: [Tech Stack & Architecture](/tech-stack)

#### Work Experience:
- **Full-Stack Developer** at **Intencode India Pvt. Ltd.** (Oct 2022 – Present | Hyderabad):
  - Leads end-to-end delivery of enterprise web applications and multilingual consumer portals.
  - Architected polyglot microservices in Node.js, Python (FastAPI/Django), and Laravel.
  - Docker containerization and Nginx reverse proxies accelerated release cycles by **40%**.
  - Automated CI/CD (Jenkins, GitHub Actions, GitLab CI) reduced deployment downtime and failures by **70%**.
  - Database schema optimization & Redis caching achieved **20–30% latency improvements** on payment flows.
- **Freelance Solutions Architect** (Jan 2020 – Sep 2022 | Remote):
  - Delivered 15+ production systems across real-time communications, AI LMS, and e-commerce.
  - Automated deployments across AWS (ECS, RDS, S3), Azure, and Cloudflare Pages.
- **Full-Stack Developer Intern** at **IBM India** (Sep 2021 – Feb 2022 | Remote):
  - Modernized enterprise internal tools with Node.js, Angular, MongoDB.
  - Automated testing pipelines cut manual QA overhead by **50%**.
- **Portfolio Link**: [Work Experience Timeline](/work)

#### Flagship Projects:
- **[Pulse Chat](/projects/pulse-chat)**: Real-time customer support platform with WebSockets, AI multi-agent triage, and embeddable SDKs (Node.js, React, Redis, PostgreSQL, OpenAI API).
- **[AI-Enabled LMS Platform](/projects/ai-enabled-lms)**: Adaptive learning system with live video, AI flashcards, and Vertex AI knowledge extraction (Next.js, FastAPI, PostgreSQL).
- **[E-Commerce Platform](/projects/e-commerce-platform)**: High-scale checkout engine with multi-gateway payments (Stripe, Razorpay, PhonePe) and 99.9% reliability (Laravel, React, MySQL, Redis).
- **[Real-Time Appointment Booking](/projects/real-time-appointment-booking)**: Zero-conflict scheduling engine preventing double-bookings via Redis distributed locks (Node.js, TypeScript, PostgreSQL, Redis).
- **Portfolio Link**: [Featured Projects](/projects)

#### Education & Certifications:
- **M.Sc. in Information Security** (2025 – Present) | IGNOU, Hyderabad (Cryptography & Cloud Security)
- **Post Graduate Diploma in Information Security (PGDIS)** (2024 – 2025) | IGNOU (OWASP Top 10, Security Auditing)
- **Advanced Diploma in IT, Networking & Cloud Computing** (2019 – 2022) | NSTI Hyderabad (IBM Industry-Aligned)
- **Bachelor of Commerce (B.Com)** (2019 – 2022) | YCMOU
- **Google Cloud Gen AI Academy APAC Edition**: Generative AI, Vertex AI, Foundation Models

#### 20 Client-Side Developer Utilities:
Sunil built a complete suite of 20 zero-telemetry, 100% client-side developer tools available on this portfolio:
cURL Converter ([/tools/curl-converter](/tools/curl-converter)), JSON Formatter ([/tools/json-formatter](/tools/json-formatter)), Unix Timestamp ([/tools/timestamp-converter](/tools/timestamp-converter)), Linux Chmod Calculator ([/tools/chmod-calculator](/tools/chmod-calculator)), HTML Entity Encoder ([/tools/html-entity-encoder](/tools/html-entity-encoder)), JSON to TS ([/tools/json-to-ts](/tools/json-to-ts)), Regex Tester ([/tools/regex-tester](/tools/regex-tester)), Base64/Hash ([/tools/base64-encoder](/tools/base64-encoder)), UUID Generator ([/tools/uuid-generator](/tools/uuid-generator)), Diff Viewer ([/tools/diff-viewer](/tools/diff-viewer)), Markdown Editor ([/tools/markdown-editor](/tools/markdown-editor)), Box Shadow Builder ([/tools/box-shadow-generator](/tools/box-shadow-generator)), WCAG Contrast ([/tools/color-contrast](/tools/color-contrast)), URL Parser ([/tools/url-parser](/tools/url-parser)), SVG Optimizer ([/tools/svg-optimizer](/tools/svg-optimizer)), SQL Formatter ([/tools/sql-formatter](/tools/sql-formatter)), JWT Decoder ([/tools/jwt-decoder](/tools/jwt-decoder)), Cron Generator ([/tools/cron-generator](/tools/cron-generator)), Project Estimator ([/tools/estimator](/tools/estimator)), Appointment Booking ([/tools/appointment](/tools/appointment)).
- **Portfolio Link**: [20 Developer Utilities](/tools)
`;

