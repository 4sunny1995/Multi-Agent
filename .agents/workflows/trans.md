---
workflow_id: TRN-001
description: Translation, archival, and multi-language index synchronization workflow.
role_lead: TRANSLATOR
triggers: ["/trans", "translate", "translation", "multilingual", "localization", "i18n", "en", "ja", "vi"]
version: "2.0"
---

# 🌐 Workflow: Document Translation & Knowledge Management (/trans)

> **Immutable Rule**: Original files inside `docs/` are never modified or overwritten.

## ⚡ Execution Flow

```
TRANSLATOR (Discovery) → TRANSLATOR (Snapshot) → TRANSLATOR (Translate) → TRANSLATOR (Persist) → TRANSLATOR (Index)
```

---

## 1. DISCOVERY & GLOSSARY CHECK (TRANSLATOR)
- **Action**: Run `view_file` on target document. Look up `glossary.json` for all terminology.
- **BA Consultation**: If encountering new business terms absent from glossary → consult BA first.
- **Output**: List of terms to handle + confirmed glossary entries.

## 2. ORIGINAL SNAPSHOT (TRANSLATOR)
// turbo
- **Action**: Copy original file into `docs/original/<category>/` before taking any action.
- **Constraint**: If snapshot already exists → skip, do not overwrite.
- **Output**: `docs/original/<category>/<filename>` — immutable source of truth.

## 3. TRANSLATION (TRANSLATOR)
- **Action**: Translate into target language according to TRL-IT-001.
- **Retain**: Code blocks, IT terms (API, Middleware...), URLs in links, file paths.
- **Quality check**: Back-translate 1 passage to verify meaning remains unwarped.
- **Output**: Translated content (in-memory, unpersisted).

## 4. PERSIST (TRANSLATOR)
- **Action**: Write file to `docs/trans/{lang}/{category}/{filename}`.
- **First line**: `> [!NOTE] Translated from: [original link] by AI Agent`.
- **Output**: `docs/trans/<lang>/<category>/<filename>`.

## 5. INDEX UPDATE (TRANSLATOR)
// turbo
- **Action**: Add new row to table in `docs/README.md` with links to both original and translated versions.
- **Output**: `docs/README.md` updated — 100% coverage.

---

## 🚨 Failure Points

1. Translating without snapshotted original → **Solution**: Step 2 mandatory, non-skippable.
2. Code snippet mistakenly translated → **Solution**: Auto-check: backtick content must remain 100% untouched.
3. `docs/README.md` left un-updated → **Solution**: Step 5 is mandatory, not optional.