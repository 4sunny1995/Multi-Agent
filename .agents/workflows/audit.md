---
workflow_id: AUD-001
description: Legacy system analysis workflow (Legacy Audit) and modernization roadmap.
role_lead: AUDITOR
triggers: ["/audit", "legacy", "legacy system", "audit", "reverse engineer"]
version: "2.0"
---

# 🕵️ Workflow: Legacy System Audit (/audit)

> **Golden Rule**: DO NO HARM — Do not edit a single line of code during the audit process.

## ⚡ Execution Flow

```
CODEBASE → AUDITOR (Discovery) → AUDITOR (Mapping) → AUDITOR+BA (Logic) → SA+LEADER (Roadmap)
```

---

## 1. DISCOVERY (AUDITOR)
- **Action**: Run `list_dir` on the entire project. Identify largest files (> 200 lines).
// turbo
- **Output**: `docs/original/architecture/discovery.md` — System Map with file sizes + entry points.
- **Constraint**: Read-only — strictly no editing.

## 2. DEPENDENCY MAPPING (AUDITOR)
- **Action**: Run `grep_search` to locate imports, API calls, DB queries. Draw Mermaid dependency graph.
- **Search for**: God Objects, circular dependencies, N+1 query patterns.
- **Output**: Mermaid diagram in `docs/original/architecture/discovery.md`.

## 3. LOGIC EXTRACTION (AUDITOR + BA)
- **AUDITOR**: Inspect code, translate complex logic into plain-language descriptions.
- **BA**: Validate whether extracted logic aligns with actual business requirements.
- **Output**: `docs/original/business/legacy-logic.md` — Written for non-technical stakeholders.

## 4. MODERNIZATION ROADMAP (SA + LEADER)
- **SA**: Propose target architecture and migration strategy.
- **LEADER**: Prioritize based on Business Value and Risk.
- **Output**: `docs/original/architecture/roadmap.md` featuring 3 tiers: Quick Wins / Medium / Long-term.

---

## 🚨 Failure Points

1. AUDITOR provides conclusions without evidence → **Solution**: Every finding must cite file:line references.
2. BA does not validate legacy logic → **Solution**: Step 3 requires BA sign-off before proceeding.
3. SA proposes "rewrite from scratch" → **Solution**: Must perform cost-benefit analysis before LEADER approves.
