---
workflow_id: DES-001
description: Quy trình thiết kế UX/UI cho sản phẩm Enterprise.
role_lead: DESIGNER
triggers: ["/design", "thiết kế UI", "mockup", "giao diện", "UX", "style guide"]
version: "2.0"
---

# 🎨 Workflow: Thiết Kế Trải Nghiệm & Giao Diện (/design)

> **Quy tắc vàng**: Không DEV nào được viết CSS trước khi có PO Approval từ bước này.

## ⚡ Luồng thực thi

```
BA/PO (Brief) → DESIGNER (Concept) → DESIGNER (Mockup) → SA (Feasibility) → PO (Approve)
```

---

## 1. DISCOVERY & BRIEF (BA / PO)
- **Hành động**: Đọc `brd.md` + `user-stories.md`. Làm rõ Persona, Branding, phân vùng (Global/Japan).
- **Output**: Design Brief — Persona + Constraints + Must-have Elements.

## 2. CONCEPT (DESIGNER)
- **Hành động**: Tạo Moodboard — Color Palette (semantic names), Typography scale, Spacing system.
- **Japanese Aesthetic**: Nếu audience là người Nhật → Tối giản, Noto Sans JP, khoảng trắng rộng, màu Trust Navy.
- **Output**: `docs/draft/ui/style-guide.md` với `Status: Draft`.

## 3. HIGH-FIDELITY MOCKUP (DESIGNER)
- **Hành động**: Tạo Mockup cho 3 màn hình chính. Sử dụng `generate_image` để tạo visual.
- **Mỗi màn hình cần**: Default + Loading + Error states.
- **Output**: `docs/draft/ui/mockups/[screen-name].md` + image artifacts.

## 4. UI SPECS (DESIGNER + SA)
- **DESIGNER**: Xuất Component table — tên, variants, states, pixel specs.
- **SA**: Verify tính khả thi kỹ thuật (implementation feasibility).
- **Output**: `docs/draft/ui/specs.md`.

## 5. PO & USER APPROVAL — Phê Duyệt Thiết Kế (PO / LEADER & User)
- **Hành động**: Trình bày bản thảo thiết kế tại `docs/draft/ui/` cho User/PO kiểm tra aesthetic + UX flow + consistency với Design System.
- **Hỏi ý kiến User/PO**: Trình bày kết quả thiết kế và hỏi ý kiến Approve từ User/PO.
- **Phê duyệt & Promote**:
    - ✅ **Approved**: Khi User/PO xác nhận Approve, di chuyển/đồng bộ toàn bộ tài liệu thiết kế từ `docs/draft/ui/` sang `docs/original/ui/`, cập nhật `Status: Approved` trong Header. Cập nhật Approval sign-off trong `docs/original/README.md`.
    - 🔄 **Refine**: Chỉnh sửa trực tiếp bản thảo trong `docs/draft/ui/` theo feedback của User/PO.
- **Block condition**: Phá vỡ Design System đã thống nhất → Require justification.
- **Output**: Tài liệu UI/UX chính thức được lưu tại `docs/original/ui/` (Single Source of Truth).

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. DESIGNER thiết kế mà không có Persona → **Giải pháp**: Brief bắt buộc trước bước 2.
2. Component không có Error state → **Giải pháp**: LEADER reject Specs thiếu state máy.
3. SA không verify feasibility → **Giải pháp**: DEV sẽ implement những gì không khả thi — waste.
