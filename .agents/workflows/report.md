---
workflow_id: REP-001
description: Quy trình phối hợp BA, SA, DEV để trích xuất báo cáo kỹ thuật.
role_lead: TECH_WRITER, LEADER
---

# 📊 Workflow: Báo Cáo Kỹ Thuật (/report)

Quy trình tự động hóa việc thu thập "Chân dung dự án" từ BA, SA và DEV. Đảm bảo tính minh bạch và chuẩn mực **TRS-001**.

## 🛠️ 1. Quy trình thực thi (Execution Steps)

1. **Feature Discovery (BA):**
   - **Hành động**: Liệt kê tất cả User Stories & Acceptance Criteria đã hoàn thành.
   - **Handoff**: Chuyển giao danh mục tính năng cho **TECH WRITER**.

2. **Architecture Extract (SA):**
   - **Hành động**: Tóm tắt sơ đồ kiến trúc, hạ tầng và Data Schema hiện tại.
   - **Handoff**: Chuyển giao các Diagrams và Specs cho **TECH WRITER**.

3. **Code & Logic Insight (DEV):**
   - **Hành động**: Trích xuất cấu trúc thư mục (`tree`) và các đoạn mã logic (Code Snippets) quan trọng.
   - **Handoff**: Chuyển giao thông tin về tính năng thực thi cho **TECH WRITER**.

4. **Synthesis & Writing (TECH WRITER):**
   - **Hành động**: Tổng hợp dữ liệu từ 3 Agent trên thành một báo cáo hoàn chỉnh tại `docs/architecture/technical_report.md`.
   - **Quy tắc**: Tuân thủ 100% chuẩn **TRS-001**.

5. **Approval & Review (LEADER):**
   - **Hành động**: Kiểm tra tính trung thực (vs Source code thực tế) và phê duyệt báo cáo.
   - **Kết xuất**: `walkthrough.md`.

---

## 📂 2. Cấu trúc lưu trữ (Output Hierarchy)

- **Báo cáo kỹ thuật**: `docs/architecture/technical_report.md`
- **Tài liệu gốc**: `docs/original/architecture/`
- **Mục lục**: Cập nhật vào `docs/README.md`.

---

## 🛡️ 3. Quy tắc nghiêm ngặt (Strict Rules)

- **Evidence Based**: Tuyệt đối không viết báo cáo "chay", mọi thông tin phải có dẫn chứng từ file thực tế.
- **Independence**: Workflow này có thể chạy độc lập bất cứ khi nào User yêu cầu nhìn thấy "Sức khỏe dự án".
- **Multi-Agent Orchestration**: Cần ít nhất 3 Agent (BA, SA, DEV) phối hợp để hoàn thành.

---

## 🚦 Chốt chặn chất lượng (Leader Review)

- **Độ tin cậy**: Báo cáo có phản ánh đúng trạng thái của thư mục `src/` không?
- **Tính thẩm mỹ**: Các sơ đồ Mermaid và Code snippets có được định dạng dễ đọc không?

---
> **Lệnh kích hoạt:** `/execute_workflow report target="system-snapshot" scope="full"`
