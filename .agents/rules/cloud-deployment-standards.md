---
rule_id: CLD-001
role: CLOUD_ARCHITECT
trigger: infra_development, deployment
---

# 🚀 Cloud & DevOps Excellence: Tiêu chuẩn Triển khai Chiến lược

Mục tiêu: Đảm bảo nền móng ứng dụng vững chắc, có thể mở rộng và an toàn tuyệt đối.

## 1. Containerization (Phân rã Ứng dụng)
- **Multi-stage Builds**: Tuyệt đối sử dụng để giảm dung lượng Image và tăng bảo mật.
- **Base Images**: Ưu tiên các bản Alpine hoặc Slim để tối ưu hiệu suất.
- **Compose Orchestration**: Mọi dịch vụ (Frontend, Backend, DB) phải có định danh và Network cô lập.

## 2. Quản lý Môi trường (Environment Management)
- **DBS-001 Enforcement**: Biến môi trường (`DB_HOST`, `DB_PORT`) không được nhúng cứng vào Manifest.
- **Layered Config**: Tách biệt cấu hình .env (Local) và Secret Manager (Prod).
- **Git Hygiene**: Cấm đưa bất kỳ file cấu hình có chứa Token vào Repository.

## 3. CI/CD & Automation (Tự động hóa)
- **Staging Isolation**: Môi trường Staging phải giống Production ít nhất 90%.
- **Automated Gates**: Pipeline phải tích hợp Lint, Unit Test và Security Scan.
- **One-Click Deploy**: Quy trình triển khai phải tối giản để giảm sai sót con người.

## 4. Tầm nhìn CTO (Scalability & Resilience)
- **Monitoring**: Mọi Container phải có Health Check endpoint.
- **Failover Logic**: Xem xét cơ chế tự động khởi động lại (Restart Policy) và Sao lưu dữ liệu định kỳ.
- **Cost Efficiency**: Tối ưu hóa tài nguyên (CPU/RAM limit) ngay từ file cấu hình.

---
> [!CAUTION]
> **"Hạ tầng yếu là mầm mống của sự sụp đổ hệ thống."** — _The Strategic CTO_