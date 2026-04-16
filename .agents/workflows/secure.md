---
workflow_id: SEC-001
description: Quy trình cường hóa hệ thống và rà soát bảo mật chiến lược.
role_lead: SECURITY
triggers: ["/secure", "bảo mật", "security", "hardening", "penetration", "vulnerability", "secret leak"]
version: "2.0"
---

# 🛡️ Workflow: Cường Hóa Hệ Thống (/secure)

> **Zero-Trust Mindset**: Không tin bất kỳ input nào từ bên ngoài cho đến khi được sanitize và verified.

## ⚡ Luồng thực thi

```
SECURITY (Discovery) → SECURITY+SA (Risk) → SA (Hardening) → TESTER (PenTest) → LEADER (Certify)
```

---

## 1. PREDICTIVE DISCOVERY & SEC-SCAN (SECURITY)
// turbo
- **Hành động 1 (Static Analysis)**: `grep_search` toàn bộ repo tìm: `password=`, `secret=`, `AIza`, `Bearer`, `api_key`. Check ports `docker-compose`.
- **Hành động 2 (Predictive 24/7 Dependencies)**: Tự động phân tích hệ sinh thái dự án (Node/Python/Go) để áp dụng quét thư viện (Dependencies). Agent sẽ quyết định công cụ tương ứng (như `npm audit`, `pip-audit`, Trivy, Dependabot) để dò tìm CVE chưa phát nổ.
- **Output**: Raw findings list với file:line + Báo cáo các cấu phần có rủi ro phụ thuộc (Dependency risks).

## 2. ATTACK SURFACE ANALYSIS (SECURITY + SA)
- **Hành động**: Phân tích kiến trúc — entry points, trust boundaries, auth flows.
- **STRIDE model**: Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation.
- **Output**: `docs/original/testing/security-reports.md` — Risk matrix (Critical/High/Medium/Low).

## 3. HARDENING IMPLEMENTATION (SA + CLOUD ARCH)
- **SA**: Thiết kế encryption at rest + in transit, RBAC model.
- **CLOUD ARCH**: Enforce HTTPS, firewall rules, least-privilege IAM.
- **DBS-001**: Snapshot DB trước khi apply bất kỳ security constraint nào.
- **Output**: Updated architecture + IaC with security controls.

## 4. PENETRATION TEST (TESTER)
- **Hành động**: Simulate: Auth bypass, SQL Injection, XSS, CSRF, Mass Assignment.
- **Tool**: `run_command` với scanner hoặc manual test scripts.
- **Block condition**: Phát hiện Critical vulnerability → Block bước 5, yêu cầu fix.
- **Output**: Pentest report + Remediation list.

## 5. SECURITY CERTIFICATE (LEADER)
- **Hành động**: Verify tất cả Critical/High đã được close. `grep_search` lần cuối cho secrets.
- **Output**: "Secure-Ready" certificate trong `walkthrough.md` + CI/CD secret-scan integration.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. Secret leak qua git history → **Giải pháp**: Revoke key + `git filter-branch` + force push.
2. PenTest skip → **Giải pháp**: LEADER không certify nếu không có pentest report.
3. Hardening gây outage → **Giải pháp**: DBS-001 snapshot + rollback command bắt buộc trước.
