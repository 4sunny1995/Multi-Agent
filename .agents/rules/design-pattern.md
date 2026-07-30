---
trigger: model_decision
description: Design Patterns Handbook (Creational, Structural, Behavioral)
---

# 🏗️ Kiến trúc Phần mềm: Design Patterns Handbook

Design Patterns (Mẫu thiết kế) là các giải pháp đã được tối ưu hóa cho những vấn đề phổ biến trong thiết kế phần mềm. Sử dụng chúng giúp mã nguồn linh hoạt, dễ mở rộng và bảo trì hơn.

---

## 💎 1. Nhóm Khởi tạo (Creational Patterns)
*Tập trung vào cách tạo ra các đối tượng một cách linh hoạt và kiểm soát.*

| Pattern | Mô tả ngắn gọn | Trường hợp sử dụng |
| :--- | :--- | :--- |
| **Singleton** | Đảm bảo một class chỉ có duy nhất một instance. | Database Connection, Logger, Configuration. |
| **Factory Method** | Cung cấp interface tạo đối tượng nhưng để lớp con quyết định loại đối tượng. | Khi không biết trước chính xác loại đối tượng cần tạo. |
| **Abstract Factory** | Tạo ra các họ đối tượng liên quan mà không cần chỉ định lớp cụ thể. | UI Toolkit đa nền tảng (Windows Button, macOS Button). |
| **Builder** | Tách rời việc xây dựng đối tượng phức tạp khỏi biểu diễn của nó. | Tạo đối tượng có nhiều tham số tùy chọn (Ví dụ: `UserBuilder`). |
| **Prototype** | Tạo đối tượng mới bằng cách sao chép (clone) một đối tượng có sẵn. | Khi việc khởi tạo đối tượng mới tốn nhiều tài nguyên. |

---

## 🌉 2. Nhóm Cấu trúc (Structural Patterns)
*Tập trung vào việc thiết lập mối quan hệ giữa các lớp và đối tượng.*

* **Adapter:** Giúp hai interface không tương thích có thể làm việc với nhau. Như một bộ chuyển đổi nguồn điện.
* **Facade:** Cung cấp một giao diện đơn giản cho một hệ thống con phức tạp. Giống như nút "Bắt đầu" trên máy giặt (ẩn đi các bước bơm nước, xoay, vắt).
* **Decorator:** Thêm tính năng mới vào đối tượng mà không làm thay đổi cấu trúc của nó. (Ví dụ: Thêm topping vào ly cà phê).
* **Proxy:** Đối tượng đại diện thay thế cho đối tượng thực để kiểm soát truy cập (Lazy loading, Logging, Security).
* **Bridge:** Tách biệt phần trừu tượng (Abstraction) khỏi phần thực thi (Implementation).

---

## ⚡ 3. Nhóm Hành vi (Behavioral Patterns)
*Tập trung vào việc phân phối trách nhiệm và giao tiếp giữa các đối tượng.*

### 📢 Observer (Người quan sát)
Thiết lập mối quan hệ 1-nhiều. Khi "Subject" thay đổi, tất cả "Observers" sẽ được thông báo.
* **Ứng dụng:** Hệ thống Notify, Xử lý sự kiện UI, Chứng khoán.

### 🎯 Strategy (Chiến lược)
Cho phép định nghĩa nhiều thuật toán và hoán đổi chúng linh hoạt khi chạy (Runtime).
* **Ứng dụng:** Các phương thức thanh toán khác nhau (Momo, Visa, COD) hoặc các thuật toán sắp xếp.

### 🔄 State (Trạng thái)
Cho phép đối tượng thay đổi hành vi khi trạng thái nội bộ của nó thay đổi.
* **Ứng dụng:** Trạng thái đơn hàng (Chờ duyệt -> Đang giao -> Hoàn thành).

### ⌨️ Command (Lệnh)
Chuyển yêu cầu thành một đối tượng độc lập.
* **Ứng dụng:** Tính năng Undo/Redo, hàng đợi công việc (Job Queue).

---

## 💡 Lời khuyên khi áp dụng
1. **KISS (Keep It Simple, Stupid):** Đừng cố áp dụng Pattern nếu code đơn giản vẫn giải quyết tốt vấn đề.
2. **Tránh Over-engineering:** Pattern là để giải quyết sự phức tạp, không phải để tạo thêm sự phức tạp.
3. **Hiểu rõ mục đích:** Hãy tập trung vào việc hiểu "Tại sao" dùng nó hơn là học thuộc lòng cấu trúc code.

---
*Tài liệu dựa trên: Gang of Four (GoF) Design Patterns.*