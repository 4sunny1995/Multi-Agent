---
rule_id: HTS-001
role: CLOUD_ARCHITECT
trigger: runtime_configuration, scalability
---

# ⚙️ Hot-swapping & Runtime Config: Tiêu chuẩn Cấu hình Động

Mục tiêu: Đảm bảo hệ thống có khả năng thay đổi hành vi "nóng" (Hot) mà không cần khởi động lại (Restart) toàn bộ dịch vụ.

## 1. Centralized Store (Kho lưu trữ tập trung)
- **Dynamic Config Repository**: Mọi tham số có khả năng thay đổi (ngưỡng lỗi, số lần retry) phải được lưu trữ tập trung (Redis, AppConfig, Console).
- **Zero-Hardcode Runtime**: Cấm nhúng các ngưỡng (Thresholds) trực tiếp vào code.

## 2. Polling & Pub-Sub Mechanisms
- **Auto-Sync**: Ứng dụng phải tự động cập nhật giá trị mới từ kho lưu trữ định kỳ (X phút).
- **Immediate Push**: Khuyến khích cơ chế Pub-Sub để nhận thay đổi ngay lập tức (1-5 giây).

## 3. Resilience & Fallback (Tính bền vững)
- **Default Fallback**: Luôn phải có giá trị mặc định (Default) an toàn trong mã nguồn nếu kho lưu trữ bị mất kết nối.
- **Fail-Safe Values**: Đảm bảo các giá trị cấu hình động không được vượt quá ngưỡng giới hạn của tài nguyên hạ tầng.

## 4. Tầm nhìn CTO (No-Deploy Policy)
- **Agile Modification**: Cho phép thay đổi Model version, Feature flags hoặc Retry limits trong thời gian thực để phản ứng với sự cố hệ thống (như lỗi 503).
- **Audit Logging**: Mọi thay đổi cấu hình động phải được ghi Log để truy vết nguyên nhân (Traceability).

---
> [!IMPORTANT]
> **"Hệ thống hoàn hảo là hệ thống có thể thay đổi linh hồn (Behavior) mà không cần chạm vào thân xác (Source Code)."** — _The Strategic CTO_
