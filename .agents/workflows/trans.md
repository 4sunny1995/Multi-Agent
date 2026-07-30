---
workflow_id: TRN-001
description: Quy trình dịch thuật, lưu trữ và đồng bộ hóa mục lục đa ngôn ngữ.
role_lead: TRANSLATOR
---

# 🚀 Workflow: Dịch tài liệu & Quản lý Kho tri thức (/trans)

Quy trình tự động hóa việc trích xuất, dịch thuật, lưu trữ bản gốc (Snapshot) và cập nhật mục lục tổng thể (`docs/README.md`). Mọi bước đi đều tuân thủ **TRL-IT-001**.

## 🛠️ 1. Quy trình thực thi (Execution Steps)

1. **Trích xuất & Discovery (TRANSLATOR):**
   - **Hành động**: Đọc file từ `docs/<category>/`. Kiểm tra tính nhất quán với `glossary.json`.
   - **Handoff**: Xác nhận với **BA** nếu có thuật ngữ nghiệp vụ mới chưa có trong từ điển.

2. **Lưu trữ bản gốc (Snapshot - TRANSLATOR):**
// turbo
   - **Hành động**: Copy file gốc vào thư mục `docs/original/<category>/`. 
   - **Mục đích**: Đảm bảo có bản đối chiếu (Source of Truth) không bao giờ bị thay đổi.

3. **Dịch thuật Chuyên sâu (Translate - TRANSLATOR):**
   - **Hành động**: Kích hoạt **Polyglot Agent**. Dịch sang ngôn ngữ đích (EN, JA, VI). 
   - **Quy tắc**: Giữ nguyên Code, định dạng Markdown và thuật ngữ IT chuẩn.

4. **Định dạng & Lưu trữ (Persist - TRANSLATOR):**
   - **Hành động**: Ghi file vào `docs/trans/{lang}/{category}/{filename}`.
   - **Handoff**: Thêm tag `> [!NOTE] Translated by AI Agent` để phân biệt.

5. **Đồng bộ Mục lục (Indexing - TRANSLATOR):**
   - **Hành động**: Tự động cập nhật bảng tra cứu tại [docs/README.md](file:///docs/README.md).
   - **Mục đích**: User có thể truy cập mọi phiên bản ngôn ngữ chỉ từ một trang duy nhất.

---

## 📂 2. Cấu trúc lưu trữ (Output Hierarchy)

- **Bản gốc (Snapshot):** `docs/original/`
- **Bản dịch:** `docs/trans/{lang}/`
- **Mục lục:** `docs/README.md`

---

## 🛡️ 3. Quy tắc nghiêm ngặt (Strict Rules)

- **Independent**: Không được phép ghi đè lên file gốc đang sử dụng.
- **Traceability**: Link trong `README.md` phải luôn chính xác.
- **Consistency**: Sử dụng duy nhất 1 bộ Glossary cho toàn bộ dự án.

---

## 🚦 Chốt chặn chất lượng (Leader Review)

- **Độ phủ mục lục**: 100% tài liệu được dịch phải xuất hiện trong README.
- **Tính nhất quán**: Bản dịch không được làm sai lệch logic của bản gốc.

---
> **Lệnh kích hoạt:** `/execute_workflow trans source="docs/business/brd.md" lang="en"`