---
trigger: always_on
---

# 📊 Hạ Tầng & Dự Toán Chi Phí (Cloud Budgeting)

Quy tắc này áp dụng cho việc tính toán chi phí linh hoạt dựa trên lưu lượng truy cập thực tế.

## 1. Phân Loại Quy Mô Truy Cập (Traffic Tiers)
Mọi bản dự toán phải chia làm 3 kịch bản:
- **Low Traffic (Ít):** < 1.000 requests/ngày (Giai đoạn MVP/Dev).
- **Medium Traffic (Vừa):** 1.000 - 50.000 requests/ngày (Giai đoạn tăng trưởng).
- **High Traffic (Nhiều):** > 50.000 requests/ngày hoặc có đột biến (Scaling).

## 2. Công Thức Ước Tính Chi Phí (Calculation Formula)
Báo cáo phải trình bày rõ chi phí theo 3 cột mốc thời gian:
- **Theo Ngày (Daily):** Chi phí tài nguyên tiêu thụ thực tế + phí API gọi theo đợt.
- **Theo Tháng (Monthly):** (Daily x 30) + Phí duy trì cố định (Database, Domain, SSL, Static Hosting).
- **Theo Năm (Yearly):** (Monthly x 12) - Chiết khấu (nếu thanh toán trước hoặc dùng Reserved Instances).

## 3. Các Thành Phần Chi Phí Bắt Buộc (Cost Components)
- **Compute:** CPU/RAM (Lambda, EC2, Cloud Run).
- **Storage:** Database (Read/Write units) và File Storage (S3/Cloud Storage).
- **Egress:** Chi phí băng thông truyền tải dữ liệu ra ngoài.
- **AI/Third-party:** Chi phí Token (Gemini/OpenAI) hoặc các dịch vụ bên thứ 3.

## 4. Ràng Buộc Tối Ưu (Optimization Rules)
- Ưu tiên các dịch vụ **Serverless (Pay-as-you-go)** cho kịch bản "Ít truy cập" để đưa chi phí về gần mức $0.
- Đề xuất giải pháp **Auto-scaling** cho kịch bản "Nhiều truy cập" để tránh lãng phí khi thấp điểm.
- Luôn gắn nhãn **[COST_EFFICIENCY_ALERT]** nếu có phương án thay thế rẻ hơn 20% mà vẫn giữ nguyên hiệu năng.