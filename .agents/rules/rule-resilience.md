---
trigger: always_on
---

# 📜 GOVERNANCE RULE: TÍNH SẴN SÀNG VÀ TỰ PHỤC HỒI (RESILIENCE)

Mục tiêu: Triệt tiêu tình trạng hệ thống bị treo hoặc trả về lỗi thô (Raw Error) cho người dùng cuối khi gặp sự cố hạ tầng.

---

## 1. Cơ chế Retry bắt buộc (Mandatory Retry)

- **Điều kiện:** Khi nhận mã lỗi `HTTP 502, 503, 504` hoặc lỗi gRPC `UNAVAILABLE`.
- **Hành động:** \* Phải phân tích `RetryInfo` trong Metadata của lỗi.
  - Nếu có `retryDelay`, phải tuân thủ đúng thời gian chờ trước khi thử lại.
  - Tối đa: **3 lần thử lại**.

## 2. Chiến lược dự phòng (Liskov Fallback Strategy)

- **Quy tắc:** Mọi Agent khi gọi Model cấp cao (High-tier) phải có một Model dự phòng (Low-tier) được cấu hình sẵn.
- **Điều kiện kích hoạt:** Sau 3 lần Retry thất bại hoặc khi nhận lỗi `MODEL_CAPACITY_EXHAUSTED`.
- **Tính nhất quán:** Model dự phòng phải trả về cấu hình dữ liệu (Schema) **y hệt** Model chính để không làm hỏng logic của các Agent tiếp theo trong luồng (Pipeline).

## 3. Nhật ký vết (Traceability & Observability)

- Mọi lỗi hệ thống phải được ghi lại kèm theo:
  - `Trajectory ID` và `Trace ID`.
  - Tình trạng tài nguyên tại thời điểm lỗi.
- **Leader Agent** có quyền tạm dừng (Pause) Pipeline nếu phát hiện tỷ lệ lỗi hệ thống vượt quá ngưỡng 10% trong vòng 5 phút.

## 4. Giao tiếp ngoại vi (User Interface Graceful Degradation)

- Tuyệt đối không hiển thị JSON Error thô (như TraceID: 0x5702...) cho người dùng.
- Hệ thống phải chuyển hướng sang trạng thái "Xử lý ưu tiên" hoặc "Chế độ bảo trì nhẹ" trong khi tự động fix bug ngầm.

---

## 🚦 Chốt chặn chất lượng (The Gatekeeper's Final Word)

"Một hệ thống hoàn hảo không phải là hệ thống không bao giờ lỗi, mà là hệ thống biết cách tự đứng dậy mà người dùng không hề hay biết."
