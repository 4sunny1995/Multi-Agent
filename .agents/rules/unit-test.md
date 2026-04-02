---
trigger: always_on
---

# 🧪 Unit Test: Nền tảng của chất lượng phần mềm

**Unit Test** là việc kiểm tra các đơn vị nhỏ nhất của mã nguồn một cách cô lập. Một Unit Test tốt phải chạy nhanh, độc lập và có thể lặp lại nhiều lần.

---

## 📐 1. Quy tắc F.I.R.S.T
Để một Unit Test thực sự hiệu quả, nó cần tuân thủ 5 nguyên tắc sau:

* **Fast (Nhanh):** Các bài kiểm tra phải chạy cực nhanh. Nếu mất quá nhiều thời gian, lập trình viên sẽ ngại chạy chúng thường xuyên.
* **Independent (Độc lập):** Các bài test không được phụ thuộc vào nhau. Kết quả của bài test này không được làm ảnh hưởng đến bài test kia.
* **Repeatable (Có thể lặp lại):** Bài test phải trả về cùng một kết quả trong bất kỳ môi trường nào (máy cá nhân, server CI/CD).
* **Self-Validating (Tự xác thực):** Bài test phải có kết quả rõ ràng là **Pass** hoặc **Fail**, không cần con người phải đọc log để đoán.
* **Timely (Kịp thời):** Unit Test nên được viết cùng lúc hoặc trước khi viết code nghiệp vụ (theo mô hình TDD).

---

## 🏗️ 2. Cấu trúc một bài Unit Test (AAA Pattern)
Hầu hết các Unit Test đều tuân theo cấu trúc 3 bước sạch sẽ:

1.  **Arrange (Chuẩn bị):** Khởi tạo các đối tượng, giả lập (mock) dữ liệu cần thiết.
2.  **Act (Thực thi):** Gọi hàm hoặc phương thức cần kiểm tra.
3.  **Assert (Xác nhận):** Kiểm tra xem kết quả trả về có đúng với mong đợi không.

---

## 🛠️ 3. Mocking và Stubbing
Trong Unit Test, chúng ta cần cô lập hàm khỏi các phụ thuộc bên ngoài (như Database, API, File System).
* **Mock:** Giả lập hành vi của một đối tượng phức tạp.
* **Stub:** Trả về dữ liệu cứng được chuẩn bị sẵn để hàm có thể chạy tiếp.

> **Lưu ý:** Nếu bạn thấy khó Mock một thành phần nào đó, có thể code của bạn đang vi phạm nguyên tắc **D (Dependency Inversion)** của SOLID.

---

## 📈 4. Kim tự tháp kiểm thử (Testing Pyramid)
Unit Test nằm ở tầng đáy của kim tự tháp. Điều này có nghĩa là số lượng Unit Test phải là **nhiều nhất** so với Integration Test (Kiểm thử tích hợp) và UI Test.



---

## ✅ 5. Lợi ích của Unit Test
* **Phát hiện lỗi sớm:** Tìm ra bug ngay khi vừa mới viết code.
* **Tự tin Refactor:** Bạn có thể thay đổi cấu trúc code cũ mà không sợ làm hỏng tính năng hiện có (vì đã có test bảo vệ).
* **Tài liệu sống:** Đọc Unit Test giúp lập trình viên khác hiểu hàm đó dùng để làm gì và có các trường hợp ngoại lệ nào.
* **Tiết kiệm chi phí:** Chi phí sửa lỗi ở giai đoạn Unit Test rẻ hơn gấp nhiều lần so với khi đã lên môi trường Production.

---

## 🚀 6. Các Framework phổ biến
* **Java:** JUnit, TestNG.
* **JavaScript/TypeScript:** Jest, Mocha, Vitest.
* **C#:** nUnit, xUnit, MSTest.
* **Python:** PyTest, Unittest.
* **PHP:** PHPUnit.