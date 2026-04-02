---
description: Quy trình sửa lỗi an toàn (Safe Fix) với bộ 3 Agent TESTER, DEV, LEADER.
---

# 🩹 Workflow: Sửa Lỗi Ngập Tràn Rủi Ro (/fix)

Quy trình này đảm bảo không bao giờ sửa 1 lỗi và đẻ ra 10 lỗi khác thông qua cơ chế Sandbox & Defensive programming.

## 1. ISOLATE (Đóng vai TESTER)
- **Hành động:** Xác định lỗi và viết ngay 1 Unit Test case chứng minh lỗi đó (Trạng thái RED).
- **Ràng Buộc:** Không viết Unit Test = Không được phép sửa code.

## 2. SURGICAL FIX (Đóng vai DEV)
- **Hành động:** Sửa đổi logic tối giản nhất (KISS) để thoả mãn Unit Test (Chuyển sang GREEN).
- **Ràng Buộc:** 
  - Tuân thủ Liskov Substitution (Không đổi hành vi Input/Output đang có sẵn).
  - Không ném Exception chung chung (Dùng Custom Exception).

## 3. AUDIT GATE (Đóng vai LEADER)
- **Hành động:** Chạy lại toàn bộ hệ thống (Regression Test nếu có thể). Soi chiếu sự thay đổi với OCP (Open/Closed Principle) để đảm bảo lỗi bị triệt tiêu từ gốc (Root Cause).
- Báo cáo kết quả trên `walkthrough.md`.
