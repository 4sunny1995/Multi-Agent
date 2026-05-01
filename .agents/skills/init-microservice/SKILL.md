---
name: ags-skill-init-microservice
description: Khởi tạo dự án Microservices với tính tự trị cao, hỗ trợ đa Agent chạy song song.
tags: [microservices, architecture, init, orchestration, parallel-agents]
---

# 🚀 AGS-SKILL-INIT-MICROSERVICE: Khởi Tạo Hệ Thống Đa Dịch Vụ

<identity>
System Architect, chuyên gia về tính cô lập (Isolation) và khả năng mở rộng (Scalability). Ưu tiên thiết kế để nhiều AI Agent có thể làm việc độc lập.
</identity>

<thinking_pattern>
1. **Isolation First**: Service này có thể chạy mà không cần Service kia không? Nếu không, hãy dùng Mock.
2. **Conflict Prevention**: Dải Port này đã có Agent nào dùng chưa? Tên Database có bị trùng không? Kiểm tra cấu trúc thư mục hiện tại để đảm bảo tên service là DUY NHẤT.
3. **Contract-Driven**: Luôn sử dụng `.proto` từ resources để làm "nguồn sự thật" (Source of Truth) cho giao tiếp.
4. **Template Reuse**: Ưu tiên sử dụng code từ `resources/node-template` hoặc `resources/python-template` để giữ tính đồng bộ.
5. **Observability**: Làm sao để biết Service này hỏng khi có 10 Agent khác đang spam log?
</thinking_pattern>

<guidelines>
- **Port Management**: Bắt buộc đăng ký Port trong `.agents/config/port-registry.json` (nếu có) để tránh xung đột.
- **Environment Isolation**: Mỗi service phải có file `.env.example` riêng biệt và Dockerfile riêng.
- **Naming Convention**: Resource name = `{project_name}_{service_name}_{env}`.
- **Proto Sync**: Khi khởi tạo service, PHẢI sao chép tệp `.proto` từ `resources/proto/` sang `{{service_name}}/src/proto/`.
- **API Documentation**: Mọi endpoint mới phải được cập nhật vào API Documents (Swagger/Redoc hoặc Markdown).
- **Parallel Safety**: Tuyệt đối không ghi đè vào các folder service khác đang tồn tại.
</guidelines>

<check_list_quality>
- [ ] Service name là duy nhất trong toàn bộ project?
- [ ] Đã sao chép `.proto` vào thư mục `src/proto/` của service?
- [ ] Code triển khai khớp với ngôn ngữ được yêu cầu (Node/Python)?
- [ ] API Documents đã liệt kê đầy đủ các endpoint?
- [ ] Health-check endpoint (/health) đã hoạt động?
</check_list_quality>

<action_protocol>
1. **Discovery & Uniqueness**: Quét toàn bộ thư mục root. Nếu `{{service_name}}` đã tồn tại, báo lỗi và dừng lại.
2. **Scaffolding from Template**: 
   - Nếu là Node: Copy nội dung từ `resources/node-template`.
   - Nếu là Python: Copy nội dung từ `resources/python-template`.
   - Thay thế các placeholder `{{service_name}}` bằng tên thực tế.
3. **Proto Injection**: Tạo thư mục `{{service_name}}/src/proto/` và copy toàn bộ tệp từ `resources/proto/` vào đó.
4. **Code Implementation**: Triển khai logic code theo ngôn ngữ đã chọn, đảm bảo tuân thủ các phương thức định nghĩa trong `.proto`.
5. **Communication Setup**: Thiết lập giao tiếp (gRPC/REST) dựa trên Contract đã copy.
6. **API Documentation**: Tạo/Cập nhật tài liệu API chi tiết cho service.
7. **Agent Handoff**: Để lại Signature và hướng dẫn để Agent tiếp theo có thể vào code ngay.
</action_protocol>

---
> [!IMPORTANT]
> **"Microservices không phải là chia nhỏ file, mà là chia nhỏ trách nhiệm và sự phụ thuộc. Contract (Proto) là sợi dây liên kết duy nhất."**

@ArchitectAgent - Updated with Templates & Proto - 2026-04-28
