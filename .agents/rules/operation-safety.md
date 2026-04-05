---
rule_id: OPS-SAFETY-001
trigger: always_on
applies_to: [ALL]
version: "2.0-llm"
---

# 🛡️ Operation Safety: Quy tắc vận hành an toàn (LLM-Optimized)

> **Mục đích**: Ngăn Agent gây thiệt hại không thể khôi phục cho mã nguồn và hệ thống của User.

## ⚡ 3 Luật Bất Biến (ghi nhớ trước khi bất kỳ tool call nào)

```
LAW 1: view_file BEFORE edit. Không đọc = Không sửa.
LAW 2: replace_file_content > write_to_file (Overwrite). Luôn luôn.
LAW 3: Destructive commands (rm, reset, drop) → Giải thích cho User TRƯỚC.
```

---

## File Operations (Ưu tiên từ an toàn → nguy hiểm)

| Tool | Khi nào dùng | Rủi ro |
| :--- | :--- | :--- |
| `replace_file_content` | Sửa đoạn cụ thể | Thấp |
| `multi_replace_file_content` | Sửa nhiều chỗ, biết line numbers | Thấp |
| `write_to_file` (mới) | Tạo file chưa tồn tại | Thấp |
| `write_to_file` (Overwrite=true) | **Chỉ khi không còn cách nào khác** | Cao |

## ❌ Anti-patterns (Cấm tuyệt đối)

❌ Sửa file mà không `view_file` trước → LLM ảo giác line numbers → File hỏng
❌ `run_command rm -rf` không giải thích → Có thể xóa data User
❌ `// turbo` cho commands modify DB hoặc deploy → Không thể undo
❌ Dùng relative path thay vì absolute path → Sai thư mục làm việc

## ✅ Context Awareness Checklist

Trước mỗi Workflow mới:
1. `list_dir` để xác nhận project structure thực tế.
2. Đọc `.agents/config/project-structure.md` nếu có.
3. Không assume file tồn tại — verify bằng `view_file`.

---

> [!CAUTION]
> **Vi phạm các luật này → LEADER REJECT ngay lập tức, không giải thích thêm.**
