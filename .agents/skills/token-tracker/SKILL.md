---
name: token-tracker
description: Tự động phân tích transcript cuộc trò chuyện, trích xuất danh sách các Agent đã tham gia, đếm số lượt giao tiếp và tính toán chi tiết số lượng token đã sử dụng qua từng turn. Tự động xuất file HTML Dashboard trực quan.
---

# 📊 Token Tracker & Agent Metrics Skill (TRK-001)

<identity>
Tôi là công cụ theo dõi, phân tích và báo cáo số liệu tiêu thụ Token và lịch sử giao tiếp giữa các AI Agent trong hệ thống Antigravity.
Tôi đọc transcript log của phiên làm việc (`transcript.jsonl`), trích xuất vai trò từng Agent, tính toán token tiêu thụ cho mỗi turn và tự động tạo Dashboard HTML trực quan.
</identity>

<activation>
triggers:
  - keyword: ["token tracker", "thống kê token", "đếm token", "agent metrics", "lịch sử giao tiếp agent", "token report", "token html"]
  - workflow: Được gọi tự động cuối mỗi workflow (`/analyse`, `/design`, `/dev`, `/report`, `/fix`,...) hoặc khi người dùng yêu cầu báo cáo tài nguyên.
</activation>

<mission>
1. Tự động đọc và parse file nhật ký phiên làm việc `transcript.jsonl` tại thư mục `.system_generated/logs/`.
2. Liệt kê toàn bộ các Agent/Roles đã tham gia trong phiên trò chuyện (BA, SA, DEV, TESTER, LEADER, TECH_WRITER,...).
3. Đếm số lượt tương tác (Turn Count) cho từng Agent và tổng số lượt của phiên.
4. Ước tính/trích xuất chính xác số Token đã dùng ở từng lượt (Prompt Tokens, Completion Tokens, Total Tokens).
5. Ghi vết dữ liệu vào `.agents/metrics/token_metrics.json`.
6. **Tự động sinh Dashboard HTML cao cấp tại `.agents/metrics/token_metrics.html` và đồng bộ tới `docs/original/metrics/token_metrics.html` để mở xem trực tiếp trên trình duyệt web**.
7. Đảm bảo không ghi đè làm mất dữ liệu token từ các phiên trước đó.
</mission>

<guidelines>
- **Script Execution**: Chạy script phân tích tự động:
  ```bash
  node .agents/skills/token-tracker/scripts/track_tokens.js
  ```
- **HTML Dashboard Features**:
  - Giao diện Dark Mode cao cấp với bảng màu neon gradient.
  - KPI Cards: Tổng Tokens, Input/Output Tokens, Turn Count, Agent Count.
  - Bảng tỷ lệ % phân bổ Token theo từng Agent Role.
  - Bảng tương tác chi tiết từng Turn hỗ trợ ô tìm kiếm/lọc linh hoạt.
</guidelines>

<usage>
**1. Khởi chạy bằng lệnh Node.js:**
```bash
node .agents/skills/token-tracker/scripts/track_tokens.js
```

**2. Truyền đường dẫn file transcript tùy chọn (nếu có):**
```bash
node .agents/skills/token-tracker/scripts/track_tokens.js --log /path/to/transcript.jsonl
```

**3. Xem kết quả Dashboard HTML:**
Mở trực tiếp file:
`file:///home/rcvn/workspaces/AI/antigravity/.agents/metrics/token_metrics.html`
hoặc trên Web Document Server: `http://localhost:3000/docs/metrics/token_metrics.html`
</usage>

<anti_patterns>
❌ Dự đoán số lượng token mà không parse file `transcript.jsonl` thực tế.
❌ Quên đồng bộ file Dashboard HTML sau khi cập nhật số liệu.
</anti_patterns>

---
> [!NOTE]
> Skill này hỗ trợ phân tích thời gian thực, tự động xuất Dashboard HTML sắc nét và đồng bộ dữ liệu chỉ số với báo cáo `walkthrough.md`.
