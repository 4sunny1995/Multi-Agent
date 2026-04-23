---
workflow_id: DEV-001
description: Quy trình phát triển tính năng Enterprise end-to-end.
role_lead: LEADER
triggers: ["/dev", "phát triển", "tính năng mới", "implement"]
version: "2.0"
---

# 🚀 Workflow: Phát Triển Tính Năng (/dev)

> **Pre-condition**: Mọi Agent đọc [llm-agent-config.md](file:///.agents/config/llm-agent-config.md) trước khi bắt đầu.

## ⚡ Luồng thực thi (Happy Path)

```
USER_REQUEST → BA → [DESIGNER] → SA+CLOUD → SECURITY → DEV → TESTER+WRITER → LEADER
```

---

## 1. STRATEGIC RESEARCH (BA)
- **Kích hoạt**: Nhận USER_REQUEST có mô tả tính năng mới.
- **Hành động**: Phân tích yêu cầu. Chạy INF-001 Discovery nếu là Legacy project.
- **[DB_CHECKPOINT]**: Nếu cần thay đổi DB cũ → DỪNG và hỏi User ngay.
- **Output**: `docs/original/business/brd.md` + `user-stories.md` (chuẩn INVEST, có 5+ Edge Cases).

## 2. UI/UX DESIGN (DESIGNER) — *optional nếu không có UI*
- **Hành động**: Chuyển User Stories thành Mockup + UI Specs.
- **Output**: `docs/original/ui/style-guide.md` + `specs.md`.

## 3. ARCHITECTURAL BLUEPRINT (SA + CLOUD ARCHITECT)
- **SA**: INF-001 Discovery bắt buộc → Thiết kế Sequence + Schema. 
- **CLOUD**: Dự toán hạ tầng 3-tier (Low/Medium/High traffic).
- **[DB_CHECKPOINT]**: Schema cũ bị sửa → User approval bắt buộc.
- **Output**: `docs/original/architecture/` + `implementation_plan.md` + `docs/budget/`.

## 4. SECURITY GATEWAY (SECURITY)
- **Hành động**: Review Plan về RBAC, Secrets management, Input validation.
- **Block condition**: Phát hiện hardcoded credential hoặc SQL injection risk → Block Plan.
- **Output**: Approval comment trong `implementation_plan.md`.

## 5. CORE EXECUTION & TDD (DEV)
- **Hành động**: Implement theo Plan. TDD flow: RED → GREEN → REFACTOR.
- **Constraint**: Không viết code trước khi có failing test.
- **Output**: `src/` + `tests/` — coverage ≥ 80% core logic.

## 6. QA + DOCUMENTATION (TESTER + TECH WRITER)
- **TESTER**: Acceptance tests + Security test + Edge cases từ BRD.
- **TECH WRITER**: User Guide + API Docs.
- **Output**: `docs/testing/reports.md` + `docs/business/user-guide.md`.

## 7. FINAL GATE (LEADER — 7 Gates)
- **Hành động**: Review qua 7 Gates. PASS → tag Git. FAIL → gửi lại Agent cụ thể.
- **Output**: `walkthrough.md` + `git tag vX.Y.Z`.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. SA không chạy INF-001 Discovery → **Giải pháp**: LEADER block Plan nếu thiếu Discovery section.
2. DEV bỏ qua TDD → **Giải pháp**: TESTER phải có failing test trước khi DEV bắt đầu.
3. Context không được bàn giao đủ giữa các Agent → **Giải pháp**: Handoff Contract bắt buộc.
