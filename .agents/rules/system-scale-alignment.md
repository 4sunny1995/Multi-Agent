---
rule_id: SSA-001
trigger: model_decision
description: Chiến lược Thích ứng Quy mô (S/M/L) tránh phân rã quá mức
applies_to: [LEADER, SA, BA, DEV]
version: "1.0-llm"
---

# 🚀 System Scale Alignment (SSA-001): Chiến lược Thích ứng Quy mô

<identity>
Mục tiêu: Đảm bảo AI Team luôn đưa ra giải pháp kỹ thuật "đúng tầm" với giai đoạn phát triển của dự án, tránh lãng phí tài nguyên (Over-engineering) hoặc rủi ro vận hành (Under-engineering).
</identity>

<activation>
Kích hoạt khi:
1. Bắt đầu một dự án mới (`/dev`).
2. Thực hiện thiết kế kiến trúc (`SA`).
3. Khi nhận thấy mã nguồn/hạ tầng bắt đầu quá tải so với thiết kế ban đầu (`[SCALE_UP_ALERT]`).
</activation>

<thinking_pattern>
1. Dự án này đang ở giai đoạn nào (MVP, Growth, hay Enterprise)?
2. Chi phí/Thời gian (Speed) hay Độ ổn định (Stability) là ưu tiên số 1 hiện tại?
3. Giải pháp này có cản trở việc nâng cấp (Scale-up) trong tương lai không?
</thinking_pattern>

<guidelines>

### 🟢 1. Cấp độ NHỎ (Small / MVP)
- **Ưu tiên**: Tốc độ (Speed) & Chi phí thấp (Cost).
- **Hành động**:
    - Kiến trúc: Monolith hoặc Simple Separation of Concerns (SoC).
    - Database: Single DB instance, simple schema.
    - Deployment: Docker Compose, GitHub Actions cơ bản.
    - **Lesson**: "Chạy trước, tối ưu sau. Đừng dùng Kubernetes cho một trang Landing Page."

### 🟡 2. Cấp độ VỪA (Medium / Growth)
- **Ưu tiên**: Tính linh hoạt (Flexibility) & Hiệu năng (Performance).
- **Hành động**:
    - Kiến trúc: Modular Monolith hoặc Microservices đơn giản.
    - Database: Read/Write Split, Indexing chuyên sâu.
    - Deployment: CI/CD Pipeline đầy đủ, Staging Environment.
    - **Lesson**: "Nợ kỹ thuật bắt đầu phải trả lãi. Hãy thực hiện SOLID và TDD nghiêm ngặt."

### 🔴 3. Cấp độ LỚN (Large / Enterprise)
- **Ưu tiên**: Sự ổn định (Stability), Bảo mật (Security) & Quy trình (Governance).
- **Hành động**:
    - Kiến trúc: Distributed Microservices, Event-driven.
    - Database: Distributed DB, Strict Migration (DBS-001).
    - Deployment: Kubernetes, Multi-region, High Security Gates (SHS-001).
    - **Lesson**: "Sự phức tạp là kẻ thù của vận hành. Báo cáo (TRS-001) và Giám sát là sống còn."

</guidelines>

<anti_patterns>
❌ **Over-engineering**: Áp dụng Microservices cho dự án < 1000 users/ngày.
❌ **Under-engineering**: Dùng chung 1 DB password cho toàn bộ hệ thống ngân hàng lớn.
❌ **Scale-Mismatch**: Bỏ qua Unit Test ở giai đoạn Enterprise để lấy tốc độ.
</anti_patterns>

<checklist>
- [ ] Đã xác định đúng quy mô (Traffic/Data/Team size) chưa?
- [ ] Giải pháp có cho phép Rollback/Recover không?
- [ ] [SCALE_UP_ALERT]: Hệ thống hiện tại có cần chuyển đổi sang cấp độ cao hơn không?
</checklist>

---
> [!IMPORTANT]
> **"Xây nhà cấp 4 đừng đổ móng tòa nhà 80 tầng, nhưng xây tòa nhà 80 tầng đừng dùng gạch xây nhà cấp 4."**
