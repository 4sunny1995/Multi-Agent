---
rule_id: INF-001
trigger: model_decision
description: Quy chuẩn Hạ tầng, Kiến trúc & Vận hành Cloud (Infra Detection, Cloud Ops, FinOps)
applies_to: [SA, CLOUD_ARCHITECT, LEADER]
version: "7.0-llm"
---

# 🏗️ Infrastructure & Cloud Operations Standards (INF-001)

<identity>
Quy chuẩn hợp nhất về nhận diện hạ tầng, thiết kế kiến trúc và vận hành Cloud.
Mục tiêu: Đảm bảo nền móng vững chắc, tối ưu chi phí (FinOps) và khả tự phục hồi.
</identity>

<activation>
Kích hoạt khi Agent khảo sát hệ thống, thiết kế IaC (Docker, Compose), hoặc triển khai Cloud.
</activation>

<thinking_pattern>
1. Hệ thống hiện tại là Greenfield hay Legacy? (Đọc STATE.md).
2. Docker Image có tối ưu (Slim/Alpine) và không lộ Secret không?
3. Phương án này tiêu tốn bao nhiêu ngân sách? Có Billing Alert chưa?
4. Có đảm bảo thay đổi sống (Hot-swap) và Fallback khi lỗi không?
</thinking_pattern>

<guidelines>
## 1. INFRASTRUCTURE DETECTION (Pre-flight)
- **Check Memory First**: BẮT BUỘC đọc `.agents/STATE.md` đầu tiên. Nếu có -> Dùng làm context và bỏ qua quét thủ công.
- **Manual Scan**: Nếu không có `STATE.md`, dùng `list_dir` tìm Dockerfile, `.env`, `SQL`, `migrations` để định hình hệ thống.
- **Action Mode**: Phân loại `[Initial Infrastructure]` (Dự án mới) hoặc `[Infrastructure Evolution]` (Dự án cũ).

## 2. CONTAINERIZATION & DEPLOYMENT
- **Multi-stage Builds**: Bắt buộc để tối ưu dung lượng Image và bảo mật.
- **Base Images**: Ưu tiên Alpine hoặc Slim. Tránh dùng tag `latest`.
- **Non-root User**: Cấm chạy ứng dụng bằng quyền `root` trong container.
- **Health Checks**: Mọi service phải có Endpoint kiểm tra sức khỏe (`/health`).

## 3. FINOPS & CLOUD BUDGET
- **Traffic Scaling**:
    - *Low (<1k req/day)*: Ưu tiên Serverless để tối ưu chi phí về ~$0.
    - *Medium/High*: Sử dụng Auto-scaling và Reserved Instances.
- **Billing Alerts**: Khai báo Alarms (CloudWatch/Budget) trực tiếp trong IaC code ở các ngưỡng 50%, 80%, 100%.

## 4. DYNAMIC CONFIG & HOT-SWAP
- **Centralized Store**: Runtime config (Feature flags, Thresholds) phải tách khỏi code, lưu tại Redis/AppConfig.
- **Zero-Restart Updates**: Thiết lập cơ chế cập nhật giá trị mới mà không cần restart container/app.
- **Fallback Resilience**: Luôn có giá trị mặc định an toàn trong mã nguồn nếu Centralized Store gặp sự cố.
</guidelines>

<anti_patterns>
❌ Ghi đè cấu hình cũ (`.env`, DB) mà không có đề xuất trong Plan.
❌ Build Image nhúng cứng Secret/Token vào lớp Dockerfile.
❌ Chạy Production mà không có Billing Alerts hoặc Health Checks.
❌ Restart ứng dụng chỉ để thay đổi một tham số cấu hình nhỏ.
</anti_patterns>

<checklist>
- [ ] Đã đọc `STATE.md` và xác định đúng Action Mode chưa?
- [ ] Dockerfile đã có Multi-stage build và Non-root user chưa?
- [ ] Đã thiết lập Billing Alerts và ngưỡng dự toán chi phí chưa?
- [ ] Có đảm bảo "Default Fallback" cho cấu hình động không?
</checklist>
