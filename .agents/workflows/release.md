---
workflow_id: REL-001
description: Safe, bulletproof packaging and release workflow.
role_lead: LEADER
triggers: ["/release", "release", "deploy production", "ship", "go-live"]
version: "2.0"
---

# 📦 Workflow: Strategic Release Management (/release)

> **Golden Rule**: No Release shall occur without a verified Rollback Plan.

## ⚡ Execution Flow

```
LEADER (Version) → WRITER+TRANS (Docs) → SECURITY+TESTER (Pre-check) → PO (Sign-off) → CLOUD ARCH (Deploy)
```

---

## 1. VERSIONING & MANIFEST (LEADER)
- **Action**: Finalize SemVer per VER-001 (Major.Minor.Patch). Execute `git tag vX.Y.Z`.
- **Pre-condition**: `/dev` or `/fix` passed LEADER Gate and QA approval.
- **Output**: Git tag + Release manifest.

## 2. CHANGELOG & DOCS (TECH WRITER + TRANSLATOR)
- **TECH WRITER**: Consolidate Bug Fixes, New Features, Breaking Changes.
- **TRANSLATOR** (if required): Translate Changelog → VI, EN, JA.
- **Output**: `docs/original/release/vX.Y.Z.md` + Updated `CHANGELOG.md`.

## 3. PRE-RELEASE GATE (SECURITY + TESTER)
- **SECURITY**: Final security scan on staging environment. Zero hardcoded secrets.
- **TESTER**: Full regression test suite. Coverage must not drop relative to previous release.
- **Block condition**: Any CRITICAL/HIGH security finding → Hard block.
- **Output**: Green/Red status + evidence logged in `walkthrough.md`.

## 4. DIGITAL APPROVAL (PO / USER)
- **Action**: User reviews and approves release manifest + Changelog.
- **Constraint**: Non-automatable checkpoint — requires explicit human sign-off.
- **Output**: Approval confirmation → Triggers step 5.

## 5. DEPLOY & VERIFY (CLOUD ARCHITECT)
- **Pre-deploy**: Backup DB snapshot. Document rollback command.
- **Deploy**: Execute deployment. Monitor health checks during initial 5 minutes.
- **Rollback trigger**: If error rate > 5% within 5 minutes → Trigger automatic rollback.
- **Output**: Deployment success report + Incident runbook if issues arise.

---

## 🚨 Failure Points

1. TESTER skips regression → **Solution**: LEADER does not sign off without test evidence.
2. Deploying without DB backup → **Solution**: Script automatically backs up before running `docker-compose up`.
3. Lacking Rollback Plan → **Solution**: Block step 5 until rollback command is documented.
