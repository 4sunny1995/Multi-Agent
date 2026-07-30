---
rule_id: SEC-001
role: SECURITY
trigger: always_on, commit, pr
---

# 🛡️ Environment Protection: Bảo Vệ Bí Mật Hệ Thống

Mục tiêu: Đảm bảo không có rò rỉ dữ liệu nhạy cảm (API Keys, Passwords, Tokens) ra bên ngoài môi trường phát triển.

## 1. Zero-Hardcode Policy (Chính sách không hard-code)
- **Tuyệt đối cấm**: Nhúng API Keys, mật khẩu DB hoặc Secret Tokens trực tiếp vào mã nguồn (.js, .py, .go, .java).
- **Environment Context**: Tất cả cấu hình nhạy cảm phải được truy xuất qua `process.env`, `os.getenv()`, hoặc Secret Manager.

## 2. Quản lý Tệp Môi trường (.env Strategy)
- **.env.example**: Luôn cung cấp tệp mẫu không chứa giá trị thực để các thành viên khác biết cấu trúc cần thiết.
- **Git Ignore**: Tệp `.env` thực sự PHẢI được nằm trong `.gitignore`.
- **Sensitive Keys**: Các tệp chìa khóa (.pem, .json key) không bao giờ được đưa vào Version Control.

## 3. Secret Scanning Workflow (Quét Bí mật)
- **Pattern Matching**: Quét các chuỗi có định dạng giống Secret (Ví dụ: `AIza...`, `sk-...`).
- **Pre-commit Checks**: Khuyến khích kiểm tra cục bộ trước khi đẩy code lên Server.

## 4. Phản hồi Phá vỡ Quy tắc (Critical Response)
- Nếu phát hiện rò rỉ Secret: **BLOCK & REJECT** PR ngay lập tức.
- Yêu cầu DEV: "Di chuyển mã bí mật [X] ra biến môi trường và vô hiệu hóa (Revoke) chìa khóa cũ ngay lập tức."

---
> [!CAUTION]
> **"Một rò rỉ nhỏ có thể làm đắm cả con tàu Enterprise."** — _The Security Gatekeeper_
