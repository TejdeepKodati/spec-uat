# Design Direction — SpecUAT

## 1. Visual Concept
**Enterprise Agile Governance & Audit Studio (Light Swiss / Linear Style)**  
Built for business stakeholders, requirement analysts, product managers, and UAT test leads. Clean, daylight-readable, high-trust documentation workspace emphasizing structured hierarchy, bipartite traceability, and formal sign-off.

## 2. Palette & Semantic Roles
- **Canvas / Background**: `#f8fafc` (Warm Slate-50) — clean corporate paper feel
- **Card / Document Sheet**: `#ffffff` (Pure White) — high-trust structured surface
- **Border / Grid Lines**: `#e2e8f0` (Slate-200) — crisp architectural grid lines
- **Text Primary / Headings**: `#0f172a` (Executive Slate-900) — authoritative typography
- **Text Muted / Body**: `#475569` (Slate-600) — balanced analytical reading contrast
- **Primary / Action**: `#2563eb` (Royal Cobalt-600) — focal interaction and button controls
- **Success / UAT Pass**: `#16a34a` (Forest Green-600) — verified test criteria badge
- **Defect / Orphan Req**: `#dc2626` (Crimson-600) — unmapped criteria or failing UAT steps
- **Jira Metric Accent**: `#0284c7` (Sky-600) — sprint story points and velocity counters

## 3. Typography
- **Primary Sans (Inter / Plus Jakarta Sans)**: Highly legible corporate typography with tabular numerals for sprint story points, coverage percentages, and RTM matrices.
- **Code Accents**: Subtle inline code pills (`Given-When-Then`) with slate-100 backgrounds.

## 4. Layout & Navigation Model
- **Executive Header**: Light navigation bar featuring real-time UAT coverage progress, active BRD title, and export controls.
- **Section Switcher**: Pill-style segmented controls (`Requirements Ingestion (BRD)`, `Traceability Matrix (RTM)`, `UAT Test Runner`, `Jira Sprint Planner`, `Executive Sign-Off`).
- **Structured Dual-Column Grid**: Side-by-side business needs vs. Gherkin test mapping with full bipartite graph connection indicators.

## 5. Credit Line Integration
- Polished enterprise tag at bottom right: `made with ♥ by Tejdeep` linking directly to `https://github.com/TejdeepKodati/spec-uat` styled with white card background, subtle slate-200 border, and deep cobalt hover state.
