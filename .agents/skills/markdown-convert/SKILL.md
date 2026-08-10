---
name: markdownConvert
description: Chuyển đổi file Markdown sang HTML, PNG, SVG, CSV hoặc chuẩn hóa đường dẫn Markdown.
---

# 🔄 Markdown Converter Skill (MDC-001)

<identity>
Tôi là công cụ hỗ trợ chuyển đổi Markdown.
Tôi giúp chuyển đổi các file Markdown thành tài liệu trực quan (HTML, SVG, PNG), xuất cấu trúc dữ liệu dạng bảng (CSV) để phân tích, hoặc chuẩn hóa đường dẫn file cục bộ.
</identity>

<activation>
triggers:
  - keyword: ["convert markdown", "markdown to html", "markdown to png", "markdown to svg", "markdown to csv"]
  - workflow: Yêu cầu xuất báo cáo hoặc tài liệu sang định dạng khác.
</activation>

<mission>
Cung cấp khả năng xuất file Markdown nhanh chóng sang các định dạng khác nhau để chia sẻ, báo cáo, hiển thị trực quan hoặc phân tích dữ liệu.
</mission>

<guidelines>
- **Xác định Input/Output:** Luôn cung cấp đường dẫn file đầu vào (`.md`) và file đầu ra.
- **Chọn định dạng hợp lý:** Phù hợp với mục đích sử dụng (`html`, `png`, `svg`, `csv`, `md`).
- **Thực thi:** Gọi file script thông qua môi trường Node.js.
</guidelines>

<usage>
**1. Cài đặt thư viện (Chỉ làm lần đầu):**
Vì công cụ xuất ảnh PNG phụ thuộc vào `puppeteer`, bạn cần cài đặt các gói thư viện trước khi chạy:
```bash
cd .agents/skills/markdownConvert
npm install // turbo
```

**2. Chạy công cụ:**
Dùng lệnh Terminal sau để chạy công cụ chuyển đổi:

```bash
node .agents/skills/markdownConvert/scripts/markdown-convert.js <input.md> <output> [html|png|svg|csv|md]
```

**Các định dạng hỗ trợ:**
- `html` (Mặc định): Xuất ra file HTML tĩnh với CSS tiêu chuẩn.
- `png`: Xuất ra file ảnh PNG toàn trang (chạy ngầm qua Puppeteer).
- `svg`: Xuất ra file SVG vector (render text).
- `csv`: Xuất cấu trúc thẻ Heading (H1, H2, H3...) thành dữ liệu bảng (`id`, `title`, `level`, `parent_id`, `path`).
- `md`: Chuẩn hóa các đường dẫn tuyệt đối/tương đối bên trong markdown dựa trên Project Root.
</usage>

<anti_patterns>
❌ Sử dụng định dạng file đầu vào không phải Markdown.
→ 💡 Script được thiết kế chuyên biệt để parse cú pháp Markdown.
❌ Gọi lệnh nhưng thiếu tham số đầu ra.
→ 💡 Lệnh yêu cầu bắt buộc tối thiểu `<input.md>` và `<output>`.
</anti_patterns>

---
> [!TIP]
> Sử dụng định dạng `csv` cực kỳ hiệu quả để trích xuất và phân tích cấu trúc tổng thể của các tài liệu kỹ thuật phức tạp (BRD, System Design) mà không cần đọc từng dòng văn bản.
