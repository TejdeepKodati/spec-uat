"use client";

import React, { useState } from "react";
import {
  FileCheck2,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ListTodo,
  TrendingUp,
  Download,
  Copy,
  Layers,
  Search,
  RefreshCw,
  Sliders,
  Check,
  ShieldCheck,
  BookOpen,
  Send,
  Kanban
} from "lucide-react";

interface RequirementScenario {
  id: string;
  title: string;
  domain: string;
  notes: string;
  businessNeeds: string[];
  userExpectations: string[];
  acceptanceCriteria: {
    id: string;
    given: string;
    when: string;
    then: string;
    solutionStatus: "VERIFIED" | "PENDING";
  }[];
  jiraStories: {
    key: string;
    summary: string;
    points: number;
    priority: "High" | "Medium" | "Low";
    sprint: string;
    status: "Done" | "In Progress" | "Ready for UAT";
  }[];
  uatTests: {
    id: string;
    name: string;
    preconditions: string;
    steps: string[];
    expected: string;
    status: "PASSED" | "FAILED" | "BLOCKED" | "READY";
    actualObserved: string;
  }[];
}

const SAMPLE_PROJECTS: RequirementScenario[] = [
  {
    id: "PROJ-REC-01",
    title: "US Multi-Currency Ledger Reconciliation & Variance Triage",
    domain: "Financial Technology / US Delivery",
    notes: `Stakeholder Meeting Discussion (Finance Operations & IT):
Business Need:
- Automate real-time daily ledger reconciliation between payment gateways and internal ERP.
- Flag any variance exceeding $0.01 with automated transaction freeze and audit trail logging.
- Generate end-of-day discrepancy summaries for US finance directors.

User Expectations:
- Finance reviewers expect sub-second variance detection during batch settlement.
- Operations SMEs expect 1-click generation of variance resolution tickets in Jira.
- Compliance auditors require immutable audit records stored with SHA-256 integrity proofs.

Acceptance Criteria:
- Given an ingested transaction batch When discrepancy between payment gateway and ledger > $0.01 Then immediately flag transaction as UNBALANCED and emit audit event.
- Given an unbalanced transaction batch When finance SME applies manual reconciliation override Then require two-factor approval and log SME identity.`,
    businessNeeds: [
      "Automate real-time daily ledger reconciliation between payment gateways and internal ERP.",
      "Flag any variance exceeding $0.01 with automated transaction freeze and audit trail logging.",
      "Generate end-of-day discrepancy summaries for US finance directors."
    ],
    userExpectations: [
      "Finance reviewers expect sub-second variance detection during batch settlement.",
      "Operations SMEs expect 1-click generation of variance resolution tickets in Jira.",
      "Compliance auditors require immutable audit records stored with SHA-256 integrity proofs."
    ],
    acceptanceCriteria: [
      {
        id: "AC-101",
        given: "An ingested transaction batch of 10,000 records",
        when: "Discrepancy between payment gateway and ledger > $0.01",
        then: "Immediately flag transaction as UNBALANCED and emit audit event to Kafka",
        solutionStatus: "VERIFIED"
      },
      {
        id: "AC-102",
        given: "An unbalanced transaction batch locked by automated rules",
        when: "Finance SME applies manual reconciliation override",
        then: "Require two-factor approval and persist immutable audit record with SME employee ID",
        solutionStatus: "VERIFIED"
      }
    ],
    jiraStories: [
      {
        key: "UAT-201",
        summary: "Ingest Payment Gateway CSVs and Stream to Real-Time Reconciliation Pipeline",
        points: 5,
        priority: "High",
        sprint: "Sprint 24",
        status: "Done"
      },
      {
        key: "UAT-202",
        summary: "Implement Tolerance Variance Rule Engine with Automated Batch Lock",
        points: 8,
        priority: "High",
        sprint: "Sprint 24",
        status: "Ready for UAT"
      },
      {
        key: "UAT-203",
        summary: "Synthesize Stakeholder Discrepancy Reports (Excel/CSV and PDF formats)",
        points: 3,
        priority: "Medium",
        sprint: "Sprint 25",
        status: "In Progress"
      }
    ],
    uatTests: [
      {
        id: "UAT-TEST-01",
        name: "Verify Automated Ledger Discrepancy Detection & Alerting",
        preconditions: "Primary database loaded with mock settlement ledger; Kafka audit broker running.",
        steps: [
          "1. Inject synthetic batch with $5,000.00 gateway total vs $4,980.00 ERP total (Delta: $20.00).",
          "2. Trigger automated reconciliation run via API `/api/v1/reconcile`.",
          "3. Inspect database status flag for batch."
        ],
        expected: "Batch status marked 'UNBALANCED'; variance alert published to audit topic within 150ms.",
        status: "PASSED",
        actualObserved: "Status updated to 'UNBALANCED'; variance metric of $20.00 logged and webhook fired in 82ms."
      },
      {
        id: "UAT-TEST-02",
        name: "Validate SME Multi-Factor Override Protocol",
        preconditions: "Batch #8491 in 'UNBALANCED' lock state; authorized finance SME authenticated.",
        steps: [
          "1. SME initiates override action on batch #8491.",
          "2. System prompts for OTP validation code.",
          "3. SME inputs valid OTP and justification remark."
        ],
        expected: "Override applied; SHA-256 signed audit record generated; batch marked 'MANUALLY_CLEARED'.",
        status: "PASSED",
        actualObserved: "2FA challenge successfully validated; ledger audit trail written with hash `0x8f2a...` in 110ms."
      },
      {
        id: "UAT-TEST-03",
        name: "Test Executive Excel/CSV Summary Export",
        preconditions: "10 completed daily settlement runs catalogued in system.",
        steps: [
          "1. Navigate to Stakeholder Reporting module.",
          "2. Select Date Range: Last 7 Days; format: Excel (.xlsx).",
          "3. Click 'Download Stakeholder Reconciliation Summary'."
        ],
        expected: "Valid Excel workbook generated with reconciliation summary sheet and variance tabs.",
        status: "PASSED",
        actualObserved: "File generated in 240ms with 100% mathematical integrity across all aggregated columns."
      }
    ]
  },
  {
    id: "PROJ-SEC-02",
    title: "Enterprise SSO & Role-Based Access Governance (RBAC)",
    domain: "Enterprise Identity & Compliance",
    notes: `Stakeholder Meeting Notes:
Business Need:
- Integrate corporate Okta SAML/OAuth 2.0 Identity Provider.
- Strictly isolate privileges across 4 user personas: Auditor, Business Analyst, QA Tester, System Admin.

User Expectations:
- End-users expect seamless Single Sign-On without re-entering credentials across internal tools.
- Security auditors expect immediate session revocation when an employee role is disabled.

Acceptance Criteria:
- Given an expired session token When user makes API call Then return 401 Unauthorized with refresh challenge.
- Given an Auditor persona When accessing Admin Settings Then return 403 Forbidden with security telemetry alert.`,
    businessNeeds: [
      "Integrate corporate Okta SAML/OAuth 2.0 Identity Provider.",
      "Strictly isolate privileges across 4 user personas: Auditor, Business Analyst, QA Tester, System Admin."
    ],
    userExpectations: [
      "End-users expect seamless Single Sign-On without re-entering credentials across internal tools.",
      "Security auditors expect immediate session revocation when an employee role is disabled."
    ],
    acceptanceCriteria: [
      {
        id: "AC-201",
        given: "User with expired JWT session token",
        when: "User makes authenticated API invocation",
        then: "Reject with HTTP 401 Unauthorized and prompt token refresh flow",
        solutionStatus: "VERIFIED"
      },
      {
        id: "AC-202",
        given: "User with Auditor persona role",
        when: "Attempting to modify system configuration endpoints",
        then: "Block with HTTP 403 Forbidden and record security incident event",
        solutionStatus: "VERIFIED"
      }
    ],
    jiraStories: [
      {
        key: "UAT-301",
        summary: "OAuth 2.0 PKCE Handshake & Corporate IdP Token Verification",
        points: 5,
        priority: "High",
        sprint: "Sprint 25",
        status: "Done"
      },
      {
        key: "UAT-302",
        summary: "Role-Based Access Control Middleware for REST APIs",
        points: 5,
        priority: "High",
        sprint: "Sprint 25",
        status: "Ready for UAT"
      }
    ],
    uatTests: [
      {
        id: "UAT-TEST-11",
        name: "Verify Unauthorized Access Denial for Auditor Role",
        preconditions: "User logged in with 'AUDITOR' JWT role claim.",
        steps: [
          "1. Send POST request to `/api/v1/admin/settings/rotate-keys`.",
          "2. Check response status and audit log emission."
        ],
        expected: "HTTP 403 Forbidden returned; security audit event emitted with IP and UserID.",
        status: "PASSED",
        actualObserved: "HTTP 403 returned immediately; security incident event logged to SIEM pipeline."
      }
    ]
  }
];

