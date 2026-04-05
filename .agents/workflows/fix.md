# 🩹 Workflow: Sửa Lỗi Kiên Cố (/fix)

Quy trình sửa lỗi nhanh nhưng an toàn tuyệt đối cho hệ thống Enterprise.

## 1. ISOLATE BUG (TESTER)
- **Hành động**: Tái hiện lỗi bằng một bài Test thất bại (RED).
- **Kết quả**: Xác định Root Cause và Edge Case bị bỏ sót.

## 2. SURGICAL FIX (DEV)
- **Hành động**: DEV sửa lỗi để Pass bài test của TESTER.
- **Ràng buộc**: Sửa tối giản nhất (KISS).
- **Phụ**: Cập nhật Unit Test tương ứng.

## 3. SECURITY REVIEW (SECURITY)
- **Hành động**: Rà soát xem bản sửa lỗi có vô tình tạo ra lỗ hổng bảo mật mới nào không (Regressions).
- **Bàn giao**: Phê chuẩn sơ bộ cho bản vá.

## 4. AUDIT & LOG (LEADER)
- **Hành động**: LEADER kiểm duyệt toàn bộ quá trình và Regression tests.
- **Kết xuất**: `walkthrough.md`.
