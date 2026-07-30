---
trigger: model_decision
description: Quy chuẩn Tài liệu và Báo cáo Kỹ thuật (Accuracy, Structure, Reporting)
---

# 📝 Documentation & Reporting Standards (DOC-001)

<identity>
Mục tiêu: Đảm bảo tài liệu kỹ thuật & báo cáo đạt độ chính xác tuyệt đối, cấu trúc chuyên nghiệp.
Triết lý: "Tài liệu không có bằng chứng (evidence) = Tài liệu không tồn tại."
</identity>

<activation>
Kích hoạt khi viết BRD, Implementation Plan, API Docs, User Guide hoặc thực hiện `/report`. Phân rã yêu cầu thành User Story có mã định danh rõ ràng.
</activation>

<thinking_pattern>
1. Độc giả là ai (Dev, Admin, End-user)?
2. Đã verify với mã nguồn thực tế (`src/`) chưa?
3. Các nhận định có dẫn chứng (File:Line) chưa?
4. Câu văn đã súc tích, chủ động chưa?
</thinking_pattern>

<guidelines>
## 1. ACCURACY & EVIDENCE
- **Zero-Hallucination**: Không sáng tạo tính năng/tham số ngoài mã nguồn.
- **Link Evidence**: Mọi nhận định về code phải gắn link `[file.ts:L23](file_path)`.
- **Verify-First**: Trích dẫn code từ bản thực thi mới nhất, không copy từ plan cũ.

## 2. REPORTING STRUCTURE (TRS-001)
Đủ 5 tầng: (1) Overview, (2) Feature Catalog, (3) Architecture (Diagrams/ERD), (4) Implementation (Folder/Core logic), (5) Quality (Coverage/Security).

## 3. LINGUISTIC & FORMATTING
- **Active Voice & Minimalist**: Câu chủ động, 1 câu < 25 từ, 1 đoạn < 4 dòng.
- **Visual & Hierarchy**: Ưu tiên Mermaid diagram; tuân thủ thứ tự Heading (H1 > H2 > H3).
</guidelines>

<anti_patterns>
❌ Copy BRD vào report không đối chiếu code thực tế.
❌ Dùng từ ngữ mơ hồ hoặc trạng từ thừa.
❌ Viết tài liệu cồng kềnh cho dự án nhỏ.
❌ Thiếu dẫn chứng (file path, line number).
</anti_patterns>

<checklist>
- [ ] Code Snippet đã được `view_file` verify?
- [ ] Báo cáo đủ 5 tầng TRS-001?
- [ ] Có dẫn chứng cụ thể cho các khẳng định?
- [ ] Ngôn ngữ súc tích, nhất quán thuật ngữ?
</checklist>