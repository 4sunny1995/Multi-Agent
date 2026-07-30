---
workflow_id: INF-001
description: Quy trình thiết lập hạ tầng (IaC) và môi trường vận hành chiến lược.
role_lead: CLOUD_ARCHITECT
triggers: ["/infra", "hạ tầng", "docker", "deploy", "CI/CD", "kubernetes", "container"]
version: "2.0"
---

# 🏗️ Workflow: Thiết Lập Hạ Tầng Chiến Lược (/infra)

> **Quy tắc vàng**: Workflow này phải hoàn thành trước khi bất kỳ dòng code nào được ship lên môi trường cao hơn.

## ⚡ Luồng thực thi

```
CLOUD ARCH (Discovery) → OPS (Cost) → CLOUD ARCH (IaC) → SECURITY (Scan) → CLOUD ARCH (Provision)
```

---

## 1. DISCOVERY — Khảo sát Nguyên trạng (CLOUD ARCHITECT)
// turbo
- **Hành động**: `list_dir` tìm Dockerfile, `docker-compose.yml`, `.env*`, `*.yaml`.
- **Xác nhận với SA**: Implementation Plan có khớp với infra hiện có không?
- **Output**: Infra Assessment — new vs existing, conflicts list.

## 2. COST PLANNING (OPS / FIND-OPS)
- **Hành động**: Lập bảng chi phí Low/Medium/High traffic. So sánh ít nhất 2 provider.
- **PO Approval Gate**: Gửi `docs/budget/cloud_cost_estimate.md` cho User duyệt trước khi mua.
- **Output**: Phê duyệt ngân sách.

## 3. IaC DESIGN (CLOUD ARCHITECT)
- **Hành động**: Viết Dockerfile (multi-stage), docker-compose, CI/CD pipeline.
- **Zero-secrets rule**: Mọi credential qua env reference. Không hardcode bất cứ thứ gì.
- **Health checks**: Mọi service có `HEALTHCHECK` hoặc readiness probe.
- **Output**: IaC files tại project root + `.github/workflows/`.

## 4. SECURITY SCAN (SECURITY)
- **Hành động**: `grep_search` trong IaC files cho secrets, plain-text passwords, exposed ports.
- **Block condition**: Phát hiện hardcoded credential → Block step 5, yêu cầu fix.
- **Output**: Security sign-off hoặc Block report.

## 5. PROVISION & HEALTH CHECK (CLOUD ARCHITECT)
- **Hành động**: Khởi chạy services. Verify health checks pass. Document rollback command.
- **DBS-001**: Backup DB snapshot trước khi provision production.
- **Output**: `docs/architecture/infra-discovery.md` — Live environment status.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. Tạo Dockerfile mới mà đã có cái cũ → **Giải pháp**: Discovery bắt buộc ở bước 1.
2. Deploy mà không có rollback plan → **Giải pháp**: Rollback command phải được document trước khi Provision.
3. Secret lọt vào IaC → **Giải pháp**: SECURITY block toàn bộ step 5 cho đến khi fix sạch.
