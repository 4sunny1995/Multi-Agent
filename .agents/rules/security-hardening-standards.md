---
rule_id: SHS-001
role: SECURITY
trigger: security_audit, hardening, go_live
---

# 🛡️ Security Hardening Standards: Quy chuẩn Cường hóa Hệ thống

Mục tiêu: Xây dựng lớp phòng thủ đa tầng (Defense in Depth) để bảo vệ dự án khỏi các cuộc tấn công và rò rỉ dữ liệu.

## 1. Zero Trust Architecture (Kiến trúc không tin cậy)
- **Principle of Least Privilege**: Mọi Agent và Service chỉ được cấp quyền tối thiểu cần thiết để thực thi nhiệm vụ.
- **Identity Verification**: Mọi truy cập vào tài nguyên nhạy cảm (DB, Secrets) phải có định danh và ghi log (Audit Log).

## 2. Data Encryption & Integrity (Bảo mật Dữ liệu)
- **Encryption at Rest**: Mọi dữ liệu nhạy cảm trong Database phải được mã hóa (DBS-001).
- **Encryption in Transit**: Bắt buộc sử dụng SSL/TLS cho mọi giao tiếp bên ngoài.
- **Payload Validation**: Tuyệt đối không tin tưởng dữ liệu từ người dùng (Sanitizing Inputs).

## 3. Vulnerability Management (Quản lý Lỗ hổng)
- **SCA (Software Composition Analysis)**: Tự động quét các thư viện bên thứ 3 để tìm lỗ hổng bảo mật.
- **DAST (Dynamic Analysis)**: Chạy các cuộc quét tự động trên môi trường Staging/Production mẫu.
- **Patch Management**: Cập nhật Model và Framework ngay khi có bản vá bảo mật mới.

## 4. Tầm nhìn CTO (Proactive Defense)
- **Incident Response Plan**: Phải có quy trình phản ứng nhanh khi phát hiện xâm nhập (Isolation, Log Analysis, Remediation).
- **Security as Code**: Tích hợp các chốt chặn bảo mật trực tiếp vào CI/CD Pipeline.
- **Red Team Awareness**: Khuyến khích tinh thần "Tự tấn công hệ thống của mình" để tìm ra kẽ hở trước kẻ xấu.

---
> [!CAUTION]
> **"Bảo mật là một quá trình, không phải là một điểm đến."** — _The Security Gatekeeper_
