---
workflow_id: REP-001
description: Quy trình phối hợp BA, SA, DEV để trích xuất báo cáo kỹ thuật.
role_lead: TECH_WRITER
triggers: ["/report", "báo cáo", "technical report", "sức khỏe dự án", "system snapshot"]
version: "2.0"
---

# 📊 Workflow: Báo Cáo Kỹ Thuật (/report)

> **Mục đích**: Chụp "Chân dung dự án" tại một thời điểm — từ nghiệp vụ, kiến trúc đến mã nguồn thực tế.

## ⚡ Luồng thực thi

```
BA (Features) → SA (Architecture) → DEV (Code) → TECH_WRITER (Synthesize) → LEADER (Approve)
```

---

## 1. FEATURE DISCOVERY (BA)
- **Hành động**: Liệt kê tất cả User Stories & Acceptance Criteria đã hoàn thành.
- **Constraint**: Chỉ liệt kê tính năng **đã ship** — không đưa vào những gì đang WIP.
- **Output**: Feature list gửi TECH WRITER.

## 2. ARCHITECTURE EXTRACT (SA)
- **Hành động**: Tóm tắt kiến trúc hiện có — Sequence Diagram, Data Schema, API contract.
- **Verify first**: `view_file` để lấy data thực tế, không viết từ memory.
- **Output**: Diagrams + Specs gửi TECH WRITER.

## 3. CODE & STRUCTURE INSIGHT (DEV)
// turbo
- **Hành động**: `list_dir src/` để lấy cấu trúc. Trích xuất 3-5 Code Snippets logic quan trọng nhất.
- **Constraint**: Snippets phải có `file_path:line_number` reference.
- **Output**: Structure tree + Annotated snippets gửi TECH WRITER.

## 4. SYNTHESIS (TECH WRITER)
- **Hành động**: Tổng hợp input từ BA + SA + DEV → `docs/architecture/technical_report.md`.
- **TRS-001 Compliance**: Mọi claim phải có evidence link. Không viết gì không verify được.
- **Output**: `docs/architecture/technical_report.md` + cập nhật `docs/README.md`.

## 5. APPROVAL (LEADER)
- **Hành động**: Verify accuracy (report vs src/) + approve hoặc yêu cầu chỉnh sửa.
- **Output**: `walkthrough.md` với timestamp.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. TECH WRITER viết từ BRD thay vì src/ → **Giải pháp**: LEADER reject nếu không có file:line evidence.
2. Report không cập nhật `docs/README.md` → **Giải pháp**: Auto-Indexing rule bắt buộc.
3. DEV snippet không chạy được → **Giải pháp**: Snippet phải được test bằng `run_command` trước.
