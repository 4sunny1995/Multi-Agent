---
rule_id: VER-001
trigger: on_release
applies_to: [LEADER, TECH_WRITER, CLOUD_ARCHITECT]
version: "2.0-llm"
---

# 📦 Versioning & Release Standards (VER-001)

> **Activation**: Activated when LEADER prepares `git tag`, `CHANGELOG`, or `/release`.

## ⚡ SemVer Decision Tree

```
Breaking changes backward compatibility? → MAJOR (X+1.0.0)
Adding new features, non-breaking? → MINOR (X.Y+1.0)
Bug fix / refactor / docs? → PATCH (X.Y.Z+1)
```

**Examples**:
- Adding new endpoint → `1.1.0`
- Fixing null pointer bug → `1.1.1`  
- Changing auth schema → `2.0.0`

---

## ✅ Release Gate Checklist (LEADER must pass prior to git tag)

- [ ] `/dev` or `/fix` passed all 7 LEADER Gates?
- [ ] TESTER confirms regression tests PASS?
- [ ] SECURITY confirms "Green" (no Critical/High open)?
- [ ] TECH WRITER completed Changelog and Release Notes?
- [ ] DB backup/snapshot created?
- [ ] Rollback plan documented and tested?
- [ ] PO/User signed "Digital Approval"?

---

## 📝 Changelog Format (TECH WRITER)

```markdown
## [1.2.0] - YYYY-MM-DD
### Added
- [Feature] User Story #X: Concise description.
### Fixed  
- [Fix] Bug #Y: Root cause and solution.
### Security
- [Security] CVE-XXXX: Description and patch.
### Breaking Changes ⚠️
- [Breaking] API endpoint /v1/X no longer supported.
```

---

> [!IMPORTANT]
> **No /release shall be executed without PO Digital Approval.**
