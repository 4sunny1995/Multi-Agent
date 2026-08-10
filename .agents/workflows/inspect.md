---
workflow_id: INS-001
description: Automated technical debt detection and elimination workflow.
role_lead: LEADER
triggers: ["/inspect", "technical debt", "code smell", "code audit", "debt inspect"]
version: "2.0"
---

# 🔬 Workflow: Technical Debt Audit (/inspect)

> **Mode**: Strict Leader — zero tolerance for dirty code.

## ⚡ Execution Flow

```
LEADER (Scan) → LEADER (Compliance) → DEV (Refactor) → LEADER (Verify)
```

---

## 1. AI-DRIVEN ROOT CAUSE ANALYSIS (LEADER)
// turbo
- **Action 1 (Static)**: Run `list_dir src/` to locate large files, `grep_search` basic code smells (functions > 15 lines, if-else > 3 levels).
- **Action 2 (AI Pattern Recognition)**: Read suspect module contents (via `view_file`) and detect architectural defects: 
  - Does the code block contain tight coupling?
  - Does the data flow contain conflicts leading to state leaks?
  - Determine underlying Root Causes generating Tech Debt (e.g., wrong pattern, feature bloating).
- **Output**: List of "Suspects" accompanied by AI-driven Root Cause explanations.

## 2. COMPLIANCE & SEVERITY TAGGING (LEADER)
- **Cross-reference** against `software-engineering-standards.md`.
- **AI Tagging**: Evaluate severity based on bug propagation radius rather than file length: `[CRITICAL]` / `[HIGH]` / `[MEDIUM]` / `[LOW]`.
- **Output**: Debt Register containing classification codes and refactoring guidance.

## 3. BOY SCOUT REFACTOR (DEV)
- **Action**: DEV addresses debts in priority order: CRITICAL → HIGH.
- **Constraint**: Every refactor commit must be accompanied by unit tests proving behavior remains unaltered.
- **Tagging**: Mark `[TECH_DEBT:RESOLVED]` upon completing each item.
- **Output**: Refactored code + updated tests.

## 4. VERIFY & LOG (LEADER)
- **Action**: Re-run scan to confirm debts are resolved with zero regressions.
- **Output**: `walkthrough.md` — Debt Register Before/After. Update `team-retro.md` if new patterns are identified.

---

## 🚨 Failure Points

1. Refactoring breaks existing behavior → **Solution**: Write "behavior tests" prior to refactoring.
2. DEV over-refactors beyond scope → **Solution**: Each PR addresses strictly 1 debt item.
3. Debt Register lacks prioritization → **Solution**: LEADER classifies severity before assigning to DEV.
