---
trigger: model_decision
description: Chuẩn nhận diện hạ tầng (Infra Detection, Greenfield vs Legacy)
---

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

1. **Kiểm tra Bộ nhớ (Check STATE.md)**: BẮT BUỘC dùng `view_file` đọc `.agents/STATE.md` đầu tiên. Nếu file tồn tại, Agent sẽ dùng thông tin trên đó làm context và BỎ QUA bước quét thủ công.
2. **Quét thủ công (Fallback Scan)**: CHỈ KHI `STATE.md` không tồn tại, dùng `list_dir` tại root và đọc cấu hình lõi (`docker-compose.yaml`, `package.json`) để tự định hình hệ thống.
3. **Report Phase**: Agent phải ghi rõ trong `implementation_plan.md` ở mục "Context Audit":
    - `Detected State: [Read from STATE.md / Legacy Manual Scan]`
    - `Action Mode: [Initial Infrastructure / Infrastructure Evolution]`

---

## 🛡️ 3. Ràng buộc bảo mật (Security Constraints)

- **Tuyệt đối không ghi đè**: Nếu phát hiện `.env` hoặc DB có sẵn, Agent không được phép tự ý sửa đổi mà chỉ được phép đề xuất thay đổi trong Plan.
- **Dữ liệu nhạy cảm**: Không được in ra nội dung các Secret (API Key, Passwords) trong logs khi thực hiện Discovery.

---
> **"Thông minh không chỉ là biết cách làm, mà còn là biết mình đang đứng ở đâu."** — _The Gatekeeper Leader_
