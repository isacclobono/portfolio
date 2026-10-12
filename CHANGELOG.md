# Engineering Changelog

All notable changes to the SK Builds portfolio platform are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.10.2] - 2026-10-12

### Changed
- **ChatGPT-Grade Conversational Precision**: Enforced laser-focused single-domain responses in SK Agent. When asked for skills, it delivers ONLY categorized technical proficiencies with a link to [Tech Stack](/tech-stack)—completely suppressing unasked job histories, project tables, or education credentials.
- **Context Pollution Safeguards**: In `/api/chat`, prior assistant responses in client history are automatically sanitized and truncated to 250 characters, preventing the model from mimicking previous bloated responses or legacy IndexedDB transcripts.
- **Preamble & Header Suppression**: Removed decorative introductory banners and executive summaries for domain questions, ensuring answers begin immediately with the requested data.
- **Calibrated Inference Determinism**: Set model temperature to `0.1` and max tokens to `800` on Groq LPU inference for tight, predictable answers under 150 words.

### Architecture
- **Version Bump**: Bumped application release version to `2.10.2` in `package.json`.
- **Changelog Synchronization**: Updated documentation across `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.1] - 2026-10-12

### Changed
- **Conversational Scoping & Anti-Resume-Dumping**: Re-engineered SK Agent system prompt and conversational constraints so that queries answer ONLY the requested topic (e.g., skills, experience, projects, education) with ChatGPT-like precision rather than dumping the entire resume.
- **Calibrated Response Brevity**: Tuned response length to a focused 120–250 words with categorized bullet points and a single contextual link to prevent message wall-of-text fatigue.
- **Intent-Level Typo Resilience**: Built phonetic and typo-resilient prompt handling for misspellings (e.g. `eperience`, `skils`, `projecs`) without prompting or commentary.
- **Offline Fallback Engine Modernization**: Upgraded keyword prioritization in `Chatbot.astro` so technical skills and framework queries take precedence over broad job/work matchers.

### Architecture
- **Inference Optimization**: Calibrated Groq LPU temperature to `0.2` and token limits to `1200` for deterministic, focused generation.
- **Version Bump**: Bumped application release version to `2.10.1` in `package.json`.

---

## [2.10.0] - 2026-10-12

### Added
- **5 New Essential Developer Utilities** (Suite expanded from 15 to 20 tools):
  - **cURL Converter (`/tools/curl-converter`)**: Bidirectional parser generating client-side requests across JavaScript `fetch`, Axios, Python `requests`, Node.js `http`/`https`, and Go `net/http` from raw cURL commands with one-click clipboard copying.
  - **JSON Formatter & Validator (`/tools/json-formatter`)**: Real-time syntax validation, customizable indentation (2 spaces, 4 spaces, tabs), alphabetical key sorting, minification, and byte-savings computation.
  - **Unix Epoch Timestamp Converter (`/tools/timestamp-converter`)**: Live-ticking epoch clocks in seconds and milliseconds with two-way parsing between Unix timestamps and ISO 8601/UTC/Local/Relative human dates.
  - **Linux Permissions Chmod Calculator (`/tools/chmod-calculator`)**: Interactive POSIX permission matrix (Owner, Group, Others) with synchronized octal (e.g. `755`, `644`) and symbolic (`-rwxr-xr-x`) values, terminal command builder (`chmod`, `chown`), and security warning indicators.
  - **HTML Entity Encoder & Decoder (`/tools/html-entity-encoder`)**: Full-featured sanitizer converting between plain text, named HTML entities, decimal codes, and hexadecimal values with dedicated XSS protection mode and HTML tag removal.

### Architecture
- **Catalog & Sitemap Synchronization**: Added all 5 utilities to developer tools catalog (`/tools`), footer navigation, XML sitemap (`/sitemap.xml`), and the Global Command Palette (`Ctrl+K`).
- **Zero Server Telemetry**: Maintained 100% client-side privacy across all utilities with zero remote telemetry or server round-trips.
- **Version Bump**: Bumped package version to `2.10.0`.

---

## [2.9.1] - 2026-10-12

### Changed
- **Engineering Publications Masterclass Overhaul**: Completely rewrote and expanded all 19 blog publications in `src/content/blog/` into deep, authoritative, production-grade architectural writeups with ASCII topology diagrams, real-world benchmarks, and robust TypeScript/Python/SQL implementations.
- **Dynamic Reading Times**: Updated `src/pages/blog/[slug].astro` to calculate reading time dynamically from markdown body word count (averaging 220 wpm).
- **Footer UI Modernization**: Removed all bullet dot (`•`) separators across all 5 footer sections (`Navigation`, `Developer Tools`, `Publications`, `Platform`, `Connect`).
- **Interactive Link Arrows**: Added subtle directional arrow icons (`↗`) to all footer links with micro-animated hover states (`translate(1.5px, -1.5px)`) and cyan accent highlights.
- **Header Search Cleanup**: Hidden redundant header search button on desktop and laptop viewports (`> 640px`) to declutter the top navigation bar while keeping the floating Command Palette dock (`Ctrl+K`) as the primary fast-access shortcut.

### Architecture
- Bumped application release version to `2.9.1` in `package.json`.
- Updated release history and component documentation.

---

## [2.9.0] - 2026-10-12

### Added
- **5 In-Depth Engineering Publications**:
  - `Building Resilient AI Agents with Function Calling & Structured JSON Schemas`: Designing fail-safe LLM tool orchestration, Pydantic/Zod schema validation, self-correcting error loops, and deterministic execution.
  - `Distributed Rate Limiting at Scale: Token Bucket vs. Sliding Window with Redis & Lua`: Implementing atomic, sub-millisecond API rate limiting with Redis Lua scripts, sliding window counters, and tier-based throttling.
  - `Scaling High-Throughput PostgreSQL: Declarative Partitioning & Real-Time CDC with Debezium`: Managing terabyte-scale time-series tables with declarative range partitioning, zero-downtime partition pruning, and Kafka CDC pipelines.
  - `Passwordless Authentication with Passkeys and WebAuthn: Complete Implementation Blueprint`: Architecting biometric, phishing-resistant authentication using FIDO2 WebAuthn ceremony flows, hardware keys, and Node.js.
  - `Kubernetes Canary Deployments with Istio Service Mesh & Automated Prometheus Rollbacks`: Automating zero-downtime traffic splitting, progressive canary rollouts, and automated error-rate rollback triggers in Kubernetes.
- Expanded technical knowledge base to 19 publications across AI, Distributed Systems, Databases, Edge Architecture, and DevOps.
- Indexed all 19 publications in the Global Command Palette (`Ctrl+K`) with domain tags, search keywords, and instant navigation.
- Added all 5 new publication URLs to XML sitemap (`/sitemap.xml`) and RSS 2.0 syndication feed (`/rss.xml`).

### Architecture
- Verified Content Layer schema validation (`src/content.config.ts`) across all 19 markdown articles.
- Synchronized package release version to `2.9.0`.

---

## [2.8.2] - 2026-09-18

### Added
- Built floating left-center search dock with frosted glassmorphism styling and platform-aware keyboard shortcut badges (`Ctrl+K` / `⌘K`).
- Indexed canonical pages, featured projects, architecture blog posts, developer tools, and quick actions with fuzzy keyword matching.
- Added category filter tabs (All, Projects, Blog, Tools, Pages, Actions) for instant domain-specific filtering.
- Integrated full keyboard navigation (↑/↓ arrows to navigate, Enter ↵ to execute action, Escape to close).

### Architecture
- Added smart "Ask SK Agent instead" fallback button passing unmatched search queries directly to the AI chatbot.
- Engineered responsive touch-friendly mobile dock collapsing into a thumb-accessible circular action trigger.

---

## [2.8.1] - 2026-08-20

### Added
- Integrated Web Speech API with continuous streaming (`interimResults = true`) to transcribe speech live directly inside the message input field.
- Added pulsing recording ring animation indicating active microphone input state.
- Added instant "Export Transcript" feature generating formatted Markdown (`.md`) conversation logs with timestamps.

### Changed
- Simplified action toolbar by removing attachment, emoji, and GIF buttons in favor of a focused, voice-first input experience.

---

## [2.8.0] - 2026-07-15

### Added
- Implemented native Markdown table parser converting raw GFM table syntax into responsive, horizontally scrollable HTML tables.
- Replaced header graphics with the official SK brand vector monogram logo badge.

### Architecture
- Enforced strict portfolio-only domain boundaries preventing off-topic drift and declining non-portfolio questions with polite redirects.
- Calibrated response generation prompts and token limits (450 tokens) to provide complete answers matching the exact user query.
- Docked chat launcher and modal window to the bottom-left corner with multi-directional drag resizing handles.

---

## [2.7.0] - 2026-06-10

### Added
- Full Progressive Web App (PWA) installation, Service Worker caching strategies (`/sw.js`), and 4 quick launch app shortcuts.
- Adaptive maskable vector icons and offline navigation shell.

---

## [2.6.0] - 2026-05-02

### Architecture
- Migrated content architecture to official Astro Content Layer API (`src/content.config.ts`) with `glob()` loaders.
- Adopted Vite build pipeline for sub-second hot module reloading and optimized static asset hashing.
