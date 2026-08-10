---
workflow_id: FIX-001
description: Quick, bulletproof bug fixing workflow for Enterprise systems.
role_lead: TESTER
triggers: ["/fix", "bug", "error", "fix", "repair"]
version: "2.0"
---

# 🩹 Workflow: Robust Bug Fix (/fix)

> **Core Principle**: TESTER isolates first — DEV fixes second. Never the reverse.

## ⚡ Execution Flow

```
BUG_REPORT → TESTER (Isolate) → DEV (Fix) → SECURITY (Review) → LEADER (Gate)
```

---

## 1. ISOLATE BUG (TESTER)
- **Action**: Reproduce bug via a failing test (RED). Identify Root Cause and affected scope.
- **Block condition**: Bug cannot be reproduced → Request additional info, DO NOT guess.
- **Output**: Failing test + Bug Report (Severity + Steps to Reproduce + Expected vs Actual).

## 2. SURGICAL FIX (DEV)
- **Action**: Apply minimal fix to pass TESTER's failing test. Do not "gold plate".
- **[DB_CHECKPOINT]**: Fix requires altering legacy DB schema → STOP, ask User.
- **Constraint (KISS)**: If fix requires > 50 lines of code → indicates wrong Root Cause, return to step 1.
- **Output**: Code fix + Updated unit test + `[TECH_DEBT]` tag if using workaround.

## 3. SECURITY REGRESSION (SECURITY)
- **Action**: Scan the fix to verify no new vulnerabilities were introduced (regression vulnerabilities).
- **Focus**: Input validation, auth logic, data exposure.
- **Output**: Approval / Block with specific evidence.

## 4. GATE & LOG (LEADER)
- **Action**: Verify test passes. Log Root Cause. Update technical debt (if any) in `.agents/STATE.md`.
- **Output**: `walkthrough.md` + `.agents/STATE.md` (Updated).

---

## 🚨 Failure Points

1. DEV fixes without a failing test → **Solution**: TESTER must hand off RED test before step 2.
2. Fix is broader than necessary → **Solution**: LEADER requires scope restricted to failing test.
3. Bug resurfaces after 1 week → **Solution**: If fixed > 2 times → trigger `/retro` to analyze patterns.
