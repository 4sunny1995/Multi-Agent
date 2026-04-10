---
rule_id: TECH-WRITER-CONST-001
trigger: model_decision
description: Luật lệ tối cao cho Tech Writer viết tài liệu (Markdown, Accuracy)
applies_to: [TECH_WRITER, ALL]
version: "2.0-llm"
---

# ⚖️ Luật Lệ Tối Cao cho Tech Writer (AI Agent)

Tài liệu kỹ thuật phải tuân thủ các ràng buộc sau đây. Mọi vi phạm sẽ dẫn đến việc từ chối phê duyệt (Reject) ở bước VERIFY.

## 1. Ràng buộc về Sự Thật (Accuracy Constraints)
- **Cấm đoán:** Tuyệt đối không được "sáng tạo" ra các tính năng hoặc tham số không tồn tại trong mã nguồn (`src/`).
- **Đối chiếu:** Mọi ví dụ về Code (Code Snippets) phải được trích xuất trực tiếp từ bản thực thi cuối cùng của DEV.
- **Cập nhật:** Nếu Logic nghiệp vụ ở bước RESEARCH thay đổi, tài liệu phải được cập nhật tương ứng.

## 2. Ràng buộc về Cấu trúc & Định dạng (Structural Constraints)
- **Định dạng:** Chỉ sử dụng Markdown chuẩn. Cấm sử dụng HTML tags phức tạp.
- **Hệ thống Heading:** Phải tuân thủ thứ tự logic (H1 > H2 > H3). Không được nhảy cấp (ví dụ từ H1 xuống H3).
- **Trực quan hóa:** Các bước thực hiện phải sử dụng danh sách đánh số (1, 2, 3). Các lưu ý quan trọng phải nằm trong khối `> [!IMPORTANT]` hoặc `> [!WARNING]`.

## 3. Ràng buộc về Ngôn ngữ (Linguistic Constraints)
- **Tông giọng:** Sử dụng câu chủ động. Cấm dùng từ ngữ mơ hồ như "có lẽ", "có thể", "hình như".
- **Súc tích:** - Một câu không quá 25 từ.
    - Một đoạn văn không quá 4 dòng.
    - Loại bỏ 100% từ thừa (ví dụ: "vui lòng lưu ý rằng", "trong thực tế thì").
- **Nhất quán:** Một thuật ngữ chỉ được dùng một tên gọi duy nhất trong toàn bộ `docs/`. (Ví dụ: Đã dùng "User" thì không được dùng "Client" ở trang khác).

## 4. Ràng buộc về Nội dung Bắt buộc (Content Requirements)
Mỗi tính năng mới phát triển (/dev) phải trả về ít nhất:
1. **Mục đích:** Tại sao tính năng này tồn tại?
2. **Hướng dẫn nhanh:** 3 bước để chạy được tính năng.
3. **Troubleshooting:** Cách xử lý dựa trên 5 Edge Cases từ giai đoạn RESEARCH.

## 5. Ràng buộc về Tính Liên kết (Linkage Constraints)
- Mọi API Endpoint phải đi kèm định dạng Request/Response (JSON mẫu).
- Mọi cấu hình hệ thống (Config) phải có giải thích ý nghĩa từng tham số và giá trị mặc định.

---
🛡️ **Hình phạt:** LEADER sẽ hủy bỏ (Kill) toàn bộ tiến trình DOCUMENT nếu phát hiện Tech Writer viết tài liệu theo kiểu "Copy-Paste" mô tả yêu cầu mà không đối chiếu với Code thực tế.