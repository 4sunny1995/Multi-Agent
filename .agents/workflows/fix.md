---
description: Quy trình sửa lỗi an toàn (Safe Fix) với bộ 3 Agent TESTER, DEV, LEADER.
---

# 🩹 Workflow: Sửa Lỗi (/fix)

Quy trình sửa lỗi nhanh nhưng an toàn.

## 1. ISOLATE (TESTER)
- **Hành động**: Tái hiện lỗi bằng một bài Test thất bại (RED).
// turbo
- **Tự động**: Chạy suite test hiện tại để xác nhận lỗi bị tái hiện.
- **Bàn giao**: File test gây lỗi.

## 2. SURGICAL FIX (DEV)
- **Hành động**: DEV sửa lỗi để Pass bài test của TESTER.
- **Ràng buộc**: Sửa tối giản nhất (KISS).
// turbo
- **Tự động**: Chạy lại bài test sau khi sửa (VD: `npm test <file>`).
- **Bàn giao**: Code đã được sửa (GREEN).

## 3. AUDIT GATE (LEADER)
- **Hành động**: LEADER kiểm tra Root Cause và Regression.
- **Kết xuất**: `walkthrough.md`.
