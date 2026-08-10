---
workflow_id: INF-001
description: Strategic infrastructure (IaC) and operational environment setup workflow.
role_lead: CLOUD_ARCHITECT
triggers: ["/infra", "infrastructure", "docker", "deploy", "CI/CD", "kubernetes", "container"]
version: "2.0"
---

# 🏗️ Workflow: Strategic Infrastructure Setup (/infra)

> **Golden Rule**: This workflow must finish before any line of code is shipped to higher environments.

## ⚡ Execution Flow

```
CLOUD ARCH (Discovery) → OPS (Cost) → CLOUD ARCH (IaC) → SECURITY (Scan) → CLOUD ARCH (Provision)
```

---

## 1. DISCOVERY — Current State Survey (CLOUD ARCHITECT)
// turbo
- **Action**: Run `list_dir` to inspect Dockerfile, `docker-compose.yml`, `.env*`, `*.yaml`.
- **Verify with SA**: Does Implementation Plan align with existing infra?
- **Output**: Infra Assessment — new vs existing, conflicts list.

## 2. COST PLANNING (OPS / FIN-OPS)
- **Action**: Prepare Low/Medium/High traffic budget estimate. Compare at least 2 cloud providers.
- **PO Approval Gate**: Submit `docs/original/budget/cloud_cost_estimate.md` for User review prior to procurement.
- **Output**: Approved budget allocation.

## 3. IaC DESIGN (CLOUD ARCHITECT)
- **Action**: Write multi-stage Dockerfile, docker-compose, CI/CD pipeline.
- **Zero-secrets rule**: All credentials referenced via environment variables. Absolutely zero hardcoded secrets.
- **Health checks**: Every service must feature `HEALTHCHECK` or readiness probe.
- **Output**: IaC files located at project root + `.github/workflows/`.

## 4. SECURITY SCAN (SECURITY)
- **Action**: Run `grep_search` across IaC files for secrets, plain-text passwords, exposed ports.
- **Block condition**: Hardcoded credential detected → Block step 5, demand fix.
- **Output**: Security sign-off or Block report.

## 5. PROVISION & HEALTH CHECK (CLOUD ARCHITECT)
- **Action**: Launch services. Verify health checks pass. Document rollback command.
- **DBS-001**: Backup DB snapshot prior to provisioning production.
- **Output**: `docs/original/architecture/infra-discovery.md` — Live environment status.

---

## 🚨 Failure Points

1. Creating new Dockerfiles when existing ones already exist → **Solution**: Mandatory Discovery in step 1.
2. Deploying without a rollback plan → **Solution**: Rollback commands must be documented before Provisioning.
3. Secrets leaking into IaC → **Solution**: SECURITY blocks step 5 completely until resolved.
