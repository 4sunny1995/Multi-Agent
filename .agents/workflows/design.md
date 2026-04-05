---
description: Quy trình thiết kế UX/UI cho sản phẩm Enterprise.
---

# 🎨 Workflow: Thiết Kế Trải Nghiệm & Giao Diện (/design)

Quy trình chuẩn hóa để chuyển đổi yêu cầu từ PO/Customer thành giao diện người dùng đồng nhất và đúng thẩm mỹ.

## 📝 Mô tả
Workflow này kích hoạt khi có yêu cầu mới về giao diện (UI) hoặc cải thiện trải nghiệm (UX). Nó có thể chạy độc lập hoặc là một phần của quy trình `/dev`.

---

## 🛠️ 1. Quy trình thực thi (Execution Steps)

1. **Tiếp nhận & Phân tích (Discovery - PO & DESIGNER):**
   - Đọc `docs/business/brd.md` và `docs/business/user-stories.md`.
   - PO làm rõ các yêu cầu về Branding, Đối tượng người dùng (Persona) và Phân vùng (Global/Japan).
2. **Nghiên cứu & Ý tưởng (Concept - DESIGNER):**
   - Tạo Moodboard (Palette, Typography, Mood).
   - Bàn giao: `docs/ui/style-guide.md`.
3. **Phác thảo & Kiểm thử (Prototyping - DESIGNER):**
   - Tạo Mockup trung thực (High-fidelity) sử dụng `generate_image` cho các màn hình chính.
   - Bàn giao: `docs/ui/mockups/`.
4. **Đặc tả Kỹ thuật (UI Specs - DESIGNER & SA):**
   - Xuất bản bảng Component và thông số kỹ thuật (Pixel, Colors, Spacing).
   - Bàn giao: `docs/ui/specs.md`.
5. **Duyệt thiết kế (Final Approval - PO):**
   - Kiểm duyệt độ đồng nhất UX/UI toàn hệ thống.
   - Kết xuất: Chữ ký số (Digital Approval) trong `docs/README.md`.

---

## 📂 2. Cấu trúc lưu trữ (Output Hierarchy)

- **Bản thảo thiết kế:** `docs/ui/`
- **Tài liệu gốc:** `docs/original/ui/`
- **Mục lục:** Cập nhật vào `docs/README.md`.

---

## 🛡️ 3. Quy tắc nghiêm ngặt (Strict Rules)

- **Consistency First**: Không được phá vỡ Design System đã thống nhất trừ khi khách hàng yêu cầu trực tiếp.
- **Japanese Aesthetic [JP]**: Ưu tiên sự tối giản và tin cậy nếu PO chỉ định đối tượng là người Nhật.
- **Independence**: Workflow này phải hoàn thành bước PO Approval trước khi DEV bắt đầu viết CSS.

---

## 🚦 Chốt chặn chất lượng (Leader Review)

- **Tính khả thi (Feasibility)**: Thiết kế phải thực hiện được bằng mã nguồn (HTML/CSS).
- **Trải nghiệm (Usability)**: Các nút bấm, luồng đi phải tự nhiên, không gây nhầm lẫn.

---
> **Lệnh kích hoạt:** `/execute_workflow design target="new-feature-ui" client="JP"`
