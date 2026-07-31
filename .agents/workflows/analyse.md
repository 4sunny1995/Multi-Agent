---
workflow_id: ANA-001
description: Phân tích yêu cầu, khảo sát thực trạng và đánh giá tính khả thi.
role_lead: BA
triggers: ["/analyse", "phân tích", "requirements", "feasibility", "khảo sát", "khám phá"]
version: "1.0"
---

# 🔍 Workflow: Phân Tích & Khảo Sát Chuyên Sâu (/analyse)

> **Mục đích**: Chốt chặn quan trọng nhất để hiểu "Cái gì" và "Tại sao" trước khi gõ bất kỳ dòng code nào. Workflow này giúp giảm thiểu rủi ro sai lệch yêu cầu và lãng phí nguồn lực kỹ thuật.

## ⚡ Luồng thực thi

```
BA (Discovery) → SA (Technical Assessment) → AUDITOR (Risk Scan) → LEADER (Decision)
```

---

## 1. CONTEXT DISCOVERY — Khai phá Yêu cầu (BA)
// turbo
- **Hành động**: `view_file` các tài liệu hiện có, `list_dir` để hiểu cấu trúc dự án. Phỏng vấn User (qua `ask_question`) để làm rõ Pain Points.
- **Xác nhận**: Target Users là ai? Kết quả mong đợi (Output) là gì?
- **Output**: Business Requirement Draft (BRD) tạo trong `docs/draft/business/brd.md` với `Status: Draft`.

## 2. TECHNICAL ASSESSMENT — Đánh giá Khả thi (SA)
- **Hành động**: So sánh yêu cầu của BA với hạ tầng hiện có. Kiểm tra thư viện, ngôn ngữ và kiến trúc.
- **Constraints**: Giải pháp có vi phạm **SSA-001** (Quy mô hệ thống) không? Có nợ kỹ thuật nào cản trở không?
- **Output**: Feasibility Report + Đề xuất Kiến trúc sơ bộ trong `docs/draft/architecture/`.

## 3. RISK & GAP SCAN — Rà soát Rủi ro (AUDITOR)
- **Hành động**: Tìm các "lỗ hổng" trong logic nghiệp vụ hoặc các điểm thắt cổ chai kỹ thuật.
- **Checklist**: Security, Performance, Cost (Cloud Budget).
- **Output**: Risk Matrix (High/Medium/Low) sơ bộ trong `docs/draft/architecture/risk_matrix.md`.

## 4. STRATEGIC DECISION & USER APPROVAL — Ra quyết định & Phê duyệt (LEADER & User/PO)
- **Hành động**: LEADER xem xét các tài liệu bản thảo trong `docs/draft/` từ BA/SA/AUDITOR và trình bày cho User/PO.
- **Hỏi ý kiến User/PO (Review & Approve)**: Trình tài liệu tại `docs/draft/` để User/PO review và chọn:
    - ✅ **Approved**: User/PO chấp thuận tài liệu. LEADER chỉ đạo di chuyển/đồng bộ các tài liệu từ `docs/draft/` sang `docs/original/` (ví dụ `docs/original/business/brd.md`), cập nhật `Status: Approved` trong Header. Tiếp tục sang `/design` hoặc `/dev`.
    - 🔄 **Refine**: Yêu cầu BA/SA chỉnh sửa trực tiếp các nội dung chưa đạt trong `docs/draft/`.
    - ❌ **Drop**: Hủy bỏ yêu cầu nếu rủi ro quá cao hoặc không mang lại giá trị.
- **Output**: Tài liệu chính thức đã Approved được lưu tại `docs/original/` (Single Source of Truth).

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. **Shallow Research**: Chỉ đọc yêu cầu mà không `view_file` code thực tế → **Giải pháp**: BA bắt buộc phải dẫn chứng line code/folder liên quan.
2. **Ignoring Legacy**: Phân tích như làm dự án mới trong khi đang ở hệ thống cũ → **Giải pháp**: SA phải tham chiếu `infra-detection-standards.md`.
3. **Vague Requirements**: Yêu cầu chung chung kiểu "Làm hệ thống mượt hơn" → **Giải pháp**: LEADER reject nếu không có Acceptance Criteria (AC) định lượng.

---
> [!IMPORTANT]
> **"Một giờ phân tích có thể tiết kiệm một tuần lập trình vô nghĩa."**
