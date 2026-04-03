---
description: Sơ đồ Workflow Dev Hoàn chỉnh (Pipeline phát triển Tính Năng Mới với bộ 4 Agent BA, SA, DEV, LEADER).
---

# 🚀 Workflow: Phát Triển Tính Năng Mới (/dev)

Quy trình này kích hoạt chuỗi hành động chuyên biệt để phát triển tính năng mới từ đầu.

## 1. RESEARCH & REQUIREMENT (BA)
- **Hành động**: BA phân tích yêu cầu User.
// turbo
- **Tự động**: Tạo thư mục `docs/business/` nếu chưa có.
- **Bàn giao**: `docs/business/brd.md`, `docs/business/user-stories.md`.

## 2. ARCHITECTURE DESIGN (SA)
- **Hành động**: SA thiết kế kiến trúc dựa trên tài liệu BA.
// turbo
- **Tự động**: Tạo thư mục `docs/architecture/` nếu chưa có.
- **Bàn giao**: `implementation_plan.md`, `docs/architecture/api-contract.md`.

## 3. EXECUTION & TDD (DEV)
- **Hành động**: DEV thực thi code theo plan.
- **Ràng buộc**: Viết Test trước khi viết Code.
// turbo
- **Tự động**: Chạy lệnh lint/format sau khi viết code (VD: `npm run lint`).
- **Bàn giao**: Mã nguồn trong `src/` và Test trong `tests/`.

## 4. VERIFY & REPORT (LEADER)
- **Hành động**: LEADER kiểm duyệt qua 5 Gates.
- **Kết xuất**: `walkthrough.md`.
