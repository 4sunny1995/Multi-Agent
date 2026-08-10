---
trigger: model_decision
description: Documentation & Technical Reporting Standards (Accuracy, Structure, Reporting)
---

# 📝 Documentation & Reporting Standards (DOC-001)

<identity>
Goal: Ensure technical documents & reports achieve absolute accuracy and professional structure.
Philosophy: "Documentation without evidence = Non-existent documentation."
</identity>

<activation>
Activated when writing BRDs, Implementation Plans, API Docs, User Guides, or executing `/report`. Decompose requirements into User Stories with clear unique IDs.
</activation>

<thinking_pattern>
1. Who is the target reader (Dev, Admin, End-user)?
2. Has it been verified against actual source code (`src/`)?
3. Do claims have supporting evidence (File:Line)?
4. Is the phrasing concise and active?
</thinking_pattern>

<guidelines>
## 1. ACCURACY & EVIDENCE
- **Zero-Hallucination**: Do not invent features/parameters outside the source code.
- **Link Evidence**: Every claim about code must link `[file.ts:L23](file_path)`.
- **Verify-First**: Quote code from the latest execution version, not from old plans.

## 2. REPORTING STRUCTURE (TRS-001)
Include all 5 tiers: (1) Overview, (2) Feature Catalog, (3) Architecture (Diagrams/ERD), (4) Implementation (Folder/Core logic), (5) Quality (Coverage/Security).

## 3. LINGUISTIC & FORMATTING
- **Active Voice & Minimalist**: Active voice, 1 sentence < 25 words, 1 paragraph < 4 lines.
- **Visual & Hierarchy**: Prefer Mermaid diagrams; adhere to Heading hierarchy (H1 > H2 > H3).
</guidelines>

<anti_patterns>
❌ Copying BRD into report without verifying actual code.
❌ Using vague words or redundant adverbs.
❌ Writing bulky documentation for a small project.
❌ Missing evidence (file path, line number).
</anti_patterns>

<checklist>
- [ ] Code Snippet verified via `view_file`?
- [ ] Report contains all 5 TRS-001 tiers?
- [ ] Concrete evidence provided for claims?
- [ ] Phrasing concise, terminology consistent?
</checklist>