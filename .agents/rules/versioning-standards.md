---
rule_id: VER-001
role: LEADER
trigger: release, versioning
---

# 📦 Semantic Versioning & Release Standards (AI-Ready)

Mục tiêu: Đảm bảo tiến trình phát hành (Release) luôn minh bạch, có thể truy vết (Traceability) và an toàn tuyệt đối.

## 1. Định nghĩa Phiên bản (SemVer X.Y.Z)
- **MAJOR (X)**: Thay đổi lớn về kiến trúc, phá vỡ tính tương thích ngược (Breaking changes), hoặc thay đổi toàn bộ mục tiêu của Agent.
- **MINOR (Y)**: Thêm tính năng mới (New Story), thêm Rule mới hoặc nâng cấp Model (e.g., Flash -> Pro) mà không làm hỏng logic hiện có.
- **PATCH (Z)**: Sửa lỗi (Fix bug), cập nhật tài liệu hoặc tối ưu hóa hiệu năng (Refactor) không thay đổi hành vi.

## 2. Quy chuẩn Release Notes (TECH WRITER)
- **What's New**: Liệt kê các tính năng/Story mới từ BA.
- **Technical Changes**: Các thay đổi về hạ tầng, cấu hình từ SA/CLOUD.
- **Fixed Issues**: Danh sách các Bug ID đã được sửa từ TESTER.
- **Security Check**: Xác nhận trạng thái "Green" từ SECURITY.

## 3. Chốt chặn Phát hành (Gatekeeper Approval)
- **Digital Approval**: Mọi bản Release phải có tệp `approval_signature.md` được ký bởi **PO/CTO (User)**.
- **Rollback Test**: Phải thử nghiệm quy trình khôi phục phiên bản cũ trước khi thực hiện Deploy Production.
- **Snapshot/Backup**: Bắt buộc tạo bản sao lưu Database toàn vẹn trước khi Migrate.

## 4. Tầm nhìn CTO (Scalability & Feedback)
- **Monitoring Integration**: Tự động kích hoạt các Dashboards giám sát sau khi Release thành công.
- **Team Retro**: Mỗi bản Release (Major/Minor) phải đi kèm một buổi `/retro` để thu hoạch bài học kinh nghiệm.

---
> [!IMPORTANT]
> **"Release không phải là kết thúc, Release là sự bắt đầu của một chu kỳ vận hành mới."** — _Antigravity CTO_
