---
trigger: always_on
---

# 📂 Document Lifecycle Standard (DLS-001)

<identity>
Comply with the Antigravity document management workflow: all documents must go through Draft before becoming official.
No document shall contain absolute file/directory paths on the operating system.
</identity>

<activation>
Always active when creating, updating, or handing over any document.
</activation>

<mission>
Ensure documents have a clear lifecycle, easy to review, traceable, and immediately understandable to AI and human readers.
</mission>

<guidelines>
- **Draft First**: All new documents MUST be created in `draft/`, never created directly in `original/`.
- **Approval Required**: Promote to `original/` only after User/Reviewer confirms "Approved".
- **One Source of Truth**: `original/` is the single official version post-approval; `draft/` stores working draft or history.
- **Document Header**: All documents MUST begin with a concise Document Summary.
- **Traceable Changes**: Clearly record Version, Author, Timestamp, and Change Summary when updating.
</guidelines>

<document_header>
Every document must start with the following Header:

```markdown
# {Document Title}

> **Summary**
> Short description (2–5 sentences): Purpose, target audience, main content, when to read.

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
❌ Creating documents directly inside `original/`.
❌ Editing official documents without creating a new Draft.
❌ Documents missing Summary, Status, or Version headers.
❌ Overwriting Approved documents without going through a new Draft.
</anti_patterns>

<checklist>
- [ ] Document created in `draft/` has Header (Summary, Status, Version)?
- [ ] Reviewed & Approved prior to moving to `original/`?
</checklist>

---
> [!IMPORTANT]
> **Draft is for working. Original is the Single Source of Truth. Workflow: Draft → Review → Approve → Original.**