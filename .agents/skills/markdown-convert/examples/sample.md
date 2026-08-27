# Deployment and Operations Guide - V4 Legacy Project

> **Summary**
> Hướng dẫn triển khai và vận hành hệ thống V4 Legacy Project.

---
**Status:** Approved  
**Version:** v1.0  
**Owner:** DevOps Team  

## Kiến trúc hệ thống
- Tài liệu kiến trúc: [System Architecture Diagram (HTML)](file:///home/rcvn/workspaces/5needs/v4legacy/docs/architecture.html)
- Cấu hình hạ tầng: `file:///home/rcvn/workspaces/5needs/v4legacy/config/prod.json`

## Danh sách công việc
- [x] Thiết lập CI/CD pipeline
- [ ] Cấu hình monitoring alert
- [ ] Audit bảo mật hệ thống

## Bảng thông số dịch vụ

| Service | Port | Protocol | Status |
| :--- | :--- | :--- | :--- |
| API Gateway | 8080 | HTTP/REST | Active |
| Auth Service | 8081 | gRPC | Active |
| Database | 5432 | TCP/PostgreSQL | Active |

## Hướng dẫn triển khai

```bash
# Cài đặt dependencies
npm install --production

# Khởi chạy dịch vụ
npm start
```

> [!IMPORTANT]
> Luôn sao lưu dữ liệu trước khi chạy migration script.
