---
workflow_id: INF-001
description: Quy trình thiết lập hạ tầng (IaC) và môi trường vận hành chiến lược.
role_lead: CLOUD_ARCHITECT
---

# 🏗️ Workflow: Thiết Lập Hạ Tầng Chiến Lược (/infra)

Quy trình chuẩn hóa để xây dựng nền tảng (Base) cho ứng dụng trước khi triển khai Code. Mọi bước đi đều phải tuân thủ **CTO Vision** và **DBS-001**.

## 🛠️ 1. Quy trình thực thi (Execution Steps)

1. **Khảo sát Nguyên trạng (Discovery - CLOUD ARCHITECT):**
   - **Hành động**: Kiểm tra hạ tầng hiện có (Docker, `.env`, `docker-compose.yaml`). 
   - **Handoff**: Xác nhận với **SA** về Implementation Plan để đảm bảo hạ tầng đồng bộ với kiến trúc.

2. **Dự toán Chi phí (Cost Planning - OPS):**
   - **Hành động**: Lập bảng so sánh chi phí Cloud (AWS vs GCP) cho kịch bản Low/High Traffic.
   - **Handoff**: Gửi **PO/User** duyệt bảng `docs/budget/cloud_cost_estimate.md` trước khi mua tài nguyên.

3. **Thiết kế & IaC (Infra Design - CLOUD ARCHITECT):**
   - **Hành động**: Viết tệp cấu hình hạ tầng (Dockerfile, Compose, YAML).
   - **Handoff**: Chuyển giao tệp `docker-compose.yaml` mẫu cho **DEV** để thiết lập môi trường Local.

4. **Kiểm soát & Bảo mật (Security Scan - SECURITY):**
   - **Hành động**: Quét secrets và lỗ hổng trong các file IaC vừa tạo.
   - **Handoff**: **Gatekeeper** xác nhận môi trường "Green" (An toàn) trong `walkthrough.md`.

5. **Kích hoạt Môi trường (Provisioning - CLOUD ARCHITECT):**
   - **Hành động**: Khởi chạy container/services và thiết lập Health Checks.
   - **Handoff**: Bàn giao môi trường sẵn sàng cho bước Deploy.

---

## 📂 2. Cấu trúc lưu trữ (Output Hierarchy)

- **Cấu hình hạ tầng**: Gốc dự án (Dockerfile, docker-compose.yaml)
- **Tài liệu dự toán**: `docs/budget/`
- **Tài liệu CI/CD**: `.github/workflows/`

---

## 🛡️ 3. Quy tắc nghiêm ngặt (Strict Rules)

- **Safety First (DBS-001)**: Cấm thay đổi Database Snapshot mà không có Clone/Backup.
- **Zero-Hardcode**: Toàn bộ secrets phải được nạp qua biến môi trường.
- **Independence**: Workflow này phải hoàn thành trước khi `/dev` bắt đầu bước gõ code (Step 3).

---

## 🚦 Chốt chặn chất lượng (Leader Review)

- **Scalability**: Hạ tầng có khả năng chịu tải 10k-50k request/ngày không?
- **Resilience**: Tín hiệu Health Check có phản hồi "Healthy" không?

---
> **Lệnh kích hoạt:** `/execute_workflow infra target="production-env" provider="AWS"`
