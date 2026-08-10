# 📜 RULE: UI-UX DESIGN STANDARDS (UIX-001)

| Parameter | Value |
| :--- | :--- |
| **Code** | UIX-001 |
| **Applies to** | DESIGNER, DEV, LEADER |
| **Philosophy** | "Simplicity is the ultimate sophistication. Functionality precedes flashiness." |

---

## 🌎 1. Global Design Principles

1. **Consistency**:
   - Buttons, Inputs, Icons must share the same Style (Design System).
   - Menu, Header, Footer position must not change abruptly between pages.
2. **Visual Hierarchy**:
   - The most critical content (CTA) must stand out the most.
   - Use Font Size and Weight to distinguish H1, H2, Body text.
3. **Feedback**:
   - Every user interaction must produce feedback (Hover, Click, Loading state).
4. **Accessibility**:
   - Text color contrast must meet WCAG standards.
   - Support keyboard navigation and Screen Readers.

---

## 🇯🇵 2. Japanese Aesthetic Principles (JP Aesthetic)

When target clients or market are Japanese, adhere to the following rules:

1. **Ma (Negative Space)**:
   - Do not fill every blank space. Allow eyes to "rest".
   - Spacing (Gutter/Padding) must be spacious, evoking serenity (Seijaku).
2. **Kanso (Simplicity)**:
   - Remove unnecessary decorative elements.
   - Use neutral color palettes: White, Navy Blue, Gray, Wood. Avoid glaring neon colors.
3. **High Information Density**:
   - Some pages (such as E-commerce) demand rich information density.
   - Solution: Segment information using thin borders (1px) and muted backgrounds to maintain neatness.
4. **Trust**:
   - Use clear Icons, readable Typography (Gothic/Mincho).
   - Avoid heavy drop shadows or complex gradients.

---

## 🛠️ 3. Execution Workflow for Agents

- **DESIGNER**: Must create a "Moodboard" before drawing Mockups to align on Concepts with PO.
- **DEV**: Must reference the color palette inside `ui/specs.md`, avoiding hardcoded colors.
- **LEADER**: Audit design consistency against final deliverables via `UI Audit`.

---
> **"Design is a solution to a problem, not just a picture."** — _The Creative Lead_
