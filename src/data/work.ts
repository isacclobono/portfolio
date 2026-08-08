export interface WorkExperience {
  period: string;
  company: string;
  role: string;
  location?: string;
  points: string[];
}

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    period: "Oct 2022 – Present",
    company: "Intencode India Pvt. Ltd.",
    role: "Full-Stack Developer",
    location: "Hyderabad, India",
    points: [
      "Owned end-to-end delivery of enterprise web applications and multilingual customer portals for global clients, spanning requirements, architecture, development, deployment, and production support.",
      "Built scalable React and Angular frontends with RESTful backend services in Node.js, Laravel, CodeIgniter, Django, and Flask, improving feature delivery speed across product teams.",
      "Designed Node.js microservices, containerized deployments, and release automation with Docker and Nginx, reducing release cycles by 40%.",
      "Implemented CI/CD pipelines with Jenkins, GitHub Actions, and GitLab CI, reducing deployment failures by 70% and improving rollback confidence.",
      "Improved payment reliability and application performance by 20–30% through secure gateway integrations, SQL tuning, Redis caching, API optimization, and indexing."
    ]
  },
  {
    period: "Jan 2020 – Sep 2022",
    company: "Freelance Full-Stack Developer",
    role: "Full-Stack Developer & Solutions Architect",
    location: "Remote",
    points: [
      "Delivered 10+ production-grade platforms across e-commerce, LMS, real-time chat, and appointment booking, owning architecture, implementation, testing, and launch.",
      "Built secure authentication, payment, notification, and admin workflows with REST APIs and reusable frontend components.",
      "Automated deployments with GitHub Actions and GitLab CI and managed production environments across AWS, Azure, and IBM Cloud."
    ]
  },
  {
    period: "Sep 2021 – Feb 2022",
    company: "IBM India",
    role: "Full-Stack Developer Intern",
    location: "Remote",
    points: [
      "Enhanced enterprise internal tools using Node.js, Angular, and MongoDB, improving usability, data access, and operational efficiency for internal teams.",
      "Expanded automated test coverage and streamlined CI/CD workflows, reducing manual release checks by 50%."
    ]
  }
];
