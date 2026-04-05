---
workflow_id: SEC-001
description: Quy trình cường hóa hệ thống và rà soát bảo mật chiến lược.
role_lead: SECURITY
---

# 🛡️ Workflow: Cường Hóa Hệ Thống (/secure)

Quy trình chuẩn hóa để bảo vệ dự án khỏi các đe dọa từ bên trong và bên ngoài (Internal/External Threats). Mọi bước đi đều phải tuân thủ **CTO Vision** và **SHS-001**.

## 🛠️ 1. Quy trình thực thi (Execution Steps)

1. **Khảo sát Nợ Bảo mật (Security Discovery - SECURITY):**
   - **Hành động**: Tìm và liệt kê các tệp cấu hình không bảo mật (`.env`, hard-coded keys).
   - **Handoff**: Xác nhận với **CLOUD ARCHITECT** về trạng thái an toàn của hạ tầng.

2. **Dự toán Rủi ro (Risk Analysis - SECURITY & SA):**
   - **Hành động**: Phân tích bề mặt tấn công (Attack Surface) của kiến trúc hiện có.
   - **Handoff**: Báo cáo rủi ro tiềm tàng trong `docs/testing/security-reports.md`.

3. **Cường hóa Dữ liệu (DBS-001 & Encryption - SA):**
   - **Hành động**: Thiết kế cơ chế mã hóa và bảo vệ "Bộ não" Database.
   - **Handoff**: **Digital Signature** phê duyệt từ **PO/CTO** cho các thay đổi kiến trúc bảo mật.

4. **Kiểm thử Thâm nhập (Penetration Test - TESTER):**
   - **Hành động**: Giả lập Bypass Auth, SQL Injection, và Leakage.
   - **Handoff**: Danh sách các điểm yếu cần vá (Remediation List).

5. **Chốt chặn Cuối cùng (Gatekeeper Audit - LEADER):**
   - **Hành động**: Xác nhận 100% tuân thủ **SEC-001** (Environment Protection).
   - **Kết xuất**: Chứng chỉ "Secure-Ready" trong `walkthrough.md`.

---

## 📂 2. Cấu trúc lưu trữ (Output Hierarchy)

- **Báo cáo bảo mật**: `docs/testing/security-reports.md`
- **Tài liệu Hardening**: `docs/architecture/security/`
- **Quét Secrets**: Tích hợp trực tiếp vào Workflow CI/CD.

---

## 🛡️ 3. Quy tắc nghiêm ngặt (Strict Rules)

- **Zero-Trust**: Không bao giờ tin tưởng Input từ External mà không có Sanitizing.
- **DBS-001 Compliance**: Mọi hành động "Sửa đổi" bảo mật trên dữ liệu sống phải đi kèm Snapshot.
- **Independence**: Workflow này phải hoàn thành bước PO Approval trước khi GO-LIVE.

---

## 🚦 Chốt chặn chất lượng (Leader Review)

- **Vulnerability Score**: Toàn bộ các lỗ hổng mức "Critical" và "High" đã được vá chưa?
- **Secret Hygiene**: Có bất kỳ Key nào bị rò rỉ trong Repository hiện tại không?

---
> **Lệnh kích hoạt:** `/execute_workflow secure scope="infrastructure" audit="full"`
