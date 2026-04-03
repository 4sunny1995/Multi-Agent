---
description: Sơ đồ Workflow Phân tích Hệ thống Cũ (Legacy Audit).
---

# 🕵️ Workflow: Phân Tích Hệ Thống Cũ (/audit)

Quy trình này sử dụng Agent **AUDITOR** để khám phá và giải mã các hệ thống cũ, phục vụ cho việc maintain hoặc hiện đại hóa.

## 1. DISCOVERY (Khám phá)
- **Hành động**: AUDITOR thực hiện mapping toàn bộ cấu trúc codebase.
// turbo
- **Tự động**: Tạo báo cáo `docs/architecture/discovery.md` liệt kê cây thư mục và các file core.
- **Kết xuất**: Danh sách các module chính và các điểm lồng ghép (Entry points).

## 2. DEPENDENCY MAPPING (Bản đồ phụ thuộc)
- **Hành động**: AUDITOR tìm kiếm các liên kết giữa các module (Imports, API calls, Database queries).
- **Bàn giao**: Sơ đồ Mermaid mô tả sự liên kết của hệ thống. Chế độ đọc: `view_file`.

## 3. LOGIC EXTRACTION (Giải mã Logic)
- **Hành động**: Chuyển đổi code cũ sang User Stories và Acceptance Criteria.
- **Mục tiêu**: Đưa "Logic thực tế" về lại dạng "Yêu cầu nghiệp vụ" để BA có thể thẩm định.
- **Kết xuất**: `docs/business/legacy-logic.md`.

## 4. MODERNIZATION ROADMAP (Lộ trình hiện đại hóa)
- **Hành động**: LEADER và SA cùng AUDITOR đề xuất các bước Refactor hoặc Re-architect.
- **Kết xuất**: `docs/architecture/roadmap.md` với các ưu tiên (High/Medium/Low priority).
