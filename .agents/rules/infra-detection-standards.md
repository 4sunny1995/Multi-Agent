# 📜 RULE: INFRASTRUCTURE DETECTION STANDARDS (INF-001)

| Thông số | Giá trị |
| :--- | :--- |
| **Mã hiệu** | INF-001 |
| **Đối tượng** | SA, CLOUD ARCHITECT, AUDITOR |
| **Triết lý** | "Trước khi xây nhà mới, hãy kiểm tra móng cũ. Tránh lãng phí và xung đột hạ tầng." |

---

## 🔍 1. Danh sách Dấu hiệu nhận diện (Detection Signals)

### A. Tín hiệu Dự án Mới (Greenfield)
- Thư mục `docs/` trống hoặc chỉ có file README mặc định.
- Không có tệp `.env`.
- Không có `package.json`, `requirements.txt`, `go.mod` hoặc các file quản lý phụ thuộc khác.
- Không có thư mục `src/` hoặc `app/`.

### B. Tín hiệu Hệ thống Cũ (Legacy/Brownfield)
- Sự hiện diện của `docker-compose.yaml` hoặc `Dockerfile`.
- Có các tệp `.sql` hoặc thư mục `database/`, `migrations/`.
- Có tệp `.env` hoặc `.env.example`.
- Đã tồn tại cấu trúc thư mục code phức tạp.

---

## 🛠️ 2. Quy trình kiểm tra bắt buộc (Standard Procedure)

1. **Scan Root Directory**: Sử dụng `list_dir` để lấy danh sách file cấp 1.
2. **Deep Scan Config**: Nếu nghi ngờ là dự án cũ, dùng `view_file` để kiểm tra nội dung `docker-compose.yaml` hoặc `package.json` để xác định công nghệ và DB đang dùng.
3. **Report Phase**: Agent phải ghi rõ trong `implementation_plan.md` ở mục "Context Audit":
    - `Detected State: [New Project / Legacy System]`
    - `Action Mode: [Initial Infrastructure / Infrastructure Evolution]`

---

## 🛡️ 3. Ràng buộc bảo mật (Security Constraints)

- **Tuyệt đối không ghi đè**: Nếu phát hiện `.env` hoặc DB có sẵn, Agent không được phép tự ý sửa đổi mà chỉ được phép đề xuất thay đổi trong Plan.
- **Dữ liệu nhạy cảm**: Không được in ra nội dung các Secret (API Key, Passwords) trong logs khi thực hiện Discovery.

---
> **"Thông minh không chỉ là biết cách làm, mà còn là biết mình đang đứng ở đâu."** — _The Gatekeeper Leader_
