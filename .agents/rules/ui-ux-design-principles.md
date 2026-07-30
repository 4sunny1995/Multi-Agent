# 📜 RULE: UI-UX DESIGN STANDARDS (UIX-001)

| Thông số | Giá trị |
| :--- | :--- |
| **Mã hiệu** | UIX-001 |
| **Đối tượng** | DESIGNER, DEV, LEADER |
| **Triết lý** | "Đơn giản là đỉnh cao của sự tinh tế. Chức năng quan trọng hơn hào nhoáng." |

---

## 🌎 1. Nguyên tắc thiết kế chung (Global Principles)

1. **Tính nhất quán (Consistency)**:
   - Các Button, Input, Icon phải cùng bộ Style (Design System).
   - Menu, Header, Footer không thay đổi vị trí đột ngột giữa các trang.
2. **Phân cấp thị giác (Visual Hierarchy)**:
   - Nội dung quan trọng nhất (CTA) phải nổi bật nhất.
   - Sử dụng Font Size và Weight để phân biệt H1, H2, Body.
3. **Phản hồi hệ thống (Feedback)**:
   - Mọi tương tác của người dùng phải có phản hồi (Hover, Click, Loading state).
4. **Khả năng truy cập (Accessibility)**:
   - Độ tương phản chữ (Color Contrast) phải đạt chuẩn WCAG.
   - Hỗ trợ phím tắt và Screen Reader.

---

## 🇯🇵 2. Quy chuẩn thẩm mỹ Nhật Bản (JP Aesthetic)

Khi khách hàng là người Nhật hoặc thị trường Nhật Bản, tuân thủ các quy tắc sau:

1. **Ma (Khoảng trống - Negative Space)**:
   - Không lấp đầy mọi khoảng trống. Để cho mắt được "nghỉ ngơi".
   - Khoảng cách (Gutter/Padding) phải rộng rãi, tạo cảm giác thanh thản (Seijaku).
2. **Kanso (Sự đơn giản)**:
   - Loại bỏ các yếu tố trang trí không cần thiết.
   - Sử dụng bảng màu trung tính: Trắng, Xanh Navy, Xám, Gỗ. Tránh màu neon rực rỡ.
3. **High Information Density (Cấu trúc thông tin)**:
   - Một số trang (như E-commerce) yêu cầu nhiều thông tin.
   - Giải pháp: Chia nhỏ thông tin bằng Border mảnh (1px) và Background màu nhạt để giữ sự ngăn nắp.
4. **Tin cậy (Trust)**:
   - Sử dụng Icons rõ ràng, Typography dễ đọc (Gothic/Mincho).
   - Tránh các hiệu ứng Shadow quá mạnh hoặc Gradient phức tạp.

---

## 🛠️ 3. Quy trình thực thi cho Agent

- **DESIGNER**: Phải tạo "Moodboard" trước khi vẽ Mockup để thống nhất Concept với PO.
- **DEV**: Phải tham chiếu bảng màu trong `ui/specs.md`, không dùng màu Hard-code.
- **LEADER**: Kiểm duyệt sự đồng nhất giữa thiết kế và sản phẩm cuối cùng qua `UI Audit`.

---
> **"Thiết kế là giải pháp cho một vấn đề, không chỉ là một bức tranh."** — _The Creative Lead_
