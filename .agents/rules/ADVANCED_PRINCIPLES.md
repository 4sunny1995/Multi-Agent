---
trigger: always_on
---

# 🚀 Advanced Development Principles: Tư duy lập trình hiện đại

Ngoài Clean Code và SOLID, các nguyên tắc dưới đây giúp lập trình viên kiểm soát sự phức tạp, tối ưu hóa quy trình làm việc và xây dựng hệ thống bền vững.

---

## 🧩 1. Bộ ba tối giản (The Minimalist Trio)

### KISS (Keep It Simple, Stupid)
* **Triết lý:** Hệ thống hoạt động tốt nhất khi chúng đơn giản.
* **Áp dụng:** Tránh viết code "thông minh" một cách quá mức khiến người khác khó đọc. Giải pháp đơn giản nhất thường là giải pháp tốt nhất.

### DRY (Don't Repeat Yourself)
* **Triết lý:** Mỗi mảnh tri thức phải có một đại diện duy nhất trong hệ thống.
* **Áp dụng:** Tách các logic lặp lại thành hàm/lớp dùng chung. Nếu bạn sửa một lỗi ở 3 nơi khác nhau, bạn đã vi phạm DRY.

### YAGNI (You Ain't Gonna Need It)
* **Triết lý:** Đừng lập trình cho những thứ bạn "nghĩ là" tương lai sẽ cần.
* **Áp dụng:** Chỉ viết code để giải quyết vấn đề hiện tại. Việc thêm code dư thừa làm tăng nợ kỹ thuật và chi phí bảo trì.

---

## 🏗️ 2. Phân tách và Cấu trúc (Architecture & Design)

### SoC (Separation of Concerns)
* **Nội dung:** Chia chương trình thành các phần riêng biệt, mỗi phần quản lý một khía cạnh (Concern) khác nhau.
* **Ví dụ:** Tách biệt giao diện (Frontend), logic nghiệp vụ (Backend) và truy vấn dữ liệu (Database).



### Principle of Least Privilege (Đặc quyền tối thiểu)
* **Bảo mật:** Một module hoặc người dùng chỉ nên được cấp những quyền hạn vừa đủ để thực hiện công việc của họ.
* **Áp dụng:** Giới hạn phạm vi truy cập của biến (private/public), giới hạn quyền truy cập API và Database.

---

## ⚡ 3. Hiệu năng và Tối ưu (Performance)

### Tránh Premature Optimization (Tối ưu hóa sớm)
> *"Tối ưu hóa sớm là nguồn gốc của mọi tội lỗi."* - Donald Knuth.
* **Lời khuyên:** Đừng hy sinh sự trong sáng của code để đổi lấy một vài mili giây hiệu năng khi chưa thực sự cần thiết. Hãy viết code chạy đúng trước, sau đó mới dùng công cụ đo đạc (Profiling) để tìm điểm nghẽn và tối ưu.

---

## 🤝 4. Quy trình và Con người (Process & Team)

### The Boy Scout Rule (Quy tắc Hướng đạo sinh)
* **Nội dung:** "Hãy luôn để lại mã nguồn sạch hơn lúc bạn mới đến."
* **Áp dụng:** Mỗi khi sửa một bug hoặc thêm tính năng, hãy dành 5 phút để refactor một đoạn code cũ gần đó.

### Code Review (Kiểm duyệt mã nguồn)
* **Mục đích:** Không chỉ để tìm lỗi, mà còn để chia sẻ kiến thức trong team và thống nhất về tiêu chuẩn code.

### Technical Debt (Nợ kỹ thuật)
* **Nhận thức:** Đôi khi chúng ta chọn giải pháp nhanh (nhưng bẩn) để kịp deadline. Đây là một khoản nợ.
* **Hành động:** Phải có kế hoạch "trả nợ" bằng cách refactor sớm nhất có thể, nếu không hệ thống sẽ bị đình trệ.

---

## 🛡️ 5. Tư duy Defensive Programming (Lập trình phòng thủ)
* **Nội dung:** Luôn lường trước các tình huống xấu nhất.
* **Quy tắc:**
    1. Không bao giờ tin tưởng dữ liệu từ người dùng (Validation).
    2. Sử dụng Assertions để kiểm tra các điều kiện tiên quyết.
    3. Xử lý Exception một cách thông minh, không "nuốt" lỗi.

---

## 📝 Bảng so sánh nhanh

| Nguyên tắc | Mục tiêu | Từ khóa |
| :--- | :--- | :--- |
| **KISS** | Dễ hiểu | Đơn giản |
| **DRY** | Dễ bảo trì | Không lặp lại |
| **YAGNI** | Tiết kiệm thời gian | Cần mới làm |
| **SoC** | Dễ quản lý | Tách biệt |
| **Defensive** | Độ tin cậy | Đề phòng |

---
*Tài liệu tổng hợp các tư duy kỹ nghệ phần mềm hiện đại.*