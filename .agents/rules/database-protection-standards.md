---
rule_id: DBS-001
trigger: on_db_change
applies_to: [SA, CLOUD_ARCHITECT, DEV, LEADER]
severity: CRITICAL
version: "2.0-llm"
---

# 🛡️ Database Protection Standards (DBS-001)

> **Activation**: This rule triggers immediately when any Agent mentions: `ALTER`, `DROP`, `TRUNCATE`, `migration`, `schema change`, or `database`.

## ⚡ 3-Step Mandatory Protocol

```
1. SURVEY (SA) → Impact Analysis
2. BACKUP (CLOUD ARCH) → Snapshot before ANY change  
3. APPROVE (USER/PO) → Explicit "Approve DB Change" required
```

**Missing any step → LEADER BLOCKS entire deployment.**

---

## ❌ HARD BLOCKS (Strictly Forbidden — No Exceptions)

❌ `DROP TABLE` / `TRUNCATE` on production data → Agent MUST stop and report to LEADER.
❌ `ALTER TABLE` on tables containing live data without PO Approval.
❌ Schema migration without a rollback script.
❌ Database modifications without a backup snapshot.

## ✅ SAFE PATHS (Safe Execution Paths)

✅ Create NEW tables instead of modifying old ones (Append-only pattern).
✅ Add nullable columns instead of `ALTER`ing existing columns.
✅ Backup → Migrate staging → Verify → PO Approval → Migrate production.

---

## 🚦 [DB_CHECKPOINT] Protocol

When an Agent realizes a DB change is required, immediately execute:

```
🛑 [DB_CHECKPOINT] DB change requirement detected.
📋 Impact: [Table X will be affected]
🔒 Action required: User approval prior to continuing.
   → Enter "Approve DB Change" to proceed, or "Reject" to stop.
```

---

> **"The Database is the project's brain. Protect first, alter second."**
