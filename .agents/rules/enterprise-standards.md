---
trigger: always_on
rule_id: enterprise-standards-001
---

# 🏢 Enterprise Standards: Tiêu chuẩn hệ thống quy mô lớn

Quy tắc này áp dụng cho các dự án phức tạp, có nhiều module/microservices và yêu cầu tính bảo trì cao.

---

## 🏗️ 1. Cấu trúc Module & Microservices
- **KISS & SoC**: Tách biệt logic theo Business Domain (Domain-driven Design - DDD).
- **Communication**: Sử dụng Interface/API Contract rõ ràng giữa các service. Ưu tiên JSON gRPC/REST.
- **Independence**: Mỗi service phải có khả năng chạy và test độc lập.

---

## 🌐 2. Quản lý API (API Governance)
- **Versioning**: Bắt buộc có Version trong URL (VD: `/api/v1/users`). 
- **Backward Compatibility**: Tuyệt đối không thay đổi schema mà không có thông báo hoặc hỗ trợ phiên bản cũ (v1, v2).
- **Status Codes**: Tuân thủ chuẩn HTTP Status Codes (200, 201, 400, 401, 403, 404, 500).

---

## 📜 3. Chuẩn Log & Quan sát (Logging & Observability)
- **JSON Logging**: Log phải được xuất ra định dạng JSON để dễ dàng tập trung về ELK/CloudWatch.
- **Correlation ID**: Mọi Request phải có `Trace_ID` để truy vết qua nhiều service.
- **Sensitive Data**: Tuyệt đối không lưu log các trường dữ liệu nhạy cảm (Password, Credit Card, PII).

---

## ✅ Agent Checklist (Bắt buộc cho SA & LEADER)
- [ ] Logic nghiệp vụ có bị chồng chéo giữa các service không?
- [ ] API mới có làm hỏng các Client cũ đang sử dụng Version cũ không?
- [ ] Log có đủ thông tin để debug mà không vi phạm bảo mật không?
- [ ] Toàn bộ hạ tầng có được quản lý bằng Code (IaC) không?
