---
workflow_id: REL-001
description: Quy trình đóng gói và phát hành (Release) an toàn tuyệt đối.
role_lead: LEADER
---

# 📦 Workflow: Quản Lý Phát Hành Chiến Lược (/release)

Quy trình đóng gói và bàn giao hệ thống lên môi trường vận hành thực tế. Mọi bước đi đều phải tuân thủ **CTO Vision** và **DBS-001**.

## 🛠️ 1. Quy trình thực thi (Execution Steps)

1. **Versioning & Manifest (LEADER - CTO):**
   - **Hành động**: Chốt Version theo **VER-001** (SemVer), gắn Tag Git (`vX.Y.Z`).
   - **Handoff**: Xác nhận với **SA** và **DEV** về tính sẵn sàng của mã nguồn.

2. **Changelog & Documentation (TECH WRITER & TRANSLATOR):**
   - **Hành động**: Tổng hợp Bug Fix, New Feature và Technical Changes. Dịch sang VI, EN, JA.
   - **Handoff**: Bàn giao bộ hồ sơ phát hành trong thư mục `docs/release/`.

3. **Pre-Release Check (SECURITY & TESTER):**
   - **Hành động**: Chạy Regression Tests và Security Scan lần cuối trên môi trường Staging.
   - **Handoff**: **Gatekeeper** xác nhận trạng thái "Green" (An toàn) trong `walkthrough.md`.

4. **Digital Approval (PO/CTO - User):**
   - **Hành động**: PO/User ký duyệt nội dung phát hành.
   - **Handoff**: Kích hoạt lệnh Deploy thực tế của **CLOUD ARCHITECT**.

5. **Deployment & Rollback (CLOUD ARCHITECT):**
   - **Hành động**: Triển khai và thiết lập điểm phục hồi (Snapshot/Backup).
   - **Handoff**: Báo cáo vận hành hoàn tất (Deployment Success).

---

## 📂 2. Cấu trúc lưu trữ (Output Hierarchy)

- **Release Artifacts**: `docs/release/`
- **Changelog**: `docs/README.md` và `CHANGELOG.md`
- **Archive**: `docs/original/release/`

---

## 🛡️ 3. Quy tắc nghiêm ngặt (Strict Rules)

- **Rollback Guarantee**: Không được phép Release nếu quy trình Rollback chưa được kiểm chứng.
- **DBS-001 Enforcement**: Mọi Migration Database phải đi kèm với Backup toàn vẹn.
- **Independence**: Workflow này là bước cuối cùng sau khi `/dev` hoặc `/fix` đã được QA xác nhận "Passed".

---

## 🚦 Chốt chặn chất lượng (Leader Review)

- **Traceability**: Mọi thay đổi có nguồn gốc rõ ràng (Feature ID / Bug ID) không?
- **Stability**: Hệ thống có khả năng tự phục hồi nếu bước Deploy gặp lỗi không?

---
> **Lệnh kích hoạt:** `/execute_workflow release version="3.0.0" target="prod"`
