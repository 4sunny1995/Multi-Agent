---
rule_id: BUDGET-001
trigger: always_on
applies_to: [OPS, SA, LEADER]
version: "2.0-llm"
---

# 📊 Hạ Tầng & Dự Toán Chi Phí (Cloud Budgeting)

<identity>
Quy tắc quản lý chi phí linh hoạt (FinOps) dựa trên lưu lượng thực tế, đảm bảo hiệu quả đầu tư hạ tầng cao nhất.
</identity>

<activation>
Kích hoạt khi lập kế hoạch hạ tầng, dự toán chi phí hàng tháng/năm, hoặc khi đề xuất scaling.
</activation>

<thinking_pattern>
1. Quy mô traffic hiện tại và dự kiến là bao nhiêu?
2. Dịch vụ serverless có rẻ hơn instance cố định không?
3. Đã có cảnh báo chi phí (Alert) chưa?
</thinking_pattern>

<guidelines>

### 1. Phân Loại Quy Mô Truy Cập (Traffic Tiers)
- **Low Traffic (Ít)**: < 1.000 requests/ngày (MVP/Dev). Ưu tiên Serverless $0.
- **Medium Traffic (Vừa)**: 1.000 - 50.000 requests/ngày (Growth). Cân nhắc Auto-scaling.
- **High Traffic (Nhiều)**: > 50.000 requests/ngày (Scale). Sử dụng Reserved Instances/Spot Instances.

### 2. Công Thức Ước Tính Chi Phí (Calculation Formula)
- **Daily (Ngày)**: Tài nguyên thực tế + API calls.
- **Monthly (Tháng)**: (Daily x 30) + Phí cố định (Domain, SSL, Storage).
- **Yearly (Năm)**: (Monthly x 12) - Chiết khấu thanh toán trước.

### 3. Các Thành Phần Chi Phí Bắt Buộc (Cost Components)
- **Compute**: CPU/RAM (Lambda, EC2, Cloud Run).
- **Storage**: Database (R/W units) + File Storage (S3).
- **Egress**: Chi phí băng thông truyền tải dữ liệu ra ngoài.
- **AI/Third-party**: Token dự kiến (Gemini/OpenAI).

</guidelines>

<anti_patterns>
❌ Sử dụng Dedicated Instances cho môi trường Dev/Staging có traffic thấp.
❌ Thiếu dự toán chi phí băng thông (Egress) - dẫn đến chi phí phát sinh bất ngờ.
❌ Không thiết lập Billing Alerts.
❌ Bỏ qua chi phí lưu trữ tích lũy (Storage retention policies).
</anti_patterns>

<checklist>
- [ ] Đã chia kịch bản Traffic theo 3 cấp độ chưa?
- [ ] Báo cáo đã trình bày rõ chi phí theo Ngày/Tháng/Năm chưa?
- [ ] Đã đề xuất phương án Serverless cho giai đoạn MVP chưa?
- [ ] Đã gắn nhãn **[COST_EFFICIENCY_ALERT]** cho các phương án rẻ hơn 20% chưa?
</checklist>

---
> [!TIP]
> **"Tối ưu hóa chi phí không phải là cắt giảm, mà là chi tiêu thông minh để đạt hiệu năng tối đa."**