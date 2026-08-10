---
workflow_id: DEV-001
description: Lean feature development workflow (Exclusively for BA, DEV, TESTER, LEADER).
role_lead: LEADER
triggers: ["/dev", "development", "lean feature", "coding"]
version: "2.0"
---

# 🚀 Workflow: Lean Development (/dev)

> **Pre-condition**: All Agents read [llm-agent-config.md](file:///.agents/config/llm-agent-config.md) before starting.

## ⚡ Execution Flow (Happy Path)

```
USER_REQUEST → BA → DEV → TESTER → LEADER
```

---

## 1. REQUIREMENT ANALYSIS (BA)
// turbo
- **Trigger**: Receive USER_REQUEST containing feature description. Use `view_file` on related context.
- **Action 1 (FIC Classification)**: Classify as Isolated Feature (`[FIC: ISOLATED]`) or touching legacy modules (`[FIC: INTEGRATED]`).
- **Action 2 (Scope Definition)**: Write detailed User Stories, focusing on user value and business constraints.
- **Action 3 (Scenario Handoff)**: Outline preliminary Acceptance Criteria to provide TESTER a base for preparation.
- **Output**: `docs/original/business/brd.md` + `user-stories.md`.

## 2. CORE EXECUTION & TDD (DEV)
- **Action 1 (Quick Design)**: Self-design simple logic/DB schema based on BRD (bypassing SA).
- **Action 2 (Code Execution)**: Adhere to TDD workflow (RED → GREEN → REFACTOR). Ensure clean code and proper conventions.
- **Action 3 (Unit Testing)**: Ensure coverage for critical business logic.
- **Output**: Source code (`src/`) + Unit tests (`tests/`).
- **Gate Check (Handoff)**: Verification checkpoint (TESTER verifies Unit Tests were included above before running regression tests).

## 3. QA & ACCEPTANCE TEST (TESTER)
- **Action 1 (Functional Testing)**: Execute test scenarios based on User Stories and Acceptance Criteria from BA.
- **Action 2 (Regression Testing)**: If `[FIC: INTEGRATED]`, mandatory to inspect related modules to ensure no regressions/side-effects.
- **Action 3 (Reporting)**: Record test results and log defects if any.
- **Output**: `docs/original/testing/reports.md`.

## 4. FINAL APPROVAL (LEADER)
- **Action 1 (Review 7 Gates)**: Inspect integrity, security, performance, and documentation.
- **Action 2 (Acceptance)**: Confirm feature completeness and readiness for merge/release.
- **Action 3 (Summary)**: Update `STATE.md` and create walkthrough for users.
- **Output**: `walkthrough.md` + Updated `.agents/STATE.md`.

---

## 🚨 Failure Points

1. **DEV unilaterally makes major DB schema changes** without reporting -> LEADER will block if detecting sensitive architectural shifts.
2. **Missing Acceptance Criteria from BA** -> TESTER lacks benchmark for pass/fail evaluation.
3. **Skipping Regression Testing** on Integrated modules -> Introduces potential bugs into existing system.
