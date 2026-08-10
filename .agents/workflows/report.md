---
workflow_id: REP-001
description: Technical report extraction workflow collaborating BA, SA, and DEV.
role_lead: TECH_WRITER
triggers: ["/report", "report", "technical report", "project health", "system snapshot"]
version: "2.0"
---

# 📊 Workflow: Technical Report Extraction (/report)

> **Purpose**: Capture the "Project Snapshot" at a specific point in time — spanning business, architecture, to live source code.

## ⚡ Execution Flow

```
BA (Features) → SA (Architecture) → DEV (Code) → TECH_WRITER (Synthesize) → LEADER (Approve)
```

---

## 1. FEATURE DISCOVERY (BA)
- **Action**: List all completed User Stories & Acceptance Criteria.
- **Constraint**: List **shipped** features only — do not include WIP items.
- **Output**: Feature list submitted to TECH WRITER.

## 2. ARCHITECTURE EXTRACT (SA)
- **Action**: Summarize existing architecture — Sequence Diagrams, Data Schemas, API contracts.
- **Verify first**: Run `view_file` to extract live data, do not write from memory.
- **Output**: Diagrams + Specs submitted to TECH WRITER.

## 3. CODE & STRUCTURE INSIGHT (DEV)
// turbo
- **Action**: Run `list_dir src/` to inspect structure. Extract 3-5 core logic Code Snippets.
- **Constraint**: Snippets must feature `file_path:line_number` references.
- **Output**: Structure tree + Annotated snippets submitted to TECH WRITER.

## 4. SYNTHESIS (TECH WRITER)
- **Action**: Consolidate inputs from BA + SA + DEV → publish draft `docs/draft/architecture/technical_report.md` with `Status: Draft`.
- **TRS-001 Compliance**: Every claim must have an evidence link. Write nothing unverified.
- **Output**: `docs/draft/architecture/technical_report.md`.

## 5. APPROVAL & PROMOTION — Approval & Official Promotion (LEADER & User)
- **Action**: LEADER and User/PO verify report accuracy against source code (`src/`) for the draft at `docs/draft/architecture/technical_report.md`.
- **User/PO Consultation**: Present technical report content and solicit Approval from User/PO.
- **Approve & Promote**:
    - ✅ **Approved**: When approved by User/PO, move/update document from `docs/draft/architecture/technical_report.md` to `docs/original/architecture/technical_report.md`, transition `Status: Approved` in Header, and update `docs/original/README.md`. Log results in `walkthrough.md` with timestamp.
    - 🔄 **Refine**: Instruct TECH WRITER to edit draft directly at `docs/draft/architecture/technical_report.md`.
- **Output**: Official technical report saved in `docs/original/architecture/technical_report.md` (Single Source of Truth).

---

## 🚨 Failure Points

1. TECH WRITER writes from BRD instead of src/ → **Solution**: LEADER rejects if lacking file:line evidence.
2. Report fails to update `docs/README.md` → **Solution**: Auto-Indexing rule mandatory.
3. DEV snippets fail execution → **Solution**: Snippets must be verified via `run_command` beforehand.
