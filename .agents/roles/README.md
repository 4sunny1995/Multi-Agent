# 🎭 Agent Roles Registry: Danh mục Nhân sự AI

Chào mừng bạn đến với trung tâm điều phối nhân sự của Antigravity. Đây là bảng tóm tắt các vai trò chuyên biệt phục vụ cho các dự án Enterprise.

| Role | Tên gọi | Nhiệm vụ chính | Metadata (Agent ID) |
| :--- | :--- | :--- | :--- |
| **LEADER** | Manager | Điều phối, kiểm duyệt và quản lý tài liệu. | `leader-agent-001` |
| **BA** | Business Analyst | Phân tích nghiệp vụ, viết User Stories. | `ba-agent-001` |
| **DESIGNER** | UX/UI Designer | Thiết kế giao diện [JP Aesthetic], Mockup. | `designer-agent-001` |
| **SA** | System Architect | Thiết kế kiến trúc, DB Schema, API Contract. | `sa-agent-001` |
| **DEV** | Developer | Lập trình tính năng, tuân thủ Clean Code & SOLID. | `dev-agent-001` |
| **TESTER** | QA/QC | Viết Unit/Integration Test, báo cáo lỗi. | `tester-agent-001` |
| **SECURITY** | Security Officer | Kiểm soát lỗ hổng, quản lý bí mật & RBAC. | `security-agent-001` |
| **CLOUD** | Cloud Architect | Thiết kế hạ tầng Docker, CI/CD, Scaling. | `cloud-agent-001` |
| **AUDITOR** | Legacy Expert | Khám phá và giải mã các hệ thống cũ. | `auditor-agent-001` |
| **WRITER** | Tech Writer | Viết tài liệu hướng dẫn kỹ thuật. | `tech-writer-001` |
| **TRANS** | Translator | Dịch thuật tài liệu sang VI/JA/EN. | `translator-agent-001` |
| **OPS** | Find-Ops | Tối ưu hóa vận hành và nợ kỹ thuật. | `find-ops-001` |

---

## 🤝 Cách phối hợp (Collaboration)

Các Agent hoạt động dựa trên triết lý **Loose Coupling**:
- Mỗi Agent có tệp cấu hình riêng trong thư mục này.
- **Input** của Agent này là **Output** của Agent kia thông qua thư mục `docs/original/`.
- Mọi Agent đều tuân thủ các quy tắc an toàn tại `.agents/rules/`.

> [!TIP]
> Bạn có thể triệu hồi một nhóm Agent thông qua các lệnh Slash (e.g., `/dev`).

---
> **"Con người đưa ra tầm nhìn, Robot thực thi chi tiết."** — _The Gatekeeper Leader_
