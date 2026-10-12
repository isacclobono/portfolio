# Engineering Changelog

All notable changes to the SK Builds portfolio platform are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.10.13] - 2026-10-12

### Changed
- **Landing Page Hero CTA Consolidation**:
  - Removed all 3 prior buttons (`Book Consultation`, `Developer Tools`, `Ask AI Copilot`) from the landing page hero section.
  - Replaced with a single prominent `"Book Appointment"` CTA button linking directly to `/tools/appointment`.
- **Custom 2-Column Unified Booking Interface with Live Calendly REST API (`/tools/appointment`)**:
  - Engineered a custom 2-column unified card with **zero space between columns** (`gap: 0`), featuring a crisp vertical border divider.
  - Left column: Consultation details, session meta chips, selected slot banner, input fields (Name, Email, Agenda), and `"Confirm Appointment with Calendly"` CTA.
  - Right column: Interactive calendar matrix with live availability dots, month navigation, 12h/24h toggle, and responsive slot pill grid.
  - Connected live to Calendly REST API (`https://api.calendly.com/event_type_available_times`) using Sunil's Personal Access Token to query real-time slot availability.
  - Executed fully programmatic booking in the background via Calendly REST API (`POST https://api.calendly.com/invitees`) without calling any Calendly UI or popup widgets at the end.
  - Transitions to an instant in-page confirmation card displaying scheduled appointment timestamps, attendee details, Google Meet link status, and Calendly reschedule/cancel management links.
  - Completely removed all Google Calendar references and dependencies.

---

## [2.10.12] - 2026-10-12

### Added
- **Centralized Global Color Design Token System (`src/styles/global.css`)**: Consolidated all raw hex and rgba colors across the repository into reusable CSS variables declared in `:root` and `[data-theme="light"]`:
  - **Brand & Action Blues**: `--color-blue-50` through `--color-blue-900`, `--color-blue-glow`, and `--color-blue-badge-*`.
  - **Sky & Cyan Accents**: `--color-sky-400` through `--color-sky-700`, `--color-cyan-400` through `--color-cyan-600`.
  - **Status Greens & Emeralds**: `--color-green-400` through `--color-green-700`, `--color-emerald-400` through `--color-emerald-700`.
  - **Alerts, Errors & Warnings**: `--color-red-400` through `--color-red-700`, `--color-amber-400` through `--color-amber-600`, `--color-yellow-500`.
  - **Creative Accents**: `--color-purple-400` through `--color-purple-700`, `--color-pink-400` through `--color-pink-600`.
  - **Neutral Slate Scale**: `--color-slate-50` through `--color-slate-950`.
  - **Glass & Backdrop Utilities**: `--glass-bg-subtle`, `--glass-bg-base`, `--glass-bg-medium`, `--glass-border-subtle`, `--glass-border-hover`, `--overlay-backdrop`.

### Architecture
- **Version Bump**: Bumped release version to `2.10.12` in `package.json`.
- **Documentation**: Synchronized changelog entries across `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.11] - 2026-10-12

### Changed
- **Technical Skills Single-Column Layout Overhaul**: Redesigned the landing page **Technical Skills** section out of a cramped 2-column layout into an expansive, full-width single-column flow (`.skills-single-column`):
  - Each skill category spans the full container width with an accent indicator bullet, clear title, and live count badge (`X skills`).
  - Tech stack pills wrap naturally across the full width with comfortable padding (`0.28rem 0.65rem`), distinct monospace typography, and interactive hover lighting.
  - Eliminated awkward line wraps and text crowding for long technology descriptors.

### Architecture
- **Version Bump**: Bumped release version to `2.10.11` in `package.json`.
- **Documentation**: Synchronized changelog entries across `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.10] - 2026-10-12

### Changed
- **System Status UI Modernization (`/status`)**: Redesigned the operational status page to eliminate all card clutter, boxed containers, and heavy background fills in favor of a modern, fully transparent, minimalist layout:
  - Replaced the bulky green hero card with an elegant, glowing beacon pill badge (`All Systems Operational`) and clean header typography.
  - Converted boxed metric cards into a borderless, transparent 4-column performance strip (`Core Web Vitals`, `Edge Latency`, `LLM Inference`, `Uptime`).
  - Streamlined the core services list into flat, transparent rows with inline tech stack details, uptime metrics, and compact green operational badges.
  - Replaced boxed incident history cards with a clean, borderless audit confirmation notice.

### Architecture
- **Version Bump**: Bumped release version to `2.10.10` in `package.json`.
- **Documentation**: Synchronized release log in `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.9] - 2026-10-12

### Changed
- **Official Contact Email Standardization**: Unified and updated Sunil Khobragade's primary contact email across the entire codebase to `x.kksunil@gmail.com`.
  - Updated site configuration (`src/data/site.ts`), electronic vCard business card (`/sunil-khobragade.vcf`), and AI chatbot knowledge base (`src/data/chatbotKnowledge.ts`).
  - Updated Global Search copy actions, AI assistant prompts, Appointment booking calendar templates, Project estimator proposals, and OpenGraph metadata.
  - Replaced legacy addresses across legal notices (`/terms`, `/privacy`) and documentation.

### Architecture
- **Version Bump**: Bumped release version to `2.10.9` in `package.json`.
- **Documentation**: Synchronized changelog entries across `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.8] - 2026-10-12

### Added
- **Dedicated Download Center (`/download`)**: Created an official download center featuring:
  - Direct download and in-browser preview for Sunil Khobragade's verified Curriculum Vitae / Resume (`/SUNIL_KHOBRAGADE_RESUME.pdf`).
  - Electronic Business Card (`/sunil-khobragade.vcf`) for 1-click contact import into iOS, Android, and Outlook.
  - Standardized `llms.txt` context ingestion file, RSS article syndication feed, and sitemap resources.
  - Added route aliases and sitemap registration (`/download` and `/downloads`).

