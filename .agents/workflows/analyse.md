---
workflow_id: ANA-001
description: Requirement analysis, state survey, and feasibility assessment.
role_lead: BA
triggers: ["/analyse", "analyse", "requirements", "feasibility", "survey", "discovery"]
version: "1.0"
---

# 🔍 Workflow: Deep Analysis & Discovery (/analyse)

> **Purpose**: The single most critical checkpoint to understand "What" and "Why" before writing any line of code. This workflow minimizes requirement misalignment risks and engineering resource waste.

## ⚡ Execution Flow

```
BA (Discovery) → SA (Technical Assessment) → AUDITOR (Risk Scan) → LEADER (Decision)
```

---

## 1. CONTEXT DISCOVERY — Requirement Discovery (BA)
// turbo
- **Action**: Use `view_file` on existing documents and `list_dir` to understand project structure. Interview User (via `ask_question`) to clarify Pain Points.
- **Verification**: Who are the Target Users? What is the expected Output?
- **Output**: Business Requirement Draft (BRD) created in `docs/draft/business/brd.md` with `Status: Draft`.

## 2. TECHNICAL ASSESSMENT — Feasibility Evaluation (SA)
- **Action**: Compare BA requirements against existing infrastructure. Inspect libraries, languages, and architecture.
- **Constraints**: Does the solution violate **SSA-001** (System Scale Alignment)? Is there technical debt blocking implementation?
- **Output**: Feasibility Report + Preliminary Architectural Proposal in `docs/draft/architecture/`.

## 3. RISK & GAP SCAN — Risk Review (AUDITOR)
- **Action**: Identify "gaps" in business logic or technical bottleneck points.
- **Checklist**: Security, Performance, Cost (Cloud Budget).
- **Output**: Preliminary Risk Matrix (High/Medium/Low) in `docs/draft/architecture/risk_matrix.md`.

## 4. STRATEGIC DECISION & USER APPROVAL — Decision & Approval (LEADER & User/PO)
- **Action**: LEADER reviews draft documents in `docs/draft/` from BA/SA/AUDITOR and presents to User/PO.
- **User/PO Consultation (Review & Approve)**: Present draft documents in `docs/draft/` for User/PO review and selection:
    - ✅ **Approved**: User/PO approves documents. LEADER directs moving/synchronizing documents from `docs/draft/` to `docs/original/` (e.g. `docs/original/business/brd.md`), updating `Status: Approved` in Header. Proceed to `/design` or `/dev`.
    - 🔄 **Refine**: Request BA/SA to edit incomplete/unapproved content directly inside `docs/draft/`.
    - ❌ **Drop**: Cancel requirement if risk is too high or provides insufficient value.
- **Output**: Official Approved documentation stored in `docs/original/` (Single Source of Truth).

---

## 🚨 Failure Points

1. **Shallow Research**: Only reading requirements without running `view_file` on actual code → **Solution**: BA must cite related line of code / folder reference.
2. **Ignoring Legacy**: Analyzing as a new project while operating within a legacy system → **Solution**: SA must reference `infrastructure-standards.md`.
3. **Vague Requirements**: Generic requests such as "Make system smoother" → **Solution**: LEADER rejects if lacking quantitative Acceptance Criteria (AC).

---
> [!IMPORTANT]
> **"An hour of analysis can save a week of meaningless programming."**
