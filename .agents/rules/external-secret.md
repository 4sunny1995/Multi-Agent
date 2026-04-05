---
rule_id: SDC-001
trigger: always_on
applies_to: [ALL]
version: "2.0-llm"
---

# 📜 Environment & Configuration: Secure & Dynamic Configuration (SDC-001)

<identity>
Mục tiêu cốt lõi: "Code là công khai, Cấu hình là riêng tư. Logic là tĩnh, Hành vi là động." Đảm bảo an toàn tuyệt đối cho bí mật hệ thống và linh hoạt trong vận hành.
</identity>

<activation>
Kích hoạt trong mọi giai đoạn: Lập kế hoạch, Phát triển, Triển khai và Vận hành.
</activation>

<thinking_pattern>
1. Biến này có nhạy cảm (API Key, PII) không? Nếu có -> Secret Manager.
2. Thông số này có thay đổi thường xuyên không? Nếu có -> Dynamic Config.
3. Tôi đã kiểm tra .gitignore chưa?
</thinking_pattern>

<guidelines>

### 🛡️ 1. Quản lý Bảo mật & Bí mật (Static Secrets)
- **Zero-Hardcode Policy**: Tuyệt đối cấm nhúng Secret (API Keys, Passwords, Tokens) trực tiếp vào mã nguồn.
- **Environment Strategy**:
    - **Local**: Sử dụng file `.env` (Bắt buộc khai báo trong `.gitignore`).
    - **Production**: Sử dụng **Secret Manager** (AWS Secrets Manager, GCP Secret Manager, Vault).
- **Secret Scanning**: Sử dụng tools (trufflehog, gitleaks) để quét bí mật trước khi commit.

### ⚡ 2. Quản lý Cấu hình Động (Dynamic/Runtime Config)
- **Linh hoạt (No-Deploy)**: Các biến số thay đổi thường xuyên (Feature Flags, Retry Limits, Model Version) không đặt trong `.env`.
- **Centralized Store**: Sử dụng Redis, AppConfig hoặc các dịch vụ cấu hình tập trung.
- **Hot-swap Capability**: Ứng dụng phải có khả năng nhận giá trị mới mà không cần khởi động lại (Restart).

### 🏗️ 3. Phân cấp truy xuất dữ liệu (Hierarchy)
1. **Ưu tiên 1 (Dynamic)**: Runtime Config Store (Thay đổi nóng).
2. **Ưu tiên 2 (Static)**: Environment Variables (Biến cố định).
3. **Ưu tiên 3 (Fallback)**: Giá trị mặc định an toàn trong Code.

</guidelines>

<anti_patterns>
❌ Hard-code chuỗi ký tự nhạy cảm trong code.
❌ Commit file `.env` hoặc tệp chìa khóa (`.pem`, `.json key`) vào Git.
❌ Đưa các biến thay đổi "nóng" vào file `.env` tĩnh.
❌ Thiếu file `.env.example` dẫn đến việc team không biết cấu trúc cần thiết.
</anti_patterns>

<checklist>
- [ ] Đã kiểm tra không có secret nào bị lộ trong log hoặc code chưa?
- [ ] File `.env` đã được thêm vào `.gitignore` chưa?
- [ ] Có file `.env.example` chưa?
- [ ] Các thông số cấu hình động đã được tách biệt chưa?
</checklist>

---
> [!CAUTION]
> **"Một rò rỉ nhỏ có thể làm đắm cả con tàu Enterprise. Bảo mật là ưu tiên số 1."**
