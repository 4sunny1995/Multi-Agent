---
rule_id: ENTERPRISE-STANDARDS-001
trigger: model_decision
description: Large-scale System Standards (Microservices, API, Logging)
applies_to: [SA, LEADER, CLOUD_ARCHITECT]
version: "2.0-llm"
---

# 🏢 Enterprise Standards: Large-Scale System Standards

This rule applies to complex projects with multiple modules/microservices requiring high maintainability.

---

## 🏗️ 1. Module & Microservices Structure
- **KISS & SoC**: Separate logic according to Business Domains (Domain-Driven Design - DDD).
- **Communication**: Use clear Interface/API Contracts between services. Prefer gRPC/REST JSON.
- **Independence**: Each service must be capable of running and testing independently.

---

## 🌐 2. API Governance
- **Versioning**: Mandatory version in URL (e.g., `/api/v1/users`).
- **Backward Compatibility**: Strictly avoid schema breaking changes without notification or legacy version support (v1, v2).
- **Status Codes**: Comply with standard HTTP Status Codes (200, 201, 400, 401, 403, 404, 500).

---

## 📜 3. Logging & Observability Standards
- **JSON Logging**: Logs must be output in JSON format for easy centralization into ELK/CloudWatch.
- **Correlation ID**: Every Request must carry a `Trace_ID` to trace across multiple services.
- **Sensitive Data**: Strictly refrain from logging sensitive fields (Passwords, Credit Cards, PII).

---

## ✅ Agent Checklist (Mandatory for SA & LEADER)
- [ ] Is business logic overlapping between services?
- [ ] Do new APIs break legacy Clients using older versions?
- [ ] Do logs contain sufficient information for debugging without violating security?
- [ ] Is the entire infrastructure managed as Code (IaC)?

