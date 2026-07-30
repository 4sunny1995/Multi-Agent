# 📜 RULE: DATABASE PROTECTION STANDARDS (DBS-001)

| Thông số | Giá trị |
| :--- | :--- |
| **Mã hiệu** | DBS-001 |
| **Đối tượng** | SA, CLOUD ARCHITECT, DEV, LEADER |
| **Triết lý** | "Database là bộ não của dự án - Bảo vệ trước, can thiệp sau." |

---

## 🛡️ 1. Nguyên tắc Can thiệp (Intervention Principles)

1. **Ưu tiên Append-only**: Khuyến khích tạo bảng mới hoặc schema mới thay vì sửa đổi (Alter) các bảng hiện có đang hoạt động ổn định.
2. **Backward Compatibility**: Mọi thay đổi cấu trúc DB cũ phải đảm bảo không làm gãy logic của phiên bản ứng dụng hiện tại.
3. **Cấm tự ý sửa đổi (Strict No-Modification)**: Agent tuyệt đối không được tự ý thực hiện lệnh `DROP`, `TRUNCATE` hoặc `ALTER` trên các bảng có chứa dữ liệu thực tế mà không có báo cáo rủi ro.

---

## 🚦 2. Trạm kiểm soát phê duyệt (Approval Checkpoints)

Mọi thay đổi cấu trúc Database phải tuân thủ quy trình Phê duyệt 3 bước:

1. **Khảo sát (SA)**: Phân tích mức độ ảnh hưởng và đề xuất giải pháp (New vs Edit).
2. **Báo cáo rủi ro (Risk Analysis)**: Liệt kê các Impact nếu thay đổi DB hiện có.
3. **Phê duyệt từ User (PO Approval)**: **BẮT BUỘC** nhận được xác nhận "Approve DB Change" từ User (Người sử dụng thực tế) trước khi Cloud Architect hoặc DEV thực thi.

---

## 🛠️ 3. Quy trình thực thi an toàn (Safety Execution)

- **Backup First**: Luôn thực hiện Snapshot/Backup Database trước khi thực hiện các câu lệnh Migration trên môi trường Staging/Production.
- **Rollback Plan**: Mọi bản thảo thiết kế DB phải đi kèm kịch bản khôi phục (Rollback) nếu xảy ra lỗi.
- **Minimality**: Chỉ thay đổi những gì thực sự tối cần thiết. Tránh "dọn dẹp" (Clean-up) hoặc tái cấu trúc lớn trên DB đang hoạt động.

---
> **"Xây dựng tính năng mới trên nền tảng cũ là một nghệ thuật, phá vỡ nền tảng cũ là một sai lầm."** — _The Gatekeeper Leader_
