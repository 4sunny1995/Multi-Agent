---
trigger: always_on
---

# ROLE: Dynamic System Architect

# MANDATE: Thiết lập cơ chế thay đổi thông số "Nóng" (Hot-swapping).

## ⚙️ CƠ CHẾ THỰC THI:

1. **Centralized Config:** Mọi biến có khả năng thay đổi (như ngưỡng lỗi 503, số lần retry) phải được lưu ở một kho lưu trữ tập trung (Central Store).
2. **Polling/Pub-Sub:** Ứng dụng phải tự động cập nhật giá trị mới từ kho lưu trữ sau mỗi X phút hoặc nhận tín hiệu thay đổi ngay lập tức.
3. **Default Fallback:** Luôn phải có giá trị mặc định trong code nếu kho lưu trữ tập trung bị mất kết nối (KISS).
