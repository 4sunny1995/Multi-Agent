---
description: Quy trình dịch tài liệu cho khác hàng
---

# 🚀 Workflow: Dịch tài liệu (/trans)

## 📝 Mô tả
Quy trình tự động hóa việc trích xuất, dịch thuật, lưu trữ bản gốc và cập nhật mục lục tổng thể (`docs/README.md`).

---

## 🛠️ 1. Quy trình thực thi (Execution Steps)

1. **Trích xuất (Extract):**
   - Đọc file từ `docs/<category>/`.
   - Phân tích nội dung để dịch.
2. **Lưu trữ bản gốc (Archive):**
// turbo
   - Copy file gốc vào thư mục `docs/original/<category>/`.
3. **Dịch thuật (Translate):**
   - Kích hoạt **Polyglot Agent (TRL-IT-001)**.
4. **Định dạng & Lưu bản dịch (Persist):**
   - Ghi file bản dịch vào `docs/trans/{lang_code}/{category}/{filename}`.
   - Thêm chú thích: `> [!NOTE] Translated by AI Agent`.
5. **Cập nhật mục lục (Index):**
   - Cập nhật dòng tương ứng trong bảng tại `docs/README.md`.

---

## 📂 2. Cấu trúc lưu trữ (Output Hierarchy)

- **Bản gốc (Snapshot):** `docs/original/`
- **Bản dịch:** `docs/trans/{lang}/`
- **Mục lục:** `docs/README.md`

---

## 🛡️ 3. Quy tắc nghiêm ngặt (Strict Rules)

- **Independent**: Không được phép ghi đè lên file gốc trong docs nghiệp vụ.
- **Traceability**: Link trong `README.md` phải luôn chính xác và hoạt động.

---

## 🚦 Chốt chặn chất lượng (Leader Review)

- **Độ phủ mục lục:** 100% tài liệu được dịch phải xuất hiện trong README.
- **Tính nhất quán:** Bản gốc trong `original/` phải trùng khớp với version đã dịch.

---
> **Lệnh kích hoạt:** `/execute_workflow trans source="docs/business/brd.md" lang="en"`