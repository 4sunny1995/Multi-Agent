---
rule_id: VER-001
trigger: on_release
applies_to: [LEADER, TECH_WRITER, CLOUD_ARCHITECT]
version: "2.0-llm"
---

# 📦 Versioning & Release Standards (VER-001)

> **Activation**: Kích hoạt khi LEADER chuẩn bị `git tag`, `CHANGELOG`, hoặc `/release`.

## ⚡ SemVer Decision Tree

```
Thay đổi phá vỡ backward compatibility? → MAJOR (X+1.0.0)
Thêm tính năng mới, không phá vỡ gì? → MINOR (X.Y+1.0)
Sửa bug / refactor / docs? → PATCH (X.Y.Z+1)
```

**Examples**:
- Thêm endpoint mới → `1.1.0`
- Sửa null pointer bug → `1.1.1`  
- Đổi auth schema → `2.0.0`

---

## ✅ Release Gate Checklist (LEADER phải pass trước git tag)

- [ ] `/dev` hoặc `/fix` đã pass tất cả 7 LEADER Gates?
- [ ] TESTER xác nhận regression tests PASS?
- [ ] SECURITY xác nhận "Green" (không có Critical/High open)?
- [ ] TECH WRITER đã hoàn thành Changelog và Release Notes?
- [ ] DB backup/snapshot đã được tạo?
- [ ] Rollback plan đã được document và test?
- [ ] PO/User đã ký "Digital Approval"?

---

## 📝 Changelog Format (TECH WRITER)

```markdown
## [1.2.0] - YYYY-MM-DD
### Added
- [Feature] User Story #X: Mô tả ngắn gọn.
### Fixed  
- [Fix] Bug #Y: Root cause và giải pháp.
### Security
- [Security] CVE-XXXX: Mô tả và patch.
### Breaking Changes ⚠️
- [Breaking] API endpoint /v1/X không còn hỗ trợ.
```

---

> [!IMPORTANT]
> **Không có /release nào được thực thi nếu chưa có PO Digital Approval.**
