export interface SkillCategory {
  title: string;
  skills: string[];
}

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: "AI, Agents & Generative Systems",
    skills: [
      "AI Agents & Multi-Agent Workflows",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases (Pinecone, Qdrant, pgvector)",
      "LangChain & LlamaIndex",
      "OpenAI, Claude & Gemini APIs",
      "Groq Fast LPU Inference",
      "Prompt Engineering & Context Chunking",
      "Function Calling & Structured Outputs"
    ]
  },
  {
    title: "Backend & Distributed Systems",
    skills: [
      "Node.js (Express, Fastify, Nest.js)",
      "Python (FastAPI, Django, Flask)",
      "PHP (Laravel, CodeIgniter)",
      "TypeScript & JavaScript (ESNext)",
      "Microservices & Event-Driven Architecture",
      "RESTful APIs, GraphQL & gRPC",
      "WebSockets & Real-Time Sync",
      "System Design & High Concurrency"
    ]
  },
  {
    title: "Frontend & Modern Web",
    skills: [
      "React & React Server Components",
      "Next.js (App Router)",
      "Astro (Static & SSR)",
      "Angular & TypeScript",
      "TailwindCSS (v4) & Modern CSS",
      "State Management (Zustand, Redux)",
      "Responsive UI & Core Web Vitals Optimization"
    ]
  },
  {
    title: "Databases, Caching & Message Queues",
    skills: [
      "PostgreSQL & pgvector",
      "Redis (Caching, Pub/Sub, Distributed Locks)",
      "MongoDB & Mongoose",
      "MySQL",
      "RabbitMQ & Apache Kafka",
      "Query Optimization & Database Indexing"
    ]
  },
  {
    title: "Cloud Infrastructure, DevOps & Security",
    skills: [
      "Amazon Web Services (AWS - ECS, Lambda, S3, RDS, CloudFront)",
      "Microsoft Azure & Cloudflare (Workers, Pages)",
      "IBM Cloud",
      "Docker & Container Orchestration",
      "Kubernetes",
      "GitHub Actions CI/CD & GitLab CI",
      "Nginx & Reverse Proxies",
      "Linux Administration & Zero-Trust Security",
      "OWASP Top 10 Web Security"
    ]
  },
  {
    title: "Payments, Integrations & Tooling",
    skills: [
      "Stripe, Razorpay & PhonePe (Webhook Idempotency)",
      "OAuth2, JWT & RBAC Authentication",
      "Postman, Bruno & Swagger/OpenAPI",
      "Git, GitHub Enterprise & GitLab",
      "Vite & Build Tooling"
    ]
  }
];

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  points?: string[];
}

export const EDUCATION: EducationItem[] = [
  {
    period: "2025 – Present",
    degree: "M.Sc. in Information Security",
    institution: "IGNOU, Hyderabad",
    points: [
      "Specializing in cryptography, application security, cloud security posture management, and network defense architectures.",
      "In-depth research on zero-trust architectures, secure API authentication protocols, and identity access management."
    ]
  },
  {
    period: "2024 – 2025",
    degree: "Post Graduate Diploma in Information Security",
    institution: "IGNOU, Hyderabad",
    points: [
      "Covered security auditing, vulnerability assessment, web application security (OWASP Top 10), and incident response.",
      "Practical labs on network security monitoring, packet inspection, threat modeling, and compliance standards."
    ]
  },
  {
    period: "2019 – 2022",
    degree: "Advanced Diploma in IT, Networking & Cloud Computing",
    institution: "NSTI Hyderabad (IBM Industry-Aligned)",
    points: [
      "IBM industry-aligned program covering enterprise Linux administration, networking protocols, and cloud computing.",
      "Hands-on experience in container orchestration with Docker, virtualization, server configuration, and CI/CD pipelines."
    ]
  },
  {
    period: "2019 – 2022",
    degree: "Bachelor of Commerce (B.Com)",
    institution: "YCMOU",
    points: [
      "Focused on business economics, financial management, corporate accounting, and IT applications in business commerce."
    ]
  }
];

export interface TrainingItem {
  title: string;
  issuer: string;
  description: string;
  points?: string[];
}

export const TRAININGS: TrainingItem[] = [
  {
    title: "Gen AI Academy APAC Edition – Hands-on Program",
    issuer: "Google Cloud",
    description: "Built applied AI solutions using Google Cloud, Vertex AI, related APIs, prompt engineering, and solution architecture labs.",
    points: [
      "Designed and deployed generative AI solutions using Vertex AI Foundation Models and Gemini APIs.",
      "Implemented vector search pipelines, prompt engineering strategies, and AI solution architectures."
    ]
  }
];
