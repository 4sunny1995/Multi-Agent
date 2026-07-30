---
name: serve-docs
description: Khởi chạy server nội bộ để hiển thị các tài liệu Markdown trong thư mục docs/original dưới dạng web trực quan trên trình duyệt.
---

# 🌐 Serve Docs Skill (SRV-001)

<identity>
Tôi là công cụ hỗ trợ public và hiển thị tài liệu.
Tôi giúp khởi chạy một Web Server nội bộ (sử dụng ExpressJS và Marked) để người dùng có thể đọc các file Markdown trong thư mục `docs/original` trực tiếp trên trình duyệt với giao diện thân thiện (HTML/CSS).
</identity>

<activation>
triggers:
  - keyword: ["public docs", "serve docs", "hiển thị tài liệu original", "start document server"]
  - workflow: Khi người dùng muốn xem hoặc duyệt các tài liệu đã được Approved trong `docs/original`.
</activation>

<mission>
Mang lại trải nghiệm đọc tài liệu mượt mà trên Browser bằng cách tự động parse Markdown sang HTML và cung cấp một danh sách Index (Mục lục) các tài liệu hiện có.
</mission>

<guidelines>
- Đảm bảo thư mục mục tiêu hợp lệ trong Project.
- Nếu được yêu cầu, hãy chạy lệnh Start Server trong nền để người dùng có thể click vào URL.
</guidelines>

<configuration>
Bạn có thể linh hoạt điều chỉnh Port, thư mục public và các Router thông qua file `serve-docs.json` tại thư mục gốc của project (ngang hàng với `package.json` chính). 

Mẫu file `serve-docs.json`:
```json
{
  "port": 3000,
  "publicFolder": "docs/original",
  "routes": {
    "/about": "README.md",
    "/api-v1": "api.md"
  }
}
```
*Lưu ý:* 
- **Auto-copy:** Nếu bạn chạy script mà ở thư mục gốc (Project root) chưa có file cấu hình, hệ thống sẽ tự động tạo và sao chép mẫu `serve-docs.json` từ trong thư mục Skill ra ngoài.
- **Route tĩnh:** Nếu bạn khai báo `"routes"`, server sẽ chuyển sang chế độ Route tĩnh (chỉ hiển thị và đọc các file được chỉ định rõ). 
- **Route động:** Nếu không khai báo hoặc để trống `"routes"`, server sẽ dùng chế độ Route động (quét và load tự động tất cả các file `.md` có trong `publicFolder`).
</configuration>

<usage>
**1. Cài đặt thư viện:**
Script có cơ chế tự động phát hiện thiếu thư viện và hiển thị câu hỏi xác nhận cài đặt tương tác ngay trên Terminal:
```text
⚠️ Thiếu thư viện (express, marked). Bạn có muốn tự động cài đặt ngay bây giờ? (y/N):
```
Nếu gõ `y`, script sẽ tự chạy `npm install` và tiếp tục hoạt động.

Hoặc bạn có thể cài thủ công trước khi dùng:
```bash
cd .agents/skills/serve-docs
npm install // turbo
```

**2. Khởi chạy Server (Standalone):**
Dùng lệnh sau tại gốc dự án hoặc trong thư mục skill:
```bash
node .agents/skills/serve-docs/scripts/serve.js
```
Mặc định, server sẽ chạy tại địa chỉ: `http://localhost:3000/docs`.

**3. Tích hợp vào Project Node.js chính:**
Nếu bạn muốn biến route này thành một phần của project thật, bạn có thể `import` và sử dụng Router được export sẵn:
```javascript
import express from 'express';
import { createDocsRouter } from './.agents/skills/serve-docs/scripts/serve.js';

const app = express();
app.use('/docs', createDocsRouter()); // Tự động load tài liệu từ docs/original

app.listen(8080, () => console.log('App running on port 8080'));
```
Bạn sẽ có thể truy cập qua URL `http://localhost:8080/docs` trong ứng dụng của mình.
</usage>

<anti_patterns>
❌ Sử dụng skill này để phục vụ mã nguồn hoặc các file nhạy cảm.
→ 💡 Skill chỉ được thiết kế để đọc file `.md` trong `docs/original`.
❌ Phơi bày ra Internet (Public IP) mà không có xác thực.
→ 💡 Tool này chỉ dùng cho mục đích Local Review.
</anti_patterns>

---
> [!NOTE]
> Server hỗ trợ render đầy đủ các thành phần Markdown chuẩn bao gồm cả bảng (Tables), khối code (Code blocks) và trích dẫn (Blockquotes).
