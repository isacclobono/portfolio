export interface SkillCategory {
  title: string;
  skills: string[];
}

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: "Backend & Systems",
    skills: ["Node.js (Express, Fastify)", "PHP (Laravel, CodeIgniter)", "Python (Django, Flask)", "REST APIs", "Microservices", "System Design"]
  },
  {
    title: "Frontend & UI",
    skills: ["React", "Next.js", "Angular", "TypeScript", "JavaScript (ES6+)", "HTML5 / CSS3", "TailwindCSS", "Responsive UI"]
  },
  {
    title: "Databases & Caching",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Query Optimization", "Database Indexing"]
  },
  {
    title: "DevOps, Cloud & CI/CD",
    skills: ["AWS", "Microsoft Azure", "IBM Cloud", "Docker", "Kubernetes", "Nginx", "GitHub Actions", "GitLab CI", "Jenkins", "Linux"]
  },
  {
    title: "Payments & Tools",
    skills: ["Stripe", "Razorpay", "PhonePe", "Postman", "Bruno", "Git / GitHub / GitLab"]
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
