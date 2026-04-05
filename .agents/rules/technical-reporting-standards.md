---
rule_id: TRS-001
role: BA, SA, DEV
trigger: reporting, go_live, handoff
---

# 📊 Technical Reporting Standards: Quy chuẩn Báo cáo Kỹ thuật

Mục tiêu: Đảm bảo mọi báo cáo kỹ thuật (Technical Reports) đều chính xác, minh bạch và có khả năng kiểm chứng cao.

## 1. Cấu trúc Báo cáo Bắt buộc
Báo cáo kỹ thuật phải bao gồm các phần chính sau:
- **Project Overview**: Mục tiêu và phạm vi dự án.
- **Feature Catalog (BA)**: Danh sách các tính năng đã hoàn thành kèm Acceptance Criteria.
- **Architecture & Topology (SA)**: Sơ đồ kiến trúc, sơ đồ thực thể (ERD) và hạ tầng.
- **Implementation Highlights (DEV)**: Cấu trúc thư mục, Logic cốt lõi và các đoạn mã (Code Snippets) quan trọng.
- **Quality Assurance**: Trạng thái Unit Test và kết quả an toàn.

## 2. Tính Minh bạch & Kiểm chứng (Traceability)
- **File References**: Mọi mô tả về code phải đi kèm link đến file thực tế (VD: `[main.js](file:///src/main.js)`).
- **Line Numbers**: Trích dẫn code phải ghi rõ số dòng bắt đầu và kết thúc.
- **Proof of Work**: Mọi tính năng phải được liên kết với User Story tương ứng trong tài liệu gốc.

## 3. Ngôn ngữ & Định dạng (Style)
- **Tông giọng**: Khách quan, trung thực, chuyên nghiệp (Technical Writing style).
- **Trực quan hóa**: Sử dụng Mermaid diagrams cho kiến trúc và luồng dữ liệu.
- **Code Highlighting**: Sử dụng đúng ngôn ngữ (js, py, sql) cho các khối mã.

## 4. Tầm nhìn CTO (Accuracy & Value)
- **No-Abstraction**: Không dùng từ ngữ mơ hồ ("hình như", "có lẽ"). Báo cáo phản ánh chính xác 100% sự thật trong `src/`.
- **Stakeholder Transparency**: Báo cáo được thiết kế để cấp lãnh đạo (CTO/PO) có thể nắm bắt "sức khỏe" dự án trong 5 phút.

---
> [!IMPORTANT]
> **"Báo cáo là tấm gương phản chiếu tính trung thực của kỹ sư."** — _Antigravity Strategic Leader_
