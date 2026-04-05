# 🚀 Workflow: Phát Triển Tính Năng Enterprise (/dev)

Quy trình chuẩn hóa cho các hệ thống lớn, yêu cầu sự phối hợp chặt chẽ giữa 8 vai trò khác nhau.

## 1. STRATEGIC RESEARCH (BA)
- **Hành động**: BA phân tích yêu cầu từ USER_REQUEST.
- **Bàn giao**: `docs/original/business/brd.md` và `docs/original/business/user-stories.md` (chuẩn INVEST).

## 2. UI/UX DESIGN (DESIGNER)
- **Hành động**: Designer tạo Mockup & UI Specs dựa trên User Stories. Đảm bảo thẩm mỹ [JP] nếu có yêu cầu.
- **Bàn giao**: `docs/original/ui/style-guide.md` và `docs/original/ui/specs.md`.

## 3. ARCHITECTURAL BLUEPRINT (SA & CLOUD ARCHITECT)
- **Hành động**: SA thiết kế Core Logic căn cứ trên UI đã thống nhất. Cloud Architect thiết kế Infra & Dự toán.
- **Bàn giao**: `docs/original/architecture/` (Sequence, Schema) và `docs/original/budget/` (Cost Estimation).

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
