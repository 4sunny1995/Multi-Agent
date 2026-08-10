---
workflow_id: ENT-001
description: End-to-end Enterprise feature development workflow.
role_lead: LEADER
triggers: ["/enterprise-dev", "enterprise", "major feature", "end-to-end"]
version: "2.0"
---

# 🚀 Workflow: Feature Development (/enterprise-dev)

> **Pre-condition**: All Agents read [llm-agent-config.md](file:///.agents/config/llm-agent-config.md) before starting.

## ⚡ Execution Flow (Happy Path)

```
[ENTERPRISE]: USER_REQUEST → BA → [DESIGNER] → SA+CLOUD → SECURITY → DEV → TESTER+WRITER → LEADER
[MVP-MICRO]: USER_REQUEST → BA → [DESIGNER] → DEV → TESTER → LEADER
```

---

## 1. STRATEGIC RESEARCH (BA)
- **Trigger**: Receive USER_REQUEST containing new feature description.
// turbo
- **Action 1 (FIC Classification)**: Use `grep_search` to survey code directory and `STATE.md` to determine: Completely isolated feature (`[FIC: ISOLATED]`) or touching legacy modules (`[FIC: INTEGRATED]`).
- **Action 2 (Over-Engineering Classification)**: Cross-reference with Scale Matrix and label as `[ENTERPRISE]` or `[MVP-MICRO]`. If the user explicitly instructs `[MODE: MVP]`, compliance is mandatory.
  - *`[MVP-MICRO]` Criteria*: No complex DB needed (SQLite/Local JSON only), no intricate RBAC auth, local execution tool, no PII storage. (=> **BYPASS** Step 3 & Step 4).
  - *`[ENTERPRISE]` Criteria*: 3-tier Backend, DB Clustering, Payments, PII data, Legacy integration (`[FIC: INTEGRATED]`). (=> Run Full 7 Gates).
- **Action 3 (Analysis & Empathy)**: Read Section `7. BUSINESS DOMAIN` in `STATE.md`. Rely on "User Personas" and "Core Pain Points" to craft pragmatic business flows rather than purely system UI. Reject any User Story that fails to solve a real Pain Point or violates Business Rules. Run INF-001 Discovery.
- **[DB_CHECKPOINT]**: If modifying legacy DB → STOP and query User immediately.
- **Output**: `docs/original/business/brd.md` (must display FIC and Scale labels at header) + `user-stories.md`.

## 2. UI/UX DESIGN (DESIGNER) — *optional if no UI*
- **Action**: Transform User Stories into Mockups + UI Specs.
- **Output**: `docs/original/ui/style-guide.md` + `docs/original/ui/specs.md`.

## 3. ARCHITECTURAL BLUEPRINT (SA + CLOUD ARCHITECT)
- **SA**: INF-001 Discovery mandatory → Design Sequence + Schema. 
- **CLOUD**: Estimate 3-tier infrastructure budget (Low/Medium/High traffic).
- **[DB_CHECKPOINT]**: Legacy schema modification → Mandatory User approval.
- **Output**: `docs/original/architecture/` + `implementation_plan.md` + `docs/original/budget/`.

## 4. SECURITY GATEWAY (SECURITY)
- **Action**: Review Plan for RBAC, Secrets management, Input validation.
- **Block condition**: Hardcoded credentials or SQL injection risk detected → Block Plan.
- **Output**: Approval comment in `implementation_plan.md`.
- **Gate Check (Handoff Contract)**: DEV strictly forbidden from executing code (step 5) without explicit "Security Approved" stamp from this step.

## 5. CORE EXECUTION & TDD (DEV)
- **Action**: Implement per Plan. TDD flow: RED → GREEN → REFACTOR.
- **Constraint**: Do not write code before establishing failing tests.
- **Output**: `src/` + `tests/` — coverage ≥ 80% core logic.

## 6. QA + DOCUMENTATION (TESTER + TECH WRITER)
- **TESTER**: Acceptance tests + Security test + Edge cases from BRD. If BRD is labeled `[FIC: INTEGRATED]`, mandatory to add **Regression Test** scenarios to avoid breaking legacy modules.
- **TECH WRITER**: User Guide + API Docs.
- **Output**: `docs/original/testing/reports.md` + `docs/original/business/user-guide.md`.

## 7. FINAL GATE (LEADER — 7 Gates)
- **Action**: Review via 7 Gates. Persist latest architecture status into `.agents/STATE.md`. PASS → tag Git.
- **Output**: `walkthrough.md` + `git tag vX.Y.Z` + `.agents/STATE.md`.

---

## 🚨 Failure Points

1. SA fails to run INF-001 Discovery → **Solution**: LEADER blocks Plan if missing Discovery section.
2. DEV skips TDD → **Solution**: TESTER must provide failing test before DEV begins.
3. Context insufficiently handed off between Agents → **Solution**: Mandatory Handoff Contract.