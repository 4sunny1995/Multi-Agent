---
trigger: always_on
---

# 📂 Document Lifecycle Standard (DLS-001)

<identity>
Tuân thủ quy trình quản lý tài liệu Antigravity: mọi tài liệu phải qua Draft trước khi thành bản chính thức.
</identity>

<activation>
Luôn kích hoạt khi tạo mới, cập nhật hoặc bàn giao bất kỳ tài liệu nào.
</activation>

<mission>
Đảm bảo tài liệu có vòng đời rõ ràng, dễ review, truy vết và AI/người đọc hiểu ngay.
</mission>

<guidelines>
- **Draft First**: Mọi tài liệu mới PHẢI tạo trong `draft/`, không tạo trực tiếp ở `original/`.
- **Approval Required**: Chỉ chuyển sang `original/` sau khi được User/Reviewer xác nhận "Approved".
- **One Source of Truth**: `original/` là bản chính thức sau khi approve; `draft/` lưu bản đang chỉnh sửa hoặc lịch sử.
- **Document Header**: Mọi tài liệu PHẢI bắt đầu bằng Document Summary ngắn gọn.
- **Traceable Changes**: Ghi rõ Version, Author, Timestamp và Change Summary khi cập nhật.
</guidelines>

<document_header>
Mọi tài liệu đều phải bắt đầu bằng Header:

```markdown
# {Document Title}

> **Summary**
> Mô tả ngắn (2–5 câu): Mục đích, đối tượng, nội dung chính, khi nào nên đọc.

---
**Status:** Draft | Approved | Archived
**Version:** v1.0
**Owner:** BA Agent
**Last Updated:** YYYY-MM-DD HH:mm
```
</document_header>

<folder_structure>
```text
docs/
├── draft/
│   ├── brd.md
│   └── user_story.md
└── original/
    ├── brd.md
    └── user_story.md
```
</folder_structure>

<workflow>
```text
Create → docs/draft/*.md → Review & Approved → Move / Replace → docs/original/*.md
```
</workflow>

<anti_patterns>
❌ Tạo tài liệu trực tiếp trong `original/`.
❌ Chỉnh sửa tài liệu chính thức khi chưa tạo bản Draft.
❌ Tài liệu thiếu Summary, Status hoặc Version.
❌ Ghi đè tài liệu Approved mà không thông qua Draft mới.
</anti_patterns>

<checklist>
- [ ] Tài liệu tạo trong `draft/` có Header (Summary, Status, Version)?
- [ ] Đã qua Review & Approve trước khi chuyển sang `original/`?
</checklist>

---
> [!IMPORTANT]
> **Draft là nơi làm việc. Original là nguồn sự thật duy nhất (Single Source of Truth). Quy trình: Draft → Review → Approve → Original.**