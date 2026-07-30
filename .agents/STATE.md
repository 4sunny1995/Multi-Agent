# 🧠 Antigravity Project State Checkpoint

> **Mục đích**: File này lưu giữ kiến trúc và trạng thái cấu trúc thư mục của dự án (Persistent State), giúp AI tiếp cận (Onboarding) nhanh chóng mà không cần chạy lệnh `list_dir` hoặc đọc code từ đầu trong các phiên làm việc mới.
> **Flow**: Cập nhật bắt buộc bởi LEADER ở dòng cuối cùng của mọi Workflows (`/dev`, `/fix`).

---

## 1. TÌNH TRẠNG DỰ ÁN (PROJECT STATUS)
- **Tình trạng hạ tầng (INF-001)**: `[Greenfield / Cũ (Legacy) / Enterprise]` (AI cập nhật phần này)
- **Giai đoạn phát triển**: `[MVP / Đang vận hành / Scaled]`

## 2. TECHNOLOGY STACK (NGĂN XẾP CÔNG NGHỆ)
- **Frontend**: `[Trống - chờ cập nhật]`
- **Backend / Khung sườn**: `[Trống - chờ cập nhật]`
- **Database (DBS-001)**: `[Trống - chờ cập nhật]`
- **Hạ tầng (Cloud/Deploy)**: `[Trống - chờ cập nhật]`

## 3. CẤU TRÚC THƯ MỤC CỐT LÕI (CORE DIRECTORIES)
*(Ghi chú các thư mục quan trọng để AI biết nên xem code ở đâu)*
- `.agents/`: Chứa định nghĩa Agent, Rule, Workflow, và STATE.md (đây).
- `docs/original/`: Chứa các tài liệu BRD, kiến trúc, test report do Agent tạo ra.
- `docs/trans/`: Chứa các bản dịch đa ngôn ngữ do Translator tạo ra.
- `...`: `[Chờ cập nhật]`

## 4. BẢO MẬT & QUYỀN TRUY CẬP (SECURITY PROTOCOL)
*(Ghi chú quy trình kết nối DB, API Key format, v.v)*
- **External Secret (SDC-001)**: `[Cách lấy biến môi trường trong dự án này]`

## 5. NỢ KỸ THUẬT & TRẠNG THÁI CUỐI (TECH DEBTS & LAST ACTION)
- **Nhánh / Phiên bản hiện tại**: `[Ví dụ: v1.0.0]`
- **Nợ kỹ thuật cần xử lý (Tech Debt)**: `[Các phần code bẩn hoặc giải pháp tạm thời cần refactor]`
- **Blockers hiện hành**: `[Phần nào đang vướng/chờ giải quyết]`

## 6. SƠ ĐỒ NGỮ NGHĨA (SEMANTIC KNOWLEDGE MAP)
> **Mục đích**: Chống lại Điểm mù 800-loc của LLM. Mọi sơ đồ Call Graph giữa các service, module quan trọng phải được tường thuật lại dưới dạng tóm tắt văn bản.
- **Data Flow**: `[Ví dụ: Auth Controller -> User Service -> MySQL]`
- **Dependency Map**: `[Ví dụ: Module Payment KHÔNG ĐƯỢC gọi chéo sang Module Chat]`
- **Core Abstractions**: `[Liệt kê các Base Classes / Interfaces chủ đạo]`

## 7. MÔ HÌNH KINH DOANH & KHÁCH HÀNG (BUSINESS DOMAIN)
> **Mục đích**: Nhồi ngữ cảnh kinh doanh cho BA Agent để không viết ra các Requirement và thiết kế vô dụng.
- **Core Value Proposition (Giá trị cốt lõi)**: `[Ví dụ: Ứng dụng này giúp nông dân bán trực tiếp nông sản mà không qua môi giới]`
- **User Personas (Chân dung Khách hàng)**: `[Ví dụ: Người từ 40-60 tuổi, mắt kém, hầu như không am hiểu công nghệ]`
- **Business Rules (Luật kinh doanh sắt)**: `[Ví dụ: Nông sản hư hỏng phải được hoàn tiền trong tích tắc, cấm dùng font chữ nhỏ hơn 16px]`
