---
name: serve-docs
description: Tự động phát hiện ứng dụng ExpressJS để nhúng docs router hoặc khởi chạy server nội bộ hiển thị các tài liệu Markdown trong thư mục docs/original dưới dạng web trực quan trên trình duyệt.
---

# 🌐 Serve Docs Skill (SRV-001)

<identity>
Tôi là công cụ hỗ trợ public và hiển thị tài liệu.
Tôi giúp tự động phát hiện dự án ExpressJS để nhúng router hiển thị tài liệu, hoặc khởi chạy một Web Server nội bộ (ExpressJS và Marked) để người dùng có thể đọc các file Markdown trong thư mục `docs/original` trực tiếp trên trình duyệt với giao diện thân thiện (HTML/CSS).
</identity>

<activation>
triggers:
  - keyword: ["public docs", "serve docs", "hiển thị tài liệu original", "start document server", "nhúng docs vào express"]
  - workflow: Khi người dùng muốn xem hoặc duyệt các tài liệu đã được Approved trong `docs/original`.
</activation>

<mission>
1. **Kiểm tra môi trường Node.js**: Kiểm tra xem máy đã cài đặt Node.js hay chưa. Nếu chưa có, dừng lại hỏi ý kiến người dùng xem có cần AI hỗ trợ cài đặt hay không.
2. **Kiểm tra ExpressJS**: Kiểm tra xem dự án hiện tại có sử dụng ExpressJS hay không.
3. **Nếu là ứng dụng ExpressJS**: Tự động nhúng `createDocsRouter()` từ `.agents/skills/serve-docs/scripts/serve.js` vào file entry point chính (`app.js`, `server.js`, `index.js`, `src/app.ts`, v.v.) tại route `/docs`.
4. **Nếu không phải ứng dụng ExpressJS (hoặc là dự án tĩnh)**: Khởi chạy Standalone Server độc lập tại port 3000 (hoặc port rảnh kế tiếp) qua lệnh `node .agents/skills/serve-docs/scripts/serve.js`.
</mission>

<guidelines>
- **Bước 0: Node.js Environment Check (Kiểm tra Node.js)**:
  - Chạy kiểm tra phiên bản Node.js (ví dụ `node -v`).
  - **Nếu chưa cài đặt Node.js**: Dừng ngay lập tức và hỏi ý kiến người dùng (sử dụng câu hỏi trực tiếp hoặc `ask_question`):
    > *"Hệ thống hiện tại chưa cài đặt Node.js. Bạn có muốn tôi hỗ trợ cài đặt Node.js (LTS) ngay bây giờ không?"*
  - Nếu người dùng đồng ý (`Yes`): Tiến hành hỗ trợ cài đặt Node.js theo HĐH tương ứng.
  - Nếu người dùng từ chối (`No`): Dừng thực thi skill và cung cấp hướng dẫn cài đặt thủ công.

- **Bước 1: Express Detection (Phát hiện Express)**:
  - Kiểm tra file `package.json` ở gốc dự án xem có `express` trong dependencies không.
  - Sử dụng `grep_search` hoặc `view_file` để tìm file entry point chứa việc khởi tạo Express app (tìm từ khóa `express()`, `app.listen`, `const app = express()`, v.v.).

- **Bước 2A: Auto-Embedding (Nếu phát hiện Express app)**:
  - Xác định kiểu module của dự án (ESM `import` hay CommonJS `require`).
  - Dùng `replace_file_content` bổ sung dòng import:
    - *ESM*: `import { createDocsRouter } from './.agents/skills/serve-docs/scripts/serve.js';`
    - *CJS*: `const { createDocsRouter } = require('./.agents/skills/serve-docs/scripts/serve.js');`
  - Chèn khai báo route vào trước lệnh `app.listen()` hoặc nhóm middlewares:
    `app.use('/docs', createDocsRouter());`
  - Thông báo cho User biết router đã được nhúng vào ứng dụng Express và có thể truy cập qua route `/docs`.

- **Bước 2B: Standalone Mode (Nếu không phát hiện Express app)**:
  - Chạy lệnh khởi tạo server nội bộ độc lập: `node .agents/skills/serve-docs/scripts/serve.js`.
  - Cung cấp URL cho người dùng (mặc định: `http://localhost:3000/docs`).
</guidelines>

<configuration>
Bạn có thể linh hoạt điều chỉnh Port, thư mục public, cờ `publicAll` và các Routes thông qua file `serve-docs.json` tại thư mục gốc của project (ngang hàng với `package.json` chính). 

Mẫu file `serve-docs.json`:
```json
{
  "port": 3000,
  "publicFolder": "docs/original",
  "publicAll": true,
  "routes": {
    "/about": "README.md",
    "/api-v1": "api.md"
  }
}
```
*Lưu ý:* 
- **cờ `publicAll` (boolean)**: 
  - `publicAll: true` (Mặc định): Public toàn bộ các file `.md` trong `publicFolder` theo route động. Nếu có khai báo `routes`, các route tĩnh sẽ được ưu tiên hiển thị đồng thời cùng danh sách file động.
  - `publicAll: false`: **Chỉ public các route/file được khai báo cụ thể trong `"routes"`**, bảo mật các file khác trong `publicFolder`.
- **Auto-copy:** Nếu bạn chạy script mà ở thư mục gốc (Project root) chưa có file cấu hình, hệ thống sẽ tự động tạo và sao chép mẫu `serve-docs.json` từ trong thư mục Skill ra ngoài.
</configuration>

<usage>
**1. Cài đặt thư viện (nếu chạy standalone):**
CD vào thư mục skill để cài đặt:
```bash
cd .agents/skills/serve-docs && npm install // turbo
```

**2. Tự động Nhúng Router vào Express App (Auto-Embed Mode):**
Khi AI xác định ứng dụng là Express, AI sẽ chèn vào file server (ví dụ `server.js`):
```javascript
import express from 'express';
import { createDocsRouter } from './.agents/skills/serve-docs/scripts/serve.js';

const app = express();

// Nhúng tự động bởi AI:
app.use('/docs', createDocsRouter());

app.listen(3000, () => console.log('Server listening on port 3000'));
```

**3. Khởi chạy Server độc lập (Standalone Mode):**
Nếu project không dùng Express:
```bash
node .agents/skills/serve-docs/scripts/serve.js
```
Mặc định, server sẽ chạy tại địa chỉ: `http://localhost:3000/docs`.
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

