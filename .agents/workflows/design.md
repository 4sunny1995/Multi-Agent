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
- **Output**: `docs/ui/style-guide.md`.

## 3. HIGH-FIDELITY MOCKUP (DESIGNER)
- **Hành động**: Tạo Mockup cho 3 màn hình chính. Sử dụng `generate_image` để tạo visual.
- **Mỗi màn hình cần**: Default + Loading + Error states.
- **Output**: `docs/ui/mockups/[screen-name].md` + image artifacts.

## 4. UI SPECS (DESIGNER + SA)
- **DESIGNER**: Xuất Component table — tên, variants, states, pixel specs.
- **SA**: Verify tính khả thi kỹ thuật (implementation feasibility).
- **Output**: `docs/ui/specs.md`.

## 5. PO APPROVAL (PO / LEADER)
- **Hành động**: Duyệt aesthetic + UX flow + consistency với Design System.
- **Block condition**: Phá vỡ Design System đã thống nhất → Require justification.
- **Output**: Approval sign-off trong `docs/README.md`.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. DESIGNER thiết kế mà không có Persona → **Giải pháp**: Brief bắt buộc trước bước 2.
2. Component không có Error state → **Giải pháp**: LEADER reject Specs thiếu state máy.
3. SA không verify feasibility → **Giải pháp**: DEV sẽ implement những gì không khả thi — waste.
