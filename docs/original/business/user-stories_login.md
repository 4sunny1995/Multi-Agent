# 📖 User Stories & Acceptance Criteria: Finance Login

## 1. User Stories

| ID | Persona | Nghiệp vụ (Story) | Giá trị (Value) |
| :--- | :--- | :--- | :--- |
| **US-01** | Khách hàng | Tôi muốn đăng nhập bằng UserID và Mật khẩu. | Truy cập an toàn vào tài khoản tài chính. |
| **US-02** | Khách hàng | Tôi muốn thấy lỗi bằng tiếng Nhật khi nhập sai. | Hiểu rõ vấn đề để khắc phục nhanh chóng. |
| **US-03** | Khách hàng | Tôi muốn thấy hiệu ứng loading khi đang xác thực. | Biết rằng hệ thống đang xử lý yêu cầu. |

## 2. Acceptance Criteria (AC)

### AC-01: Giao diện (UI)
- **Given**: Người dùng mở trang Login.
- **When**: Trang tải xong.
- **Then**: Phải thấy đầy đủ Logo, Form nhập liệu và Nút "ログイン" theo đúng thiết kế [JP Aesthetic].

### AC-02: Xác thực (Auth)
- **Given**: Người dùng nhập UserID và Mật khẩu đúng (`admin`/`password123`).
- **When**: Nhấn nút "ログイン".
- **Then**: Hiển thị thông báo thành công "認証 thành công" và chuyển sang trạng thái Logged-in.

### AC-03: Xử lý lỗi (Error Handling)
- **Given**: Người dùng để trống UserID hoặc nhập sai mật khẩu.
- **When**: Nhấn nút "ログイン".
- **Then**: Viền Input chuyển thành màu đỏ và hiển thị thông báo lỗi phù hợp.

---
> [!NOTE]
> Được phân tích bởi BA Agent.
