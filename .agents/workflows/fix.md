---
workflow_id: FIX-001
description: Quy trình sửa lỗi nhanh, an toàn tuyệt đối cho hệ thống Enterprise.
role_lead: TESTER
triggers: ["/fix", "bug", "lỗi", "fix", "sửa"]
version: "2.0"
---

# 🩹 Workflow: Sửa Lỗi Kiên Cố (/fix)

> **Nguyên tắc cốt lõi**: TESTER cô lập trước — DEV sửa sau. Không bao giờ ngược lại.

## ⚡ Luồng thực thi

```
BUG_REPORT → TESTER (Isolate) → DEV (Fix) → SECURITY (Review) → LEADER (Gate)
```

---

## 1. ISOLATE BUG (TESTER)
- **Hành động**: Tái hiện lỗi bằng failing test (RED). Xác định Root Cause và scope ảnh hưởng.
- **Block condition**: Không tái hiện được lỗi → Yêu cầu thêm info, KHÔNG đoán.
- **Output**: Failing test + Bug Report (Severity + Steps to Reproduce + Expected vs Actual).

## 2. SURGICAL FIX (DEV)
- **Hành động**: Sửa lỗi tối giản nhất để pass failing test của TESTER. Không "gold plate".
- **[DB_CHECKPOINT]**: Sửa lỗi yêu cầu thay đổi DB schema cũ → DỪNG, hỏi User.
- **Constraint (KISS)**: Nếu fix cần > 50 dòng code → dấu hiệu Root Cause sai, quay lại bước 1.
- **Output**: Code fix + Updated unit test + `[TECH_DEBT]` tag nếu dùng workaround.

## 3. SECURITY REGRESSION (SECURITY)
- **Hành động**: Scan bản fix xem có tạo ra lỗ hổng mới không (regression vulnerabilities).
- **Focus**: Input validation, auth logic, data exposure.
- **Output**: Approval / Block với evidence cụ thể.

## 4. GATE & LOG (LEADER)
- **Hành động**: Verify test passes + regression không xảy ra. Ghi nhận Root Cause.
- **Output**: `walkthrough.md` với Root Cause Analysis + Prevention Plan.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. DEV fix mà không có failing test → **Giải pháp**: TESTER phải bàn giao RED test trước bước 2.
2. Fix "rộng" hơn cần thiết → **Giải pháp**: LEADER yêu cầu scope giới hạn trong failing test.
3. Bug tái xuất sau 1 tuần → **Giải pháp**: Nếu fix > 2 lần → trigger `/retro` để phân tích pattern.
