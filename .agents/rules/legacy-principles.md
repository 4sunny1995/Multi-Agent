---
trigger: model_decision
rule_id: legacy-principles-001
---

# 🕵️ Legacy Code Principles: Quy tắc xử lý hệ thống cũ

Khi làm việc với các hệ thống Legacy (đã tồn tại lâu đời, thiếu test, hoặc spaghetti code), Agent phải tuân thủ các nguyên tắc sau:

---

## 1. Nguyên tắc "Không xâm phạm" (Do No Harm)
- Trong giai đoạn **AUDIT** (Phân tích), tuyệt đối không dùng các tool sửa đổi file (`replace_file_content`, `write_to_file`) lên source code cũ.
- Chỉ được phép tạo tài liệu mới trong thư mục `docs/`.

## 2. Truy nguyên nguồn gốc (Evidence-based Analysis)
- Mọi giải trình về logic nghiệp vụ phải trích dẫn trực tiếp file và dòng code tương ứng.
- Ví dụ: *"Logic tính thuế nằm tại [utils.js:145](file:///src/utils.js#L145) sử dụng công thức A thay vì B."*

## 3. Nhận diện Anti-patterns
Agent phải chủ động báo cáo nếu phát hiện:
- **God Objects**: Một file hoặc class chứa quá nhiều trách nhiệm (vi phạm SOLID-S).
- **Spaghetti Logic**: Luồng dữ liệu nhảy cóc, khó kiểm soát.
- **Hardcoded Secrets**: API Key, Password bị để lộ trong code cũ.
- **Dead Code**: Các đoạn mã không còn được gọi nhưng vẫn tồn tại.

## 4. Reverse Documentation (Viết ngược tài liệu)
- Thay vì bắt User giải thích, Agent phải đọc code và viết lại User Stories dựa trên logic thực tế đang chạy. 
- Mục tiêu là: **"Code as Truth"**.

---

## ✅ Auditor Checklist
- [ ] Đã mapping đủ 100% các entry points (API, Main function) của module chưa?
- [ ] Đã tìm ra các rủi ro tiềm ẩn (Security/Performance) chưa?
- [ ] Tài liệu giải mã logic có dễ hiểu cho người không có kiến thức kỹ thuật không?
