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

## 1. AI-DRIVEN ROOT CAUSE ANALYSIS (LEADER)
// turbo
- **Hành động 1 (Static)**: `list_dir src/` tìm file lớn, `grep_search` pattern cơ bản (hàm > 15 dòng, if-else > 3 mức).
- **Hành động 2 (AI Pattern Recognition)**: Đọc nội dung module nghi ngờ (qua `view_file`) và dò tìm "vi khuẩn" thiết kế: 
  - Khối mã có Tight-coupling hay không?
  - Dòng dữ liệu (data flow) có mâu thuẫn dẫn đến state leak không?
  - Xác định Root Cause sâu xa tạo ra Tech Debt (VD: sai Pattern, nhồi nhét Feature).
- **Output**: Danh sách "Suspects" kèm lý giải AI-Driven Root Cause.

## 2. COMPLIANCE & SEVERITY TAGGING (LEADER)
- **Đối chiếu** với `clean-code.md`, `solid.md`, `design-pattern.md`.
- **AI Tagging**: Đánh giá độ nghiêm trọng không dựa trên độ dài file, mà dựa trên "Bán kính lây lan bug" nếu logic hỏng: `[CRITICAL]` / `[HIGH]` / `[MEDIUM]` / `[LOW]`.
- **Output**: Debt Register với mã phân loại và hướng refactor.

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
