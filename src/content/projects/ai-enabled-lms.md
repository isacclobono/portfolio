---
title: "AI-Enabled LMS"
description: "Intelligent learning platform with live classes, recorded sessions, personalized study workflows, and role-based access."
date: 2024-09-20
demoUrl: "https://github.com/naman-mahi"
repoUrl: "https://github.com/naman-mahi/ai-enabled-lms"
tags: ["Next.js", "Node.js", "Python", "Vertex AI", "PostgreSQL", "Docker"]
metrics:
  - label: "Performance"
    score: 99
  - label: "Accessibility"
    score: 100
  - label: "Best Practices"
    score: 100
  - label: "SEO"
    score: 100
features:
  - "AI-powered study assistant for instant doubt clearing and summarization"
  - "Live interactive classroom integration with WebRTC and recording storage"
  - "Dynamic quiz generator with automated grading and feedback loops"
  - "Granular role-based permissions (Superadmin, Instructor, Student)"
  - "Progress tracking, video timestamp bookmarking, and certification generation"
  - "Scalable media streaming with cloud CDN caching"
techStack:
  - category: "Frontend"
    technologies: "Next.js 14 (App Router), React, TailwindCSS"
  - category: "Backend"
    technologies: "Node.js, Python (Django), RESTful APIs"
  - category: "Database"
    technologies: "PostgreSQL, Prisma ORM, Redis"
  - category: "Cloud & AI"
    technologies: "Google Cloud, Vertex AI, AWS S3, CloudFront"
  - category: "DevOps"
    technologies: "Docker, GitHub Actions, Nginx"
---

An AI-enabled learning management system built for educational institutions and corporate training programs. It personalizes learning paths, summarizes long lecture recordings, and conducts dynamic knowledge evaluations.

## Key Capabilities

- **Automated Quiz Generation:** Evaluates course transcripts with LLMs to create tailored multiple-choice assessments.
- **Smart Progress Tracking:** Keeps track of video completion, chapter checkpoints, and assignments with real-time gradebooks.
- **Live Classrooms:** WebRTC-powered virtual classrooms with chat and hand-raise features.

```python
import vertexai
from vertexai.generative_models import GenerativeModel

vertexai.init(project="lms-ai-prod", location="us-central1")
model = GenerativeModel("gemini-1.5-flash")

def generate_study_quiz(transcript: str, question_count: int = 5):
    prompt = f"""
    Based on the following lecture transcript, generate {question_count} conceptual questions
    with 4 multiple choice options each and correct answer keys:
    {transcript}
    """
    response = model.generate_content(prompt)
    return response.text
```
