# 🚀 Agent Workflows Registry: Quy trình phối hợp tự động

Chào mừng bạn đến với thư mục điều hướng các Slash Commands. Mỗi tệp tin bên dưới định nghĩa một kịch bản phối hợp (Orchestration) giữa nhiều Agent để giải quyết bài toán nghiệp vụ.

---

## 🏗️ Danh sách Workflows (12)

| Lệnh | Mô tả | Vai trò tham gia | Link |
| :--- | :--- | :--- | :--- |
| `/dev` | Phát triển mẫu tính năng | BA -> SA -> DEV -> TESTER -> LEADER | [dev.md](file:///dev.md) |
| `/fix` | Sửa lỗi hệ thống | TESTER -> DEV -> LEADER | [fix.md](file:///fix.md) |
| `/audit` | Kiểm tra hệ thống cũ | AUDITOR -> SA -> BA | [audit.md](file:///audit.md) |
| `/design` | Thiết kế UX/UI | DESIGNER -> SA -> BA | [design.md](file:///design.md) |
| `/infra` | Thiết lập hạ tầng | CLOUD ARCH -> OPS -> SA | [infra.md](file:///infra.md) |
| `/release` | Quản lý phát hành | LEADER -> TECH WRITER -> CLOUD ARCH | [release.md](file:///release.md) |
| `/secure` | Cường hóa bảo mật | SECURITY -> SA -> TESTER | [secure.md](file:///secure.md) |
| `/trans` | Dịch thuật tài liệu | TRANSLATOR -> POLYGLOT AGENT | [trans.md](file:///trans.md) |
| `/report` | Báo cáo kỹ thuật | BA + SA + DEV -> TECH WRITER | [report.md](file:///report.md) |
| `/inspect` | Diệt nợ kỹ thuật | LEADER -> AUDITOR -> DEV | [inspect.md](file:///inspect.md) |
| `/retro` | Nâng cấp Agent | Toàn bộ Team + USER | [retro.md](file:///retro.md) |
| `/init` | Khởi tạo dự án | LEADER -> BA -> SA | [README.md](file:///README.md) |

---

## 🚦 Quy trình thực thi (Runtime)

Khi bạn gõ lệnh trên khung chat:
1. **Leader** sẽ phân tích mục tiêu và gọi Agent lead của workflow đó.
2. **Agent lead** sẽ điều phối các thành viên khác theo các bước trong tệp MD.
3. Tài liệu bàn giao sẽ được lưu tại `docs/` hoặc `artifacts/`.

---
> **"Quy trình là đôi cánh giúp trí tuệ AI bay đúng hướng."** 
