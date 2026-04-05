---
rule_id: LPE-001
role: ALL
trigger: always_on
version: "1.0"
---

# 📐 LLM Prompt Engineering Standards (LPE-001)

Quy chuẩn viết tài liệu `.agents` để tối ưu hiệu suất trên các mô hình LLM (Claude, Gemini, GPT). Áp dụng cho mọi Role, Rule và Workflow file.

---

## 1. Token Budget Rules (Tiết kiệm Token)

- **Mỗi Role file**: Tối đa **60 dòng hiệu quả** (không tính comments trống).
- **Guidelines**: Tối đa **5 điểm**, mỗi điểm **1 câu hành động** (imperative sentence).
- **Cấm**: Đoạn văn giải thích dài hơn 3 câu liên tiếp.
- **Ưu tiên**: Danh sách (`-`) > Đoạn văn > Bảng (cho nội dung ngắn).

## 2. XML Tag Standards (Cấu trúc chuẩn)

Mọi Role file PHẢI có đủ các tag sau theo thứ tự:

```xml
<identity>   → Ai bạn là, tính cách cốt lõi (max 3 dòng)
<activation> → Khi nào Role này được kích hoạt (max 4 điều kiện)
<mission>    → Mục tiêu chính, 1-2 câu (không phải danh sách)
<thinking_pattern> → Chuỗi câu hỏi nội tâm trước khi hành động
<input_output>     → Bảng: Giai đoạn | Input | Output | Đường dẫn
<guidelines>       → Max 5 hành động cụ thể, ưu tiên động từ mạnh
<anti_patterns>    → Min 3 điều TUYỆT ĐỐI CẤM (để LLM không đoán sai)
<recommended_tools>→ Danh sách tools + mục đích
<constraints>      → Giới hạn phạm vi hoạt động
<output_format>    → Cấu trúc output cụ thể (nếu cần)
```

## 3. Activation Trigger Syntax (Ngữ pháp kích hoạt)

```yaml
# Cú pháp chuẩn trong <activation>:
triggers:
  - keyword: ["BRD", "User Story", "phân tích yêu cầu"]  # → BA
  - keyword: ["thiết kế", "Architecture", "Schema"]       # → SA
  - keyword: ["viết code", "implement", "fix bug"]        # → DEV
  - workflow: ["/dev", "/fix"]                            # → Kích hoạt cả team
```

## 4. Thinking Pattern Template

```
# Pattern cho LLM trước khi phản hồi:
1. Tôi đang trong Role [X] không? (Kiểm tra activation conditions)
2. Input từ User/Agent trước có đủ không? (Kiểm tra handoff contract)
3. Tôi sắp làm gì vi phạm anti_patterns không? (Self-check)
4. Output của tôi sẽ enable Agent tiếp theo làm gì? (Output contract)
```

## 5. Anti-Pattern Documentation

Mỗi Role PHẢI khai báo `<anti_patterns>` với cấu trúc:
```
❌ [Hành động cấm] → 💡 [Thay vào đó, làm gì]
```

Ví dụ:
```
❌ Tự ý đoán logic DB khi không có ERD → 💡 Hỏi SA hoặc đọc init.sql trước
❌ Viết code không có unit test → 💡 Viết test RED trước, code sau
```

## 6. Negative-First Specification

Khi định nghĩa hành vi của LLM, **khai báo điều cấm trước** — LLM xử lý constraint tốt hơn xử lý instruction dương tính.

---
> [!IMPORTANT]
> **Kiểm tra trước khi commit file .agents mới:**
> - [ ] File có đủ 10 XML tags không?
> - [ ] Guidelines có > 5 điểm không? (Nếu có → phải cắt)
> - [ ] Có `<anti_patterns>` chưa?
> - [ ] `<activation>` có ít nhất 2 trigger condition không?
