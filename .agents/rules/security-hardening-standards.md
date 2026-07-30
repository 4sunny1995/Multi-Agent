---
rule_id: SHS-001
trigger: always_on
applies_to: [SECURITY, CLOUD_ARCHITECT, SA, LEADER]
severity: CRITICAL
version: "2.0-llm"
---

# 🛡️ Security Hardening Standards (SHS-001)

> **Activation**: Rule này kích hoạt khi Agent review code, IaC, hoặc chuẩn bị deploy.

## ⚡ Zero-Trust Checklist (Chạy trước mỗi release)

```
□ Không có hardcoded secret trong code/IaC?
□ Tất cả external input đều được sanitized?
□ HTTPS/TLS bắt buộc cho mọi external call?
□ Least Privilege: Mọi service chỉ có quyền tối thiểu?
□ Audit log cho mọi truy cập tài nguyên nhạy cảm?
```

---

## ❌ HARD BLOCKS (Phát hiện = Block ngay)

❌ Hardcoded password, API key, token trong source code → `grep_search "secret=|password=|Bearer"`
❌ HTTP (không có S) cho production API calls → Enforce HTTPS/TLS
❌ SQL query dùng string concatenation → SQL Injection risk → REJECT
❌ User input được `eval()` hoặc `exec()` trực tiếp → Remote Code Execution risk

## ✅ SAFE PATTERNS

✅ Secrets qua environment variables hoặc Secret Manager
✅ Parameterized queries cho SQL
✅ Content Security Policy headers cho web endpoints
✅ Input validation với whitelist approach (không phải blacklist)

---

## 🔍 Scanning Protocol (SECURITY Agent phải chạy)

```bash
# Scan cho hardcoded secrets
grep -r "password=\|secret=\|api_key=\|Bearer " src/

# Scan cho dangerous functions  
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
> **"Bảo mật là quá trình liên tục — không phải checkbox một lần."**
