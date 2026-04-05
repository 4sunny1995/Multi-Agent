# 🚀 Automation Workflows Registry: Hướng dẫn Vận hành

Danh mục các lệnh điều khiển (Slash Commands) để kích hoạt sự phối hợp giữa các Agent tại Antigravity.

## 🛠️ Danh sách các lệnh Slash

| Lệnh | Workflow | Mục đích chính | Khi nào dùng |
| :--- | :--- | :--- | :--- |
| `/dev` | [Enterprise Dev](file:///.agents/workflows/dev.md) | Phát triển tính năng mới từ A-Z. | Mở rộng tính năng hoặc xây dựng module mới. |
| `/fix` | [Surgical Fix](file:///.agents/workflows/fix.md) | Sửa lỗi cấp bách nhưng an toàn. | Khi phát hiện Bug hoặc nợ kỹ thuật. |
| `/design` | [UX/UI Design](file:///.agents/workflows/design.md) | Thiết kế giao diện (JP Standard). | Khi cần Mockup hoặc Specs cho Front-end. |
| `/audit` | [Legacy Audit](file:///.agents/workflows/audit.md) | Khám phá và giải mã hệ thống cũ. | Khi mới tiếp nhận codebase mới hoặc DB cũ. |
| `/inspect` | [Code Audit](file:///.agents/workflows/inspect.md) | Dò tìm và diệt nợ kỹ thuật. | Khi cần refactor hoặc tối ưu hóa hiệu năng. |
| `/release` | [Enterprise Release](file:///.agents/workflows/release.md) | Đóng gói và phát hành phiên bản. | Kết thúc Sprint hoặc bàn giao cho Production. |
| `/secure` | [Security Audit](file:///.agents/workflows/secure.md) | Rà soát bảo mật và Secrets. | Trước khi Deploy hoặc sau khi sửa lỗi quan trọng. |
| `/infra` | [Infrastructure](file:///.agents/workflows/infra.md) | Thiết lập Docker/CI-CD. | Khi cần thay đổi môi trường hoặc Scaling. |
| `/retro` | [Retrospective](file:///.agents/workflows/retro.md) | Đánh giá và cập nhật tri thức Agent. | Sau mỗi chu kỳ làm việc để nâng cấp hệ thống. |
| `/trans` | [Translate](file:///.agents/workflows/trans.md) | Dịch thuật tài liệu đa ngôn ngữ. | Bàn giao cho khách hàng nước ngoài (JA/EN). |

---

## 🔗 Chế độ Vận hành: Độc lập vs Tích hợp

Các lệnh của Antigravity được thiết kế theo triết lý **Modular Orchestration**:

1. **Standalone (Chạy độc lập)**: 
    - Bạn có thể gọi `/design` để lấy mockup mà không cần gọi `/dev`. 
    - Designer sẽ tự động tìm kiếm BRD tại `docs/original/business/` nếu đã tồn tại.
2. **Integrated (Chạy tích hợp)**: 
    - `/dev` là lệnh "tổng quản", nó phối hợp 8 Agent và thực thi tuần tự từ Phân tích -> Thiết kế -> Lập trình -> Kiểm thử.

---

## 🚦 Chốt chặn chất lượng (Safety Gate)

Mọi Workflow đều được giám sát bởi LEADER Agent và tuân thủ các chốt chặn sau:
- **[DB_CHECKPOINT]**: Phê duyệt thay đổi cấu trúc Database từ User.
- **[DBS-001]**: Bảo vệ dữ liệu hiện có.
- **[INF-001]**: Nhận diện hạ tầng cũ/mới để đưa ra giải pháp phù hợp.

---
> **"Tự động hóa không phải là thay thế con người, mà là giải phóng con người."** — _The Gatekeeper Leader_
