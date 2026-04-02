# 🌱 Khởi Đầu Hành Trình Kỹ Sư Cùng Antigravity (Multi-Agent Ecosystem)

Chào mừng các bạn bước vào không gian làm việc chuẩn mực này! Nơi đây không chỉ chứa những dòng mã khô khan, mà là một **"Thao Trường Kỹ Thuật"** nơi bạn sẽ được hướng dẫn và làm việc cùng một Đội ngũ AI (vai trò BA, SA, DEV, TESTER) trên nền tảng **Google Antigravity**.

Hãy xem dự án này như một bước đệm để các bạn làm quen với nhịp độ chuyên nghiệp của ngành Kỹ nghệ Phần mềm. Máy móc làm công việc lắp ráp, còn bạn mới là người chịu trách nhiệm thổi hồn và định hướng cho hệ thống!

> [!TIP]  
> **💡 BÍ KÍP ĐÍNH KÈM:**  
> Đừng coi AI là người hoàn thành Đồ án thay bạn. Hãy coi hệ thống này là một vị Tiền bối (Mentor) kiên nhẫn phục vụ bạn 24/7. Sự tò mò học hỏi từng dòng lệnh AI sinh ra sẽ đưa trình độ của bạn thăng tiến rất nhanh.  
> Xin hãy dành 2 phút đọc bảng **[Những Lời Khuyên Chân Thành (RESPONSIBLE_AI.md)](./RESPONSIBLE_AI.md)** để biết cách tối ưu hóa hành trình tự học của bản thân nhé!

---

## 🏗️ Cấu Trúc Ngôi Nhà Của Chúng Ta
Dự án được sắp xếp gọn gàng để bạn không bị ngợp:

* **`/.agents/` (Khu Vực Bếp Núp):** Nơi chúng ta đề ra nội quy cho Team AI (các nguyên lý Clean Code, SOLID) và định nghĩa tính cách của từng Agent. Bạn không cần làm code ứng dụng ở đây.
* **`/docs/` (Trí Tuệ & Kiến Trúc):** Đây là tủ hồ sơ dự án. Lát nữa, các AI sẽ lưu câu chuyện người dùng (BA) hoặc sơ đồ Cơ sở dữ liệu (SA) vào đây để bạn luôn nắm rõ ứng dụng đang đi về đâu.
* **`/src/` (Xưởng Chế Tác):** Nơi nặn ra hình hài phần mềm. Toàn bộ Code, Unit test và kỹ năng thực tế sẽ được trình diễn tại đây. Mọi sự diệu kỳ đều khởi nguồn từ src!

---

## ⚡ Hướng Dẫn Kích Hoạt Dự Án (Rất Dễ Dàng)
Khi bạn vừa tải mã nguồn này về máy, hãy khởi tạo các thư mục xương sống bằng cách mở Terminal (Màn hình gõ lệnh) và chạy:

* **Nếu bạn dùng Mac / Linux:**
  ```bash
  sh init.sh
  ```
* **Nếu bạn dùng Windows:**
  ```cmd
  init.bat
  ```

> *Mẹo nhỏ: Bạn cứ dũng cảm gõ nhé! Các script này đã được code theo cơ chế phòng thủ, hoàn toàn vô hại và tuyệt đối không bao giờ làm mất dữ liệu hiện tại của bạn.*

---

## ⚒️ 3 Công Cụ Hỗ Trợ Đắc Lực Trong Hành Trình
Để tương tác với đội ngũ Ảo, bạn có thể gọi Tác nhân bằng cách gõ 3 câu "Thần chú" sau trực tiếp vào Khung Chat của Antigravity nhé:

### 1. Nuôi Dưỡng 1 Tính Năng Mới
**Cú pháp lệnh:** `/dev [Viết ý tưởng hoặc tính năng bạn muốn tạo]`
> AI sẽ dắt tay bạn đi đúng quy trình xịn: `Phân tích yêu cầu logic` -> `Dựng Kiến Trúc` -> `Viết Unit Test bảo vệ` -> `Cuối cùng mới Gõ Code`. Chậm rãi và thật nền tảng!

### 2. Gỡ Rối & Chữa Bệnh Cho Code
**Cú pháp lệnh:** `/fix [Tâm sự cho AI nghe bạn đang kẹt ở lỗi nào]`
> Thay vì sửa lung tung và sinh ra lỗi khác, hệ thống sẽ khuyến khích bạn viết Test trước rồi mới cô lập chức năng bị bệnh và trị tận gốc. Giúp bạn rèn luyện sự cẩn trọng.

### 3. Thánh Soi Đồng Hành (Refactor)
**Cú pháp lệnh:** `/inspect [Trỏ vào thư mục/file bạn chưa thấy tự tin]`
> Nếu code của bạn chạy được nhưng còn lộn xộn, vị Cố vấn ảo sẽ soi ra các điểm vi phạm nguyên tắc thiết kế, rồi ân cần giải thích và tái cấu trúc cho bạn.

---
*Mọi chuyên gia đều từng là một người lính mới. Hãy sai thật nhiều để học thật nhanh nhé. Chúc bạn code vui!*

---

## ⚡ Hướng Dẫn Khởi Tạo Lần Đầu (Setup)

Khi vừa Clone dự án này về, bạn **bắt buộc** phải khởi tạo cấu trúc xương sống (tạo các thư mục cơ bản bằng script an toàn). Mở Terminal và chạy:

*   **Đối với Linux / macOS:**
    ```bash
    sh init.sh
    ```
*   **Đối với Windows:**
    ```cmd
    init.bat
    ```

> *Lưu ý: Script khởi tạo hoàn toàn an toàn (Defensive programming), nó sẽ bỏ qua nếu thư mục đã tồn tại và không bao giờ ghi đè lên dữ liệu của bạn.*

---

## ⚒️ 3 Công Cụ Vận Hành Dành Cho Chủ Nhân (Owner)

Với hệ thống `.agents` đã được cài cắm, bạn không cần phải ra lệnh từng bước cho AI. Bạn chỉ cần điều khiển dự án thông qua **3 nút bấm (Slash Commands)** cực mạnh. Hãy gõ chúng trực tiếp vào khung chat của Antigravity:

### 1. Tạo Tính Năng Mới
**Cú pháp:** `/dev [Mô tả tính năng bạn muốn khởi tạo càng chi tiết càng tốt]`
> Kích hoạt dây chuyền: `BA (Phân tích Logic)` -> `SA (Dựng Kiến Trúc)` -> `DEV (Làm TDD)` -> `LEADER (Kiểm duyệt)`.

### 2. Sửa Lỗi Hệ Thống
**Cú pháp:** `/fix [Mô tả Lỗi/Bug đang gặp]`
> Kích hoạt chế độ Safe-Fix: `TESTER (Xác nhận cấu trúc đứt gãy)` -> `DEV (Cô lập vùng bệnh & sửa cực trị)` -> `LEADER (Đảm bảo lỗi không lây lan cho module khác)`.

### 3. Kiểm Toán & Tái Cấu Trúc
**Cú pháp:** `/inspect [Thư mục hoặc File cần kiểm tra]`
> Kích hoạt thợ săn Nợ Kỹ Thuật: `LEADER (Quét toàn bộ Code Smells, bắt vi phạm SOLID)` -> `DEV (Ép buộc đập đi xây lại theo quy chuẩn)`.

---
*Dự án được bảo vệ tuyệt đối theo chuẩn mực Kỹ nghệ Phần mềm hiện đại.*
