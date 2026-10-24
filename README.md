# SpecUAT — Agile Requirements Analysis & UAT Validation Platform

An enterprise Agile requirements-to-test governance platform that bridges business needs, stakeholder expectations, and User Acceptance Testing (UAT). Automates Business Requirement Document (BRD) synthesis, constructs bidirectional Traceability Matrices (RTM) using bipartite graph matching algorithms, and verifies solution alignment against Gherkin acceptance criteria.

[![Live Demo](https://img.shields.io/badge/Demo-Live_Deployment-blue.svg)](https://spec-uat.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python Engine](https://img.shields.io/badge/Python-3.10%2B-green.svg)](engine/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](tsconfig.json)

---

## 🌟 Key Capabilities

1. **Stakeholder Discussion & BRD Ingestion**:
   - Parses unstructured stakeholder meeting transcripts, interview notes, and business proposals.
   - Categorizes findings into formal **Business Needs**, **User Expectations**, and structured **Gherkin Acceptance Criteria** (`Given`, `When`, `Then`).

2. **Bidirectional Requirements Traceability Matrix (RTM)**:
   - Formulates the requirement-to-test coverage problem as **Maximum Bipartite Graph Matching**.
   - Guarantees 100% traceability from Business Objective $\rightarrow$ Jira User Story $\rightarrow$ Acceptance Criteria $\rightarrow$ UAT Test Case.
   - Detects orphan requirements and unmapped test scenarios.

3. **UAT Test Execution & Solution Validator**:
   - Interactive execution cockpit for QA testers and business users to validate software against documented acceptance criteria.
   - Records actual observations, captures variance telemetry, and calculates solution alignment scores.

4. **Jira Agile Backlog & Sprint Planning Hub**:
   - Automatically breaks down functional epics into Jira user stories and sub-tasks.
   - Applies an algorithmic Fibonacci complexity estimator ($1, 2, 3, 5, 8, 13\text{ SP}$) based on acceptance criteria branching factors and integration touchpoints.
   - Directly exports backlog items into Jira-compatible CSV format.

5. **Executive Stakeholder Reporting & Sign-Off**:
   - Synthesizes presentation-ready reports for business leadership, tracking UAT burn-down, defect severity, and Go/No-Go release readiness.
   - Supports export to Markdown (Word-compatible) and CSV (Excel-compatible).

---

## 🏗️ Architecture

```
                       +-------------------------------+
                       | Stakeholder Discussions/Notes |
                       +---------------+---------------+
                                       |
                                       v
                       +-------------------------------+
                       |   Requirements NLP Parser     |
                       | (BRD & Gherkin Extractor)     |
                       +---------------+---------------+
                                       |
            +--------------------------+--------------------------+
            |                                                     |
            v                                                     v
+------------------------+                             +------------------------+
| Bipartite Traceability |                             |  Jira Agile Estimator  |
| Graph (Hopcroft-Karp   |                             |  (Fibonacci Complexity |
| Matching Algorithm)    |                             |   & Sprint Breakdown)  |
+-----------+------------+                             +-----------+------------+
            |                                                     |
            +--------------------------+--------------------------+
                                       |
                                       v
                       +-------------------------------+
                       | UAT Test Case Execution Engine|
                       | & Solution Validation Scorer  |
                       +---------------+---------------+
                                       |
                                       v
                       +-------------------------------+
                       |  Next.js 16 Web Dashboard     |
                       |  & Vercel Live Deployment     |
                       +-------------------------------+
```

---

## 💻 Tech Stack

- **Frontend & Web Platform**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Core Algorithmic Engine**: Python 3.10+
  - Maximum Bipartite Matching (Augmenting Path DFS / Hopcroft-Karp) for RTM Coverage
  - Natural Language Tokenization & Gherkin Criteria Verification Scorer
  - Heuristic Fibonacci Story Point Estimation Engine
- **Testing**: Python `unittest`, Next.js build verification
- **Deployment**: Vercel Edge Platform

---

## 🚀 Getting Started

### 1. Web Application (Next.js)

```bash
# Clone the repository
git clone https://github.com/TejdeepKodati/spec-uat.git
cd spec-uat

# Install dependencies (respecting npm security settings)
npm install --ignore-scripts

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

To build for production:
```bash
npm run build
npm run start
```

### 2. Python Core Engine & Test Suite

The algorithmic core can be run and tested independently without external dependencies:

```bash
cd engine

# Run comprehensive unit test suite
python -m unittest test_spec_uat_engine.py -v
```

---

## 🧪 Verification & Test Results

```
test_structured_notes_parsing (test_spec_uat_engine.TestRequirementsParser) ... ok
test_full_bipartite_matching (test_spec_uat_engine.TestBipartiteTraceabilityMatcher) ... ok
test_uncovered_requirement_detection (test_spec_uat_engine.TestBipartiteTraceabilityMatcher) ... ok
test_passing_criteria (test_spec_uat_engine.TestAcceptanceCriteriaValidator) ... ok
test_failing_criteria (test_spec_uat_engine.TestAcceptanceCriteriaValidator) ... ok
test_fibonacci_estimation (test_spec_uat_engine.TestJiraAgileEstimator) ... ok
test_story_breakdown (test_spec_uat_engine.TestJiraAgileEstimator) ... ok
test_report_generation (test_spec_uat_engine.TestStakeholderReportGenerator) ... ok

----------------------------------------------------------------------
Ran 8 tests in 0.002s

OK
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="right">made with ♥ by <a href="https://github.com/TejdeepKodati">Tejdeep</a></p>
