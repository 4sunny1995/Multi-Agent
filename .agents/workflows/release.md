---
workflow_id: REL-001
description: Quy trình đóng gói và phát hành (Release) an toàn tuyệt đối.
role_lead: LEADER
triggers: ["/release", "phát hành", "release", "deploy production", "ship", "go-live"]
version: "2.0"
---

# 📦 Workflow: Quản Lý Phát Hành Chiến Lược (/release)

> **Quy tắc vàng**: Không có Release nào được phép xảy ra nếu chưa có Rollback Plan đã được kiểm chứng.

## ⚡ Luồng thực thi

```
LEADER (Version) → WRITER+TRANS (Docs) → SECURITY+TESTER (Pre-check) → PO (Sign-off) → CLOUD ARCH (Deploy)
```

---

## 1. VERSIONING & MANIFEST (LEADER)
- **Hành động**: Chốt SemVer theo VER-001 (Major.Minor.Patch). `git tag vX.Y.Z`.
- **Pre-condition**: `/dev` hoặc `/fix` đã qua LEADER Gate và QA approved.
- **Output**: Git tag + Release manifest.

## 2. CHANGELOG & DOCS (TECH WRITER + TRANSLATOR)
- **TECH WRITER**: Tổng hợp Bug Fix, New Features, Breaking Changes.
- **TRANSLATOR** (nếu cần): Dịch Changelog → VI, EN, JA.
- **Output**: `docs/release/vX.Y.Z.md` + `CHANGELOG.md` cập nhật.

## 3. PRE-RELEASE GATE (SECURITY + TESTER)
- **SECURITY**: Security scan lần cuối trên staging. Không hardcoded secrets.
- **TESTER**: Full regression test suite. Coverage không giảm so với release trước.
- **Block condition**: Bất kỳ CRITICAL/HIGH security finding → Hard block.
- **Output**: Green/Red status + evidence trong `walkthrough.md`.

## 4. DIGITAL APPROVAL (PO / USER)
- **Hành động**: User xem xét và phê duyệt release manifest + Changelog.
- **Constraint**: Đây là chốt chặn không thể tự động hóa — cần human sign-off.
- **Output**: Approval confirmation → Trigger bước 5.

## 5. DEPLOY & VERIFY (CLOUD ARCHITECT)
- **Pre-deploy**: Backup DB snapshot. Document rollback command.
- **Deploy**: Thực thi deployment. Monitor health checks 5 phút đầu.
- **Rollback trigger**: Nếu error rate > 5% trong 5 phút → Tự động rollback.
- **Output**: Deployment success report + Incident runbook nếu có vấn đề.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. TESTER skip regression → **Giải pháp**: LEADER không sign-off nếu không có test evidence.
2. Deploy mà không có DB backup → **Giải pháp**: Script tự động backup trước `docker-compose up`.
3. Không có Rollback Plan → **Giải pháp**: Block bước 5 cho đến khi rollback command được document.
