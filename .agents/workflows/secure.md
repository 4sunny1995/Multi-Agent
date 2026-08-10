---
workflow_id: SEC-001
description: Strategic system hardening and security audit workflow.
role_lead: SECURITY
triggers: ["/secure", "security", "hardening", "penetration", "vulnerability", "secret leak"]
version: "2.0"
---

# 🛡️ Workflow: System Hardening (/secure)

> **Zero-Trust Mindset**: Trust no external input until sanitized and verified.

## ⚡ Execution Flow

```
SECURITY (Discovery) → SECURITY+SA (Risk) → SA (Hardening) → TESTER (PenTest) → LEADER (Certify)
```

---

## 1. PREDICTIVE DISCOVERY & SEC-SCAN (SECURITY)
// turbo
- **Action 1 (Static Analysis)**: Run `grep_search` across entire repo for: `password=`, `secret=`, `AIza`, `Bearer`, `api_key`. Inspect ports in `docker-compose`.
- **Action 2 (Predictive 24/7 Dependencies)**: Automatically analyze project ecosystem (Node/Python/Go) to apply dependency scanning. Agent selects appropriate tools (such as `npm audit`, `pip-audit`, Trivy, Dependabot) to locate unexploded CVEs.
- **Output**: Raw findings list with file:line + Dependency risk report.

## 2. ATTACK SURFACE ANALYSIS (SECURITY + SA)
- **Action**: Analyze architecture — entry points, trust boundaries, auth flows.
- **STRIDE model**: Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege.
- **Output**: `docs/original/testing/security-reports.md` — Risk matrix (Critical/High/Medium/Low).

## 3. HARDENING IMPLEMENTATION (SA + CLOUD ARCH)
- **SA**: Design encryption at rest + in transit, RBAC model.
- **CLOUD ARCH**: Enforce HTTPS, firewall rules, least-privilege IAM.
- **DBS-001**: Snapshot DB prior to applying any security constraints.
- **Output**: Updated architecture + IaC with security controls.

## 4. PENETRATION TEST (TESTER)
- **Action**: Simulate: Auth bypass, SQL Injection, XSS, CSRF, Mass Assignment.
- **Tool**: `run_command` with scanner or manual test scripts.
- **Block condition**: Critical vulnerability detected → Block step 5, require fix.
- **Output**: Pentest report + Remediation list.

## 5. SECURITY CERTIFICATE (LEADER)
- **Action**: Verify all Critical/High issues are closed. Run final `grep_search` for secrets.
- **Output**: "Secure-Ready" certificate in `walkthrough.md` + CI/CD secret-scan integration.

---

## 🚨 Failure Points

1. Secret leaked through git history → **Solution**: Revoke key + `git filter-branch` + force push.
2. PenTest skipped → **Solution**: LEADER does not certify without a pentest report.
3. Hardening causes outage → **Solution**: Mandatory DBS-001 snapshot + rollback command beforehand.
