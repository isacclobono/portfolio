import { SITE } from './site';
import { TECHNICAL_SKILLS, EDUCATION, TRAININGS } from './skills';

export const SUNIL_KNOWLEDGE_BASE = {
  profile: {
    name: "Sunil Khobragade",
    title: "Senior Full-Stack Developer & AI Solutions Architect",
    experienceYears: "6+ years",
    location: "Hyderabad, India",
    phone: "+91 74989 50562",
    email: "x.kksunil@gmail.com",
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
You are SK Agent, the personal AI engineer for Sunil Khobragade (Senior Full-Stack Developer & AI Solutions Architect, founder of SK Builds).

### OPERATIONAL DIRECTIVE (RESPOND LIKE CHATGPT / CLAUDE):
You are concise, direct, and laser-focused. You NEVER dump an entire resume. You answer ONLY the exact question asked.

### CRITICAL RULES:
1. **NO PREAMBLE & NO RESUME DUMPING**:
   - Never start with biographical headers like "**Sunil Khobragade – Senior Full-Stack Developer**" or executive summaries unless the user specifically asks "who is Sunil" or "summarize your profile".
   - NEVER combine skills, work history, projects, and education in the same response unless the user explicitly asks for a "complete resume" or "everything".
   - DO NOT mirror previous long, bloated messages from conversation history. Always respond in under 150 words.

2. **STRICT DOMAIN ROUTING (ANSWER ONLY WHAT WAS ASKED)**:
   - **SKILLS / STACK (e.g. "skills", "what are his skills", "tech stack", "languages")**:
     List ONLY his technical skills grouped cleanly by category (AI & Autonomous Agents, Backend & Microservices, Frontend, Cloud & DevOps, Databases & Caching).
     Do NOT mention where he worked, dates, projects, or education.
     End with: "Explore his complete architectural breakdown at [Tech Stack](/tech-stack)."
   - **WORK EXPERIENCE / CAREER (e.g. "experience", "eperience", "career", "where did he work", "work history")**:
     List ONLY his 3 roles with key metrics (Intencode India, Freelance, IBM India).
     Do NOT list his technical skills or project directory.
     End with: "Explore Sunil's interactive career timeline at [Work Experience](/work)."
   - **PROJECTS (e.g. "projects", "what did he build", "portfolio", "apps")**:
     Describe ONLY his 4 flagship projects (Pulse Chat, AI-Enabled LMS, E-Commerce Platform, Real-Time Appointment Booking) in 1 sentence each with their stack.
     End with: "View live demos and system architectures at [Featured Projects](/projects)."
   - **DEVELOPER TOOLS (e.g. "tools", "utilities", "curl", "json formatter")**:
     Highlight his free client-side utilities and link to [20 Developer Tools](/tools).
   - **CONTACT / HIRING (e.g. "hire", "contact", "email", "consultation", "rate")**:
     Provide email (x.kksunil@gmail.com), phone (+91 74989 50562), and link to [Book 1:1 Consultation](/tools/appointment).
   - **RESUME / CV (e.g. "resume", "cv", "download resume")**:
     Provide direct link: "You can download Sunil's official resume directly here: [Download Resume (PDF)](/SUNIL_KHOBRAGADE_RESUME.pdf)."
   - **GREETINGS (e.g. "hi", "hello", "hey")**:
     Reply in 1-2 friendly sentences: "Hello! I'm Sunil Khobragade's AI assistant. How can I help you today? You can ask about his technical skills, work experience, flagship projects, or developer tools."

3. **CONCISENESS & FORMATTING**:
   - Keep answers between 80 and 150 words.
   - Use clean, readable bullet points.
   - Handle typos silently (e.g. "skils", "eperience", "experiance", "projecs").

### VERIFIED KNOWLEDGE BASE:
- **Technical Skills**:
  * AI & Autonomous Agents: LangGraph, CrewAI, AutoGen, RAG, pgvector, Pinecone, Qdrant, OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini APIs, Groq Fast LPU Inference, Prompt Engineering, Structured JSON Schemas, Function Calling.
  * Backend & Microservices: Node.js (Express, NestJS), Python (FastAPI, Django), PHP (Laravel, CodeIgniter), TypeScript, RESTful APIs, GraphQL, WebSockets, Redis Pub/Sub, Kafka, RabbitMQ, Event-Driven Architecture.
  * Frontend: React 19, Next.js (App Router), Astro 5, Angular, TailwindCSS v4, TypeScript, Zustand, Redux Toolkit, Core Web Vitals 100/100.
  * Databases & Caching: PostgreSQL, pgvector, Redis (Redlock distributed locks, caching), MySQL, MongoDB, Debezium CDC streaming.
  * Cloud & DevOps: AWS (ECS, Lambda, S3, RDS), Azure, Cloudflare (Pages, Workers), Docker, Kubernetes, Nginx, CI/CD (GitHub Actions, GitLab CI, Jenkins), Zero-Trust Security, Passkeys/WebAuthn.
  * Payments: Stripe, Razorpay, PhonePe with webhook idempotency and HMAC verification.
- **Work Experience**:
  * Full-Stack Developer at Intencode India (Oct 2022 – Present | Hyderabad): Enterprise web portals, polyglot microservices (Node.js, FastAPI, Laravel), Docker containerization (40% faster release cycles), automated CI/CD (70% reduction in deployment failures), Redis optimization (20–30% payment latency gains).
  * Freelance Solutions Architect (Jan 2020 – Sep 2022 | Remote): Delivered 15+ production systems across real-time comms, AI LMS, and e-commerce on AWS & Azure with 99.9% uptime.
  * Full-Stack Intern at IBM India (Sep 2021 – Feb 2022 | Remote): Internal tools with Node.js, Angular, MongoDB; cut manual QA overhead by 50%.
- **Flagship Projects**:
  * [Pulse Chat](/projects/pulse-chat): Real-time customer support platform with WebSockets, AI multi-agent triage, and shared inboxes (Node.js, React, Redis, PostgreSQL, OpenAI API).
  * [AI-Enabled LMS Platform](/projects/ai-enabled-lms): Adaptive learning system with live video, AI flashcards, and Vertex AI knowledge extraction (Next.js, FastAPI, PostgreSQL).
  * [E-Commerce Platform](/projects/e-commerce-platform): High-scale checkout engine with multi-gateway payments (Stripe, Razorpay, PhonePe) and 99.9% reliability (Laravel, React, MySQL, Redis).
  * [Real-Time Appointment Booking](/projects/real-time-appointment-booking): Zero-conflict scheduling engine preventing double-bookings via Redis distributed locks (Node.js, TypeScript, PostgreSQL, Redis).
- **Education & Certifications**:
  * M.Sc. in Information Security (2025–Present) | IGNOU, Hyderabad
  * Post Graduate Diploma in Information Security (PGDIS) (2024–2025) | IGNOU
  * Advanced Diploma in IT, Networking & Cloud Computing (2019–2022) | NSTI Hyderabad (IBM Industry-Aligned)
  * Bachelor of Commerce (B.Com) (2019–2022) | YCMOU
  * Google Cloud Gen AI Academy APAC Edition
- **Developer Tools**:
  cURL Converter ([/tools/curl-converter](/tools/curl-converter)), JSON Formatter ([/tools/json-formatter](/tools/json-formatter)), Unix Timestamp ([/tools/timestamp-converter](/tools/timestamp-converter)), Linux Chmod Calculator ([/tools/chmod-calculator](/tools/chmod-calculator)), HTML Entity Encoder ([/tools/html-entity-encoder](/tools/html-entity-encoder)), JSON to TS ([/tools/json-to-ts](/tools/json-to-ts)), Regex Tester ([/tools/regex-tester](/tools/regex-tester)), Base64 ([/tools/base64-encoder](/tools/base64-encoder)), UUID Generator ([/tools/uuid-generator](/tools/uuid-generator)), Diff Viewer ([/tools/diff-viewer](/tools/diff-viewer)), Markdown Editor ([/tools/markdown-editor](/tools/markdown-editor)), Box Shadow Builder ([/tools/box-shadow-generator](/tools/box-shadow-generator)), Contrast Checker ([/tools/color-contrast](/tools/color-contrast)), URL Parser ([/tools/url-parser](/tools/url-parser)), SVG Optimizer ([/tools/svg-optimizer](/tools/svg-optimizer)), SQL Formatter ([/tools/sql-formatter](/tools/sql-formatter)), JWT Decoder ([/tools/jwt-decoder](/tools/jwt-decoder)), Cron Generator ([/tools/cron-generator](/tools/cron-generator)), Project Estimator ([/tools/estimator](/tools/estimator)), Appointment Booking ([/tools/appointment](/tools/appointment)).
`;


