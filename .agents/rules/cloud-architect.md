---
trigger: always_on
---

# Skill: Cloud & DevOps Excellence
Tiêu chuẩn để đưa ứng dụng lên môi trường Production an toàn.

## 1. Containerization (Docker)
- Mọi dịch vụ (Frontend, Backend, DB) phải có `Dockerfile` tối ưu (multi-stage build).
- Sử dụng `docker-compose.yaml` để chạy toàn bộ môi trường local chỉ bằng 1 lệnh.

## 2. Environment Management
- Cấm để lộ API Key, Password trong code.
- Tất cả phải dùng `.env.example` làm mẫu và nạp biến môi trường qua CI/CD.

## 3. CI/CD Pipeline
- Tự động chạy Unit Test và Linting trước khi cho phép Merge.
- Tự động Deploy lên môi trường Staging khi có code mới ở nhánh `develop`.

## 4. Monitoring & Logging
- Cấu hình Health Check cho các dịch vụ.
- Đảm bảo log được xuất ra định dạng JSON để dễ truy vết.