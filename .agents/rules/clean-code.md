---
trigger: always_on
---

# 📖 Clean Code Handbook: Quy tắc viết mã sạch

Mục tiêu của **Clean Code** không phải là tạo ra những đoạn mã hoa mỹ, mà là tạo ra mã nguồn **dễ đọc, dễ hiểu và dễ bảo trì**. Dưới đây là tóm tắt các nguyên tắc cốt lõi giúp bạn nâng cấp tư duy lập trình.

---

## 🚀 1. Đặt tên có ý nghĩa (Meaningful Names)

Cái tên là phương tiện giao tiếp đầu tiên giữa lập trình viên và mã nguồn.

* **Tính rõ ràng:** Tên biến/hàm phải tiết lộ mục đích (Intent-revealing).
    * ❌ `int d; // ngày đã trôi qua`
    * ✅ `int daysSinceCreation;`
* **Có thể phát âm và tìm kiếm:** Tránh các từ viết tắt tùy tiện như `fName` (nên là `firstName`).
* **Cấu trúc:** * **Class/Object:** Sử dụng Danh từ (`User`, `Account`).
    * **Method/Function:** Sử dụng Động từ (`saveUser`, `calculateTotal`).

---

## 🛠️ 2. Quy tắc về Hàm (Functions)

Hàm là đơn vị xử lý nhỏ nhất. Một hàm tốt cần:

* **Nhỏ và rất nhỏ:** Mỗi hàm chỉ nên xử lý một logic cụ thể.
* **Đơn nhiệm (Do One Thing):** Một hàm chỉ nên làm duy nhất một việc và làm nó thật tốt.
* **Ít tham số:** * Lý tưởng nhất: **0 tham số**.
    * Tối đa: **2 tham số**.
    * Nếu > 3: Cần đóng gói tham số vào một đối tượng (Object/DTO).
* **Không có tác dụng phụ (No Side Effects):** Hàm không nên thay đổi các trạng thái toàn cục một cách kín đáo khi tên hàm không thể hiện điều đó.

---

## 🔄 3. Nguyên tắc DRY (Don't Repeat Yourself)

> *"Mọi kiến thức trong hệ thống phải có một đại diện duy nhất, không mơ hồ và chính thức."*

* Khi bạn copy-paste code, đó là nợ kỹ thuật (Technical Debt).
* **Giải pháp:** Trích xuất các đoạn code lặp lại thành các hàm hoặc lớp dùng chung (Utility classes).

---

## 💬 4. Chú thích (Comments)

Sử dụng chú thích như một phương án cuối cùng.

* **Tốt:** Giải thích lý do tại sao (Why), các quyết định thiết kế phức tạp, hoặc cảnh báo rủi ro.
* **Xấu:** Giải thích cái gì (What) - vì code bản thân nó phải tự giải thích được.
* **Quy tắc vàng:** Đừng chú thích cho code tồi, hãy viết lại nó.

---

## 🏗️ 5. Cấu trúc và Định dạng (Formatting)

Code phải có sự nhất quán để giảm tải tư duy khi đọc.

* **Khoảng cách dọc:** Các hàm có liên quan đến nhau nên được đặt gần nhau.
* **Thụt lề (Indentation):** Tuân thủ tuyệt đối quy tắc thụt lề để phân biệt các khối lệnh.
* **Đội nhóm:** Sử dụng các công cụ như Prettier hoặc ESLint để thống nhất định dạng cho cả team.

---

## 🛡️ 6. Xử lý lỗi (Error Handling)

Xử lý lỗi là cần thiết, nhưng không được làm mờ đi logic chính.

* **Dùng Exception thay vì Error Code:** Giúp tách biệt logic xử lý lỗi khỏi luồng chạy chính.
* **Đừng trả về `null`:** Thay vào đó hãy trả về một mảng rỗng, đối tượng rỗng (Null Object Pattern) hoặc ném ra một Exception. Điều này giúp tránh lỗi `NullPointerException`.

---

## 🧼 7. Quy tắc Hướng đạo sinh (The Boy Scout Rule)

> **"Hãy luôn để lại bãi trại sạch hơn lúc bạn mới đến."**

Nếu mọi lập trình viên đều sửa một chút code cũ mỗi khi họ viết code mới, mã nguồn sẽ không bao giờ bị thối rữa (code rot).

---

*Tài liệu tham khảo: **Clean Code: A Handbook of Agile Software Craftsmanship** - Robert C. Martin.*