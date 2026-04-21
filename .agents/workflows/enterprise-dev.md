---
workflow_id: ENT-001
description: Quy trình phát triển tính năng Enterprise end-to-end.
role_lead: LEADER
triggers: ["/enterprise-dev", "enterprise", "tính năng lớn", "end-to-end"]
version: "2.0"
---

# 🚀 Workflow: Phát Triển Tính Năng (/enterprise-dev)

> **Pre-condition**: Mọi Agent đọc [llm-agent-config.md](file:///.agents/config/llm-agent-config.md) trước khi bắt đầu.

## ⚡ Luồng thực thi (Happy Path)

```
[ENTERPRISE]: USER_REQUEST → BA → [DESIGNER] → SA+CLOUD → SECURITY → DEV → TESTER+WRITER → LEADER
[MVP-MICRO]: USER_REQUEST → BA → [DESIGNER] → DEV → TESTER → LEADER
```

---

## 1. STRATEGIC RESEARCH (BA)
- **Kích hoạt**: Nhận USER_REQUEST có mô tả tính năng mới.
// turbo
- **Hành động 1 (Phân loại FIC)**: Dùng `grep_search` quét sơ bộ thư mục code và `STATE.md` để xác định: Tính năng độc lập hoàn toàn (`[FIC: ISOLATED]`) hay có chạm module cũ (`[FIC: INTEGRATED]`).
- **Hành động 2 (Phân loại OVER-ENGINEERING)**: Đối chiếu với Ma trận Scale và dán nhãn `[ENTERPRISE]` hoặc `[MVP-MICRO]`. Nếu người dùng chỉ thị rõ `[MODE: MVP]`, bắt buộc tuân theo.
  - *`[MVP-MICRO]` Criterias*: Không cần DB phức tạp (chỉ dùng SQLite/Local JSON), không có RBAC auth tinh vi, là tool chạy local, không lưu PII. (=> **BYPASS** Bước 3 & Bước 4).
  - *`[ENTERPRISE]` Criterias*: Backend 3-tier, DB Clustering, Thanh toán, PII data, Tích hợp hệ thống cũ (`[FIC: INTEGRATED]`). (=> Chạy Full 7 Gates).
- **Hành động 3 (Phân tích & Thấu cảm)**: Đọc mục `7. MÔ HÌNH KINH DOANH (BUSINESS DOMAIN)` trong `STATE.md`. Dựa vào "Chân dung Khách hàng" (User Persona) và "Nỗi đau cốt lõi" (Pain Points) để viết luồng nghiệp vụ thực tiễn chứ không chỉ là giao diện hệ thống. Hủy bỏ mọi User Story không giải quyết đúng Pain Point hoặc vi phạm Business Rules. Chạy INF-001 Discovery.
- **[DB_CHECKPOINT]**: Nếu cần thay đổi DB cũ → DỪNG và hỏi User ngay.
- **Output**: `docs/original/business/brd.md` (phải gắn mác FIC và Quy mô trên đầu) + `user-stories.md`.

## 2. UI/UX DESIGN (DESIGNER) — *optional nếu không có UI*
- **Hành động**: Chuyển User Stories thành Mockup + UI Specs.
- **Output**: `docs/original/ui/style-guide.md` + `docs/original/ui/specs.md`.

## 3. ARCHITECTURAL BLUEPRINT (SA + CLOUD ARCHITECT)
- **SA**: INF-001 Discovery bắt buộc → Thiết kế Sequence + Schema. 
- **CLOUD**: Dự toán hạ tầng 3-tier (Low/Medium/High traffic).
- **[DB_CHECKPOINT]**: Schema cũ bị sửa → User approval bắt buộc.
- **Output**: `docs/original/architecture/` + `implementation_plan.md` + `docs/original/budget/`.

## 4. SECURITY GATEWAY (SECURITY)
- **Hành động**: Review Plan về RBAC, Secrets management, Input validation.
- **Block condition**: Phát hiện hardcoded credential hoặc SQL injection risk → Block Plan.
- **Output**: Approval comment trong `implementation_plan.md`.
- **Gate Check (Handoff Contract)**: DEV tuyệt đối không được phép thực thi code (bước 5) nếu chưa có xác nhận mộc "Security Approved" tại bước này.

## 5. CORE EXECUTION & TDD (DEV)
- **Hành động**: Implement theo Plan. TDD flow: RED → GREEN → REFACTOR.
- **Constraint**: Không viết code trước khi có failing test.
- **Output**: `src/` + `tests/` — coverage ≥ 80% core logic.

## 6. QA + DOCUMENTATION (TESTER + TECH WRITER)
- **TESTER**: Acceptance tests + Security test + Edge cases từ BRD. Nếu BRD dán mác `[FIC: INTEGRATED]`, bắt buộc bổ sung kịch bản **Regression Test** (Kiểm thử hồi quy) để tránh làm hỏng module cũ.
- **TECH WRITER**: User Guide + API Docs.
- **Output**: `docs/original/testing/reports.md` + `docs/original/business/user-guide.md`.

## 7. FINAL GATE (LEADER — 7 Gates)
- **Hành động**: Review qua 7 Gates. Cập nhật trạng thái kiến trúc mới nhất vào `.agents/STATE.md`. PASS → tag Git.
- **Output**: `walkthrough.md` + `git tag vX.Y.Z` + `.agents/STATE.md`.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. SA không chạy INF-001 Discovery → **Giải pháp**: LEADER block Plan nếu thiếu Discovery section.
2. DEV bỏ qua TDD → **Giải pháp**: TESTER phải có failing test trước khi DEV bắt đầu.
3. Context không được bàn giao đủ giữa các Agent → **Giải pháp**: Handoff Contract bắt buộc.