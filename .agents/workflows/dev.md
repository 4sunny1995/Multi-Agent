# 🚀 Workflow: Phát Triển Tính Năng Enterprise (/dev)

Quy trình chuẩn hóa cho các hệ thống lớn, yêu cầu sự phối hợp chặt chẽ giữa 8 vai trò khác nhau.

## 1. STRATEGIC RESEARCH (BA)
- **Hành động**: BA phân tích yêu cầu từ USER_REQUEST. Nếu đã có tài liệu sẵn (Discovery-INF-001), hãy phân tích tính kế thừa.
- **Bàn giao**: `docs/original/business/brd.md` và `docs/original/business/user-stories.md` (chuẩn INVEST). Ghi rõ phần "Inherited" (Kế thừa) và "New" (Mới).

## 2. UI/UX DESIGN (DESIGNER)
- **Hành động**: Designer tạo Mockup & UI Specs dựa trên User Stories. Nếu thiết kế đã tồn tại ([/design]), hãy tập trung vào Specs kỹ thuật chi tiết.
- **Bàn giao**: `docs/original/ui/style-guide.md` và `docs/original/ui/specs.md`.

## 3. ARCHITECTURAL BLUEPRINT (SA & CLOUD ARCHITECT)
- **Hành động**: SA thực hiện **Infra Discovery** (Dựa trên INF-001) trước khi thiết kế Core Logic. Cloud Architect thiết kế Infra & Dự toán.
- **Ràng buộc [DBS-001]**: Nếu có thay đổi Database hiện có, PHẢI kích hoạt trạm kiểm soát **[DB_CHECKPOINT]** để yêu cầu User phê duyệt trực tiếp.
- **Bàn giao**: `docs/original/architecture/` (Sequence, Schema) và `docs/original/budget/` (Cost Estimation). Ghi rõ trạng thái: **New** hoặc **Legacy**.

## 4. SECURITY GATEWAY (SECURITY)
- **Hành động**: Đánh giá thiết kế của SA về phương diện bảo mật, phân quyền (RBAC) và quản lý bí mật (Secrets).
- **Bàn giao**: Phê duyệt trong `implementation_plan.md`.

## 5. CORE EXECUTION & TDD (DEV)
- **Hành động**: DEV thực thi theo Plan của SA. Tuân thủ Clean Code & SOLID.
- **Ràng buộc**: Viết Test trước khi viết Code.
- **Bàn giao**: Source code (`src/`) và Unit tests (`tests/`).

## 6. REINFORCEMENT & DOCS (TESTER & TECH WRITER)
- **Hành động**: TESTER chạy Acceptance/Integration tests. Tech Writer viết tài liệu hướng dẫn.
- **Bàn giao**: `docs/original/testing/reports.md` và `docs/original/release/user-guide.md`.

## 7. FINAL AUDIT & RELEASE (LEADER)
- **Hành động**: LEADER kiểm duyệt toàn bộ Artifacts qua 7 chặng kiểm soát.
- **Kết xuất**: `walkthrough.md` và lệnh `% git tag <version>`.
