---
workflow_id: AUD-001
description: Quy trình phân tích hệ thống cũ (Legacy Audit) và lập lộ trình hiện đại hóa.
role_lead: AUDITOR
triggers: ["/audit", "legacy", "hệ thống cũ", "khảo sát", "reverse engineer"]
version: "2.0"
---

# 🕵️ Workflow: Phân Tích Hệ Thống Cũ (/audit)

> **Quy tắc vàng**: DO NO HARM — Không sửa một dòng code nào trong suốt quá trình audit.

## ⚡ Luồng thực thi

```
CODEBASE → AUDITOR (Discovery) → AUDITOR (Mapping) → AUDITOR+BA (Logic) → SA+LEADER (Roadmap)
```

---

## 1. DISCOVERY (AUDITOR)
- **Hành động**: `list_dir` toàn bộ project. Identify files lớn nhất (> 200 dòng).
// turbo
- **Output**: `docs/original/architecture/discovery.md` — System Map với file sizes + entry points.
- **Constraint**: Chỉ đọc — tuyệt đối không sửa.

## 2. DEPENDENCY MAPPING (AUDITOR)
- **Hành động**: `grep_search` tìm imports, API calls, DB queries. Vẽ dependency graph Mermaid.
- **Tìm**: God Objects, circular dependencies, N+1 query patterns.
- **Output**: Mermaid diagram trong `docs/original/architecture/discovery.md`.

## 3. LOGIC EXTRACTION (AUDITOR + BA)
- **AUDITOR**: Đọc code, chuyển logic phức tạp thành plain-language description.
- **BA**: Validate xem logic đọc được có khớp với nghiệp vụ thực tế không.
- **Output**: `docs/original/business/legacy-logic.md` — Viết cho non-technical stakeholders.

## 4. MODERNIZATION ROADMAP (SA + LEADER)
- **SA**: Đề xuất kiến trúc target và migration strategy.
- **LEADER**: Ưu tiên hóa theo Business Value và Risk.
- **Output**: `docs/original/architecture/roadmap.md` với 3 tier: Quick Wins / Medium / Long-term.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. AUDITOR đưa ra kết luận không có evidence → **Giải pháp**: Mọi phát hiện phải có file:line reference.
2. BA không validate legacy logic → **Giải pháp**: Bước 3 yêu cầu BA sign-off trước khi tiếp tục.
3. SA đề xuất "rewrite từ đầu" → **Giải pháp**: Phải có cost-benefit analysis trước khi LEADER approve.
