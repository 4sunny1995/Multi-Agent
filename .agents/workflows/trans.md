---
workflow_id: TRN-001
description: Quy trình dịch thuật, lưu trữ và đồng bộ hóa mục lục đa ngôn ngữ.
role_lead: TRANSLATOR
triggers: ["/trans", "dịch", "translate", "multilingual", "localization", "i18n", "en", "ja", "vi"]
version: "2.0"
---

# 🌐 Workflow: Dịch tài liệu & Quản lý Kho tri thức (/trans)

> **Quy tắc bất biến**: File gốc trong `docs/` không bao giờ bị sửa đổi hay overwrite.

## ⚡ Luồng thực thi

```
TRANSLATOR (Discovery) → TRANSLATOR (Snapshot) → TRANSLATOR (Translate) → TRANSLATOR (Persist) → TRANSLATOR (Index)
```

---

## 1. DISCOVERY & GLOSSARY CHECK (TRANSLATOR)
- **Hành động**: `view_file` file cần dịch. Tra cứu `glossary.json` cho mọi thuật ngữ.
- **BA Consultation**: Nếu gặp thuật ngữ nghiệp vụ mới chưa có trong glossary → hỏi BA trước.
- **Output**: Danh sách terms cần handle + confirmed glossary entries.

## 2. SNAPSHOT BẢN GỐC (TRANSLATOR)
// turbo
- **Hành động**: Copy file gốc vào `docs/original/<category>/` trước khi làm bất cứ điều gì.
- **Constraint**: Nếu snapshot đã tồn tại → skip, không overwrite.
- **Output**: `docs/original/<category>/<filename>` — immutable source of truth.

## 3. TRANSLATION (TRANSLATOR)
- **Hành động**: Dịch sang ngôn ngữ đích theo TRL-IT-001.
- **Giữ nguyên**: Code blocks, IT terms (API, Middleware...), URL trong links, file paths.
- **Quality check**: Back-translate 1 đoạn để verify nghĩa không bị lệch.
- **Output**: Translated content (in-memory, chưa lưu).

## 4. PERSIST (TRANSLATOR)
- **Hành động**: Ghi file vào `docs/trans/{lang}/{category}/{filename}`.
- **Dòng đầu tiên**: `> [!NOTE] Translated from: [link gốc] by AI Agent`.
- **Output**: `docs/trans/<lang>/<category>/<filename>`.

## 5. INDEX UPDATE (TRANSLATOR)
// turbo
- **Hành động**: Thêm row mới vào bảng trong `docs/README.md` với link đến bản gốc + bản dịch.
- **Output**: `docs/README.md` updated — 100% coverage.

---

## 🚨 Failure Points (Điểm hay gặp lỗi)
1. Dịch mà không snapshot bản gốc → **Giải pháp**: Bước 2 bắt buộc, không thể skip.
2. Code snippet bị dịch nhầm → **Giải pháp**: Auto-check: backtick content phải giữ nguyên 100%.
3. `docs/README.md` không được cập nhật → **Giải pháp**: Bước 5 là bắt buộc, không phải optional.