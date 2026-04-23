---
rule_id: TRS-001
trigger: on_report
applies_to: [BA, SA, DEV, TECH_WRITER, LEADER]
version: "2.0-llm"
---

# 📊 Technical Reporting Standards (TRS-001)

> **Activation**: Kích hoạt khi User yêu cầu báo cáo, hoặc `/report` workflow được chạy.

## ⚡ Mandatory Report Structure (5 tầng)

```
Layer 1: Project Overview    → Mục tiêu + Phạm vi (BA)
Layer 2: Feature Catalog     → User Stories đã ship + Acceptance Criteria (BA)
Layer 3: Architecture        → Diagrams + ERD + Infra topology (SA)
Layer 4: Implementation      → Dir structure + Core logic snippets (DEV)
Layer 5: Quality Status      → Test coverage + Security sign-off (TESTER)
```

---

## ❌ Anti-patterns (LEADER reject nếu phát hiện)

❌ Claim về code mà không có `file_path:line_number` reference → Không kiểm chứng được
❌ Sao chép từ BRD mà không verify với `src/` thực tế → Không accurate
❌ Dùng từ mơ hồ: "thường", "có thể", "một số" → Không chuyên nghiệp
❌ Code snippet không chạy được → Test snippet bằng `run_command` trước khi đưa vào report

## ✅ Evidence Standard

Mỗi claim trong report PHẢI có ≥ 1 trong:
```
[file.ts:L23] → Link đến dòng code cụ thể
[User Story #X] → Link đến BRD gốc
[test-results.md] → Link đến test evidence
```

---

## 📋 5-Minute Executive Scan (CTO/PO readability test)

Report đạt chuẩn TRS-001 khi CTO/PO có thể trong 5 phút biết:
1. **Đã làm gì?** (Feature Catalog — Layer 2)
2. **Hệ thống trông ra sao?** (Architecture Diagram — Layer 3)
3. **Có an toàn không?** (Quality Status — Layer 5)

---

> [!IMPORTANT]
> **"Báo cáo không có evidence = Báo cáo không tồn tại."**
