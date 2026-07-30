---
rule_id: CLD-001
trigger: always_on
applies_to: [CLOUD_ARCHITECT, SA, LEADER]
version: "2.0-llm"
---

# 🚀 Cloud & DevOps Excellence: Tiêu chuẩn Triển khai (CLD-001)

<identity>
Mục tiêu: Đảm bảo nền móng ứng dụng vững chắc, có thể mở rộng, an toàn và tự động hóa tuyệt đối.
</identity>

<activation>
Kích hoạt khi xây dựng Docker/Compose, Manifest, CI/CD Pipeline hoặc khi triển khai lên môi trường mới.
</activation>

<thinking_pattern>
1. Image này đã đủ nhỏ và an toàn chưa? (Alpine/Distroless).
2. Dữ liệu có được tách biệt khỏi container không? (Volumes).
3. Pipeline có đủ các chốt chặn (Lint, Test, Sec) chưa?
</thinking_pattern>

<guidelines>

### 1. Containerization (Phân rã Ứng dụng)
- **Multi-stage Builds**: Bắt buộc để giảm dung lượng Image và bề mặt tấn công.
- **Base Images**: Ưu tiên Alpine hoặc Slim. Tránh dùng tag `latest`.
- **Compose Orchestration**: Mọi dịch vụ phải có định danh và Network cô lập riêng.

### 2. Quản lý Môi trường (Environment Management)
- **DBS-001 Enforcement**: Tuyệt đối không nhúng cứng biến môi trường vào Manifest.
- **Layered Config**: Tách biệt `.env` (Local) và Secret Manager (Prod).
- **Git Hygiene**: Cấm commit file cấu hình có chứa Token/Secrets.

### 3. CI/CD & Automation (Tự động hóa)
- **Staging Isolation**: Môi trường Staging phải giống Production >= 90%.
- **Automated Gates**: Pipeline phải tích hợp Lint, Unit Test và Security Scan.
- **One-Click Deploy**: Quy trình triển khai tối giản, lặp lại và có thể rollback.

### 4. Tầm nhìn CTO (Scalability & Resilience)
- **Monitoring**: Mọi Container phải có Health Check endpoint.
- **Failover Logic**: Thiết lập Restart Policy và Sao lưu dữ liệu định kỳ.
- **Cost Efficiency**: Tối ưu tài nguyên (CPU/RAM limit) ngay từ manifest.

</guidelines>

<anti_patterns>
❌ Sử dụng bản build-time dependencies trong production stage của image.
❌ Chạy container với quyền `root`.
❌ Nhúng secrets trực tiếp vào Dockerfile hoặc manifest files.
❌ Triển khai production mà không qua môi trường staging.
</anti_patterns>

<checklist>
- [ ] Dockerfile đã dùng Multi-stage build chưa?
- [ ] Đã có Health Check cho mọi service chưa?
- [ ] Pipeline đã tích hợp Security Scan chưa?
- [ ] Đã thiết lập giới hạn tài nguyên (Resources Limit) chưa?
</checklist>

---
> [!CAUTION]
> **"Hạ tầng yếu là mầm mống của sự sụp đổ hệ thống. Hãy xây dựng nền móng vững chắc."**