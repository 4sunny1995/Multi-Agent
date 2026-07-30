---
workflow_id: RET-001
description: Cuộc họp Retrospective — AI Team tự phân tích, cập nhật Rules và tiến hóa.
role_lead: LEADER
triggers: ["/retro", "retrospective", "tự hoàn thiện", "nâng cấp bản thân", "tiến hóa", "bài học"]
version: "2.0"
---

# 🔄 Workflow: Họp Rút Kinh Nghiệm (/retro)

> **Mục đích**: Đây là cơ chế **tự tiến hóa** của hệ thống — mỗi /retro là một lần AI Team tự "nâng cấp não bộ".

## ⚡ Luồng thực thi

```
LEADER (Facilitate) → ALL AGENTS (Reflect) → LEADER (Synthesize) → LEADER (Write to Rules) → walkthrough.md
```

---

## 1. THE ARENA — Thu thập Evidence (LEADER)
- **Hành động**: Đọc context gần nhất — conversation logs, các bug đã fix, các task đã thất bại.
- **Dẫn dắt từng Agent**:
  - 🎯 **TESTER**: "Bug nguy hiểm nhất gần đây là gì? Nó lọt qua gate nào?"
  - 💻 **DEV**: "Khó khăn lớn nhất khi implement là gì? SA đã miss điều gì?"
  - 📋 **BA**: "User Story nào bị thiếu Edge Case dẫn đến bug?"
  - 🏗️ **SA**: "Thiết kế nào đã phải thay đổi sau khi DEV bắt tay vào?"
- **Output**: Danh sách vấn đề thực tế (không phải giả định).

## 2. DEBATE & ROOT CAUSE (ALL AGENTS → LEADER)
- **Hành động**: LEADER phân tích patterns — không phạt cá nhân, tìm lỗi hệ thống.
- **Câu hỏi cốt lõi**: "Tiêu chuẩn nào bị thiếu khiến vấn đề này lặp lại?"
- **Output**: Root Cause list với đề xuất Rule mới hoặc cập nhật Rule cũ.

## 3. KNOWLEDGE UPGRADE — Viết vào Não bộ (LEADER)
- **Hành động**: Ghi trực tiếp các tiêu chuẩn mới vào `.agents/rules/` hoặc role files.
// turbo
- **Ưu tiên**: Cập nhật rule hiện có > Tạo rule mới (tránh bloat).
- **Mandatory write**: Luôn cập nhật `team-retro.md` với Sprint summary.
- **Output**: Các rule files đã được cập nhật. Danh sách thay đổi.

## 4. CLOSE & COMMIT (LEADER)
- **Hành động**: Tóm tắt thành walkthrough. Đặt câu hỏi kiểm tra: "Nếu lỗi này xảy ra lần nữa, Rule mới có ngăn được không?"
- **Output**: `walkthrough.md` — Brain Upgrade Report.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. /retro chỉ là "họp cho có" không có output thực tế → **Giải pháp**: Bắt buộc phải có ít nhất 1 file rule được modify.
2. Thêm rule mới mà không loại bỏ rule cũ → **Giải pháp**: Trước khi thêm, kiểm tra rule tương tự đã tồn tại chưa.
3. Blame cá nhân Agent thay vì blame hệ thống → **Giải pháp**: LEADER phải frame mọi vấn đề theo "Rule nào bị thiếu?" không phải "Agent nào làm sai?"
