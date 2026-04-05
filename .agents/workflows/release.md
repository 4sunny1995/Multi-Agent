# 📦 Workflow: Quản Lý Phát Hành (/release)

Quy trình đóng gói và bàn giao hệ thống lên môi trường vận hành thực tế.

## 1. VERSIONING & MANIFEST (LEADER)
- **Hành động**: Chốt Version (SemVer), gắn Tag Git và đồng bộ Metadata.
- **Bàn giao**: Tag release mới (`release-vX.Y.Z`).

## 2. DOCS & ARTIFACTS (TECH WRITER & TRANSLATOR)
- **Hành động**: Tạo Changelog và Release Notes. Dịch sang các ngôn ngữ đích (VI, EN, JA).
- **Bàn giao**: Thông tin phát hành đa ngôn ngữ.

## 3. DEPLOYMENT (CLOUD ARCHITECT & SA)
- **Hành động**: Triển khai lên môi trường đích (Staging/Production).
- **Bàn giao**: Báo cáo vận hành (Deployment Status).

## 4. FINAL VERIFICATION (LEADER)
- **Hành động**: Chạy Health-check và chốt quy trình.
- **Kết xuất**: `walkthrough.md`.
