# 🧪 QA Test Report: Login Finance (Mock-up)

## 1. Thông tin chung (General Information)
- **Tính năng**: ログイン (Đăng nhập)
- **Môi trường**: Chrome 123.0.x / Safari Mobile (Giả lập)
- **Người thực hiện**: TESTER Agent
- **Ngày kiểm thử**: 2026-04-05

## 2. Kịch bản kiểm thử (Test Cases)

| ID | Kịch bản | Mong đợi | Kết quả | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Bỏ trống UserID/PW | Hiển thị lỗi tiếng Nhật "必須項目です" | ✅ PASS | Validation hoạt động tốt. |
| **TC-02** | Nhập sai Credential | Hiển thị lỗi "ユーザーIDまたはパスワードが正しくありません" | ✅ PASS | Thông báo lỗi tiếng Nhật chính xác. |
| **TC-03** | Nhập đúng (admin/password123) | Hiển thị thông báo thành công và reload | ✅ PASS | Mock Authentication hoạt động. |
| **TC-04** | Responsive (Mobile) | Giao diện không bị vỡ, nút bấm dễ thao tác | ✅ PASS | Layout Grid/Flexbox hiệu quả. |
| **TC-05** | Accessibility (A11y) | Screen Reader đọc được nhãn và nút | ✅ PASS | Đã có aria-label. |

## 3. Đánh giá tổng quan (Overall Assessment)
- **Tình trạng**: **SẴN SÀNG PHÁT HÀNH**.
- **Ưu điểm**: Giao diện mang đậm phong cách Nhật (Kanso - Tối giản), phản hồi mượt mà.
- **Rủi ro**: Hiện tại mật khẩu đang lưu Plaintext trong logic mockup (Cần mã hóa khi lên Production).

---
> [!IMPORTANT]
> **Khuyến nghị**: Chuyển sang sử dụng Bcrypt hoặc Argon2 cho Password hashing khi tích hợp Backend thật.
