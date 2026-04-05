# 🏗️ Workflow: Thiết Lập Hạ Tầng (/infra)

Quy trình chuẩn hóa để xây dựng nền tảng (Base) cho ứng dụng trước khi triển khai Code.

## 1. INFRASTRUCTURE DESIGN (SA)
- **Hành động**: Thiết kế Topology mạng, Load balancer và tài nguyên cần thiết.
- **Bàn giao**: Diagram thiết kế trong `docs/original/architecture/infra-design.md`.

## 2. IaC IMPLEMENTATION (CLOUD ARCHITECT)
- **Hành động**: Viết mã nguồn hạ tầng (Dockerfile, Docker-compose, Terraform, Helm v.v.).
- **Bàn giao**: Tệp cấu hình hạ tầng trong dự án.

## 3. ENV PROVISIONING (DEV)
- **Hành động**: Cấu hình các biến môi trường (`.env.example`) và Scripts khởi chạy.
- **Bàn giao**: Hướng dẫn Setup cục bộ (Local).

## 4. HEALTH CHECK & AUDIT (LEADER)
- **Hành động**: Xác nhận môi trường đã sẵn sàng và an toàn cho Deployment.
- **Kết xuất**: `walkthrough.md`.
