---
rule_id: antigravity-standard-001
trigger: always_on
---

# 🛸 Antigravity Standard: Quy chuẩn vận hành AI Assistant

Bộ quy tắc này hướng dẫn các AI Agent cách tương tác chuyên nghiệp và tối ưu nhất trong môi trường Antigravity.

---

## 🇻🇳 1. Ngôn ngữ của Hệ thống (System Language)
- **Quy tắc Vàng**: Tất cả các tài liệu hệ thống (Artifacts) bao gồm `walkthrough.md`, `task.md`, và `implementation_plan.md` **BẮT BUỘC** phải được viết bằng tiếng Việt.
- **Thuật ngữ kỹ thuật**: Giữ nguyên tiếng Anh cho các thuật ngữ chuyên ngành không có từ tương đương sát nghĩa (e.g., `Endpoint`, `Middleware`, `Payload`, `Repository`, `Refactor`).

## 🛠️ 2. Tối ưu hóa Công cụ (Tool Optimization)
- **Tư duy Thăm dò**: Phải dùng `view_file` hoặc `list_dir` để nắm bắt context trước khi thực hiện bất kỳ lệnh sửa đổi nào.
- **Sửa đổi an toàn**: Ưu tiên sử dụng `replace_file_content` hoặc `multi_replace_file_content` thay vì `write_to_file`. Cấm dùng `multi_replace_file_content` cho các file có logic phức tạp nếu không có line numbers chính xác.
- **Tốc độ (Turbo)**: Sử dụng các bước có gắn nhãn `// turbo` cho các tác vụ lặp lại và an toàn (mkdir, npm install, lint).

## 📝 3. Cấu trúc Tài liệu (Artifact Structure)
- **Task**: Phải cập nhật ngay sau khi hoàn thành một bước (dùng dấu `[x]`).
- **Implementation Plan**: Phải có mục "User Review Required" cho các quyết định quan trọng.
- **Walkthrough**: Luôn đính kèm file link và mô tả ngắn gọn những gì đã thay đổi.
- **Auto-Indexing**: Mọi Agent khi tạo file mới trong `docs/` đều có trách nhiệm (hoặc delegate cho Tech Writer) cập nhật link vào `docs/README.md`.
- **Directory Guide**: Mỗi thư mục lõi (`roles/`, `rules/`, `workflows/`) phải có 1 file `README.md` đóng vai trò là danh mục điều hướng cho người dùng.
- **Team Handoff Protocol**: Trước khi bắt đầu Phase mới, Agent tiếp nhận PHẢI xác nhận (Check) tính đầy đủ của Output từ Agent trước đó. Nếu thiếu context, PHẢI yêu cầu bổ sung thay vì tự giả định.
- **Defensive Documentation**: Mọi văn bản bàn giao (BRD, Arch Docs, Plan) PHẢI có mục **"Potential Failure Points"** (Các điểm có thể gây lỗi hệ thống) và đề xuất phương án khắc phục/dự phòng sơ bộ.

## 🤝 4. Tương tác với User
- Phản hồi ngắn gọn, súc tích, tập trung vào giải quyết vấn đề.
- Sử dụng các khối `> [!IMPORTANT]` hoặc `> [!WARNING]` để nhấn mạnh các rủi ro.

---

## ✅ Antigravity Checklist
- [ ] Tài liệu này đã được viết bằng tiếng Việt chưa?
- [ ] Các bước thực hiện có tuân thủ quy tắc an toàn không?
- [ ] Bạn đã sử dụng hiệu quả các công cụ `view_file` chưa?
