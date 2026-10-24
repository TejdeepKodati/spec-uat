"""
Unit Tests for SpecUAT Core Engine
Tests requirements parsing, bipartite matching coverage, acceptance criteria validation,
Fibonacci story estimation, and reporting generation.
"""

import unittest
from spec_uat_engine import (
    RequirementsParser,
    BipartiteTraceabilityMatcher,
    AcceptanceCriteriaValidator,
    JiraAgileEstimator,
    StakeholderReportGenerator
)


class TestRequirementsParser(unittest.TestCase):
    def setUp(self):
        self.parser = RequirementsParser()

    def test_structured_notes_parsing(self):
        sample_notes = """
        Business Needs:
        - Enable automated ledger variance detection across US currency transactions.
        - Ensure compliance with Sarbanes-Oxley audit trail logging standards.

        User Expectations:
        - Finance reviewers expect real-time email digest within 5 minutes of sync.
        - Testers expect 1-click export of UAT validation runs to Excel.

        Acceptance Criteria:
        - Given a batch reconciliation When variance > $0.00 Then flag row as UNBALANCED.
        """
        result = self.parser.parse_notes(sample_notes)
        self.assertEqual(len(result["business_needs"]), 2)
        self.assertEqual(len(result["user_expectations"]), 2)
        self.assertEqual(len(result["acceptance_criteria"]), 1)
        self.assertIn("US currency transactions", result["business_needs"][0])


class TestBipartiteTraceabilityMatcher(unittest.TestCase):
    def test_full_bipartite_matching(self):
        reqs = [
            "Authenticate users with OAuth 2.0 PKCE flow and role-based access control.",
            "Generate exportable PDF audit reports for quarterly compliance.",
            "Enforce rate limiting on public payment gateway endpoints to 100 req/min."
        ]
        tests = [
            {"requirement_id": "REQ-1", "name": "UAT-AUTH-01", "expected": "Authenticate users OAuth access control"},
            {"requirement_id": "REQ-2", "name": "UAT-RPT-01", "expected": "Generate exportable PDF audit reports compliance"},
            {"requirement_id": "REQ-3", "name": "UAT-RATE-01", "expected": "Rate limiting public payment gateway endpoints"}
        ]
        matcher = BipartiteTraceabilityMatcher(reqs, tests)
        res = matcher.compute_max_matching()

        self.assertEqual(res["max_matching_size"], 3)
        self.assertEqual(res["coverage_percentage"], 100.0)
        self.assertEqual(len(res["uncovered_requirements"]), 0)

    def test_uncovered_requirement_detection(self):
        reqs = [
            "Feature A: Cloud storage backup",
            "Feature B: Multi-factor SMS authentication",
            "Feature C: Real-time fraud detection engine"
        ]
        # Only test case for Feature A
        tests = [
            {"requirement_id": "REQ-1", "name": "Test-Cloud-Storage", "expected": "Cloud storage backup upload"}
        ]
        matcher = BipartiteTraceabilityMatcher(reqs, tests)
        res = matcher.compute_max_matching()

        self.assertEqual(res["max_matching_size"], 1)
        self.assertEqual(len(res["uncovered_requirements"]), 2)
        self.assertIn("Feature B: Multi-factor SMS authentication", res["uncovered_requirements"])


class TestAcceptanceCriteriaValidator(unittest.TestCase):
    def setUp(self):
        self.validator = AcceptanceCriteriaValidator()

    def test_passing_criteria(self):
        res = self.validator.evaluate_acceptance(
            given="User is authenticated on billing portal",
            when="User submits valid corporate credit card",
            then="System generates invoice receipt and sends confirmation email",
            actual_outcome="System generated invoice receipt #84102 and sent confirmation email to user@corp.com"
        )
        self.assertEqual(res["status"], "PASSED")
        self.assertGreaterEqual(res["alignment_score"], 0.60)

    def test_failing_criteria(self):
        res = self.validator.evaluate_acceptance(
            given="Batch ledger sync",
            when="Variance exceeds threshold",
            then="System locks batch and dispatches critical webhook alert",
            actual_outcome="Database timeout occurred, batch aborted with error code 500"
        )
        self.assertIn(res["status"], ["NEEDS_REVIEW", "FAILED"])


class TestJiraAgileEstimator(unittest.TestCase):
    def setUp(self):
        self.estimator = JiraAgileEstimator()

    def test_fibonacci_estimation(self):
        simple_points = self.estimator.estimate_story_points("Update button color", 1, 0)
        complex_points = self.estimator.estimate_story_points(
            "Implement multi-tenant distributed transaction ledger with distributed two-phase commit lock", 5, 4
        )
        self.assertIn(simple_points, [1, 2, 3])
        self.assertIn(complex_points, [5, 8, 13])
        self.assertGreater(complex_points, simple_points)

    def test_story_breakdown(self):
        breakdown = self.estimator.generate_jira_breakdown("EPIC-UAT-PAYMENTS", [
            {"title": "Stripe Webhook Ingestion Pipeline", "criteria": ["verify HMAC", "queue in Redis"], "integrations": 2},
            {"title": "Export Daily Reconciliation CSV", "criteria": ["generate report", "S3 upload"], "integrations": 1}
        ])
        self.assertEqual(len(breakdown), 2)
        self.assertTrue(breakdown[0]["jira_key"].startswith("UAT-"))


class TestStakeholderReportGenerator(unittest.TestCase):
    def setUp(self):
        self.generator = StakeholderReportGenerator()

    def test_report_generation(self):
        brd = {
            "business_needs": ["Automate US compliance audits"],
            "user_expectations": ["Instant verification reports"]
        }
        uat = {
            "coverage_percentage": 100.0,
            "matched_pairs": [{"requirement_index": 1, "requirement": "Automate US compliance audits", "test_case": "UAT-001"}]
        }
        md = self.generator.generate_markdown_report("Audit-Platform", brd, uat)
        self.assertIn("# Business Requirements Document (BRD) & UAT Sign-Off: Audit-Platform", md)
        self.assertIn("Automate US compliance audits", md)


if __name__ == "__main__":
    unittest.main()
