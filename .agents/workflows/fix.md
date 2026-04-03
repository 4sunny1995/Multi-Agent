---
description: Quy trình sửa lỗi an toàn (Safe Fix) với bộ 3 Agent TESTER, DEV, LEADER.
---

# 🩹 Workflow: Sửa Lỗi Ngập Tràn Rủi Ro (/fix)

Quy trình này đảm bảo không bao giờ sửa 1 lỗi và đẻ ra 10 lỗi khác thông qua cơ chế Sandbox & Defensive programming.

## 1. ISOLATE (TESTER phát pháo)
- **Hành động:** Ghi nhận lỗi từ người dùng (hoặc Bug Report). TESTER lập tức chuyển hóa mưu đồ phá hoại thành 1 Red Test Case.
- **Bàn giao:** TESTER giao file Test Case cho DEV. **Ràng buộc**: Chừng nào Test chưa chạy màu Đỏ, DEV không được phép vào file source code chính.

## 2. SURGICAL FIX (DEV vá víu)
- **Hành động:** DEV đọc Test Case, sửa đổi logic tối giản nhất (KISS) để thoả mãn Unit Test (Chuyển sang GREEN).
- **Ràng Buộc:** 
  - Tuân thủ Liskov Substitution (Không đổi hành vi Input/Output đang có sẵn).
  - Bắt Exception cụ thể, nghiêm cấm đặt biến toàn cục dư thừa để bypass nghiệp vụ. DEV bàn giao cho LEADER.

## 3. AUDIT GATE (LEADER chốt chặn)
- **Hành động:** LEADER soi chiếu mã nguồn vá theo phương châm triệt thoái Root Cause (Chữa từ gốc). Kiểm tra Regression Test để đảm bảo không gãy đổ các module lân cận.
- **Kết xuất:** Nếu DEV làm tốt, Leader tạo báo cáo kết quả trên `walkthrough.md` hoặc ném thẳng code vào mặt DEV nếu phát hiện đó chỉ là "Quick Fix".