### Changed
- **Technical Skills Section Modernization**: Redesigned the landing page **Technical Skills** into a curated, balanced 2-column responsive layout (`grid-template-columns: repeat(2, 1fr)`). Replaced plain text wrapping with distinct micro-badge pills (`.skill-pill`) featuring subtle accent indicators, glass tint, hover states, and an explicit `"Explore full stack →"` navigation link to `/tech-stack`.

### Architecture
- **Version Bump**: Bumped release version to `2.10.8` in `package.json`.
- **Documentation**: Synchronized changelog entries across `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.7] - 2026-10-12

### Changed
- **Fully Transparent Card Backgrounds**: Removed all card backgrounds and hover background tints across all listing views (`.card-link`, `.post-card`, `.tech-row-card`), ensuring 100% transparency at all times (both default and on hover).
- **Border-Free List Views**: Removed bottom border dividers (`border-bottom`) and container top borders across all project, article, and tech stack listings, achieving a seamless, pure typography aesthetic with smooth title hover highlights and subtle arrow nudges.
- **Landing Page Technical Skills & Highlights**: Converted the **Technical Skills** grid (`.skill-card`, `.skill-pill`) and engineering highlights (`.bento-stat-card`) on the landing page into a fully transparent, border-free editorial layout with elegant dot-separated monospace metadata pills.

### Architecture
- **Version Bump**: Bumped release version to `2.10.7` in `package.json`.
- **Documentation**: Synchronized release log in `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.6] - 2026-10-12

### Changed
- **Card-Free Simple Projects List View**: Replaced heavy boxed cards (`.card-link`) with an ultra-clean, minimalist list view. Removed dark card backgrounds, bulky container borders, and chunky pill buttons in favor of hairline dividers (`border-bottom`), editorial spacing, and subtle hover interactions.
- **Minimalist Inline Technology Tags**: Converted bulky tag badges into lightweight, dot-separated monospace metadata (`Node.js • React • WebSockets • Redis`), reducing visual clutter while preserving key technical stack insights.
- **Universal Simple List Consistency**: Applied the card-free divider pattern across the Projects index (`/projects`), Homepage Recent Projects, Homepage Recent Blog Posts, and Tools directory (`/tools`).

### Architecture
- **Version Bump**: Bumped release version to `2.10.6` in `package.json`.
- **Documentation**: Synchronized changelog entries across `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.5] - 2026-10-12

### Changed
- **Unified Reusable Error Layout (`src/layouts/ErrorLayout.astro`)**: Re-engineered error pages into an expansive, tall, and centered layout (`min-height: 80vh`), replacing bloated pseudo-terminal diagnostic cards and 6-card destination grids with monumental status watermarks, clean HTTP badges, and lightweight inline navigation.
- **Card Clutter Elimination**: Removed all nested card grids from `/404`, `/500`, `/401`, `/403`, and `/503`, shifting to clean typography and inline destination links (`Projects • Experience • Tools • Blog • Status • Contact`).
- **Codebase Deduplication**: Unified all 5 error routes onto `ErrorLayout.astro`, eliminating over 1,000 lines of redundant HTML and CSS boilerplate.

### Architecture
- **Version Bump**: Bumped release version to `2.10.5` in `package.json`.
- **Documentation**: Synchronized changelog records in `CHANGELOG.md` and `src/pages/changelog.astro`.

---

## [2.10.4] - 2026-10-12

### Changed
- **Footer Telemetry Simplification**: Converted the visitor telemetry display from a multi-card block into a lightweight, clean, one-liner status bar styled with small monospace typography (`IP`, `Date`, `Visits`, `Ping`), eliminating bulky cards for a cleaner aesthetic.
- **Resume Button Styling Refinement**: Updated footer resume button copy to `"Download Resume"` with standard capitalization and uppercase `"PDF"` badge.

### Architecture
- **Version Bump**: Bumped release version to `2.10.4` in `package.json`.
- **Documentation**: Updated release records across `CHANGELOG.md` and `/changelog`.

---

## [2.10.3] - 2026-10-12

### Added
- **Footer Resume Download Button**: Added direct small-letters `"download my resume"` action button (`/SUNIL_KHOBRAGADE_RESUME.pdf`) with PDF format badge, download vector icon, and hover micro-animations in the footer bio strip.
- **Live Visitor & Client Telemetry Console**: Engineered real-time client diagnostics console in the footer featuring:
  - **Public IP Address Detection**: High-speed, zero-log IP detection using public `api64.ipify.org` HTTPS resolver with `ipapi.co` secondary failover.
  - **Live Local Date & Clock**: Real-time ticking system clock synchronizing with visitor's locale and timezone.
  - **Lifetime Visited Counter**: Session-guarded visitor counter tracking lifetime browser visits via `localStorage` and `sessionStorage`.
  - **Network Latency Ping & Timezone**: Live round-trip network ping measurement (`ms`) alongside client IANA timezone display.
  - **Security Telemetry**: Explicit HTTPS & TLS 1.3 encryption indicator with live pulsing status indicator.

### Architecture
- **Static Asset Synchronization**: Copied `SUNIL_KHOBRAGADE_RESUME.pdf` to `public/` directory for direct browser downloads.
- **AI Agent Resume Awareness**: Updated `CHATBOT_SYSTEM_PROMPT` to provide direct resume download links when requested.
- **Version Bump**: Bumped release version to `2.10.3` in `package.json`.

---

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
