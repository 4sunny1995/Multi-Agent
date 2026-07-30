---
workflow_id: DEV-001
description: Quy trình phát triển tính năng tinh gọn (Chỉ dành cho BA, DEV, TESTER, LEADER).
role_lead: LEADER
triggers: ["/dev", "phát triển", "tính năng tinh gọn", "lập trình"]
version: "2.0"
---

# 🚀 Workflow: Phát Triển Tinh Gọn (/dev)

> **Pre-condition**: Mọi Agent đọc [llm-agent-config.md](file:///.agents/config/llm-agent-config.md) trước khi bắt đầu.

## ⚡ Luồng thực thi (Happy Path)

```
USER_REQUEST → BA → DEV → TESTER → LEADER
```

---

## 1. REQUIREMENT ANALYSIS (BA)
// turbo
- **Kích hoạt**: Nhận USER_REQUEST có mô tả tính năng. `view_file` các thông tin liên quan.
- **Hành động 1 (Phân loại FIC)**: Xác định Tính năng độc lập (`[FIC: ISOLATED]`) hay có chạm module cũ (`[FIC: INTEGRATED]`).
- **Hành động 2 (Xác định Scope)**: Viết User Stories chi tiết, tập trung vào giá trị người dùng và các ràng buộc nghiệp vụ.
- **Hành động 3 (Bàn giao kịch bản)**: Phác thảo sơ bộ các tiêu chí chấp nhận (Acceptance Criteria) để TESTER có cơ sở chuẩn bị.
- **Output**: `docs/original/business/brd.md` + `user-stories.md`.

## 2. CORE EXECUTION & TDD (DEV)
- **Hành động 1 (Thiết kế nhanh)**: Tự thiết kế logic/DB schema đơn giản dựa trên BRD (không cần qua SA).
- **Hành động 2 (Thực thi code)**: Tuân thủ quy trình TDD (RED → GREEN → REFACTOR). Đảm bảo code sạch, đúng convention.
- **Hành động 3 (Unit Test)**: Đảm bảo coverage cho các logic nghiệp vụ quan trọng.
- **Output**: Source code (`src/`) + Unit tests (`tests/`).
- **Gate Check (Handoff)**: Bố trí chốt chặn xác nhận (TESTER verify xem đoạn Unit Test đã được include ở trên chưa trước khi chạy regression).

## 3. QA & ACCEPTANCE TEST (TESTER)
- **Hành động 1 (Kiểm thử chức năng)**: Chạy các kịch bản dựa trên User Stories và Acceptance Criteria từ BA.
- **Hành động 2 (Kiểm thử hồi quy)**: Nếu là `[FIC: INTEGRATED]`, bắt buộc kiểm tra các module liên quan để đảm bảo không có lỗi phát sinh (Side-effects).
- **Hành động 3 (Báo cáo)**: Ghi nhận kết quả kiểm thử, log lỗi nếu có.
- **Output**: `docs/original/testing/reports.md`.

## 4. FINAL APPROVAL (LEADER)
- **Hành động 1 (Review 7 Gates)**: Kiểm tra tính nguyên vẹn, bảo mật, hiệu năng và tài liệu.
- **Hành động 2 (Nghiệm thu)**: Xác nhận tính năng đã hoàn thiện và sẵn sàng merge/release.
- **Hành động 3 (Tổng kết)**: Cập nhật `STATE.md` và tạo walkthrough cho người dùng.
- **Output**: `walkthrough.md` + Cập nhật `.agents/STATE.md`.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. **DEV tự ý đổi DB schema lớn** mà không báo cáo -> LEADER sẽ block nếu phát hiện thay đổi kiến trúc nhạy cảm.
2. **Thiếu Acceptance Criteria từ BA** -> TESTER không có căn cứ để đánh giá đạt/không đạt.
3. **Bỏ qua Regression Test** ở module Integrated -> Gây lỗi tiềm ẩn cho hệ thống hiện tại.
