---
description: Quy trình hệ thống tự động dò tìm và diệt nợ kỹ thuật (Code Audit/Refactor bởi LEADER AI).
---

# 🕵️ Workflow: Định Kỳ Kiểm Toán Hệ Thống (/inspect)

Đây là chế độ 100% "Leader Khó Tính", sục sạo toàn bộ Source code (hoặc các file được trỏ tới) để tìm mầm mống mọt nước (Technical Debt).

## 1. STATIC ANALYSIS (Quét tĩnh)
- **Hành động:** Leader đọc các nguồn file. Đối chiếu với `clean-code.md`, `solid.md`, `design-pattern.md`. Tìm ra hàm dài, code chắp vá trôi nổi.

## 2. COMPLIANCE CHECK (Chỉ mặt gọi tên)
- **Hành động:** 
  - Phát hiện hàm vượt quá 15 dòng / 2 nhiệm vụ -> Đề nghị tước quyền (Refactor).
  - Phát hiện `if-else` bất minh -> Đề xuất Factory hoặc Strategy Pattern.
  - Tìm ra những Unit test chạy hời hợt hoặc bị tắt âm thầm.

## 3. BOY SCOUT RULE (Refactor)
- **Hành động:** LEADER trực tiếp nhúng tay sửa lại Codebase (hoặc quăng ra checklist cho DEV tự làm).
- **Kết xuất:** Nộp danh sách các điểm đã dọn dẹp lên `walkthrough.md` báo cáo User.
