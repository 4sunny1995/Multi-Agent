---
rule_id: SHS-001
trigger: model_decision
description: Security Hardening Standards (Zero-Trust, Hard Constraints)
applies_to: [SECURITY, CLOUD_ARCHITECT, SA, LEADER]
severity: CRITICAL
version: "2.0-llm"
---

# 🛡️ Security Hardening Standards (SHS-001)

> **Activation**: This rule triggers when Agents review code, IaC, or prepare deployments.

## ⚡ Zero-Trust Checklist (Run before each release)

```
□ No hardcoded secrets in code/IaC?
□ All external inputs sanitized?
□ HTTPS/TLS mandatory for all external calls?
□ Least Privilege: Every service has minimum necessary rights?
□ Audit log for all sensitive resource access?
□ 24/7 Dependency Security: Continuous automated CVE scanning at CI/CD level?
```

---

## ❌ HARD BLOCKS (Detection = Immediate Block)

❌ Hardcoded passwords, API keys, tokens in source code → `grep_search "secret=|password=|Bearer"`
❌ HTTP (without S) for production API calls → Enforce HTTPS/TLS
❌ SQL query using string concatenation → SQL Injection risk → REJECT
❌ User input passed to `eval()` or `exec()` directly → Remote Code Execution risk

## ✅ SAFE PATTERNS

✅ Secrets via environment variables or Secret Managers
✅ Parameterized queries for SQL
✅ Content Security Policy headers for web endpoints
✅ Input validation using whitelist approach (not blacklist)

---

## 🔍 Scanning Protocol (SECURITY Agent must run)

```bash
# Scan for hardcoded secrets
grep -r "password=\|secret=\|api_key=\|Bearer " src/

# Scan for dangerous functions  
grep -r "eval(\|exec(\|system(" src/
```

---

## STRIDE Threat Matrix (SA + SECURITY review)

| Threat | Mitigation |
| :--- | :--- |
| **S**poofing | JWT validation, MFA |
| **T**ampering | HMAC signatures, checksums |
| **R**epudiation | Immutable audit logs |
| **I**nfo Disclosure | Encryption at rest + transit |
| **D**enial of Service | Rate limiting, circuit breaker |
| **E**levation of Privilege | RBAC + Least Privilege |

---

> [!CAUTION]
> **"Security is a continuous process — not a one-time checkbox."**
