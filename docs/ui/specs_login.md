# 📋 UI Specifications: Finance Login (JP)

Tài liệu này đặc tả các thông số kỹ thuật cho lập trình viên (DEV) thực thi giao diện.

## 1. Thành phần Layout (Layout Grid)
- **Container**: Max-width 480px (Centered).
- **Padding**: 24px (Top/Bottom), 32px (Left/Right).
- **Spacing**: 16px giữa các form fields.

## 2. Đặc tả Form Input (Input Specs)
- **Chiều cao**: 48px.
- **Border-radius**: 8px (Modern minimalist).
- **Phông chữ**: Noto Sans JP, 14px.
- **Màu sắc**: 
    - Border: `#E2E8F0` (Soft Gray).
    - Focus: `#3182CE` (Blue shade).
- **Placeholder**: Căn lề trái, màu `#A0AEC0`.

## 3. Đặc tả Button (Action Specs)
- **Nút Login (ログイン)**:
    - Background: `#1A365D` (Trust Navy).
    - Text: Porcelain White, 16px, Bold.
    - Hover state: Độ sáng giảm 10%.
- **Nút đăng ký/Quên mật khẩu**:
    - Style: Link button (Text only).
    - Color: Trust Navy.

## 4. Trạng thái phản hồi (Interaction States)
- **Loading**: Hiển thị Spinner trung tâm nếu thời gian xác thực > 500ms.
- **Error**: Border của Input chuyển sang 1px Solid Alert Red (`#E53E3E`).
- **Success**: Hiển thị thông báo "認証成功" (Xác thực thành công).

---
> [!IMPORTANT]
> **Accessibility**: Đảm bảo tệp tin SVG của Icons có `aria-label` tương ứng cho Screen Reader.
