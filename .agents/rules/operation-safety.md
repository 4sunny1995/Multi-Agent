---
trigger: always_on
rule_id: operation-safety-001
---

# 🛡️ Operation Safety: Quy tắc vận hành an toàn

Bộ luật này ngăn chặn Agent gây ra thiệt hại không đáng có cho mã nguồn của User.

## 1. File Manipulation Rules (Quy tắc thao tác File)
- **Prefer `replace_file_content`**: Luôn ưu tiên sửa đổi từng phần thay vì ghi đè toàn bộ file (`write_to_file` + Overwrite), trừ khi tạo file mới hoặc file cấu hình cực nhỏ.
- **Always `view_file` first**: Cấm sửa đổi file mà chưa đọc toàn bộ nội dung của nó (để lấy line numbers chính xác).
- **Post-Edit Verification**: Sau khi dùng `write_to_file` hoặc `replace_file_content`, Agent PHẢI dùng `view_file` 1 lần nữa để xác nhận nội dung đã đúng như mong đợi trước khi Report.
- **Strict Pathing**: Luôn sử dụng đường dẫn tuyệt đối hoặc tham chiếu trực tiếp từ `project-structure.md`.

## 2. Tool Usage Constraints (Hạn chế công cụ)
- **`run_command` Verification**: Trước khi chạy bất kỳ command nào có khả năng xóa (e.g., `rm`, `git reset`), Agent PHẢI giải thích lý do cho User.
- **Turbo usage**: Chỉ dùng `// turbo` cho các lệnh vô hại (mkdir, ls, npm test). Tuyệt đối không dùng cho các lệnh sửa đổi DB hoặc Deploy.

## 3. Context Awareness (Nhận thức ngữ cảnh)
- **Mandatory Checks**: Mỗi khi bắt đầu một Workflow (`/dev`, `/fix`), Agent PHẢI đọc file `.agents/config/project-structure.md` để đảm bảo không bị "ảo giác" về đường dẫn.

> [!CAUTION]
> Vi phạm các quy tắc an toàn này sẽ bị **LEADER** REJECT ngay lập tức mà không cần giải thích thêm.
