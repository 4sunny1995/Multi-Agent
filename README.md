# 🤖 Antigravity Multi-Agent Ecosystem (Software Factory)

> [!WARNING]  
> **⚠️ ĐỌC KHUYẾN CÁO TRƯỚC KHI SỬ DỤNG!**  
> Sự lạm dụng hệ thống AI tự động này có thể làm **thui chột kỹ năng tư duy** của một Kỹ sư phần mềm, đặc biệt là với các bạn sinh viên/Junior. Đừng để AI trở thành chiếc xe lăn của não bộ!  
> 🚨 Xin mời dành ra 2 phút để đọc **[Tuyên Ngôn Đạo Đức Kỹ Sư (RESPONSIBLE_AI.md)](./RESPONSIBLE_AI.md)** để biết cách làm chủ AI thay vì quá phụ thuộc vào nó.

Chào mừng bạn đến với mô hình **Nhà máy sản xuất phần mềm tự động**, được điều khiển bằng hệ thống Đa Tác Nhân (Multi-Agent) hoạt động trên nền tảng **Google Antigravity**.

Dự án này không chứa code, mà nó biểu diễn một quy trình quản lý khắt khe nơi mọi dòng code sinh ra đều phải tuân thủ Clean Code, SOLID và phải đi qua các lớp lang kiểm duyệt nghiêm ngặt.

---

## 🏗️ Cấu Trúc Bất Biến Của Dự Án

Dự án được quy hoạch thành 3 phân khu rõ rệt:

*   **`/.agents/` (Bộ Não & Tuân Thủ):** Chứa các Thiết lập Workflow, Định nghĩa vai trò (BA, SA, DEV, TEST) và các Luật (Rules) tối cao của Leader. Không lưu trữ code logic ứng dụng tại đây.
*   **`/docs/` (Trí Tuệ & Kiến Trúc):** Đây là nơi `BA` (Business Analyst) lưu trữ User Stories/Edge Cases và `SA` (System Architect) lưu trữ các sơ đồ kiến trúc (Design Pattern, DB Schema).
*   **`/src/` (Nhà Máy Thực Thi):** Khu vực dành riêng cho `DEV` và `TESTER`. Toàn bộ Source code, Unit test và thuật toán vận hành được thao tác ở đây.

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

Với hệ thống `.agents` đã được cài cắm, bạn không cần phải ra lệnh từng bước cho AI. Bạn chỉ cần điều khiển dự án thông qua **3 nút bấm (Slash Commands)** cực mạnh. Hãy gõ chúng trực tiếp vào Chatbox của Antigravity:

### 1. Tạo Tính Năng Mới
**Cú pháp:** `/dev [Mô tả tính năng bạn muốn khởi tạo]`
> Kích hoạt dây chuyền: `BA (Phân tích Logic)` -> `SA (Dựng Kiến Trúc)` -> `DEV (Làm TDD)` -> `LEADER (Kiểm duyệt)`.

### 2. Sửa Lỗi Hệ Thống
**Cú pháp:** `/fix [Mô tả Lỗi/Bug đang gặp]`
> Kích hoạt chế độ Safe-Fix: `TESTER (Xác nhận cấu trúc đứt gãy)` -> `DEV (Cô lập vùng bệnh & sửa cực trị)` -> `LEADER (Đảm bảo lỗi không lây lan cho module khác)`.

### 3. Kiểm Toán & Tái Cấu Trúc
**Cú pháp:** `/inspect [Thư mục hoặc File cần kiểm tra]`
> Kích hoạt thợ săn Nợ Kỹ Thuật: `LEADER (Quét toàn bộ Code Smells, bắt vi phạm SOLID)` -> `DEV (Ép buộc đập đi xây lại theo quy chuẩn)`.

---
*Dự án được bảo vệ tuyệt đối theo chuẩn mực Kỹ nghệ Phần mềm hiện đại.*
