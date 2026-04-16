---
rule_id: DOC-001
trigger: model_decision
description: Quy chuẩn Tài liệu và Báo cáo Kỹ thuật (Accuracy, Structure, Reporting)
applies_to: [TECH_WRITER, BA, SA, DEV, LEADER]
version: "7.0-llm"
---

# 📝 Documentation & Reporting Standards (DOC-001)

<identity>
Mục tiêu: Đảm bảo tài liệu kỹ thuật và báo cáo đạt độ chính xác tuyệt đối, cấu trúc chuyên nghiệp và dễ tiếp cận cho mọi đối tượng.
Triết lý: "Tài liệu không có bằng chứng (evidence) = Tài liệu không tồn tại."
</identity>

<activation>
Kích hoạt khi viết BRD, Implementation Plan, API Docs, User Guide, hoặc thực hiện `/report`.
</activation>

<thinking_pattern>
1. Tài liệu này viết cho ai? (Developer, Admin, hay End-user).
2. Tôi có đang "sáng tạo" ra thông tin không hay đã verify với code thực tế (`src/`)?
3. Các khẳng định trong báo cáo đã có dẫn chứng (File path:Line number) chưa?
4. Câu văn có súc tích và dùng thể chủ động không?
</thinking_pattern>

<guidelines>
## 1. ACCURACY & EVIDENCE (Ràng buộc về Sự thật)
- **Zero-Hallucination**: Không bao giờ sáng tạo ra tính năng hoặc tham số không tồn tại trong mã nguồn.
- **Link Evidence**: Mọi khẳng định về code phải đính kèm link cụ thể: `[file.ts:L23](file_path)`.
- **Verify-First**: Mọi Code Snippet trích dẫn phải được lấy từ bản thực thi mới nhất của DEV, không copy từ Plan cũ.

## 2. REPORTING STRUCTURE (TRS-001)
Báo cáo kỹ thuật chuẩn phải bao quát đủ 5 tầng:
1. **Overview**: Mục tiêu + Phạm vi dự án.
2. **Feature Catalog**: User Stories + Acceptance Criteria thực tế.
3. **Architecture**: Diagrams (Mermaid) + ERD + Infra topology.
4. **Implementation**: Cấu trúc thư mục + Core logic snippets.
5. **Quality**: Test coverage + Security sign-off.

## 3. LINGUISTIC & FORMATTING
- **Active Voice**: Sử dụng câu chủ động. Loại bỏ từ mơ hồ ("có lẽ", "hình như").
- **Minimalist Writing**: 1 câu < 25 từ, 1 đoạn < 4 dòng. Loại bỏ 100% từ thừa.
- **Visual-First**: Ưu tiên dùng Mermaid diagram cho luồng logic phức tạp.
- **Hierarchy**: Tuân thủ thứ tự Heading (H1 > H2 > H3), không nhảy cấp.
</guidelines>

<anti_patterns>
❌ Copy-paste từ BRD vào report mà không đối chiếu với Code thực tế.
❌ Dùng từ ngữ mơ hồ hoặc trạng từ thừa thãi.
❌ Viết tài liệu cồng kềnh cho dự án quy mô nhỏ [MVP-MICRO].
❌ Thiếu dẫn chứng (file path, line number) cho các nhận định kỹ thuật.
</anti_patterns>

<checklist>
- [ ] Mọi Code Snippet đã được `view_file` để verify chưa?
- [ ] Báo cáo đã đủ 5 tầng thông tin chuẩn TRS-001 chưa?
- [ ] Đã có dẫn chứng cụ thể cho các khẳng định chính chưa?
- [ ] Ngôn ngữ đã súc tích và nhất quán thuật ngữ chưa?
</checklist>
