---
trigger: always_on
---

# 🛡️ SOLID Principles: 5 Nguyên tắc thiết kế hướng đối tượng

**SOLID** là bộ 5 nguyên tắc giúp lập trình viên viết ra mã nguồn dễ quản lý, dễ mở rộng và tránh được tình trạng "code thối" (code rot) khi dự án lớn dần.

---

## 1. S - Single Responsibility Principle (Đơn trách nhiệm)
> *"Một lớp chỉ nên có một lý do duy nhất để thay đổi."*

* **Nội dung:** Mỗi class chỉ nên thực hiện một nhiệm vụ duy nhất.
* **Lợi ích:** Khi cần sửa đổi một tính năng, bạn biết chính xác cần tìm ở đâu và không làm ảnh hưởng đến các phần không liên quan.
* **Ví dụ:** Tách lớp `User` (chứa thông tin) ra khỏi lớp `UserRepository` (chứa logic lưu vào database).

---

## 2. O - Open/Closed Principle (Đóng/Mở)
> *"Đối tượng nên mở cho việc mở rộng, nhưng đóng cho việc sửa đổi."*

* **Nội dung:** Bạn có thể thêm chức năng mới cho một module bằng cách kế thừa hoặc dùng Interface, thay vì sửa trực tiếp code bên trong module đó.
* **Lợi ích:** Giữ cho mã nguồn cũ luôn ổn định trong khi hệ thống vẫn liên tục phát triển.
* **Ví dụ:** Thay vì dùng `if-else` để kiểm tra các loại hình học và tính diện tích, hãy tạo một interface `Shape` với hàm `calculateArea()`. Mỗi hình mới sẽ là một class thực thi interface này.

---

## 3. L - Liskov Substitution Principle (Thay thế Liskov)
> *"Lớp con phải có khả năng thay thế lớp cha mà không làm hỏng tính đúng đắn của chương trình."*

* **Nội dung:** Nếu class `B` là con của `A`, thì ta có thể dùng `B` thay cho `A` ở bất kỳ đâu mà không gây ra lỗi logic.
* **Lợi ích:** Đảm bảo tính nhất quán của hệ thống phân cấp lớp.
* **Sai lầm kinh điển:** Hình vuông kế thừa Hình chữ nhật (vi phạm vì hình vuông buộc chiều dài = chiều rộng, làm sai lệch kỳ vọng của các hàm xử lý hình chữ nhật thông thường).

---

## 4. I - Interface Segregation Principle (Phân tách Interface)
> *"Thay vì một Interface lớn, thà có nhiều Interface nhỏ với các mục đích cụ thể."*

* **Nội dung:** Không nên ép buộc một lớp phải triển khai các phương thức mà nó không bao giờ dùng tới.
* **Lợi ích:** Giảm sự phụ thuộc dư thừa, code trở nên tường minh hơn.
* **Ví dụ:** Thay vì interface `IWorker` có cả `work()` và `eat()`, hãy tách thành `IWorkable` và `IEatable`. Một con Robot sẽ chỉ cần thực thi `IWorkable`.

---

## 5. D - Dependency Inversion Principle (Đảo ngược phụ thuộc)
> *"Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả hai nên phụ thuộc vào sự trừu tượng (Abstraction)."*

* **Nội dung:** Các lớp không nên gọi trực tiếp các lớp cụ thể khác. Thay vào đó, chúng nên giao tiếp qua Interface.
* **Lợi ích:** Giảm sự liên kết chặt chẽ (Coupling), giúp dễ dàng thay thế các thành phần (ví dụ đổi từ MySQL sang MongoDB).
* **Kỹ thuật áp dụng:** Dependency Injection (DI).

---

## 📝 Bảng tóm tắt nhanh

| Chữ cái | Nguyên tắc | Mục tiêu cốt lõi |
| :--- | :--- | :--- |
| **S** | Single Responsibility | Tránh các lớp "Vạn năng" (God Classes). |
| **O** | Open/Closed | Thêm tính năng không cần sửa code cũ. |
| **L** | Liskov Substitution | Kế thừa đúng bản chất, không gây lỗi logic. |
| **I** | Interface Segregation | Chia nhỏ interface để dễ triển khai. |
| **D** | Dependency Inversion | Phụ thuộc vào Interface, không phụ thuộc vào Class cụ thể. |

---
*Tài liệu tham khảo: Robert C. Martin (Uncle Bob)*