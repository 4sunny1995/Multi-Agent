---
workflow_id: DES-001
description: UX/UI design workflow for Enterprise products.
role_lead: DESIGNER
triggers: ["/design", "UI design", "mockup", "interface", "UX", "style guide"]
version: "2.0"
---

# 🎨 Workflow: Experience & Interface Design (/design)

> **Golden Rule**: No DEV shall write CSS before securing PO Approval from this workflow step.

## ⚡ Execution Flow

```
BA/PO (Brief) → DESIGNER (Concept) → DESIGNER (Mockup) → SA (Feasibility) → PO (Approve)
```

---

## 1. DISCOVERY & BRIEF (BA / PO)
- **Action**: Read `brd.md` + `user-stories.md`. Clarify Personas, Branding, and Localization (Global/Japan).
- **Output**: Design Brief — Personas + Constraints + Must-have Elements.

## 2. CONCEPT (DESIGNER)
- **Action**: Create Moodboard — Color Palette (semantic names), Typography scale, Spacing system.
- **Japanese Aesthetic**: If target audience is Japanese → Minimalist, Noto Sans JP, spacious negative space, Trust Navy palette.
- **Output**: `docs/draft/ui/style-guide.md` with `Status: Draft`.

## 3. HIGH-FIDELITY MOCKUP (DESIGNER)
- **Action**: Create Mockups for 3 primary screens. Use `generate_image` to create visual artifacts.
- **Each screen requires**: Default + Loading + Error states.
- **Output**: `docs/draft/ui/mockups/[screen-name].md` + image artifacts.

## 4. UI SPECS (DESIGNER + SA)
- **DESIGNER**: Export Component table — names, variants, states, pixel specs.
- **SA**: Verify technical implementation feasibility.
- **Output**: `docs/draft/ui/specs.md`.

## 5. PO & USER APPROVAL — Design Approval (PO / LEADER & User)
- **Action**: Present draft designs in `docs/draft/ui/` to User/PO for inspection of aesthetic + UX flow + consistency with Design System.
- **User/PO Consultation**: Present design results and request approval from User/PO.
- **Approve & Promote**:
    - ✅ **Approved**: When User/PO approves, move/synchronize all design documents from `docs/draft/ui/` to `docs/original/ui/`, updating `Status: Approved` in Header. Update Approval sign-off in `docs/original/README.md`.
    - 🔄 **Refine**: Edit draft files directly in `docs/draft/ui/` per User/PO feedback.
- **Block condition**: Violating agreed Design System → Requires justification.
- **Output**: Official UI/UX documentation stored in `docs/original/ui/` (Single Source of Truth).

---

## 🚨 Failure Points

1. DESIGNER creates designs without Personas → **Solution**: Mandatory Brief prior to step 2.
2. Components missing Error states → **Solution**: LEADER rejects Specs lacking state coverage.
3. SA fails to verify feasibility → **Solution**: DEV will attempt unfeasible implementations — resource waste.
