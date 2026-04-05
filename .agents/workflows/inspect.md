---
workflow_id: INS-001
description: Quy trình tự động dò tìm và diệt nợ kỹ thuật (Technical Debt).
role_lead: LEADER
triggers: ["/inspect", "nợ kỹ thuật", "technical debt", "code smell", "audit code"]
version: "2.0"
---

# 🔬 Workflow: Kiểm Toán Nợ Kỹ Thuật (/inspect)

> **Chế độ**: Leader khó tính — không có lòng thương xót với code bẩn.

## ⚡ Luồng thực thi

```
LEADER (Scan) → LEADER (Compliance) → DEV (Refactor) → LEADER (Verify)
```

---

## 1. STATIC ANALYSIS (LEADER)
// turbo
- **Hành động**: `list_dir src/` + tìm file > 200 dòng. `grep_search` các pattern nguy hiểm.
- **Pattern cần tìm**: Hàm > 15 dòng, `if-else > 3 levels`, magic numbers, hardcoded strings.
- **Output**: Danh sách "Suspects" với file:line reference.

## 2. COMPLIANCE CHECK (LEADER)
- **Đối chiếu** với `clean-code.md`, `solid.md`, `design-pattern.md`.
- **Phân loại** mỗi vấn đề: `[CRITICAL]` / `[HIGH]` / `[MEDIUM]` / `[LOW]`.
- **Output**: Debt Register với severity và đề xuất fix cụ thể.

## 3. BOY SCOUT REFACTOR (DEV)
- **Hành động**: DEV xử lý các debt theo thứ tự CRITICAL → HIGH.
- **Constraint**: Mỗi refactor commit phải có unit test đi kèm để chứng minh behavior không thay đổi.
- **Gắn tag**: `[TECH_DEBT:RESOLVED]` khi hoàn thành từng item.
- **Output**: Refactored code + updated tests.

## 4. VERIFY & LOG (LEADER)
- **Hành động**: Chạy lại scan để đảm bảo debt đã được giải quyết. Không có regression.
- **Output**: `walkthrough.md` — Debt Register Before/After. Cập nhật `team-retro.md` nếu pattern mới phát hiện.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. Refactor làm hỏng behavior → **Giải pháp**: Viết "behavior test" trước khi refactor.
2. DEV refactor quá scope → **Giải pháp**: Mỗi PR chỉ xử lý 1 debt item.
3. Debt Register không có priority → **Giải pháp**: LEADER phân loại severity trước khi giao DEV.
