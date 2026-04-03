---
trigger: always_on
---

# 📜 ENVIRONMENT RULE: SECURE & DYNAMIC CONFIGURATION (SDC-001)

| Thông số             | Giá trị                                                                    |
| :------------------- | :------------------------------------------------------------------------- |
| **Mã hiệu**          | SDC-001                                                                    |
| **Activation Mode**  | **Always On** (Luôn áp dụng)                                               |
| **Đối tượng**        | Toàn bộ AI Agents (BA, SA, DEV, TESTER) & Hệ thống điều phối               |
| **Triết lý cốt lõi** | "Code là công khai, Cấu hình là riêng tư. Logic là tĩnh, Hành vi là động." |

---

## 🛡️ 1. Quản lý Bảo mật & Bí mật (Static Secrets)

Để đảm bảo an toàn tuyệt đối cho hệ thống, mọi Agent phải tuân thủ các rào cản bảo mật sau:

- **Tuyệt đối không Hard-code:** Nghiêm cấm mọi chuỗi ký tự chứa API Key, Password, Token, hoặc Endpoint URL bên trong mã nguồn.
- **Chiến lược Twelve-Factor App:** Cấu hình phải được tách biệt hoàn toàn khỏi mã nguồn.
- **Phân cấp lưu trữ:**
  - **Môi trường Local:** Sử dụng file `.env` (Bắt buộc phải khai báo trong `.gitignore`).
  - **Môi trường Production:** Phải truy xuất thông qua **Secret Manager** (Google Secret Manager, Vault).
- **Cơ chế quét (Security Scanning):** Mọi Pull Request phải được **Security Agent** quét tự động để phát hiện rò rỉ secret trước khi trình Leader duyệt.

---

## ⚡ 2. Quản lý Cấu hình Động (Dynamic/Runtime Config)

Để tối ưu hóa khả năng phản ứng nhanh mà không cần quy trình Deploy phức tạp:

- **Tính linh hoạt (No-Deploy):** Các biến số có khả năng thay đổi thường xuyên (Ngưỡng lỗi, số lần Retry, Model Version, Feature Flags) **không được** đặt trong file `.env` hoặc Secret Manager tĩnh.
- **Kho lưu trữ tập trung (Centralized Store):** Sử dụng các dịch vụ như **Redis, AppConfig, hoặc Firebase Remote Config**.
- **Cơ chế Hot-swap:** Ứng dụng phải có khả năng nhận giá trị mới từ kho lưu trữ ngay lập tức (Runtime) mà không cần khởi động lại (Restart) hệ thống.
- **Ứng dụng thực tế:** Cho phép Leader AI thay đổi `MODEL_VERSION` hoặc `RETRY_DELAY` trong 1 giây khi phát hiện sự cố hạ tầng (như lỗi 503).

---

## 🏗️ 3. Phân cấp truy xuất dữ liệu (Configuration Hierarchy)

Mọi yêu cầu lấy thông số cấu hình phải thông qua một `ConfigService` chung theo thứ tự ưu tiên:

1.  **Ưu tiên 1 (Dynamic):** Truy vấn từ **Runtime Config Store** (Dành cho các thay đổi nóng).
2.  **Ưu tiên 2 (Static):** Truy vấn từ **Environment Variables** (Dành cho các biến hệ thống cố định).
3.  **Ưu tiên 3 (Fallback):** Sử dụng giá trị **Default** an toàn được định nghĩa trong code nếu các nguồn trên không khả dụng.

---

## 🤖 Chỉ thị điều phối dành cho Leader Agent

Dưới chế độ **Always On**, Leader Agent thực thi các quyền hạn sau:

1.  **Chặn đứng (Block):** Bác bỏ ngay lập tức bất kỳ đoạn mã nào của **DEV Agent** chứa thông tin nhạy cảm hard-code.
2.  **Phê bình (Critique):** Yêu cầu **SA Agent** thiết kế lại nếu sơ đồ kiến trúc không có cơ chế xử lý cấu hình động.
3.  **Tối ưu (Optimize):** Khi hệ thống gặp lỗi 503 (Capacity Exhausted), Leader ưu tiên ra lệnh cho **Fixer Agent** thay đổi thông số động thay vì sửa mã nguồn.

---

## 📂 Mẫu cấu hình chuẩn (SDC-001 Template)

### Nhóm A: Bí mật (Secret Manager)

- `DB_PASSWORD`
- `GEMINI_API_KEY`
- `PRIVATE_KEY`

### Nhóm B: Động (Dynamic Store)

- `CURRENT_MODEL`: `gemini-3.1-pro-high` (Có thể đổi sang `flash` ngay lập tức)
- `RETRY_LIMIT`: `5`
- `MAINTENANCE_MODE`: `false`
- `API_TIMEOUT_MS`: `5000`

---

> **"Hệ thống hoàn hảo là hệ thống có thể thay đổi linh hồn (Behavior) mà không cần chạm vào thân xác (Source Code)."** — _The Gatekeeper Leader_
