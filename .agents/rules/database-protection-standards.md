---
rule_id: DBS-001
trigger: on_db_change
applies_to: [SA, CLOUD_ARCHITECT, DEV, LEADER]
severity: CRITICAL
version: "2.0-llm"
---

# 🛡️ Database Protection Standards (DBS-001)

> **Activation**: Rule này kích hoạt ngay khi bất kỳ Agent nào nhắc đến: `ALTER`, `DROP`, `TRUNCATE`, `migration`, `schema change`, hay `database`.

## ⚡ 3-Step Mandatory Protocol

```
1. SURVEY (SA) → Impact Analysis
2. BACKUP (CLOUD ARCH) → Snapshot before ANY change  
3. APPROVE (USER/PO) → Explicit "Approve DB Change" required
```

**Thiếu bất kỳ bước nào → LEADER BLOCK toàn bộ deployment.**

---

## ❌ HARD BLOCKS (Cấm tuyệt đối — không có ngoại lệ)

❌ `DROP TABLE` / `TRUNCATE` trên production data → Agent PHẢI dừng và báo cáo LEADER
❌ `ALTER TABLE` trên bảng có dữ liệu thực mà không có PO Approval
❌ Schema migration mà không có rollback script
❌ Thay đổi DB mà không có backup snapshot

## ✅ SAFE PATHS (Đường đi an toàn)

✅ Thêm bảng MỚI thay vì sửa bảng cũ (Append-only pattern)
✅ Thêm column nullable thay vì `ALTER` column hiện có
✅ Backup → Migrate staging → Verify → PO Approval → Migrate production

---

## 🚦 [DB_CHECKPOINT] Protocol

Khi Agent nhận thấy cần thay đổi DB, phải thực hiện ngay:

```
🛑 [DB_CHECKPOINT] Phát hiện thay đổi DB yêu cầu.
📋 Impact: [Bảng X sẽ bị ảnh hưởng]
🔒 Action required: User phê duyệt trước khi tiếp tục.
   → Nhập "Approve DB Change" để tiếp tục, hoặc "Reject" để dừng.
```

---

> **"Database là bộ não của dự án. Bảo vệ trước, can thiệp sau."**
