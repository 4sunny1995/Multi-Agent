---
description: Quy trình hệ thống tự động dò tìm và diệt nợ kỹ thuật (Code Audit/Refactor bởi LEADER AI).
---

# 🕵️ Workflow: Định Kỳ Kiểm Toán Hệ Thống (/inspect)

Quy trình này đặt Antigravity vào trạng thái 100% "Leader Khó Tính", tự đi dọn dẹp các mầm mống nợ kỹ thuật trong codebase.

## 1. STATIC ANALYSIS 
- **Hành động:** Leader đọc các file `.ts`, `.js`, `.py` hiện tại trong dự án. Soi chiếu với các Pattern phổ biến.

## 2. SOLID CHECK
- **Hành động:** Phanh phui các hàm vượt quá 15 dòng hoặc làm 2 chức năng một lúc (Vi phạm Single Responsibility).
- Phanh phui các chuỗi `if-else` lặp đi lặp lại. Đề xuất Factory hoặc Strategy Pattern.

## 3. BOY SCOUT RULE
- **Hành động:** Áp dụng Clean Code để Refactor (Tái cấu trúc).
- Báo cáo lại cho Người Dùng danh sách các điểm đã tối ưu hoá trong `walkthrough.md`.