export default function SpecUATPage() {
  const [activeTab, setActiveTab] = useState<"brd" | "rtm" | "runner" | "jira" | "reports">("brd");
  const [selectedProject, setSelectedProject] = useState<RequirementScenario>(SAMPLE_PROJECTS[0]);
  const [customNotes, setCustomNotes] = useState<string>(SAMPLE_PROJECTS[0].notes);
  const [testCases, setTestCases] = useState(SAMPLE_PROJECTS[0].uatTests);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusToggle = (testId: string) => {
    setTestCases((prev) =>
      prev.map((t) => {
        if (t.id === testId) {
          const nextStatus = t.status === "PASSED" ? "FAILED" : t.status === "FAILED" ? "BLOCKED" : "PASSED";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const passedCount = testCases.filter((t) => t.status === "PASSED").length;
  const coveragePct = Math.round((passedCount / Math.max(1, testCases.length)) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
                Spec<span className="text-blue-400">UAT</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Agile Requirements & Testing Platform
                </span>
              </span>
              <p className="text-xs text-slate-400">BRD Synthesis, Bidirectional Traceability, UAT Validation & Jira SDLC Alignment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-slate-400">UAT Coverage:</span>
              <span className="font-bold text-emerald-400">{coveragePct}%</span>
            </div>
            <a
              href="https://github.com/TejdeepKodati/spec-uat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md border border-slate-700 transition"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-slate-800/80 pt-1 text-sm">
          {[
            { id: "brd", label: "Requirements Ingestion (BRD)", icon: BookOpen },
            { id: "rtm", label: "Traceability Matrix (RTM)", icon: GitPullRequest },
            { id: "runner", label: "UAT Test Runner", icon: CheckCircle2 },
            { id: "jira", label: "Jira Agile Sprint Planner", icon: Kanban },
            { id: "reports", label: "Executive Sign-Off", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-400 bg-blue-500/5"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: BRD INGESTION */}
        {activeTab === "brd" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-2">Select Business Initiative</h3>
                <div className="space-y-2">
                  {SAMPLE_PROJECTS.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setSelectedProject(proj);
                        setCustomNotes(proj.notes);
                        setTestCases(proj.uatTests);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg border transition ${
                        selectedProject.id === proj.id
                          ? "bg-blue-950/40 border-blue-500/60 text-white"
                          : "bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-blue-400">{proj.id}</span>
                        <span className="text-[10px] text-slate-400">{proj.domain}</span>
                      </div>
                      <div className="text-xs font-semibold">{proj.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                  <span>Stakeholder Interview Notes</span>
                  <button
                    onClick={() => setCustomNotes(selectedProject.notes)}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px]"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </h4>
                <textarea
                  rows={9}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <span className="text-xs font-mono text-blue-400">{selectedProject.id}</span>
                    <h2 className="text-lg font-bold text-white">{selectedProject.title}</h2>
                    <p className="text-xs text-slate-400">Business Requirements Document (BRD) Structured Extract</p>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedProject.notes)}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy BRD
                  </button>
                </div>

                {/* Business Needs */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Documented Business Needs
                  </h4>
                  <div className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                    {selectedProject.businessNeeds.map((need, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="font-mono text-slate-500 font-bold">REQ-{i + 1}</span>
                        <span>{need}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Expectations */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    User Expectations & Stakeholder Value
                  </h4>
                  <div className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                    {selectedProject.userExpectations.map((exp, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="font-mono text-slate-500 font-bold">EXP-{i + 1}</span>
                        <span>{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gherkin Acceptance Criteria */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" />
                    Gherkin Acceptance Criteria (Given-When-Then)
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.acceptanceCriteria.map((ac) => (
                      <div key={ac.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1">
                          <span className="font-mono text-amber-400 font-semibold">{ac.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                            {ac.solutionStatus}
                          </span>
                        </div>
                        <div><strong className="text-slate-400">GIVEN:</strong> <span className="text-slate-300">{ac.given}</span></div>
                        <div><strong className="text-slate-400">WHEN:</strong> <span className="text-slate-300">{ac.when}</span></div>
                        <div><strong className="text-slate-400">THEN:</strong> <span className="text-emerald-300">{ac.then}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRACEABILITY MATRIX (RTM) */}
        {activeTab === "rtm" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <span className="text-xs font-mono text-blue-400">RTM-AUDIT-VERIFIED</span>
                <h2 className="text-xl font-bold text-white">Bidirectional Requirements Traceability Matrix (RTM)</h2>
                <p className="text-xs text-slate-400">
                  Maps Business Needs $\rightarrow$ Jira User Stories $\rightarrow$ Gherkin Criteria $\rightarrow$ UAT Test Cases
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Traceability Coverage
                </span>
                <button
                  onClick={() => handleCopy("RTM Matrix Data Export")}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-md border border-slate-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export RTM
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-lg">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Req ID</th>
                    <th className="p-3">Business Requirement Need</th>
                    <th className="p-3">Jira Story Key</th>
                    <th className="p-3">Acceptance Criteria</th>
                    <th className="p-3">Linked UAT Test</th>
                    <th className="p-3">Validation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
                  <tr>
                    <td className="p-3 font-semibold text-blue-400">REQ-1</td>
                    <td className="p-3 font-sans text-xs">Automate real-time daily ledger reconciliation between payment gateways and internal ERP.</td>
                    <td className="p-3 text-indigo-400 font-bold">UAT-201</td>
                    <td className="p-3">AC-101</td>
                    <td className="p-3 text-slate-200">UAT-TEST-01</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                        VERIFIED (PASS)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-blue-400">REQ-2</td>
                    <td className="p-3 font-sans text-xs">Flag any variance exceeding $0.01 with automated transaction freeze and audit trail logging.</td>
                    <td className="p-3 text-indigo-400 font-bold">UAT-202</td>
                    <td className="p-3">AC-102</td>
                    <td className="p-3 text-slate-200">UAT-TEST-02</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                        VERIFIED (PASS)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-blue-400">REQ-3</td>
                    <td className="p-3 font-sans text-xs">Generate end-of-day discrepancy summaries for US finance directors.</td>
                    <td className="p-3 text-indigo-400 font-bold">UAT-203</td>
                    <td className="p-3">AC-103</td>
                    <td className="p-3 text-slate-200">UAT-TEST-03</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                        VERIFIED (PASS)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Hopcroft-Karp Bipartite Matching Algorithm: </span>
              All 3 requirement nodes in partition $U$ possess maximal non-conflicting edges to test execution partition $V$. Zero orphan requirements detected.
            </div>
          </div>
        )}

        {/* TAB 3: UAT TEST RUNNER */}
        {activeTab === "runner" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    User Acceptance Testing (UAT) Execution Cockpit
                  </h2>
                  <p className="text-xs text-slate-400">
                    Execute test suites, record actual observations, and validate solution alignment against acceptance criteria.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Tests Passed</span>
                    <span className="text-base font-bold text-emerald-400">
                      {passedCount} / {testCases.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {testCases.map((test) => (
                  <div key={test.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-2 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-400">{test.id}</span>
                        <h4 className="font-bold text-sm text-slate-100">{test.name}</h4>
                      </div>
                      <button
                        onClick={() => handleStatusToggle(test.id)}
                        className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition ${
                          test.status === "PASSED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : test.status === "FAILED"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {test.status === "PASSED" && <Check className="w-3.5 h-3.5" />}
                        {test.status === "FAILED" && <XCircle className="w-3.5 h-3.5" />}
                        {test.status === "BLOCKED" && <AlertCircle className="w-3.5 h-3.5" />}
                        Status: {test.status} (Click to toggle)
                      </button>
                    </div>

                    <div className="text-xs text-slate-400">
                      <strong className="text-slate-300">Preconditions: </strong>
                      {test.preconditions}
                    </div>

                    <div className="text-xs space-y-1">
                      <strong className="text-slate-300 block">Test Steps:</strong>
                      <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-slate-300 font-mono text-[11px] space-y-0.5">
                        {test.steps.map((step, idx) => (
                          <div key={idx}>{step}</div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800">
                        <strong className="text-slate-400 block mb-0.5">Expected Outcome:</strong>
                        <p className="text-slate-300">{test.expected}</p>
                      </div>
                      <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800">
                        <strong className="text-emerald-400 block mb-0.5">Actual Observed Outcome:</strong>
                        <p className="text-slate-200">{test.actualObserved}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: JIRA AGILE SPRINT PLANNER */}
        {activeTab === "jira" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Kanban className="w-5 h-5 text-blue-400" />
                    Jira Agile Backlog & Sprint Alignment Hub
                  </h2>
                  <p className="text-xs text-slate-400">
                    Fibonacci story point estimation, MoSCoW prioritization, and sprint assignment.
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      "Issue Key,Issue Type,Summary,Story Points,Priority,Status\n" +
                        selectedProject.jiraStories
                          .map((s) => `${s.key},Story,"${s.summary}",${s.points},${s.priority},${s.status}`)
                          .join("\n")
                    )
                  }
                  className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" /> Export Jira CSV
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedProject.jiraStories.map((story) => (
                  <div key={story.key} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-blue-400 font-bold">{story.key}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          story.priority === "High"
                            ? "bg-rose-500/20 text-rose-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {story.priority} Priority
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-white leading-snug">{story.summary}</h4>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                      <span>Story Points: <strong className="text-slate-200">{story.points} SP</strong></span>
                      <span>{story.sprint}</span>
                    </div>

                    <div className="text-[11px]">
                      <span className="text-slate-500">Status: </span>
                      <span className="text-emerald-400 font-semibold">{story.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EXECUTIVE STAKEHOLDER REPORTS */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400">UAT Verification Rate</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">100%</div>
                <span className="text-[11px] text-slate-500 mt-1 block">3 of 3 Test Scenarios Passed</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400">Requirement Traceability</span>
                <div className="text-2xl font-bold text-blue-400 mt-1">100%</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Zero Orphan Criteria</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400">Total Story Points Delivered</span>
                <div className="text-2xl font-bold text-white mt-1">16 SP</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Across Sprint 24 & 25</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400">Release Go/No-Go Decision</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">GO</div>
                <span className="text-[11px] text-emerald-500 mt-1 block">Approved for Production</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Stakeholder Executive BRD & UAT Sign-Off Document</h3>
                  <p className="text-xs text-slate-400">Ready for Microsoft Word / Excel / PDF distribution to leadership</p>
                </div>
                <button
                  onClick={() => handleCopy("Executive Sign-off summary text")}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Executive Summary
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                <div className="text-blue-400 font-bold">PROJECT: {selectedProject.title}</div>
                <div>[STATUS] User Acceptance Testing (UAT): COMPLETED & SIGNED OFF</div>
                <div>[COMPLIANCE] Verification of solution against documented business requirements: 100% CONFORMANT</div>
                <div>[AUDIT TRAIL] Traceability Matrix verified by Product SME & Quality Assurance leads.</div>
                <div>[SIGN-OFF] Authorized by Lead QA Engineer & US Delivery Engagement Manager.</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SpecUAT — Agile Requirements Analysis, Bidirectional Traceability & UAT Platform</span>
          <a
            href="https://github.com/TejdeepKodati/spec-uat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition"
          >
            made with ♥ by Tejdeep
          </a>
        </div>
      </footer>
    </div>
  );
}
