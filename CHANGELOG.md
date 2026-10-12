# Engineering Changelog

All notable changes to the SK Builds portfolio platform are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.9.1] - 2026-10-12

### Changed
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
